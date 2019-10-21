import * as React from "react";
import { TestUtils, mountWithContext, shallowWithContext } from "../../../testUtils";
import juanitaAgreement from "./testData/juanita-agreement1";
import ProductServicesByActivity, { ProductServicesByActivityProps } from "./ProductServicesByActivity";
import { Product } from "../../../redux/types";
import { OcAccordionItem } from "../../ocComponents/accordion";

describe("ProductServicesByActivity", () => {
	const context = {
		flux: {
			stores: {
				UserStore: TestUtils.makeStore("context.flux.stores.UserStore", {
					user: { id: ""}
				}),
				SalesStore: TestUtils.makeStore("context.flux.stores.SalesStore", {
					products: []
				})
			}
		},
		store: TestUtils.mockReduxStore({
			service: {
				callForwardingConfigurationErrors: undefined,
				callForwardingReasonCode: ""
			}
		})
	};
	const minProps: ProductServicesByActivityProps = {
		agreementId: "juanita-agreement1-sub",
		product: {
			realizingServices: {},
			childProducts: []
		} as any as Product,
		actions: {
			initializeStateTransition: jest.fn(),
			resetCallForwardingConfiguration: jest.fn(),
		},
		serviceStateTransitionByActionName: {},
		callForwardingServices: undefined,
		showServiceStatusChangeModal: false,
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<ProductServicesByActivity {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<ProductServicesByActivity {...minProps} />, { context });
	});

	it("renders all services, should find 8 services", () => {
		const product = juanitaAgreement.attributes.products[0];
		const wrapper = mountWithContext(
			<ProductServicesByActivity
				{...minProps}
				product={product}
				serviceStateTransitionByActionName={{
					resume: "resume",
					reactivate: "reactivate",
					disable: "disable",
					suspend: "suspend",
					deactivate: "deactivate"
				}}
			/>, { context }
		);

		const rows = wrapper.find(OcAccordionItem);
		expect(rows.length).toEqual(7);

		const cols = wrapper.find(".AddonsTabView-list-item-column");
		expect(cols.length).toBeGreaterThan(0);
		expect(cols.at(0).first().text()).toEqual("CFS_voice_1000");
		expect(cols.at(3).first().text().toLowerCase()).toEqual("active");
		expect(cols.at(4).first().text().toLowerCase()).toEqual("disable");
	});
});
