const fs = require("fs");
const dependencies = require("./list_dependencies.json");

const uniqueLicenses = new Set();
Object.entries(dependencies).forEach(([key, value]) => {
	uniqueLicenses.add(value.licenses);
});

fs.writeFile(
	"./list_licenses.json",
	JSON.stringify(Array.from(uniqueLicenses)),
	"utf8",
	e => {
		console.error("error to write result", e);
	}
);
