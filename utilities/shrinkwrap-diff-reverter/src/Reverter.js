const fs = require("fs");
const _ = require("lodash");
const shelljs = require("shelljs");
const detectIndent = require("detect-indent");
const tmp = require("tmp");
const validatePackageName = require("validate-npm-package-name");
const isValidPackageName = name =>
	validatePackageName(name).validForNewPackages;

const defaultIndentationWidth = 2;

const mergeElements = (original, changed, merged) => {
	const packageNames = _.uniq(
		(original ? Object.keys(original) : []).concat(
			changed ? Object.keys(changed) : []
		)
	).sort();

	packageNames.forEach(packageName => {
		if (_.get(original, packageName) && _.get(changed, packageName)) {
			if (reverter.isProtectablePackage(packageName)) {
				merged[packageName] = changed[packageName];
			} else {
				merged[packageName] = original[packageName];
			}
		} else if (
			_.get(original, packageName) &&
			!_.get(changed, packageName) &&
			!reverter.isProtectablePackage(packageName)
		) {
			merged[packageName] = original[packageName];
		} else if (
			!_.get(original, packageName) &&
			_.get(changed, packageName) &&
			reverter.isProtectablePackage(packageName)
		) {
			merged[packageName] = changed[packageName];
		}
	});
};

const mergeOriginalAndChangedChildDependencies = (
	original,
	changed,
	mergedContents
) => {
	if (!mergedContents.dependencies) mergedContents.dependencies = {};

	mergeElements(
		original.dependencies,
		changed.dependencies,
		mergedContents.dependencies
	);

	if (_.isEmpty(mergedContents.dependencies)) {
		delete mergedContents.dependencies;
	}
};

const getDifferenceReportBetweenFiles = (a, b) => {
	if (!fs.existsSync(a)) {
		throw new Error(`File ${a} does not exist!`);
	}
	if (!fs.existsSync(b)) {
		throw new Error(`File ${b} does not exist!`);
	}
	const result = shelljs.exec(`diff -ruN ${a} ${b}`, { silent: true });

	if (result.code <= 1) {
		return result.stdout.split("\n");
	} else {
		throw new Error(result.stderr);
	}
};

/* perhaps can be used when shelljs can pipe data properly */
// const getDifferenceReportBetweenFileAndString = (filename, string) => {
// 	console.log("get differences between", path.basename(filename), "and string of length", string.length);
// 	// const result = shelljs.exec(`diff -ruN ${a} ${b}`, { silent: true });
// 	// const result = shelljs.echo("bar").exec("diff -ruN /Users/jkansala/fot -");
// 	// const result = shelljs.exec(`diff -ruN ${filename} -`).echo(string);
// 	const result = shelljs.echo(string).exec(`diff -ruN ${filename} -`);
// 	// const result = {code: 0, stdout: ""};

// 	if (result.code <= 1) {
// 		return result.stdout.split("\n");
// 	} else {
// 		throw new Error(result.stderr);
// 	}
// };

const getDifferencesFromReport = reportLines =>
	reportLines.filter(
		(line, row) => row >= 2 && line.match(/^(\+{3}|\-{3})\s+.+/) === null
	);

const replaceAll = (string, transformer) => {
	const exchange = {};
	const changed = transformer(string, exchange);
	const { after } = exchange;
	return changed ? replaceAll(after, transformer) : after;
};

const unescapeOnce = string => string.replace("\\", "");

const refineBeginning = string => string.replace(/^[^a-z0-9]/, "");

const refineEnd = string => string.replace(/[^a-z0-9]$/, "");

const refineFromEnds = string => refineBeginning(refineEnd(string));

const replaceAndReport = (string, replacer, exchange) => {
	const after = replacer(string);
	const changed = string !== after;
	exchange.after = after;
	return changed;
};

const unescapeAll = string =>
	replaceAll(string, (string, exchange) =>
		replaceAndReport(string, unescapeOnce, exchange)
	);

const refineEnds = string =>
	replaceAll(string, (string, exchange) =>
		replaceAndReport(string, refineFromEnds, exchange)
	);

