/* tslint:disable:no-console*/
const fs = require("fs");
const path = require("path");
const exclude: Array<string> = [];
const duplicationCheck: Array<string> = [];
const duplicates: Array<string> = [];
const TEST_INTERFACES = process.env.FAIL_IF_RESULT_IS_CHANGED === "true";
const LOG_ENABLED = !TEST_INTERFACES;

/*
Black        0;30     Dark Gray     1;30
Red          0;31     Light Red     1;31
Green        0;32     Light Green   1;32
Brown/Orange 0;33     Yellow        1;33
Blue         0;34     Light Blue    1;34
Purple       0;35     Light Purple  1;35
Cyan         0;36     Light Cyan    1;36
Light Gray   0;37     White         1;37
 */

// Wraps provided key in quotations if needed (i.e. it contains a dash)
function getFormattedKey(key: string) {
	return key.indexOf("-") >= 0 ? `"${key}"` : key;
}

function buildInterface(name: string, messages: any) {
	let result = "/* tslint:disable:max-line-length */\n";
	result += 'import { defineMessages, FormattedMessage } from "react-intl";\n\n';
	result += "// Interface has been generated automatically. Please do not edit manually.\n";
	result += "// For changes run in console: npm run rebuild-messages-interfaces\n";
	result += `interface ${name}MessagesType {\n`;
	const keys = Object.keys(messages).sort();
	for (let i = 0; i < keys.length; i++) {
		if (duplicationCheck.indexOf(messages[keys[i]].id) > -1) {
			duplicates.push(messages[keys[i]].id);
		} else {
			duplicationCheck.push(messages[keys[i]].id);
		}
		result += `\t${getFormattedKey(keys[i])}: FormattedMessage.MessageDescriptor;\n`;
	}
	result += "}\n";

	result += `const ${name}Messages: ${name}MessagesType = defineMessages({\n`;

	for (let i = 0; i < keys.length; i++) {
		result += `\t${getFormattedKey(keys[i])}: {\n`;
		result += `\t\tid: "${messages[keys[i]].id}",\n`;
		if (messages[keys[i]].description) {
			result += `\t\tdescription: "${messages[keys[i]].description.replace(/\\([\s\S])|(")/g, '\\"').replace(/\n/g, "\\n")}",\n`;
		}
		if (messages[keys[i]].defaultMessage) {
			result += `\t\tdefaultMessage: "${messages[keys[i]].defaultMessage.replace(/\\([\s\S])|(")/g, '\\"').replace(/\n/g, "\\n")}"\n`;
		}

		result += "\t},\n";
	}

	result += "});\n" + "\n" + `export default ${name}Messages;\n` + `export { ${name}Messages, ${name}MessagesType };\n`;

	return result;
}

function getInterface(filename: string): void {
	if (exclude.indexOf(filename) > -1) {
		return;
	}
	const fileName = `./${filename}`;
	const originalFileContent = fs.readFileSync(fileName, "utf8");
	const { default: messages } = require(fileName);
	const name = filename.match(/\/([a-zA-Z0-9]*).messages\.ts/);

	if (!name) {
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! ERROR: NAME DID NOT MATCH !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		return;
	}
	const cleanedName = name[1].charAt(0).toUpperCase() + name[1].slice(1);
	const generatedInterface = buildInterface(cleanedName, messages);

	if (LOG_ENABLED) {
		console.log(cleanedName);
		console.log("-- Interface for messages: ");
		console.log();
		console.log(generatedInterface);
		console.log("");
		console.log("---------------------");
	}

	if (TEST_INTERFACES) {
		if (originalFileContent !== generatedInterface) {
			const output = `\033[1;31mERR! Generated message interface for ${fileName} resulted in an unxpected change. Run 'npm run rebuild-messages-interfaces' to fix your local messages files.\033[0m`;
			console.log(output);
			throw new Error(output);
		}
	} else {
		fs.writeFileSync(filename, generatedInterface, (err: any) => {
			if (err) {
				return console.log(err);
			}

			console.log("The file \033[1;35m" + filename + "\033[0m was saved!");
		});
	}
}

function fromDir(startPath: string, filter: string): void {
	if (!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}

	const files = fs.readdirSync(startPath);
	for (let i = 0; i < files.length; i++) {
		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			fromDir(filename, filter);
		} else if (filename.indexOf(filter) >= 0) {
			LOG_ENABLED && console.log("\033[1;35m -- \033[1mfound: \033[0m", filename);
			getInterface(filename);
		}
	}
}

fromDir("packages/", ".messages.ts");
setTimeout(() => console.log("Duplicates found:", duplicates), 1000);
