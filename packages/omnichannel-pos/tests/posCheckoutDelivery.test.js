import React from "react";
import {
	mountWithContext,
	shallowWithContext,
	SimpleDataMock,
	TestUtils,
	withSchema
} from "omnichannel-common-pos";

import POSCheckoutDelivery from "../src/checkout/POSCheckoutDelivery";

describe("POSCheckoutDelivery", () => {
	const context = SimpleDataMock.getConsulContextMock();

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<POSCheckoutDelivery />, {
			context
		});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount without props", () => {
		mountWithContext(<POSCheckoutDelivery />, { context });
	});

	/* Was very useful when one Form validation schema was replaced by another */
	it("stores delivery address to POSCheckoutStore", done => {
		const posCheckoutStore = {
			showPOSDeliveryModal: false,
			POSDefaultStore: null,
			POSDeliveryType: "new-address",
			POSDeliveryMethodId: null,
			"store-pickup": null,
			"new-address": {
				street: "asdf",
				coAddress: "Ostrich",
				postalCode: "12340",
				city: "Hippo City",
				country: "Hipponia"
			},
			"known-address": null,
			setPOSDeliveryAddress: ({ formData, type }) => {
				console.log(
					"MOCKED POSCheckoutStore.setPOSDeliveryAddress():",
					formData,
					type
				);
				posCheckoutStore[type] = formData;

				done();
			}
		};

		const myProps = {
			POSCheckoutActions: {
				setPOSDeliveryAddress: ({ formData, type }) => {
					console.log(
						"MOCKED POSCheckoutActions.setPOSDeliveryAddress(), formData, type:",
						formData,
						type
					);
					posCheckoutStore.setPOSDeliveryAddress({ formData, type });
				},
				setPOSDeliveryType: type => {
					console.log(
						"MOCKED POSCheckoutActions.setPOSDeliveryType(), type:",
						type
					);
					posCheckoutStore.POSDeliveryType = type;
				}
			},
			POSCheckoutStore: posCheckoutStore,
			BasketStore: {
				activeBasket: {
					attributes: {
						phase: 1
					}
				}
			}
		};

		const WithSchema = withSchema(["posCheckoutDelivery"])(
			POSCheckoutDelivery
		);
		const wrapper = mountWithContext(<WithSchema {...myProps} />, {
			context
		});

		const iStreet = wrapper.find('[name="street"]');
		iStreet
			.find("input")
			.simulate("change", { target: { value: "1 Hippo Avenue" } });

		const bSaveAndClose = wrapper
			.find("OcButton")
			.filterWhere(
				n => n.text().toLowerCase() === "Save and close".toLowerCase()
			);
		expect(bSaveAndClose.length).toBeGreaterThan(
			0,
			'Button "Save and close" not found or there were more than one'
		);

		TestUtils.findNodesWithOnClickAttribute(bSaveAndClose).simulate(
			"click"
		);
	});
});