const collectValidPackageNamesFromProtectionPattern = pattern => {
	const strippedOfSlashesAtEnds = pattern
		.toString()
		.replace(/^\//, "")
		.replace(/\/$/, "");

	const parts = strippedOfSlashesAtEnds.split("|");
	const names = parts.map(part => _.flow([unescapeAll, refineEnds])(part));

	return names.filter(isValidPackageName);
};

const mergePrimaryDependencies = (
	packageName,
	originalPkgData,
	changedPkgData,
	mergedContents,
	debugCallback
) => {
	if (_.isEqual(originalPkgData, changedPkgData)) {
		mergedContents.dependencies[packageName] = originalPkgData;
		return true;
	} else if (originalPkgData && changedPkgData) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedContents.dependencies[packageName] = changedPkgData;
			mergeOriginalAndChangedChildDependencies(
				originalPkgData,
				changedPkgData,
				mergedContents
			);
			return false;
		} else {
			mergedContents.dependencies[packageName] = originalPkgData;
			return true;
		}
	} else if (originalPkgData && !changedPkgData) {
		if (reverter.isProtectablePackage(packageName)) {
			/* don't revert to original. */
			return false;
		} else {
			mergedContents.dependencies[packageName] = originalPkgData;
			return true;
		}
	} else if (!originalPkgData && changedPkgData) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedContents.dependencies[packageName] = changedPkgData;
			return false;
		} else {
			// delete changedContents.dependencies[packageName];
			return true;
		}
	} else {
		/* weird, can this happen ? */
		debugCallback &&
			debugCallback({
				message:
					"COVER neither original or changed had dependencies yet were found unequal..",
				data: {
					packageName,
					original: originalPkgData,
					changed: changedPkgData
				}
			});
		/* TODO I guess it's safe to put the 'changed' to merged when package is protectable. */
		if (reverter.isProtectablePackage(packageName)) {
			mergedContents.dependencies[packageName] = changedPkgData;
			return false;
		} else {
			mergedContents.dependencies[packageName] = originalPkgData;
			return true;
		}
	}
};

const mergeRequirements = (
	packageName,
	originalPkgData,
	changedPkgData,
	mergedPkgData,
	debugCallback
) => {
	const originalRequirements = originalPkgData
		? originalPkgData.requires
		: undefined;
	const changedRequirements = changedPkgData
		? changedPkgData.requires
		: undefined;

	if (
		typeof originalRequirements === "boolean" &&
		typeof changedRequirements === "boolean"
	) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedPkgData.requires = changedPkgData.requires;
		} else {
			mergedPkgData.requires = originalPkgData.requires;
		}
	} else if (
		(typeof originalRequirements === "object" &&
			typeof changedRequirements === "boolean") ||
		(typeof originalRequirements === "boolean" &&
			typeof changedRequirements === "object")
	) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedPkgData.requires = changedPkgData.requires;
		} else {
			mergedPkgData.requires = originalPkgData.requires;
		}
	} else if (
		typeof originalRequirements === "object" &&
		typeof changedRequirements === "object"
	) {
		/* revert changes to all but named packages  */
		mergeRequirementPackagesVersions(
			originalRequirements,
			changedRequirements,
			mergedPkgData.requires
		);
	} else if (originalRequirements && !changedRequirements) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedPkgData.requires = originalRequirements;
		} else {
			// delete changedPkgData["requires"];
			// changedPkgData.requires = originalRequirements;
		}
	} else if (!originalRequirements && changedRequirements) {
		if (reverter.isProtectablePackage(packageName)) {
			mergedPkgData.requires = changedRequirements;
		} else {
			// delete changedPkgData["requires"];
		}
	} else {
		debugCallback &&
			debugCallback({
				message:
					"COVER both original and changed 'requires' are of an unexpected type. what to do ?",
				data: {
					packageName,
					original: originalRequirements,
					changed: changedRequirements
				}
			});
		/* warn about this case with enough information. */
		if (reverter.isProtectablePackage(packageName)) {
			mergedPkgData.requires = changedPkgData.requires;
		} else {
			mergedPkgData.requires = originalPkgData.requires;
		}
	}
};

const collectPackageNames = (...objects) => _.flatten(objects.map(Object.keys));

const mergeRequirementPackagesVersions = (originals, changes, merges) => {
	const packageNames = collectPackageNames(originals, changes);

	packageNames.forEach(packageName => {
		if (packageName in originals && packageName in changes) {
			if (reverter.isProtectablePackage(packageName)) {
				merges[packageName] = changes[packageName];
			} else {
				merges[packageName] = originals[packageName];
			}
		} else if (packageName in originals && !(packageName in changes)) {
			if (reverter.isProtectablePackage(packageName)) {
				merges[packageName] = changes[packageName];
			} else {
				// merges[packageName] = originals[packageName];
			}
		} else if (!(packageName in originals) && packageName in changes) {
			if (reverter.isProtectablePackage(packageName)) {
				merges[packageName] = changes[packageName];
			} else {
				// merges[packageName] = originals[packageName];
			}
		}
	});
};

