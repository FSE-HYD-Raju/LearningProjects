import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import AutoCharacteristicConfiguration from "./AutoCharacteristicConfiguration";

describe("AutoCharacteristicConfiguration", () => {
	const setInputtedCharacteristic = jest.fn();

	beforeEach(() => {
		setInputtedCharacteristic.mockClear();
	});

	const minimalProps = {
		characteristicKey: "CH_SMS_Dialogue",
		characteristicValue: { hidden: true, value: "true" },
		inputtedCharacteristics: {},
		path: [{ po: "PO_55_MB_2_Min_x_1_Dia_x_Bs_3"}],
		setInputtedCharacteristic
	};

	it("should shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<AutoCharacteristicConfiguration {...minimalProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should call setInputtedCharacteristic", done => {
		shallowWithContext(<AutoCharacteristicConfiguration {...minimalProps} />);
		setTimeout(() => {
			expect(minimalProps.setInputtedCharacteristic).toHaveBeenCalledWith(
				minimalProps.path,
				minimalProps.characteristicKey,
				minimalProps.characteristicValue.value
			);
			done();
		}, 500);
	});

	it("should not call setInputtedCharacteristic, if value has not changed", done => {
		const props = {
			...minimalProps,
			...{ inputtedCharacteristics: { CH_SMS_Dialogue: "true" } }
		};
		shallowWithContext(<AutoCharacteristicConfiguration {...props} />);
		setTimeout(() => {
			expect(props.setInputtedCharacteristic).toHaveBeenCalledTimes(0);
			done();
		}, 500);
	});

	it("should not call setInputtedCharacteristic, if no value has been configured", done => {
		const props = {
			...minimalProps,
			characteristicValue: undefined,
		};
		shallowWithContext(<AutoCharacteristicConfiguration {...props} />);
		setTimeout(() => {
			expect(props.setInputtedCharacteristic).toHaveBeenCalledTimes(0);
			done();
		}, 500);
	});
});
