#!/usr/bin/env node

try {
	const cli = require("../lib/cli").default;
	cli(process, process.exit);
} catch (e) {
	if (e.code === "MODULE_NOT_FOUND") {
		console.error("Please build the project first before calling "+ process.argv[1]);
		process.exit(126);
	}
	else {
		console.error(e);
		process.exit(255);
	}
}
