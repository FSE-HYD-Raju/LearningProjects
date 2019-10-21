import { AppState } from "../../reducers";
import { digitalLife as digitalLifeSelector } from "../../../redux/selectors";
import { CustomerPaymentMethod, CustomerPaymentMethodType, Role } from "../../types";
import { ecareRecurringTopUpsIdentifier, recurringTopUpsAliases, agreementWithRecurringTopUps } from "./digitalLife.selectors.testData";
import { MockDataMaker } from "../../../testUtils";
import { SalesState } from "../sales/sales.reducers";

describe("digitalLife.selectors", () => {
	describe("isSingleSubscriptionNavigationModeActive", () => {
		it('returns "true" in case feature is active in consul and user has only 1 subcription', () => {
			const appState: AppState = ({
				feature: {
					singleSubscriptionNavigationActive: true
				},
				digitalLife: {
					agreements: [{ id: "123" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleSubscriptionNavigationModeActive(appState)).toEqual(true);
		});

		it('returns "false" in case feature is inactive in consul and user has only 1 subcription', () => {
			const appState: AppState = ({
				feature: {
					singleSubscriptionNavigationActive: false
				},
				digitalLife: {
					agreements: [{ id: "123" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleSubscriptionNavigationModeActive(appState)).toEqual(false);
		});

		it('returns "true" in case feature is active in consul and user has > 1 subscriptions', () => {
			const appState: AppState = ({
				feature: {
					singleSubscriptionNavigationActive: true
				},
				digitalLife: {
					agreements: [{ id: "123" }, { id: "321" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleSubscriptionNavigationModeActive(appState)).toEqual(true);
		});

		it('returns "false" in case feature is inactive in consul and user has > 1 subscriptions', () => {
			const appState: AppState = ({
				feature: {
					singleSubscriptionNavigationActive: false
				},
				digitalLife: {
					agreements: [{ id: "123" }, { id: "321" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleSubscriptionNavigationModeActive(appState)).toEqual(false);
		});
	});
	describe("isSingleUser", () => {
		it('returns "true" in case only one person available in system', () => {
			const appState: AppState = ({
				digitalLife: {
					people: [{ id: "123" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleUser(appState)).toEqual(true);
		});

		it('returns "false" in case more than one person available in system', () => {
			const appState: AppState = ({
				digitalLife: {
					people: [{ id: "123" }, { id: "321" }]
				}
			} as any) as AppState;
			expect(digitalLifeSelector.isSingleUser(appState)).toEqual(false);
		});
	});
	describe("getActiveAddons", () => {
		it("should return addons from one-level child products", () => {
			const appState: AppState = ({
				feature: {ecareProductLoan: {}},
				sales: ({
					addonsCategoryIds: ["additional"]
				} as Partial<SalesState>) as SalesState
			} as Partial<AppState>) as AppState;
			const product = MockDataMaker.product.ACTIVE_SUBSCRIPTION_WITH_ADDONS;
			const activeAddons = digitalLifeSelector.getActiveAddons(product, appState);
			expect(activeAddons).toHaveLength(1);
			expect(activeAddons[0].id).toBe(MockDataMaker.product.NOT_CONFIGURABLE_ACTIVE_ADDON.id);
		});
		it("should return addons from nested products", () => {
			const appState: AppState = ({
				feature: {ecareProductLoan: {}},
				sales: ({
					addonsCategoryIds: ["additional"]
				} as Partial<SalesState>) as SalesState
			} as Partial<AppState>) as AppState;
			const product = MockDataMaker.product.ACTIVE_MULTILEVEL_SUBSCRIPTION_WITH_ADDONS;
			const activeAddons = digitalLifeSelector.getActiveAddons(product, appState);
			expect(activeAddons).toHaveLength(1);
			expect(activeAddons[0].id).toBe(MockDataMaker.product.NOT_CONFIGURABLE_ACTIVE_ADDON.id);
		});
	});
	describe("getPaymentMethodById", () => {
		it("returns CustomerPaymentMethod from payment methods", () => {
			const state: AppState = {
				payment: {
					customerPaymentMethods: [
						{
							id: "1",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Mastercard",
									expiryMonth: 12,
									expiryYear: 28,
									maskedCardNumber: "XXXX XXXX XXXX 1234"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z"
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Mastercard"
							}
						} as any as CustomerPaymentMethod,
						{
							id: "2",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Visa",
									expiryMonth: 9,
									expiryYear: 25,
									maskedCardNumber: "XXXX XXXX XXXX 5678"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z"
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Visa"
							}
						} as any as CustomerPaymentMethod,
					]
				}
			} as any as AppState;
			expect(digitalLifeSelector.getPaymentMethodById("2")(state)).toEqual(state.payment.customerPaymentMethods[1]);
		});

		it("returns undefined from payment methods if credit card was removed", () => {
			const state: AppState = {
				payment: {
					customerPaymentMethods: [
						{
							id: "1",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Mastercard",
									expiryMonth: 12,
									expiryYear: 28,
									maskedCardNumber: "XXXX XXXX XXXX 1234"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z",
									expired: true,
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Mastercard"
							}
						} as any as CustomerPaymentMethod,
						{
							id: "2",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Visa",
									expiryMonth: 9,
									expiryYear: 25,
									maskedCardNumber: "XXXX XXXX XXXX 5678"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z",
									expired: true,
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Visa"
							}
						} as any as CustomerPaymentMethod,
					]
				}
			} as any as AppState;
			expect(digitalLifeSelector.getPaymentMethodById("2")(state)).toBeUndefined();
		});
	});
	describe("getRecurringTopUpProducts", () => {
		it("returns TopUpCharacteristic[] with correct paymentMethod", () => {
			const state: AppState = {
				payment: {
					customerPaymentMethods: [
						{
							id: "1",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Mastercard",
									expiryMonth: 12,
									expiryYear: 28,
									maskedCardNumber: "XXXX XXXX XXXX 1234"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z"
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Mastercard"
							}
						} as any as CustomerPaymentMethod,
						{
							id: "2",
							attributes: {
								creditCard: {
									cardHolder: "Thomas Anderson",
									cardType: "Visa",
									expiryMonth: 9,
									expiryYear: 25,
									maskedCardNumber: "XXXX XXXX XXXX 5678"
								},
								validFor: {
									startDate: "2016-11-03T00:00:00Z",
									endDate: "2025-07-13T14:31:54.688Z"
								},
								type: CustomerPaymentMethodType.CREDIT_CARD,
								role: Role.PRIMARY,
								name: "Neo's Visa"
							}
						} as any as CustomerPaymentMethod,
					]
				}
			} as any as AppState;
			const result = digitalLifeSelector.getRecurringTopUpProducts(
				state,
				agreementWithRecurringTopUps,
				ecareRecurringTopUpsIdentifier,
				recurringTopUpsAliases
			);
			expect(result.length).toBe(1);
			expect(result[0].paymentMethod).toEqual(state.payment.customerPaymentMethods[1]);
		})
	});

	describe("getBaskets", () => {
		it("returns Baskets[] filtered by expired date", () => {
			const state: AppState = {
				feature: {
					hideBasketAfterXHours: 6
				},
				digitalLife: {
					baskets: [
						{
							id: "123",
							attributes: {
								expiresAt: "2016-11-03T00:00:00Z"
							}
						},
						{
							id: "124",
							attributes: {
								expiresAt: "2040-11-03T00:00:00Z"
							}
						}
					]
				}
			} as any as AppState;
			const result = digitalLifeSelector.getBaskets(
				state
			);
			expect(result.length).toBe(1);
			expect(result[0].attributes.expiresAt).toEqual(state.digitalLife.baskets[1].attributes.expiresAt);
		});
		it("returns Baskets[] if expired date are null", () => {
			const state: AppState = {
				feature: {
					hideBasketAfterXHours: 6
				},
				digitalLife: {
					baskets: [
						{
							id: "123",
							attributes: {
								createdAt: "2040-11-03T00:00:00Z",
								expiresAt: null
							}
						},
						{
							id: "124",
							attributes: {
								createdAt: "2012-11-03T00:00:00Z",
								expiresAt: null
							}
						}
					]
				}
			} as any as AppState;
			const result = digitalLifeSelector.getBaskets(
				state
			);
			expect(result.length).toBe(1);
			expect(result[0].attributes.expiresAt).toEqual(state.digitalLife.baskets[0].attributes.expiresAt);
		});
		it("returns Baskets[] by modified date", () => {
			const state: AppState = {
				feature: {
					hideBasketAfterXHours: 6
				},
				digitalLife: {
					baskets: [
						{
							id: "123",
							attributes: {
								modified: "2040-11-03T00:00:00Z",
								expiresAt: null
							}
						},
						{
							id: "124",
							attributes: {
								modified: "2012-11-03T00:00:00Z",
								expiresAt: null
							}
						}
					]
				}
			} as any as AppState;
			const result = digitalLifeSelector.getBaskets(
				state
			);
			expect(result.length).toBe(1);
			expect(result[0].attributes.expiresAt).toEqual(state.digitalLife.baskets[0].attributes.expiresAt);
		});
	});
	it("returns all Baskets[] if hideBasketAfterXHours not specified", () => {
		const state: AppState = {
			feature: {
			},
			digitalLife: {
				baskets: [
					{
						id: "123",
						attributes: {
							modified: "2040-11-03T00:00:00Z",
							expiresAt: null
						}
					},
					{
						id: "124",
						attributes: {
							modified: "2012-11-03T00:00:00Z",
							expiresAt: null
						}
					}
				]
			}
		} as any as AppState;
		const result = digitalLifeSelector.getBaskets(
			state
		);
		expect(result.length).toBe(2);
	});
});
