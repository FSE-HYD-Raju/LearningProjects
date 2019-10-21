import { ChangeSimSelector } from "./changeSim.selectors";
import { AppState } from "../../../reducers";
import {
	ChangeSimConfigurationType,
	ChangeSimState,
	ContextualPaymentMethod,
	CurrencyState,
	FeatureState,
	Identification,
	PostalAddress,
	ShippingMethodType,
	UserState,
} from "../../../types";
import { MockDataMaker } from "../../../../testUtils";
import { cloneDeep } from "lodash";

const getIdentification = (identificationType: string): Identification => ({
	type: identificationType,
	id: "id_" + identificationType,
	identificationId: "ident_id_" + identificationType,
});
const CREDIT_CARD_PAYMENT_METHOD: ContextualPaymentMethod = {
	id: "creditcard",
	label: "Pay with card",
	balance: 0,
};
const BALANCE_PAYMENT_METHOD: ContextualPaymentMethod = {
	id: "balance",
	label: "Pay with balance",
	balance: 100,
};
const ZERO_BALANCE_PAYMENT_METHOD: ContextualPaymentMethod = {
	id: "balance",
	label: "Pay with balance",
	balance: 0,
};
const CURRENCY = "EUR";
const passportIdentificationsTypePriority = ["passport"];
const multipleIdentificationsTypePriority = ["passport", "fiscal-code", "driving-license"];
const businessIdentityCodeIdentifications = [getIdentification("business-identity-code")];
const passportIdentifications = [getIdentification("passport")];
const multipleIdentifications = [getIdentification("business-identity-code"), getIdentification("driving-license")];

const reason = MockDataMaker.productOffering.make({ oneTimePrice: 8 });
const shippingPO = MockDataMaker.productOffering.make({});
const shippingMethod = {
	type: ShippingMethodType.HOME_DELIVERY,
	productOffering: shippingPO,
	id: "shipping_1",
};
const postalAddresses = [MockDataMaker.postalAddress.make({ role: "DELIVERY" })];
const defaultChangeSimState: Partial<ChangeSimState> = {
	shippingMethods: [shippingMethod],
	selectedReason: reason,
	reasons: [reason],
	selectedShippingMethod: shippingMethod,
	selectedPaymentMethod: "balance",
	showingChangeSimModal: true,
	showingModifyAddressForm: false,
	paymentMethods: [CREDIT_CARD_PAYMENT_METHOD, BALANCE_PAYMENT_METHOD],
	deliveryAddress: {
		postalAddress: postalAddresses[0],
	}
};

const defaultUser = {
	id: "test-user",
	attributes: {
		postalAddresses,
		identifications: [] as Identification[],
	},
};
const getCurrencyState = (): CurrencyState => ({ selectedCurrency: CURRENCY } as CurrencyState);
const getChangeSimState = (config: Partial<ChangeSimState>): ChangeSimState => ({ ...defaultChangeSimState, ...config } as ChangeSimState);
const getUserState = (config: { identifications?: Identification[]; postalAddresses?: PostalAddress[] }): UserState => {
	const user = cloneDeep(defaultUser);
	if (config.identifications) {
		user.attributes.identifications = config.identifications;
	}
	if (config.postalAddresses) {
		user.attributes.postalAddresses = config.postalAddresses;
	}
	return ({ user: user } as any) as UserState;
};
const getFeatureState = (identificationsTypePriority?: string[]): FeatureState =>
	({ ecareChangeSim: { identificationsTypePriority } as ChangeSimConfigurationType } as FeatureState);

