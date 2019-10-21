const fs = require("fs");
const path = require("path");

export const writeFile = (object: any, fileName: string) => {
	fs.writeFileSync(
		__dirname + `/${fileName}`,
		JSON.stringify(object, null, 4),
		"utf-8",
		(err: any) => {
			if (err) {
				window.console.log("ERR", err);
			}
		}
	);
};

export const readFile = (fileName: string) => {

	const file = JSON.parse(
		fs.readFileSync(path.resolve(__dirname + `/${fileName}`))
	);
	return file;
};
