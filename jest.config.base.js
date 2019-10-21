const path = require("path");

module.exports = {
	roots: ["packages"],

	globals: {
		"ts-jest": {
			tsConfig: "./jest.tsconfig.json"
		}
	},
	testURL: "http://localhost/",

	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest"
	},

	testRegex: "(.*)\\.test\\.(jsx?|tsx?)$",
	coverageDirectory: "./coverage",
	coverageReporters: ["html", "lcov", "json-summary"],
	testResultsProcessor: path.resolve("./node_modules/jest-junit"),
	collectCoverageFrom: [
		"**/src/**/*.js",
		"**/src/**/*.jsx",
		"**/src/**/*.ts",
		"**/src/**/*.tsx",
		"!**/index.js",
		"!**/App.js",
		"!**/channelSetup.js",
		"!**/Guid.js",
		"!**/Root.tsx",
		"!**/Routes.jsx",
		"!**/registerServiceWorker.js",
		"!**/dist/**",
		"!**/lib/**",
		"!**/vendor/**",
		"!**/__mocks__/**",
		"!**/tests/**",
		"!**/__tests__/**",
		"!integration_tests/**",
		"!**/server/public/js/**"
	],
	testPathIgnorePatterns: [
		"/node_modules/",
		"\\.snap$",
		"packages/.*/build",
		"packages/.*/lib",
		"packages/.*/wind3"
	],
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/fileMock.js",
		"\\.(css|sass|scss)$": path.resolve("./__mocks__/styleMock.js")
	},
	moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
	setupFiles: ["./jest-setup.js"],
	setupTestFrameworkScriptFile: path.resolve("./jest-setupTests.js"),

	snapshotSerializers: ["enzyme-to-json/serializer"]
};