const mergeSecondaryDependencies = (
	packageName,
	originalChildDependencies,
	changedChildDependencies,
	mergedPkgData
) => {
	if (originalChildDependencies && changedChildDependencies) {
		mergeOriginalAndChangedChildDependencies(
			originalChildDependencies,
			changedChildDependencies,
			mergedPkgData
		);
	} else if (!originalChildDependencies && changedChildDependencies) {
		if (reverter.isProtectablePackage(packageName)) {
			/* dependencies of a protectable package -> iterate */
			mergedPkgData.dependencies = changedChildDependencies;
		} else {
			/* not dependencies of a protectable package -> revert change */
			// delete changedPkgData.dependencies;
		}
	} else if (originalChildDependencies && !changedChildDependencies) {
		if (reverter.isProtectablePackage(packageName)) {
			/* dependencies of a protectable package -> don't accept change */
		} else {
			mergedPkgData.dependencies = originalChildDependencies;
		}
	} else {
		/* no dependencies? nothing to be done! */
	}
};

class Reverter {
	init(configuration) {
		this.configuration = configuration;
		this.sourceFilenames = this.configuration.files || [];

		this.protectablePackageNames = collectValidPackageNamesFromProtectionPattern(
			this.configuration.protectablePackageNameMatcher
		);

		this.collectedProtectablePackageNames = [];

		this.indentation = {};
	}

	isProtectablePackage(packageName) {
		return (
			packageName.match(
				this.configuration.protectablePackageNameMatcher
			) !== null
		);
	}

	/* Step 1
	 * Retrieve the original file from git
	 */
	retrieveOriginal(sourceFilename = "npm-shrinkwrap.json") {
		const tmpFile = tmp.fileSync();
		const result = shelljs
			.exec(`git show HEAD:${sourceFilename} > ${tmpFile.name}`, {
				silent: true
			})
			.cat(tmpFile.name);

		if (result.code === 0) {
			this.tempFilesForOriginalContents[sourceFilename] = tmpFile;
			return result.stdout;
		} else {
			tmpFile.removeCallback();
			throw new Error(result.stderr);
		}
	}

	retrieveOriginals(errCallback) {
		this.originalContents = {};
		/* only initialize this variable here. */
		this.tempFilesForOriginalContents = {};

		this.configuration.files.forEach(sourceFilename => {
			try {
				this.originalContents[sourceFilename] = this.retrieveOriginal(
					sourceFilename
				);
			} catch (e) {
				errCallback && errCallback(e);
			}
		});
	}

	/**
	 * Step 2
	 * Original being the one without any changes.
	 */
	mergeOriginalWithChanges(debugCallback) {
		this.acceptedChanges = {};

		this.configuration.files.forEach(sourceFilename => {
			const originalFileContents = this.originalContents[sourceFilename];

			this.indentation[sourceFilename] =
				detectIndent(originalFileContents).indent ||
				defaultIndentationWidth;

			const originalContents = JSON.parse(originalFileContents);

			const changedContents = JSON.parse(
				fs.readFileSync(sourceFilename, { encoding: "utf8" })
			);

			const mergedContents = _.merge(
				_.omit(changedContents, "dependencies"),
				{ dependencies: {} }
			);

			/* the package names are keys in the 'dependencies' block at root level and are in alphabetical order --
			 * but can we always trust that ?
			 * if not, we probably have to make a json object <-> line diff block mapping. jeez.
			 */
			const packageNamesInDependencies = _.uniq(
				collectPackageNames(
					originalContents.dependencies,
					changedContents.dependencies
				)
			).sort();

			this.collectedProtectablePackageNames.push(originalContents.name);
			packageNamesInDependencies
				.filter(a => this.isProtectablePackage(a))
				.forEach(a => this.collectedProtectablePackageNames.push(a));

			packageNamesInDependencies.forEach(packageName => {
				/* NOTE root-level 'requires' is covered at
				 *	const mergedContents = _.merge(
				 * above.
				 */

				const originalPkgData =
					originalContents.dependencies[packageName];
				const changedPkgData =
					changedContents.dependencies[packageName];

				if (
					mergePrimaryDependencies(
						packageName,
						originalPkgData,
						changedPkgData,
						mergedContents,
						debugCallback
					)
				) {
					/* return on revert. */
					return;
				}

				const mergedPkgData = mergedContents.dependencies[packageName];

				if (
					_.get(originalPkgData, "requires") &&
					_.get(changedPkgData, "requires") &&
					mergedPkgData
				) {
					mergeRequirements(
						packageName,
						originalPkgData,
						changedPkgData,
						mergedPkgData,
						debugCallback
					);
				}

				if (
					!_.isEqual(
						_.get(originalPkgData, "dependencies"),
						_.get(changedPkgData, "dependencies")
					)
				) {
					mergeSecondaryDependencies(
						packageName,
						originalPkgData.dependencies,
						changedPkgData.dependencies,
						mergedPkgData,
						debugCallback
					);
				}
			});

			/* sort the dependencies alphabetically. this is probably the wrong place to fix a bug. */
			const primaryDependencyNames = Object.keys(
				mergedContents.dependencies
			).sort();
			const primaryDependencies = {};
			primaryDependencyNames.forEach(packageName => {
				primaryDependencies[packageName] =
					mergedContents.dependencies[packageName];
			});
			mergedContents.dependencies = primaryDependencies;

			this.acceptedChanges[sourceFilename] = mergedContents;
		});
	}

