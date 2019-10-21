const path = require("path");
const fs = require("fs");

const COMMIT_INFO = getCommitInfoFromProcess();

console.log("COMMIT_INFO: ", COMMIT_INFO || "not defined");

if (COMMIT_INFO) {
	fs.readdirSync("./packages")
		.filter((folder) => folder.match("omnichannel"))
		.forEach((folder) => {
			const filePath = path.resolve(__dirname, "packages", folder, "./package.json");
			const packageJson = fs.readFileSync(filePath);

			if (packageJson) {
				const pkg = JSON.parse(packageJson);
				pkg.commitInfo = COMMIT_INFO;
				writeInfo(filePath, pkg);
			}
		});
}

function writeInfo(filePath, pkg) {
	fs.writeFile(filePath, JSON.stringify(pkg, null, "\t"), (err) => {
		if (err) {
			console.log("Write ERROR:", pkg.name, err);
		}
	});
}

function getCommitInfoFromProcess() {
	if (process.env.CMN_COMMIT_INFO) {
		return process.env.CMN_COMMIT_INFO;
	}

	const infoArg = process.argv.find((arg) => arg.match("CMN_COMMIT_INFO"));
	return infoArg ? infoArg.split("=")[1] : null;
}
