import * as React from "react";
import {
	CustomizationPointsMapping,
	withCustomization,
	withFunctionCustomization,
	setCustomizationPointsMapping,
	withClassCustomizationFactory,
	withObjectCustomization
} from "./index";
import { mountWithContext } from "../testUtils";
import customizationPointsResolver from "./CustomizationPointsResolver";

interface NameProps {
	name: string;
}

const DefaultComponent: React.ComponentType<NameProps> = (props: NameProps) => (
	<div id="defaultComponent">{props.name}</div>
);

const CustomComponent: React.ComponentType<NameProps> = (props: NameProps) => (
	<div id="customComponent">{`${props.name}_customized`}</div>
);

const customizationPointsMapping: CustomizationPointsMapping<any> = {
	components: {
		["TEST"]: CustomComponent
	}
};

describe("Components customization", () => {
	beforeEach(() => {
		setCustomizationPointsMapping({});
	});
	afterAll(() => {
		setCustomizationPointsMapping({});
	});

	const BasicComponent = (props: any) => {
		const CustomizationComponentType = customizationPointsResolver.getComponent("TEST", DefaultComponent);
		return <CustomizationComponentType	{...props}/>;
	};

	it("when no customization provided should return default", () => {
		const wrapper = mountWithContext(<BasicComponent name="test"/>);
		expect(wrapper.find("#defaultComponent")).not.toBeUndefined();
		expect(wrapper.find("#customComponent")).toHaveLength(0);
		expect(wrapper.find("#defaultComponent")).toHaveLength(1);
	});

	it("when customization provided should return custom component", () => {
		setCustomizationPointsMapping(customizationPointsMapping);
		const wrapper = mountWithContext(<BasicComponent name="test"/>);
		expect(wrapper.find("#defaultComponent")).toHaveLength(0);
		expect(wrapper.find("#customComponent")).not.toBeUndefined();
		expect(wrapper.find("#customComponent")).toHaveLength(1);
	});
});

