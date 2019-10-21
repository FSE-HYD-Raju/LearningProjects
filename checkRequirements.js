const semver = require("semver");
const pkg = require("./package.json");

const node = pkg.engines.node;
if (!semver.satisfies(process.version, node)) {
	console.error(
		`Required NODE version ${node} not satisfied with current version ${process.version}.`
	);
	process.exit(1);
}

const npm = pkg.engines.npm;
if (!semver.satisfies(process.version, npm)) {
	console.error(
		`Required NPM version ${npm} not satisfied with current version ${process.version}.`
	);
	process.exit(1);
}