	/* Step 3 */
	saveAcceptedChanges(errCallback) {
		this.tempFilesForAcceptedChanges = {};

		this.configuration.files.forEach(filename => {
			const indentationWidth = this.indentation[filename];
			const tmpFile = tmp.fileSync();

			try {
				fs.writeFileSync(
					tmpFile.name,
					JSON.stringify(
						this.acceptedChanges[filename],
						null,
						indentationWidth
					) + "\n",
					{ encoding: "utf-8" }
				);
				this.tempFilesForAcceptedChanges[filename] = tmpFile;
			} catch (e) {
				errCallback && errCallback(e);
			}
			// tmpFile.removeCallback(); /* a brainfart to enable */
		});
	}

	/* Step 4 */
	verifyChanges(errCallback) {
		const differencesBySourceFilename = {};
		this.verificationErrorsBySourceFilename = {};
		this.finalChangesBySourceFilename = {};

		const looksLikeKeyValuePair = line => {
			const match = line.match(/([^~*()! '"]+)[^\w]+\:(.*)/);
			return match !== null ? [match[1], match[2]] : null;
		};

		this.configuration.files.forEach(sourceFilename => {
			const errors = [];

			const originalFilename = this.tempFilesForOriginalContents[
				sourceFilename
			].name;
			const finalChangesFile = this.tempFilesForAcceptedChanges[
				sourceFilename
			];

			try {
				const differenceReport = getDifferenceReportBetweenFiles(
					originalFilename,
					finalChangesFile.name
				);

				differencesBySourceFilename[
					sourceFilename
				] = getDifferencesFromReport(differenceReport);
			} catch (e) {
				errCallback && errCallback(e);
				finalChangesFile.removeCallback();
				return;
			}

			this.finalChangesBySourceFilename[sourceFilename] =
				differencesBySourceFilename[sourceFilename].length;
			if (differencesBySourceFilename[sourceFilename].length === 0) {
				// console.log(
				// 	`No differences between original (${originalFilename}) and final (${finalChangesFile.name})`
				// );
				return;
			}

			differencesBySourceFilename[sourceFilename].forEach((line, idx) => {
				if (line.match(/^@@\s.+/) !== null) {
					/* skip. */
					return;
				}

				const snipLength = 3;
				const snipStart = idx >= snipLength ? idx - snipLength : 0;
				const lineCount =
					differencesBySourceFilename[sourceFilename].length;
				const snipEnd =
					idx + snipLength >= lineCount
						? lineCount
						: idx + snipLength;

				// let containedProtectable = null;
				const lineContainsAProtectable = this.collectedProtectablePackageNames.some(
					packageName => {
						const t = line.includes(packageName);
						// if (t) containedProtectable = packageName;
						return t;
					}
				);

				if (lineContainsAProtectable) {
					/* protectable packages must match */
					const possibleKeyValuePair = looksLikeKeyValuePair(line);

					if (line.match(/^[\+\-]\s+/) !== null) {
						if (possibleKeyValuePair) {
							if (
								this.collectedProtectablePackageNames.includes(
									possibleKeyValuePair[0]
								)
							) {
								/* in default test data this is fine */
								errCallback &&
									errCallback({
										message:
											"Possible verification failure on a protectable (1a)",
										level: "possible",
										filename: sourceFilename,
										lineIndex: idx,
										line
									});
							} else {
								errCallback &&
									errCallback({
										message:
											"Possible verification failure on a protectable (1b)",
										level: "possible",
										filename: sourceFilename,
										lineIndex: idx,
										line
									});
							}
						} else {
							// console.log(
							// 	"possibleKeyValuePair",
							// 	possibleKeyValuePair,
							// 	"line",
							// 	line
							// );
						}
					} else if (possibleKeyValuePair) {
						if (
							this.collectedProtectablePackageNames.includes(
								possibleKeyValuePair[0]
							)
						) {
							/* in default test data this is fine */
							// errCallback &&
							// 	errCallback({
							// 		message:
							// 			"Possible verification failure on a protectable (2a)",
							// 		filename: sourceFilename,
							// 		lineIndex: idx,
							// 		line
							// 	});
						} else {
							/* Not an error.
								 * Example: "name": "omnichannel-b2c"
								 */
							errCallback &&
								errCallback({
									message:
										"Possible verification failure on a protectable (2b)",
									level: "possible",
									filename: sourceFilename,
									lineIndex: idx,
									line
								});
						}
					} else {
						errCallback &&
							errCallback({
								message:
									"Possible verification failure on a protectable (3)",
								level: "possible",
								filename: sourceFilename,
								lineIndex: idx,
								line
							});
					}
				} else if (line.match(/^[\+\-]\s+/) !== null) {
					/* external packages must not match */
					const possibleKeyValuePair = looksLikeKeyValuePair(line);
					if (possibleKeyValuePair) {
						if (
							this.collectedProtectablePackageNames.includes(
								possibleKeyValuePair[0]
							)
						) {
							errCallback &&
								errCallback({
									message:
										"Possible verification failure on a protectable (4a)",
									level: "possible",
									filename: sourceFilename,
									lineIndex: idx,
									line
								});
						} else {
							// console.log(
							// 	"possibleKeyValuePair",
							// 	possibleKeyValuePair,
							// 	"line",
							// 	line
							// );
							errCallback &&
								errCallback({
									message:
										"Possible verification failure on a protectable (4b)",
									level: "possible",
									filename: sourceFilename,
									lineIndex: idx,
									line
								});
						}
					} else if (line.match(/[\w\d]+/) !== null) {
						errCallback &&
							errCallback({
								message:
									"Possible verification failure on a protectable (5)",
								level: "possible",
								filename: sourceFilename,
								lineIndex: idx,
								line,
								context: differencesBySourceFilename[
									sourceFilename
								].slice(snipStart, snipEnd)
							});
					}
				}
			});

			this.verificationErrorsBySourceFilename[sourceFilename] = errors;
			if (errors.length > 0) {
				finalChangesFile.removeCallback();
			}
		});
	}

	getStatistics() {
		const statistics = {};

		this.configuration.files.forEach(sourceFilename => {
			statistics[sourceFilename].changesCount = this
				.finalChangesBySourceFilename
				? this.finalChangesBySourceFilename[sourceFilename]
				: null;

			statistics[sourceFilename].verificationErrorCount = this
				.verificationErrorsBySourceFilename
				? this.verificationErrorsBySourceFilename[sourceFilename].length
				: null;
		});

		return statistics;
	}

	getFilenamesWithNoChanges() {
		return this.configuration.files.filter(sourceFilename => {
			const count = this.finalChangesBySourceFilename
				? this.finalChangesBySourceFilename[sourceFilename]
				: null;
			return isNaN(count) ? false : count === 0;
		});
	}

	getFilenamesWithVerificationErrors() {
		return this.configuration.files.filter(sourceFilename => {
			const count = _.get(
				this.verificationErrorsBySourceFilename,
				sourceFilename
			)
				? this.verificationErrorsBySourceFilename[sourceFilename].length
				: null;
			return isNaN(count) ? false : count > 0;
		});
	}

	putAcceptedChangesIntoPlaceAndDeleteOriginals() {
		this.configuration.files.forEach(sourceFilename => {
			const finalChangesFile = this.tempFilesForAcceptedChanges[
				sourceFilename
			];
			shelljs.cp(finalChangesFile.name, sourceFilename);
			finalChangesFile.removeCallback();

			this.tempFilesForOriginalContents[sourceFilename].removeCallback();
		});
	}

	/**
	 * Execute all steps of The Process.
	 */
	run() {
		this.retrieveOriginals();

		this.mergeOriginalWithChanges(debugData => {
			console.log(debugData.data.packageName, debugData.message);
			console.log("original:", debugData.data.original);
			console.log("changed:", debugData.data.changed);
		});

		const errorsOnSave = [];
		this.saveAcceptedChanges(err => errorsOnSave.push(err));
		if (errorsOnSave.length > 0) {
			errorsOnSave.forEach(err =>
				console.error("Error saving changes:", err)
			);
			throw new Error("Failed to save changes to file(s)");
		}

		this.verifyChanges();

		this.putAcceptedChangesIntoPlaceAndDeleteOriginals();
	}
}

const reverter = new Reverter();

export default reverter;