describe("Functions customization", () => {
	afterAll(() => {
		setCustomizationPointsMapping({});
	});
	let nativeFunc: (...args: any[]) => any;
	let customizedFunc: (...args: any[]) => any;
	const FUNC_ARGUMENT = "test";
	const SUPER_FUNC_ARGUMENT = "test-super";
	const CUSTOMIZATION_KEY = "TEST_FUNCTION_CUSTOMIZATION";
	beforeEach(() => {
		setCustomizationPointsMapping({});
		nativeFunc = jest.fn();
		customizedFunc = jest.fn();
	});
	it("when no customization provided should return default function", () => {
		withFunctionCustomization(CUSTOMIZATION_KEY, nativeFunc)(FUNC_ARGUMENT);
		expect(nativeFunc).toBeCalledWith(FUNC_ARGUMENT);
		expect(nativeFunc).toHaveBeenCalledTimes(1);
		expect(customizedFunc).toHaveBeenCalledTimes(0);
	});
	it("when no customization provided by empty customizationPointsMapping should return default function", () => {
		setCustomizationPointsMapping({
			functions: {}
		});
		withFunctionCustomization(CUSTOMIZATION_KEY, nativeFunc)(FUNC_ARGUMENT);
		expect(nativeFunc).toHaveBeenCalledTimes(1);
		expect(customizedFunc).toHaveBeenCalledTimes(0);
	});
	it("when customization provided should return customized function", () => {
		setCustomizationPointsMapping({
			functions: { [CUSTOMIZATION_KEY]: customizedFunc }
		});
		withFunctionCustomization(CUSTOMIZATION_KEY, nativeFunc)(FUNC_ARGUMENT);
		expect(customizedFunc).toBeCalledWith(nativeFunc, FUNC_ARGUMENT);
		expect(nativeFunc).toHaveBeenCalledTimes(0);
	});
	it("when customization provided should be able to call baseline function", () => {
		setCustomizationPointsMapping({
			functions: {
				[CUSTOMIZATION_KEY]: (superFunc: any, value: any) => {
					superFunc(SUPER_FUNC_ARGUMENT);
					customizedFunc(value);
				}
			}
		});
		withFunctionCustomization(CUSTOMIZATION_KEY, nativeFunc)(FUNC_ARGUMENT);
		expect(nativeFunc).toBeCalledWith(SUPER_FUNC_ARGUMENT);
		expect(customizedFunc).toBeCalledWith(FUNC_ARGUMENT);
	});
	it("when customization provided after declaration should return customized function", () => {
		const functionWithCustomization = withFunctionCustomization(
			CUSTOMIZATION_KEY,
			nativeFunc
		);
		setCustomizationPointsMapping({
			functions: { [CUSTOMIZATION_KEY]: customizedFunc }
		});
		functionWithCustomization(FUNC_ARGUMENT);
		expect(customizedFunc).toBeCalledWith(nativeFunc, FUNC_ARGUMENT);
		expect(nativeFunc).toHaveBeenCalledTimes(0);
	});
});
describe("Classes customization", () => {
	afterAll(() => {
		setCustomizationPointsMapping({});
	});
	class NativeClass {
		getSuffix(): string {
			return " tested";
		}
		patch(value: string): string {
			return value + this.getSuffix();
		}
	}
	class CustomizedClass extends NativeClass {
		getSuffix(): string {
			return " properly tested";
		}
	}
	const FUNC_ARGUMENT = "class";
	const CUSTOMIZATION_KEY = "TEST_CLASS_CUSTOMIZATION";

	it("when no customization provided should return default class instance", () => {
		const classType = withClassCustomizationFactory<NativeClass>(
			CUSTOMIZATION_KEY,
			NativeClass
		);
		const nativeClassCustomized = classType();
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("class tested");
	});
	it("when no customization provided by empty customizationPointsMapping should return default class instance", () => {
		setCustomizationPointsMapping({
			classes: {}
		});
		const classType = withClassCustomizationFactory<NativeClass>(
			CUSTOMIZATION_KEY,
			NativeClass
		);
		const nativeClassCustomized = classType();
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("class tested");
	});
	it("when customization provided should return customized function", () => {
		setCustomizationPointsMapping({
			classes: { [CUSTOMIZATION_KEY]: CustomizedClass }
		});
		const classType = withClassCustomizationFactory<NativeClass>(
			CUSTOMIZATION_KEY,
			NativeClass
		);
		const nativeClassCustomized = classType();
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("class properly tested");
	});
});
describe("Classes with constructor customization", () => {
	afterAll(() => {
		setCustomizationPointsMapping({});
	});
	class NativeWithConstructorClass {
		prefix: string;
		constructor(prefix: string) {
			this.prefix = prefix;
		}
		getSuffix(): string {
			return " tested";
		}
		patch(value: string): string {
			return this.prefix + value + this.getSuffix();
		}
	}

	class CustomizedClass extends NativeWithConstructorClass {
		constructor(prefix: string) {
			super(prefix + "greatest ");
		}
		getSuffix(): string {
			return " properly tested";
		}
	}
	const FUNC_ARGUMENT = "class";
	const CONSTRUCTOR_ARGUMENT = "the ";
	const CUSTOMIZATION_KEY = "TEST_CLASS_CUSTOMIZATION";

	it("when no customization provided should return default class instance", () => {
		const classType = withClassCustomizationFactory<NativeWithConstructorClass>(
			CUSTOMIZATION_KEY,
			NativeWithConstructorClass
		);
		const nativeClassCustomized = classType(CONSTRUCTOR_ARGUMENT);
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("the class tested");
	});
	it("when no customization provided by empty customizationPointsMapping should return default class instance", () => {
		setCustomizationPointsMapping({
			classes: {}
		});
		const classType = withClassCustomizationFactory<NativeWithConstructorClass>(
			CUSTOMIZATION_KEY,
			NativeWithConstructorClass
		);
		const nativeClassCustomized = classType(CONSTRUCTOR_ARGUMENT);
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("the class tested");
	});
	it("when customization provided should return customized function", () => {
		setCustomizationPointsMapping({
			classes: {
				[CUSTOMIZATION_KEY]: CustomizedClass
			}
		});
		const classType = withClassCustomizationFactory<NativeWithConstructorClass>(
			CUSTOMIZATION_KEY,
			NativeWithConstructorClass
		);
		const nativeClassCustomized = classType(CONSTRUCTOR_ARGUMENT);
		const result = nativeClassCustomized.patch(FUNC_ARGUMENT);

		expect(result).toBe("the greatest class properly tested");
	});
	it("when customization provided after declaration should return customized function", () => {
		const classType = withClassCustomizationFactory(
			CUSTOMIZATION_KEY,
			NativeWithConstructorClass
		);
		setCustomizationPointsMapping({
			classes: {
				[CUSTOMIZATION_KEY]: CustomizedClass
			}
		});

		const result = (classType(CONSTRUCTOR_ARGUMENT)).patch(
			FUNC_ARGUMENT
		);

		expect(result).toBe("the greatest class properly tested");
	});
});
describe("Objects customization", () => {
	afterAll(() => {
		setCustomizationPointsMapping({});
	});
	const testObject = {
		field: "a"
	};
	const customObject = {
		field: "b"
	};

	const CUSTOMIZATION_KEY = "TEST_OBJECT_CUSTOMIZATION";

	it("when no customization provided should return default object", () => {
		const resultObject = withObjectCustomization(
			CUSTOMIZATION_KEY,
			testObject
		);
		expect(resultObject).toBe(testObject);
	});

	it("when customization provided should return customized object", () => {
		setCustomizationPointsMapping({
			objects: { [CUSTOMIZATION_KEY]: customObject }
		});
		const resultObject = withObjectCustomization(
			CUSTOMIZATION_KEY,
			testObject
		);

		expect(resultObject).toBe(customObject);
	});
});
