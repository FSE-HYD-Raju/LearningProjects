import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../../testUtils";

import CallForwardingConfigurationForm, { CallForwardingConfigurationFormProps } from "./CallForwardingConfigurationForm";
import { Schema } from "yup";
import { constructSchema } from "./CallForwardingConfiguration.util";
import services from "./testData/callForwardingServices-data";

describe("CallForwardingConfigurationForm", () => {
	const minProps: CallForwardingConfigurationFormProps = {
		handleTypeChange: jest.fn(),
		handleModelChange: jest.fn(),
		handleSuperSwitchToggle: jest.fn(),
		model: {type: ""},
		schema: {} as Schema<any>,
		timeValues: []
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<CallForwardingConfigurationForm {...minProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		const schema = constructSchema(services, (...args: any[]) => "");
		mountWithContext(<CallForwardingConfigurationForm {...minProps} schema={schema}/>);
	});
});
