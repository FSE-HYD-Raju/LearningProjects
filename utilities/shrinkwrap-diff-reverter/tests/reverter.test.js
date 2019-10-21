const fs = require("fs");
const path = require("path");
const glob = require("glob");
const _ = require("lodash");
const shelljs = require("shelljs");
const reverter = require("../src/Reverter");

describe("Reverter", () => {
	const thisProjectRoot = path.resolve(
		path.join(path.dirname(__filename), "..")
	);
	const fixtureDir = path.join(thisProjectRoot, "fixture");
	const testBenchDir = path.join(thisProjectRoot, "testbench");

	const resetRepository = () => {
		const result = shelljs.exec("git reset --hard");
		if (result.code === 0) {
			return result.stdout;
		} else {
			throw new Error(result.stderr);
		}
	};

	const generics = {
		fixtureFilenames: null,
		beforeAll: fixtureName => {
			const chosenFixtureLocation = path.join(fixtureDir, fixtureName);
			const repoAtTestBench = path.join(
				testBenchDir,
				`${fixtureName}.git`
			);
			generics.repoAtTestBench = repoAtTestBench;

			process.chdir(repoAtTestBench);
			/* copy the shrinkwrap file containing changes from fixture directory into the repository to simulate changes */
			glob
				.sync(path.join(chosenFixtureLocation, "**", "*.changed.json"))
				.forEach(filename => {
					const sourceDirectoryBasename = path.basename(
						path.dirname(filename)
					);
					const cpResult = shelljs.cp(
						filename,
						path.join(
							repoAtTestBench,
							sourceDirectoryBasename,
							"npm-shrinkwrap.json"
						)
					);
					if (cpResult.code !== 0) {
						throw new Error(cpResult.stderr);
					}
				});

			generics.fixtureFilenames = glob.sync(
				path.join(".", "**", "npm-shrinkwrap.json")
			);

			reverter.init({
				protectablePackageNameMatcher: ".*omnichannel-.+",
				files: generics.fixtureFilenames
			});
		},
		beforeEach: () => {
			if (generics.stop) {
				throw new Error("Previous test failed, bailing.");
			}
		},
		afterAll: () => {
			resetRepository();
			generics.stop = false;
			generics.fixtureFilenames = null;
		},
		stop: false,
		bailOn: assert => {
			try {
				assert();
			} catch (e) {
				generics.stop = true;
				throw e;
			}
		}
	};

	const retrievesOriginalFilesFromGit = () => {
		const { bailOn, fixtureFilenames } = generics;
		reverter.retrieveOriginals();

		bailOn(() => {
			expect(_.keys(reverter.originalContents).length).toBeGreaterThan(0);
			expect(_.keys(reverter.originalContents).sort()).toEqual(
				fixtureFilenames.sort()
			);
			_.keys(reverter.originalContents).forEach(filename =>
				expect(reverter.originalContents[filename]).toBeTruthy()
			);
		});
	};

	describe("in basic course", () => {
		beforeAll(() => generics.beforeAll("51.3.48-to-51.3.49"));
		beforeEach(generics.beforeEach);
		afterAll(generics.afterAll);

		it("retrieves the original file from git", () => {
			retrievesOriginalFilesFromGit();
		});

		it("reverts unwanted changes", () => {
			let debugCases = 0;
			reverter.mergeOriginalWithChanges(debugData => {
				console.log("DEBUG CASE");
				++debugCases;
				console.log(debugData.data.packageName, debugData.message);
				console.log("original:", debugData.data.original);
				console.log("changed:", debugData.data.changed);
			});

			/* Q: what kind of assert? A: well, all changes should
			 * should Reverter have a 'getAcceptableChanges()' ?
			 * should we go down'n'dirty and look at its insides?
			 */
			console.log(`There were ${debugCases} debug cases`);
		});

		it("saves accepted changes", () => {
			const errors = [];
			reverter.saveAcceptedChanges(err => {
				errors.push(err);
				console.error(err);
			});
			expect(errors.length).toEqual(0);
		});

		it("puts accepted changes into place and deletes originals", () => {
			reverter.putAcceptedChangesIntoPlaceAndDeleteOriginals();

			/* TODO inspect the temporary files are gone and there are less changes now than before merge. */

			const accepted = JSON.parse(
				fs.readFileSync(generics.fixtureFilenames[0], {
					encoding: "utf-8"
				})
			);

			const primaryDependencyNames = Object.keys(accepted.dependencies);
			const primaryDependencyNamesSorted = _.clone(
				primaryDependencyNames
			).sort();
			expect(primaryDependencyNames).toEqual(
				primaryDependencyNamesSorted
			);

			const primaryDependencyNamesUnique = _.uniq(
				primaryDependencyNamesSorted
			);
			expect(primaryDependencyNamesUnique).toEqual(
				primaryDependencyNames
			);
		});
	});

	describe("with data that covers all cases", () => {
		beforeAll(() => generics.beforeAll("made-up"));
		beforeEach(generics.beforeEach);
		afterAll(generics.afterAll);

		it("retrieves the original file from git", () => {
			retrievesOriginalFilesFromGit();
		});

		it("reverts unwanted changes", () => {
			let debugCases = 0;
			reverter.mergeOriginalWithChanges(debugData => {
				console.log("DEBUG CASE");
				++debugCases;
				console.log(debugData.data.packageName, debugData.message);
				console.log("original:", debugData.data.original);
				console.log("changed:", debugData.data.changed);
			});

			console.log(`There were ${debugCases} debug cases`);
		});

		it("saves accepted changes", () => {
			const errors = [];
			reverter.saveAcceptedChanges(err => {
				errors.push(err);
				console.error(err);
			});
			expect(errors.length).toEqual(0);
		});

		it("puts accepted changes into place and deletes originals", () => {
			reverter.putAcceptedChangesIntoPlaceAndDeleteOriginals();

			/* inspect the changes are in specific places. */

			const accepted = JSON.parse(
				fs.readFileSync(generics.fixtureFilenames[0], {
					encoding: "utf-8"
				})
			);

			/* keep changed version of root package */
			expect(accepted.version).toEqual("51.3.49");

			/* keep changed 'requires' of root package */
			expect(accepted.requires).toEqual(true);

			/* protected packages */
			/* primary dependencies of original and changed differ -> keep changed */
			expect(
				accepted.dependencies["omnichannel-channel-utils"].version
			).toEqual("51.3.49");

			/* a package was removed */
			expect(
				accepted.dependencies["omnichannel-non-existent"]
			).toBeFalsy();

			/* a new package was added */
			expect(
				accepted.dependencies["omnichannel-non-existent2"]
			).toBeTruthy();

			/* requirements of original and changed differ ... */
			/* ... boolean <-> boolean => keep changed */
			expect(
				accepted.dependencies["omnichannel-channel-utils"].requires
			).toEqual(true);

			/* ... boolean <-> object => keep the changed */
			expect(
				Object.keys(
					accepted.dependencies["omnichannel-common-pos"].requires
				).length
			).toBeGreaterThan(0);

			/* ... object <-> object => keep the protected in changed, revert others */
			expect(
				Object.keys(
					accepted.dependencies["omnichannel-funny"].requires
				).sort()
			).toEqual([
				"alt",
				"alt-utils",
				"omnichannel-common-pos",
				"translations-utils"
			]);

			expect(
				accepted.dependencies["omnichannel-funny"].requires.alt
			).toEqual("0.18.5");
			expect(
				accepted.dependencies["omnichannel-funny"].requires["alt-utils"]
			).toEqual("1.0.0");
			expect(
				accepted.dependencies["omnichannel-funny"].requires[
					"omnichannel-common-pos"
				]
			).toEqual("51.3.49");
			expect(
				accepted.dependencies["omnichannel-funny"].requires[
					"translations-utils"
				]
			).toEqual("2.2.5");
			// expect(accepted.dependencies['omnichannel-funny'].requires['universal-cookie']).toEqual("2.1.2");

			/* ... something -> none => revert to original. ...or? */
			// expect(Object.keys(accepted.dependencies['omnichannel-styles'].requires).length).toBeGreaterThan(0);

			/* ... none -> something => keep changed */
			expect(
				accepted.dependencies["omnichannel-test-utils"].requires
			).toBeTruthy();

			/* ... else => keep changed ... what "else" ??? */

			/* secondary dependencies of original changed differ ... */
			/* ... something -> something => keep change */
			// expect(Object.keys(accepted.dependencies['omnichannel-consul-pos'].dependencies).sort()).toEqual(["omnichannel-test-utils", "uuid"]);
			expect(
				Object.keys(
					accepted.dependencies["omnichannel-consul-pos"].dependencies
				).sort()
			).toEqual(["lodash", "omnichannel-test-utils"]);

			/* ... none -> something => keep change */
			expect(
				Object.keys(
					accepted.dependencies["omnichannel-common-pos"].dependencies
				)
			).toBeTruthy();

			/* ... something -> none => keep change */
			expect(
				accepted.dependencies["omnichannel-cms"].dependencies
			).toBeFalsy();

			/* unprotected packages */
			/* primary dependencies of original and changed differ -> revert those of unprotected */
			expect(accepted.dependencies.abab.version).toEqual("1.0.4");
			expect(accepted.dependencies.abbrev).toBeTruthy();
			expect(accepted.dependencies.accepts).toBeFalsy();

			/* requirements of original and changed differ ... */
			/* ... boolean <-> boolean -> revert to original */
			expect(
				accepted.dependencies["acorn-dynamic-import"].requires
			).toEqual(true);

			/* ... boolean/object <-> boolean/object => revert to original */
			expect(accepted.dependencies["acorn-globals"].requires).toBeFalsy();

			/* ... object <-> object => revert to originals */
			expect(
				accepted.dependencies.ajv.requires["fast-deep-equal"]
			).toEqual("1.0.1");
			expect(
				accepted.dependencies.ajv.requires["json-schema-traverse"]
			).toEqual("0.3.1");
			expect(
				Object.keys(accepted.dependencies.ajv.requires).sort()
			).toEqual([
				"align-text",
				"co",
				"fast-deep-equal",
				"fast-json-stable-stringify",
				"json-schema-traverse"
			]);

			/* ... something -> none => revert to original */
			expect(accepted.dependencies["align-text"].requires).toBeTruthy();

			/* ... none -> something => revert to original */
			expect(accepted.dependencies["alphanum-sort"].requires).toBeFalsy();

			/* ... else => revert to original */
			/* what "else" ??? */

			/* secondary dependencies of original changed differ ... */
			/* ... something -> something => revert unprotected to original */
			expect(
				Object.keys(
					accepted.dependencies["babel-polyfill"].dependencies
				)
			).toEqual(["alt", "core-js", "regenerator-runtime"]);

			/* ... none -> something => revert unprotected to original */
			expect(
				accepted.dependencies["babel-runtime"].dependencies
			).toBeFalsy();

			/* ... something -> none => revert unprotected to original */
			expect(
				accepted.dependencies["babel-register"].dependencies
			).toBeTruthy();

			/* copy these to other tests */
			const primaryDependencyNames = Object.keys(accepted.dependencies);
			const primaryDependencyNamesSorted = _.clone(
				primaryDependencyNames
			).sort();
			expect(primaryDependencyNames).toEqual(
				primaryDependencyNamesSorted
			);

			const primaryDependencyNamesUnique = _.uniq(
				primaryDependencyNamesSorted
			);
			expect(primaryDependencyNamesUnique).toEqual(
				primaryDependencyNames
			);
		});
	});

	xdescribe("removes files", () => {
		beforeAll(() => {
			// reverter.init(
			// 	{
			// 		// bla bla
			// 	}
			// );
		});

		it("temporary file of final changes candidate file, after getting differences to original has failed", () => {
			throw new Error("Not implemented");
		});

		it("temporary file of final changes candidate file at end of verification", () => {
			throw new Error("Not implemented");
		});

		it("temporary file for original shrinkwrap content when retrieving original fails", () => {
			throw new Error("Not implemented");
		});

		it("temporary file for accepted changes after they have been copied into place", () => {
			throw new Error("Not implemented");
		});
	});
});
