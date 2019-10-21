import React from "react";
import { TestUtils, mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import CustomerDetailsSubscriptionDetails from "./CustomerDetailsSubscriptionDetails";

const context = {
	flux: {
		stores: {
			UserStore: TestUtils.makeStore("context.flux.stores.UserStore", {
				user: { id: "" }
			}),
			SalesStore: TestUtils.makeStore("context.flux.stores.SalesStore", {
				products: []
			})
		},
		actions: {
			SalesActions: TestUtils.makeActions("context.flux.actions.SalesActions", {
				getAlternateOfferingsForProduct: () => {},
				getAvailablePlans: () => {},
				resetNewPlanOrder: () => {},
				submitNewPlanOrder: () => {},
				initializeNewPlanOrder: () => {},
				getProductsByIds: () => {},
			}),
			BasketActions: {
				discardBasket: jest.fn(),
				discardBackendBasket: jest.fn(),
				submitBasket: jest.fn(),
			},
			CustomerCaseActions: {
				changeCustomerActiveAgreement: jest.fn(),
			}
		}
	},
	store: TestUtils.mockReduxStore({
		service: {
			callForwardingConfigurationErrors: undefined,
			callForwardingReasonCode: ""
		},
		lifecycle: {},
		productOfferingConfiguration: {
			configurations: {}
		},
		user: {
			user: { id: "" }
		},
		sales: {
			products: []
		},
		feature: {},
		cms: {},
		consul: {},
	})
};

describe("CustomerDetailsSubscriptionDetails", () => {
	const minProps = {
		submitCallForwardingConfiguration: () => {},

		callForwardingReasonCode: "reason-code"
	};

	it("succeeds at shallow mount without props", () => {
		shallowWithContext(
			<CustomerDetailsSubscriptionDetails {...minProps} />
		);
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerDetailsSubscriptionDetails {...minProps} />);
	});

	describe("RND-14865", () => {
		const phones = [
			{
				primaryId: "SXFP-CHYK-ONI6-S89U",
				type: "DEVICE",
				lifeCycleStatus: "ACTIVE",
				specification: {
					id: "yphone-po",
					name: "Appelsiini yPhone XS 64Gb black",
					specType: "PRODUCT",
					specSubType: "HANDSET"
				}
			}
		];

		const products = [
			{
				id: "juanita-agreement1-sub",
				name: "Postpaid SUPERB Plan",
				lifeCycleStatus: "ACTIVE",
				realizingResources: [
					{
						primaryId: "0123015150",
						validFor: {
							startDate: "2015-07-06T12:23:26Z",
							endDate: null
						},
						lifeCycleStatus: "ACTIVE",
						type: "MSISDN"
					},
					...phones
				],
				realizingServices: [{ lifeCycleStatus: "ACTIVE" }],
				childProducts: [
					{
						id: "some-child",
						realizingResources: [
							{
								type: "DEVICE",
								lifeCycleStatus: "ACTIVE",
								primaryId: "123456"
							},
							{
								type: "MSISDN",
								lifeCycleStatus: "ACTIVE",
								primaryId: "555-9876"
							}
						],
						childProducts: [],
						realizingServices: [{ lifeCycleStatus: "ACTIVE" }]
					}
				]
			}
		];

		const agreements = [
			{
				id: "juanita-agreement1",
				attributes: {
					products
				}
			}
		];

		it("fetches available addon products on mount", () => {
			const getAvailableAddonProductsSpy = jest.fn();

			const match = {
				params: {
					agreementId: agreements[0].id,
					subscriptionId: "juanita-agreement1-sub"
				}
			};

			mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					getAvailableAddonProducts={getAvailableAddonProductsSpy}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={match}
				/>,
				{ context }
			);

			expect(getAvailableAddonProductsSpy).toHaveBeenCalledWith(
				match.params.agreementId
			);
		});

		it("fetches available mobile phones on mount", () => {
			const getAvailableMobilePhonesSpy = jest.fn();

			const match = {
				params: {
					agreementId: agreements[0].id,
					subscriptionId: "juanita-agreement1-sub"
				}
			};

			mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					getAvailableAddonProducts={() => {}}
					getAvailableMobilePhones={getAvailableMobilePhonesSpy}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={match}
				/>,
				{ context }
			);

			expect(getAvailableMobilePhonesSpy).toHaveBeenCalledWith(
				match.params.agreementId
			);
		});

		it("presents name of phone associated to a plan", () => {
			const wrapper = mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					products={products}
					agreements={agreements}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={{
						params: {
							subscriptionId: "juanita-agreement1-sub"
						}
					}}
					getAvailableAddonProducts={() => {}}
				/>,
				{ context }
			);

			const deviceName = wrapper.find(
				".CustomerDetailsSubscriptionDetails-deviceName"
			);
			expect(deviceName.length).toEqual(1);
			expect(deviceName.text().toLowerCase()).toEqual(
				"appelsiini yphone xs 64gb black"
			);
		});

		it('renders text "No phone connected" when no phone is associated to a plan', () => {
			const wrapper = mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					getAvailableAddonProducts={() => {}}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={{
						params: {
							agreementId: agreements[0].id,
							subscriptionId: "juanita-agreement1-sub"
						}
					}}
				/>,
				{ context }
			);

			const noPhoneConnected = wrapper.find(
				".CustomerDetailsSubscriptionDetails-no-phone-connected"
			);
			expect(noPhoneConnected.length).toEqual(1);
			expect(noPhoneConnected.text().toLowerCase()).toEqual(
				"no phone connected"
			);
		});

		it('renders button "+ Add phone" when phones are available and no phone is associated to a plan', () => {
			const wrapper = mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					getAvailableAddonProducts={() => {}}
					availablePhones={phones}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={{
						params: {
							agreementId: agreements[0].id,
							subscriptionId: "juanita-agreement1-sub"
						}
					}}
				/>,
				{ context }
			);

			const linkToShopPhonePage = wrapper
				.find("#linkToShopPhonePage")
				.hostNodes();
			expect(linkToShopPhonePage.length).toEqual(1);
			expect(linkToShopPhonePage.text().toLowerCase()).toEqual(
				"add phone"
			);
		});

		it('saves current agreement id as targetAgreementId when "+ Add phone" is clicked', () => {
			const saveAgreementIdSpy = jest.fn();
			const agreementId = agreements[0].id;

			const wrapper = mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					availableAddons={[]}
					getAvailableAddonProducts={() => {}}
					agreements={agreements}
					availablePhones={phones}
					saveTargetAgreementId={saveAgreementIdSpy}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={{
						params: {
							agreementId,
							subscriptionId: "juanita-agreement1-sub"
						}
					}}
				/>,
				{ context }
			);

			const linkToShopPhonePage = wrapper
				.find("#linkToShopPhonePage")
				.hostNodes();
			expect(linkToShopPhonePage.length).toEqual(1);
			linkToShopPhonePage.simulate("click");
			expect(saveAgreementIdSpy).toHaveBeenCalledWith(agreementId);
		});

		it('does not render button "+ Add phone" when a phone is associated to a plan', () => {
			const wrapper = mountWithContext(
				<CustomerDetailsSubscriptionDetails
					{...minProps}
					getAvailableAddonProducts={() => {}}
					availablePhones={phones}
					products={products}
					activeCustomerCase={{
						attributes: {
							activeCustomer: {
								id: "juanita"
							}
						}
					}}
					match={{
						params: {
							agreementId: "juanita-agreement1",
							subscriptionId: "juanita-agreement1-sub"
						}
					}}
				/>,
				{ context }
			);

			const linkToShopPhonePage = wrapper.find("#linkToShopPhonePage");
			expect(linkToShopPhonePage.length).toEqual(0);
		});
	});
});
