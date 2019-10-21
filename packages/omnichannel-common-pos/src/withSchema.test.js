/* eslint react/prefer-stateless-function: 0 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import messages from "./schemas/SchemaRequirement.messages";
import { mountWithContext, TestUtils } from "../src/testUtils";

import withSchema from "../src/schemas/withSchema";

import { default as PersonSchema } from "../src/schemas/person.schema.js";
import { default as PostalAddressSchema } from "../src/schemas/postal-address.schema.js";

describe("withSchema", () => {
	// eslint-disable-line
	const intlProvider = new IntlProvider({ locale: "en" }, {});
	const { intl } = intlProvider.getChildContext();
	const { formatMessage } = intl;

	const formattedPersonMessages = [];
	Object.keys(messages).forEach(key => {
		formattedPersonMessages[key] = formatMessage(messages[key]);
	});

	const { makeStore } = TestUtils;
	const context = {
		flux: {
			stores: {
				ConsulStore: makeStore("context.flux.stores.ConsulStore", {
					state: {
						logSchemaDiscrepancies: false
					}
				}),
				SchemaStore: makeStore("context.flux.stores.SchemaStore", {
					state: {
						schemas: {
							person: PersonSchema,
							postalAddress: PostalAddressSchema
						}
					}
				})
			}
		}
	};

	class MyComponent extends Component {
		static propTypes = {
			schema: PropTypes.object
		};

		render() {
			return <div className="MyComponent" />;
		}
	}

	it("injects a component with a ready schema", () => {
		const WithSchema = withSchema(["person", "postalAddress"])(MyComponent);

		const wrapper = mountWithContext(<WithSchema />, { context });

		const myComponentProps = wrapper.find(MyComponent).props();
		expect(myComponentProps).toHaveProperty("schema");

		const { schema } = myComponentProps;

		const expected_fields = [
			"firstName",
			"lastName",
			"gender",
			"language",
			"birthDay",
			"countryOfBirth",
			"maritalStatus",
			"email",
			"mobileNumber",
			"fixedLineNumber",
			"phone",
			"passportExpiryDate",
			"passportNumber",
			"privacy1",
			"privacy2",
			"street",
			"coAddress",
			"postalCode",
			"city",
			"country"
		];

		expect(Object.keys(schema.fields).sort()).toEqual(
			expected_fields.sort()
		);
	});

	it("marks named fields as required", () => {
		const requiredFields = messages;

		const WithSchema = withSchema(
			["person", "postalAddress"],
			{
				firstName: messages.firstName
			},
			requiredFields
		)(MyComponent);

		const wrapper = mountWithContext(<WithSchema />, { context });

		const myComponentProps = wrapper.find(MyComponent).props();
		expect(myComponentProps).toHaveProperty("schema");
	});

	/* to be fixed soon */
	xdescribe("handles missing schemas", () => {
		const contextForErrors = {
			flux: {
				stores: {
					ConsulStore: makeStore("context.flux.stores.ConsulStore", {
						state: {
							logSchemaDiscrepancies: true
						}
					}),
					SchemaStore: makeStore("context.flux.stores.SchemaStore", {
						state: {
							schemas: {
								person: PersonSchema
							}
						}
					})
				}
			}
		};

		const origError = console.error;
		const origWarn = console.warn;

		beforeEach(() => {
			global.console.error = jest.fn();
			global.console.warn = jest.fn();
		});

		afterEach(() => {
			global.console.error.mockClear();
			global.console.warn.mockClear();
		});

		afterAll(() => {
			global.console.error = origError;
			global.console.warn = origWarn;
		});

		it("warns about mismatch between (multiple) requested and found schemas, renders component", () => {
			const schemaNames = ["person", "NON-EXIST-ENT"];

			const WithSchema = withSchema(schemaNames)(MyComponent);

			const wrapper = mountWithContext(<WithSchema />, { context: contextForErrors });
			expect(wrapper.html()).not.toEqual(null);

			expect(global.console.warn).toHaveBeenCalledTimes(1);
			expect(global.console.warn).toHaveBeenCalledWith("Schema(s) [NON-EXIST-ENT] are missing");
			expect(global.console.error).not.toHaveBeenCalled();
		});

		it("logs an error when the only requested schema is missing, returns null", () => {
			const schemaNames = "NON-EXIST-ENT";

			const WithSchema = withSchema(schemaNames)(MyComponent);

			const wrapper = mountWithContext(<WithSchema />, { context: contextForErrors })
			expect(wrapper.html()).toEqual(null);
			expect(global.console.error).toHaveBeenCalledTimes(1);
			expect(global.console.error).toHaveBeenCalledWith("One or more schemas of [NON-EXIST-ENT] are missing.");
		});
	});
});