describe("changeSim.selectors", () => {
	describe("changeSim.selectors.isPaymentSelectionNeeded", () => {
		it("should return false when no reason selected", () => {
			const state: Partial<AppState> = {
				currency: getCurrencyState(),
				changeSim: getChangeSimState({ selectedReason: undefined }),
			};
			expect(ChangeSimSelector.isPaymentSelectionNeeded(state as AppState)).toBeFalsy();
		});
		it("should return false when reason selected and has zero price", () => {
			const state: Partial<AppState> = {
				currency: getCurrencyState(),
				changeSim: getChangeSimState({
					selectedReason: MockDataMaker.productOffering.make({ oneTimePrice: 0 }),
				}),
			};
			expect(ChangeSimSelector.isPaymentSelectionNeeded(state as AppState)).toBeFalsy();
		});
		it("should return true when reason selected and has non zero price", () => {
			const state: Partial<AppState> = {
				currency: getCurrencyState(),
				changeSim: getChangeSimState({
					selectedReason: MockDataMaker.productOffering.make({ oneTimePrice: 7 }),
				}),
			};
			expect(ChangeSimSelector.isPaymentSelectionNeeded(state as AppState)).toBeTruthy();
		});
	});
	describe("changeSim.selectors.getRelevantUserIdentification", () => {
		it("should return undefined when no identifications", () => {
			const state: Partial<AppState> = {
				feature: getFeatureState(passportIdentificationsTypePriority),
				user: getUserState({ identifications: [] }),
			};
			expect(ChangeSimSelector.getRelevantUserIdentification(state as AppState)).toBe(undefined);
		});
		it("should return undefined when configuration and no such identification type", () => {
			const state: Partial<AppState> = {
				feature: getFeatureState(passportIdentificationsTypePriority),
				user: getUserState({ identifications: businessIdentityCodeIdentifications }),
			};
			expect(ChangeSimSelector.getRelevantUserIdentification(state as AppState)).toBe(undefined);
		});
		it("should return it when configuration and has identification type", () => {
			const state: Partial<AppState> = {
				feature: getFeatureState(passportIdentificationsTypePriority),
				user: getUserState({ identifications: passportIdentifications }),
			};
			expect(ChangeSimSelector.getRelevantUserIdentification(state as AppState)).toMatchObject({
				type: "passport",
			});
		});
		it("should return most relevant when configuration, multiple identifications when has identification type", () => {
			const state: Partial<AppState> = {
				feature: getFeatureState(multipleIdentificationsTypePriority),
				user: getUserState({ identifications: multipleIdentifications }),
			};
			expect(ChangeSimSelector.getRelevantUserIdentification(state as AppState)).toMatchObject({
				type: "driving-license",
			});
		});
		it("should return first identification when no configuration", () => {
			const state: Partial<AppState> = {
				feature: getFeatureState(undefined),
				user: getUserState({ identifications: multipleIdentifications }),
			};
			expect(ChangeSimSelector.getRelevantUserIdentification(state as AppState)).toMatchObject(multipleIdentifications[0]);
		});
	});

	describe("changeSim.selectors.getFeeAmount", () => {
		it("should return zero price when no selected reason", () => {
			const state: Partial<AppState> = {
				currency: getCurrencyState(),
				changeSim: getChangeSimState({ selectedReason: undefined }),
			};
			expect(ChangeSimSelector.getFeeAmount(state as AppState)).toMatchObject({
				taxFreeAmount: 0,
				currency: CURRENCY,
			});
		});
		it("should return reason price when selected reason", () => {
			const state: Partial<AppState> = {
				currency: getCurrencyState(),
				changeSim: getChangeSimState({
					selectedReason: MockDataMaker.productOffering.make({ oneTimePrice: 7 }),
				}),
			};
			expect(ChangeSimSelector.getFeeAmount(state as AppState)).toMatchObject({
				taxFreeAmount: 7,
				currency: CURRENCY,
			});
		});
	});
	const canProceedToMakeOrderDefaultState: Partial<AppState> = {
		currency: getCurrencyState(),
		changeSim: getChangeSimState({}),
		user: getUserState({}),
	};
	describe("changeSim.selectors.canProceedToMakeOrder", () => {
		it("should return false when reason not selected", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ selectedReason: undefined }),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeFalsy();
		});
		it("should return false when edit modal is open", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ showingModifyAddressForm: true }),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeFalsy();
		});
		it("should return false when shipping method not selected", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ selectedShippingMethod: undefined }),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeFalsy();
		});
		it("should return false when payment method not selected if has fee", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ selectedPaymentMethod: undefined }),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeFalsy();
		});
		it("should return true when all requirements are done", () => {
			expect(ChangeSimSelector.canProceedToMakeOrder(canProceedToMakeOrderDefaultState as AppState)).toBeTruthy();
		});
		// in case of only one payment method available, automatically selected and it is credit card and no cards
		it("should return true when payment method is creditcard and card is not selected if hasn't fee", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({
					selectedPaymentMethod: "creditcard",
					selectedCustomerPaymentMethod: undefined,
					selectedReason: MockDataMaker.productOffering.make({ oneTimePrice: 0 }),
				}),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeTruthy();
		});
		it("should return false when payment method is creditcard and card is not selected if has fee", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({
					selectedPaymentMethod: "creditcard",
					selectedCustomerPaymentMethod: undefined,
				}),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeFalsy();
		});
		it("should return true when payment method is creditcard and card is selected if has fee", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({
					selectedPaymentMethod: "creditcard",
					selectedCustomerPaymentMethod: "VISA1",
				}),
			};
			expect(ChangeSimSelector.canProceedToMakeOrder(state as AppState)).toBeTruthy();
		});
	});
	describe("changeSim.selectors.isValidPaymentSelection", () => {
		it("should return false when selected balance method and not enough balance", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({
					selectedPaymentMethod: ZERO_BALANCE_PAYMENT_METHOD.id,
					paymentMethods: [ZERO_BALANCE_PAYMENT_METHOD],
				}),
			};
			expect(ChangeSimSelector.isValidPaymentSelection(state as AppState)).toBeFalsy();
		});
		it("should return true when selected balance method and enough balance", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({
					selectedPaymentMethod: BALANCE_PAYMENT_METHOD.id,
					paymentMethods: [BALANCE_PAYMENT_METHOD],
				}),
			};
			expect(ChangeSimSelector.isValidPaymentSelection(state as AppState)).toBeTruthy();
		});
	});

	describe("changeSim.selectors.getMonetaryChargingBalance", () => {
		it("should return undefined when no balance payment method", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ paymentMethods: [] }),
			};
			expect(ChangeSimSelector.getMonetaryChargingBalance(state as AppState)).toBeUndefined();
		});
		it("should return charging balance with number and currency when balance payment method is present", () => {
			const state: Partial<AppState> = {
				...canProceedToMakeOrderDefaultState,
				changeSim: getChangeSimState({ paymentMethods: [CREDIT_CARD_PAYMENT_METHOD, BALANCE_PAYMENT_METHOD] }),
			};
			expect(ChangeSimSelector.getMonetaryChargingBalance(state as AppState)).toMatchObject({
				value: BALANCE_PAYMENT_METHOD.balance,
				currency: CURRENCY,
			});
		});
	});
});
