import {
	initServices,
	handleSuperSwitchToggle,
	handleTypeChange,
	handleModelChange,
	constructSchema,
	getTimeValues
} from "./CallForwardingConfiguration.util";
import { callForwardingConfigurationState } from "./CallForwardingConfigurationState";
import { set } from "lodash";
import services from "./testData/callForwardingServices-data";
import { readFile, writeFile } from "./testData/fileUtils";
import { CallForwardingType } from "./CallForwardingConstants";

// Set this to true to generate expected result files
// (FIXME: for some reason tests will loop if this is enabled and they must be forcifully stopped)
// DON'T ENABLE IF YOU DON'T KNOW WHAT YOURE DOING
const writeTests = false;

describe("CallForwardingConfigurationUtil", () => {
	it("initializes model from initial services data", () => {
		const resultFileName = "expected-init-model.json";
		const result = initServices(
			callForwardingConfigurationState,
			services,
			"importantReason"
		);
		if (writeTests) {
			writeFile(result, resultFileName);
		}
		expect(result).toEqual(readFile(resultFileName));
	});

	it("disables all services, when switch is toggled OFF", () => {
		const initFileName = "expected-init-model.json";
		const resultFileName = "expected-all-services-disabled.json";
		const result = handleSuperSwitchToggle(readFile(initFileName));
		if (writeTests) {
			writeFile(result, resultFileName);
		}
		expect(result).toEqual(readFile(resultFileName));
	});

	it("enables 'forward all' services, when switch is turned ON, from OFF position", () => {
		const initFileName = "expected-all-services-disabled.json";
		const resultFileName = "expected-forward-all-services-enabled.json";
		const result = handleSuperSwitchToggle(readFile(initFileName));

		if (writeTests) {
			writeFile(result, resultFileName);
		}
		expect(result).toEqual(readFile(resultFileName));
	});

	it("enables 'forward if' services when toggling to that type", () => {
		const initFileName = "expected-init-model.json";
		const resultFileName = "expected-forward-if-toggled-by-type.json";
		const result = handleTypeChange("forwardIfBusy" as CallForwardingType, readFile(initFileName).configuration);
		if (writeTests) {
			writeFile(result, resultFileName);
		}
		expect(result).toEqual(readFile(resultFileName));
	});

	it("disables service, when phone number is emptied", () => {
		const initFileName = "expected-init-model.json";
		const resultFileName =
			"expected-service-disabled-when-empty-number.json";
		const initialModel = readFile(initFileName);
		set(
			initialModel,
			"configuration.CFUFWD.inputtedCharacteristics.CFMSISDN",
			""
		);
		const result = handleModelChange(initialModel);
		if (writeTests) {
			writeFile(result, resultFileName);
		}
		expect(result).toEqual(readFile(resultFileName));
	});

	it("constructs schema based on services and their inputCharacteristics", () => {
		const resultFileName = "expected-schema.json";
		const schema = constructSchema(services, (...args: any[]) => "");
		if (writeTests) {
			writeFile(schema, resultFileName);
		}
		expect(JSON.stringify(schema)).toEqual(JSON.stringify(readFile(resultFileName)));
	});

	it("reads time values from CFNRCFWD service", () => {
		const values = getTimeValues(services);
		expect(values.length).toEqual(5);
	});
});
