import React from "react";
import yup from "yup";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

import CustomerDetailsForm from "../../../src/components/customer/CustomerDetailsForm";

describe("CustomerDetailsForm", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<CustomerDetailsForm fields={[]} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<CustomerDetailsForm fields={[]} />);
	});

	describe("RUBT-65825", () => {
		const fields = [
			{
				fieldName: "street",
				value: "1 test st",
				required: true
			},
			{
				fieldName: "postalCode",
				value: "12340",
				required: false
			},
			{
				fieldName: "city",
				value: "Testia",
				required: true
			},
			{
				fieldName: "country",
				value: "Testland",
				type: "select",
				options: [],
				required: true
			}
		];

		const props = {
			fields,
			modelSchema: yup.object({
				street: yup.string().required(),
				postalCode: yup.string(),
				city: yup.string().required(),
				country: yup.string().required()
			})
		};

		it("renders an asterisk representing field mandatoriness", () => {
			const wrapper = mountWithContext(
				<CustomerDetailsForm {...props} />
			);

			const fieldElements = wrapper.find("Field");
			expect(
				fieldElements.filterWhere(
					n => n.find(".fa-asterisk").length > 0
				).length
			).toEqual(fields.filter(f => f.required).length);
		});

		it("renders an asterisk representing field mandatoriness -- snapshot", () => {
			const wrapper = shallowWithContext(
				<CustomerDetailsForm {...props} />
			);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
