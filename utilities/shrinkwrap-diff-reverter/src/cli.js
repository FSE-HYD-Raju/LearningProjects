const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const shelljs = require("shelljs");
const minimatch = require("minimatch");

const _print = (stdout, data) => {
	stdout.write(data);
};

const _err = (stderr, data) => {
	stderr.write(data);
};

const getProgramName = argv => path.basename(argv[1]);

const configurationFilename = ".sdrrc";

const grabArguments = argv => (argv.length > 2 ? argv.slice(2) : null);

const _loadConfiguration = (destination, _location, errorCallback) => {
	const location = _location || process.cwd();
	const locationStat = fs.statSync(location);
	const configurationFileLocation = locationStat.isDirectory()
		? path.join(location, configurationFilename)
		: location;

	const original = _.clone(destination);

	try {
		const contents = fs.readFileSync(configurationFileLocation, {
			encoding: "utf8"
		});
		const asJson = JSON.parse(contents);
		_.assign(destination, asJson);
		return !_.isEqual(original, destination);
	} catch (e) {
		if (errorCallback) {
			errorCallback(e);
		}

		return false;
	}
};

const getModifiedFiles = () => {
	const result = shelljs.exec("git status -s");
	if (result.code === 0) {
		const modifications = result.stdout
			.split("\n")
			.map(line => {
				const match = line.match(/^\s+M\s+(.+)/);

				if (match === null) {
					return match;
				} else {
					return match[1];
				}
			})
			.filter(line => line !== null);
		return modifications;
	} else {
		throw new Error(result.stderr);
	}
};

const findFiles = exclusionPattern =>
	getModifiedFiles().filter(
		minimatch.filter(exclusionPattern, {
			matchBase: false,
			debug: false,
			negate: false
		})
	);

const cli = (process, done) => {
	process.stdin.on("end", done);

	const print = data => {
		_print(process.stdout, data);
	};

	const err = data => {
		_err(process.stderr, data);
	};

	const reverter = require("./Reverter");

	const loadConfiguration = (destination, directory) => {
		return _loadConfiguration(
			destination,
			directory,
			isVerbose ? err : () => {}
		);
	};

	process.on("uncaughtException", err => {
		console.error("An error was thrown and not caught.");
		console.error(err);
		return done(255);
	});

	const args = grabArguments(process.argv);
	const program = getProgramName(process.argv);

	const isVerbose = args && args.indexOf("-v") >= 0;
	if (isVerbose) {
		args.shift();
	}
	const helpRequested = args && args.indexOf("-h") >= 0;

	const configuration = {
		protectablePackageNameMatcher: args ? args[0] : "",
		files: null
	};

	const configurationLoaded = loadConfiguration(configuration);

	const printUsage = helpRequested || (!configurationLoaded && !args);

	if (printUsage) {
		print(
			`Usage: ${program} [-h] [-v] [protectable package name RegExp pattern]\n`
		);
	} else if (configurationLoaded || args) {
		if (args) {
			configuration.protectablePackageNameMatcher = args[0];
		}

		configuration.files = findFiles("!**/node_modules/**");
		if (configuration.files.length === 0) {
			print("Could not find any modified shrinkwrap files to process.\n");
			return done(0);
		}

		reverter.init(configuration);
		try {
			reverter.run();
		} catch (e) {
			console.error(e);
			return done(1);
		}

		const modifiedFiles = getModifiedFiles();
		if (modifiedFiles.length > 0) {
			print(
				`File(s) ${modifiedFiles
					.sort()
					.join(", ")} now have accepted changes only.\n`
			);
		} else {
			print("All changes to shrinkwrap files were reverted.\n");
		}

		const filesWithNoChanges = reverter.getFilenamesWithNoChanges();
		if (filesWithNoChanges.length > 0) {
			print(
				`All changes to files ${filesWithNoChanges.join(
					", "
				)} were reverted.`
			);
		}

		const filesFailedAtVerification = reverter.getFilenamesWithVerificationErrors();
		if (filesFailedAtVerification.length > 0) {
			err(
				`Files ${filesFailedAtVerification.join(
					", "
				)} failed at verification. You have to revert changes to them by hand.`
			);
		}
	}

	return done(0);
};

export default cli;

export { _loadConfiguration as loadConfiguration, findFiles };
