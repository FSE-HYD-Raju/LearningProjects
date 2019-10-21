const crawler = require("npm-license-crawler");
const options = {
	start: ["."],
	json: "./list_dependencies.json",
	unknown: false
};

crawler.dumpLicenses(options, error => {
	if (error) {
		console.error("Error:", error);
	}
});
