import React from "react";
import R from "ramda";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import CustomerSubDetailsView from "../../../src/components/customer/CustomerSubDetailsView";

describe("CustomerSubDetailsView", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<CustomerSubDetailsView />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerSubDetailsView />);
	});

	it("does not throw error if there is no given fieldName in messages", () => {
		const props = {
			fields: [
				{
					fieldName: "notExists"
				}
			]
		};

		mountWithContext(<CustomerSubDetailsView {...props} />);
	});

	it("does not throw error if there is a empty field object", () => {
		const props = {
			fields: [{}]
		};

		mountWithContext(<CustomerSubDetailsView {...props} />);
	});

	it("does not throw error if there is field object has no fieldName", () => {
		const props = {
			fields: [{ value: "derp" }]
		};

		mountWithContext(<CustomerSubDetailsView {...props} />);
	});

	it("does not throw error if there is field object has no value", () => {
		const props = {
			fields: [{ fieldName: "firstName" }]
		};

		mountWithContext(<CustomerSubDetailsView {...props} />);
	});

	it("does not throw error if value type is date but value is not in correct format", () => {
		const props = {
			fields: [
				{
					type: "date",
					value: "derpDate",
					fieldName: "birthDay"
				}
			]
		};

		mountWithContext(<CustomerSubDetailsView {...props} />);
	});

	it("renders fields fieldName and value in order", () => {
		const props = {
			fields: [
				{
					value: "Mikko",
					fieldName: "firstName"
				},
				{
					value: "Kuustonen",
					fieldName: "lastName"
				}
			]
		};

		const wrapper = mountWithContext(<CustomerSubDetailsView {...props} />);

		const fieldValue1 = wrapper
			.find(".CustomerDetailsView-subDetails-field-value")
			.at(0);

		const fieldName1 = wrapper
			.find(".CustomerDetailsView-subDetails-field-name")
			.at(0);
		// maps to messages['firstName']
		expect(fieldName1.text()).toEqual("First name");

		expect(fieldValue1.text()).toEqual(props.fields[0].value);

		const fieldValue2 = wrapper
			.find(".CustomerDetailsView-subDetails-field-value")
			.at(1);

		const fieldName2 = wrapper
			.find(".CustomerDetailsView-subDetails-field-name")
			.at(1);

		// maps to messages['lastName']
		expect(fieldName2.text()).toEqual("Last name");

		expect(fieldValue2.text()).toEqual(props.fields[1].value);
	});

	describe("renders language", () => {
		const props = {
			fields: [
				{
					label: "contactLanguage",
					fieldName: "language",
					value: "spa",
					type: "select",
					options: [
						{
							code: "Not defined",
							name: "Not defined"
						},
						{
							code: "aar",
							name: "Afar",
							locale: "aa"
						},
						{
							code: "afr",
							name: "Afrikaans",
							locale: "af"
						},
						{
							code: "sot",
							name: "Sotho, Southern",
							locale: "st"
						},
						{
							code: "nbl",
							name: "South Ndebele",
							locale: "nr"
						},
						{
							code: "spa",
							name: "Castilian",
							locale: "es"
						},
						{
							code: "spa",
							name: "Spanish",
							locale: "es"
						},
						{
							code: "sun",
							name: "Sundanese",
							locale: "su"
						}
					]
				}
			]
		};

		it("with unique code", () => {
			const props2 = R.set(
				R.lensPath(["fields", 0, "value"]),
				"aar",
				props
			);
			const wrapper = mountWithContext(
				<CustomerSubDetailsView {...props2} />
			);
			const fieldValue = wrapper
				.find(".CustomerDetailsView-subDetails-field-value")
				.at(0);

			expect(fieldValue.text()).toEqual("Afar");
		});

		it("with same code", () => {
			const wrapper = mountWithContext(
				<CustomerSubDetailsView {...props} />
			);
			const fieldValue = wrapper
				.find(".CustomerDetailsView-subDetails-field-value")
				.at(0);

			expect(fieldValue.text()).toEqual("Spanish / Castilian");
		});

		it("with undefined code", () => {
			const props2 = R.set(
				R.lensPath(["fields", 0, "value"]),
				undefined,
				props
			);
			const wrapper = mountWithContext(
				<CustomerSubDetailsView {...props2} />
			);
			const fieldValue = wrapper
				.find(".CustomerDetailsView-subDetails-field-value")
				.at(0);

			expect(fieldValue.text()).toEqual("Not available");
		});
	});
});
