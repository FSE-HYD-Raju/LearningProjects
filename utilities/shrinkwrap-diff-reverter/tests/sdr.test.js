const path = require("path");
const glob = require("glob");
const shelljs = require("shelljs");

describe("sdr", () => {
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
		repoAtTestBench: null,
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
					/* only for debugging/testing */
					// shelljs.cp(
					// 	filename,
					// 	path.join(
					// 		repoAtTestBench,
					// 		sourceDirectoryBasename,
					// 		"npm-shrinkwrap.changed.json"
					// 	)
					// );
				});

			generics.fixtureFilenames = glob.sync(
				path.join(".", "**", "npm-shrinkwrap.json")
			);
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

	const getGitStatus = () => {
		const result = shelljs.exec("git status -s");
		if (result.code === 0) {
			const others = [];
			const modifications = result.stdout
				.split("\n")
				.map(line => {
					const match = line.match(/^\s+M\s+(.+)/);

					if (match === null) {
						others.push(line);
						return match;
					} else {
						return match[1];
					}
				})
				.filter(line => line !== null);
			return {
				modifications,
				others
			};
		} else {
			throw new Error(result.stderr);
		}
	};

	describe("with one real-life file", () => {
		beforeAll(() => generics.beforeAll("51.3.48-to-51.3.49"));
		beforeEach(generics.beforeEach);
		afterAll(generics.afterAll);

		it("modifies it and does not leave other, tailing files", () => {
			const runResult = shelljs.exec(
				path.join(thisProjectRoot, "bin", "sdr.sh") +
					" .*omnichannel.+ ./channels/**/npm-shrinkwrap.json"
			);
			expect(runResult.code).toEqual(0);

			const gitStatus = getGitStatus();

			expect(gitStatus.modifications.sort()).toEqual(
				generics.fixtureFilenames.sort()
			);
			expect(gitStatus.others.filter(line => line !== "").length).toEqual(
				0
			);
		});
	});

	describe("with three real-life files", () => {
		beforeAll(() => generics.beforeAll("56.2.1-to-56.2.2"));
		beforeEach(generics.beforeEach);
		afterAll(generics.afterAll);

		it("modifies them and does not leave other, tailing files", () => {
			const runResult = shelljs.exec(
				path.join(thisProjectRoot, "bin", "sdr.sh") +
					" .*omnichannel.+ ./channels/**/npm-shrinkwrap.json"
			);
			expect(runResult.code).toEqual(0);

			const gitStatus = getGitStatus();

			expect(gitStatus.modifications.sort()).toEqual(
				generics.fixtureFilenames.sort()
			);
			expect(gitStatus.others.filter(line => line !== "").length).toEqual(
				0
			);
		});
	});

	describe("with two real-life files", () => {
		beforeAll(() => generics.beforeAll("only-one-changes"));
		beforeEach(generics.beforeEach);
		afterAll(generics.afterAll);

		it("modifies one and reverts changes to the other", () => {
			const cliResult = shelljs.exec(
				path.join(thisProjectRoot, "bin", "sdr.sh") +
					" .*omnichannel.+ './**/npm-shrinkwrap.json'"
			);
			expect(cliResult.code).toEqual(0);

			const gitStatus = getGitStatus();

			expect(gitStatus.modifications).toEqual([
				"omnichannel-b2c/npm-shrinkwrap.json"
			]);

			expect(gitStatus.modifications).not.toContain(
				"omnichannel-pos/npm-shrinkwrap.json"
			);
			expect(gitStatus.others).not.toContain(
				"omnichannel-pos/npm-shrinkwrap.json"
			);

			expect(cliResult.stdout.toLowerCase()).not.toContain(
				"omnichannel-pos/npm-shrinkwrap.json".toLowerCase()
			);
			expect(cliResult.stderr.toLowerCase()).not.toContain(
				"omnichannel-pos/npm-shrinkwrap.json".toLowerCase()
			);

			expect(
				gitStatus.others.filter(
					line => line !== "" && line !== "?? junit.xml"
				).length
			).toEqual(0);
		});
	});

	xdescribe("aborts", () => {
		it("when saving accepted changes of any file fails", () => {
			throw new Error("Not implemented");
		});
	});
});
