import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
    TestUtils,
    FormattedMessage,
} from "omnichannel-common-pos";

import {
    Props,
    InstallationAddressSearchForm
} from "./InstallationAddressSearchForm";

describe("InstallationAddressSearchForm", () => {

    const minProps: Props = {
		addressValidation: {
            status: "",
            address: {}
        },
        cities: [{
            id: "id",
            name: "name"
        }],
        schema: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title: "InstallationAddressSearchForm",
            type: "object",
            properties: {
                street: {
                    type: "string",
                    required: true
                },
                coAddress: {
                    type: "string",
                    required: false
                },
                postalCode: {
                    type: "string",
                    required: false
                },
                city: {
                    type: "string",
                    required: true
                },
                country: {
                    type: "string",
                    required: false
                },
                county: {
                    type: "string",
                    required: true
                },
                description: {
                    type: "string",
                    required: false
                },
                postOfficeBox: {
                    type: "string",
                    required: false
                },
                stateOrProvince: {
                    type: "string",
                    required: false
                },
                addressRegisterId: {
                    type: "string",
                    required: false
                },
                apartment: {
                    type: "string",
                    required: false
                },
                building: {
                    type: "string",
                    required: true
                }
            },
            fields: {},
            isValid: jest.fn(),
            validate: jest.fn()
        },
         installationAddressDisplayFieldsTemplate: "<div> \
                                                        <p>city postOfficeBox</p> \
                                                        <p>county coAddress</p> \
                                                        <p>street building postalCode</p> \
                                                        <p>room</p> \
                                                    </div>",
		actions: {
            validateAddress: jest.fn(),
            getCities: jest.fn(),
            getCounties: jest.fn(),
            getStreets: jest.fn(),
            getAddresses: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<InstallationAddressSearchForm {...minProps} />);
		expect(wrapper).toMatchSnapshot();
    });
    it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<InstallationAddressSearchForm {...minProps} />);
    });

	it("renders minimum content", () => {
		const props = {
			...minProps,
		};
		mountWithContext(<InstallationAddressSearchForm {...props} />);
	});
});