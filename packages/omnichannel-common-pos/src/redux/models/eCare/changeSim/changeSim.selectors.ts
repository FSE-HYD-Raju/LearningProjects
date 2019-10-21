import {
	ChangeSimActionInitializeRequest,
	ChangeSimConfigurationType,
	ChargingBalances,
	Identification, PostalAddress,
	PriceTypeEnum,
	Product,
	ShippingMethodType,
	SimplePrice
} from "../../../types";
import { AppState } from "../../../reducers";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import PostalAddressUtil from "../../../../utils/user/PostalAddressUtil";
import { Selectors } from "../../../../redux";
import TraceUtil from "../../../../utils/TraceUtil";
import { CHANGE_SIM_CONFIGURATION_KEY } from "./changeSim.feature";
import PaymentUtil from "../../../../utils/PaymentUtil";

export class ChangeSimSelector {
	static getReasonsPOIds(state: AppState, subscription: Product): string[] {
		if (subscription.lifeCycleStatus === "ACTIVE") {
			return state.feature.ecareChangeSim!.activeSubscriptionReasonsPOIds || [];
		} else if (subscription.lifeCycleStatus === "SUSPENDED") {
			return state.feature.ecareChangeSim!.suspendedSubscriptionReasonsPOIds || [];
		} else {
			return [];
		}
	}

	static getFeeAmount(state: AppState): SimplePrice {
		return (
			(state.changeSim.selectedReason &&
				ProductOfferingUtil.getSimplePrice(state.changeSim.selectedReason, PriceTypeEnum.ONE_TIME)) || {
				taxFreeAmount: 0,
				currency: state.currency.selectedCurrency
			}
		);
	}

	static getChangeSimSubmitData(state: AppState, subscription: Product, targetAgreementId: string): ChangeSimServiceSubmitData {
		const userIdentification = this.getRelevantUserIdentification(state);
		return {
			basketId: state.changeSim.basketId,
			selectedPaymentMethod: state.changeSim.selectedPaymentMethod!,
			selectedCustomerPaymentMethod: state.changeSim.selectedCustomerPaymentMethod,
			reasonPO: state.changeSim.selectedReason!,
			deliveryPO: state.changeSim.selectedShippingMethod!.productOffering,
			targetAgreementId: targetAgreementId!,
			changeSimSubscriptionIdCharacteristicName: state.feature.ecareChangeSim!
				.changeSimPOSubscriptionIdCharacteristicName!,
			changeSimPaymentMethodCharacteristicName: state.feature.ecareChangeSim!
				.changeSimPOPaymentMethodCharacteristicName!,
			reasonFeeAmountCharacteristicName: state.feature.ecareChangeSim!.reasonPOFeeAmountCharacteristicName!,
			deliveryContactInfoCharacteristicName: state.feature.ecareChangeSim!
				.deliveryPOContactInfoCharacteristicName!,
			deliveryIdentificationIdCharacteristicName: state.feature.ecareChangeSim!
				.deliveryPOIdentificationIdCharacteristicName!,
			deliveryVerificationMethodCharacteristicName: state.feature.ecareChangeSim!
				.deliveryPOVerificationMethodCharacteristicName!,
			deliveryVerificationMethodCharacteristicValue: state.feature.ecareChangeSim!
				.deliveryPOVerificationMethodCharacteristicValue!,
			caseCategoryId: state.feature.ecareChangeSim!.caseCategoryId!,
			initializeRequest: this.getChangeSimActionInitializeRequest(state, subscription, targetAgreementId)!,
			basketItemIdToRemove: state.changeSim.basketItemIdToRemove!,
			userIdentificationId: userIdentification && userIdentification.id,
			subscriptionId: subscription.id,
			deliveryAddress: state.changeSim.deliveryAddress,
		};
	}
	static logFeatureUnavailable(message: string) {
		TraceUtil.logOnce("Change SIM feature is not available. " + message);
	}
	static assertConfigurationValueExists(config: ChangeSimConfigurationType, key: keyof ChangeSimConfigurationType) {
		if (!config[key]) {
			throw new Error(`"${key}" key is not present in configuration`);
		}
	}
	static isValidConfiguration(config?: ChangeSimConfigurationType): boolean {
		if (!config) {
			ChangeSimSelector.logFeatureUnavailable(`Configuration required: ${CHANGE_SIM_CONFIGURATION_KEY}`);
			return false;
		}
		try {
			ChangeSimSelector.assertConfigurationValueExists(config, "POId");
			ChangeSimSelector.assertConfigurationValueExists(config, "deliveryPOVerificationMethodCharacteristicName");
			ChangeSimSelector.assertConfigurationValueExists(config, "deliveryPOVerificationMethodCharacteristicValue");
			ChangeSimSelector.assertConfigurationValueExists(config, "deliveryPOContactInfoCharacteristicName");
			ChangeSimSelector.assertConfigurationValueExists(config, "deliveryPOIdentificationIdCharacteristicName");
			ChangeSimSelector.assertConfigurationValueExists(config, "changeSimPOSubscriptionIdCharacteristicName");
			ChangeSimSelector.assertConfigurationValueExists(config, "changeSimPOPaymentMethodCharacteristicName");
			ChangeSimSelector.assertConfigurationValueExists(config, "reasonPOFeeAmountCharacteristicName");
			return true;
		} catch (e) {
			ChangeSimSelector.logFeatureUnavailable(
				`Wrong configuration ${CHANGE_SIM_CONFIGURATION_KEY}: ${e.message}`
			);
			return false;
		}
	}

	static getChangeSimActionInitializeRequest(state: AppState, subscription: Product | undefined, targetAgreementId: string | undefined):
		ChangeSimActionInitializeRequest | undefined {
		if (!subscription || !targetAgreementId) {
			return undefined;
		}
		const { ecareChangeSim } = state.feature;
		if (!this.isValidConfiguration(ecareChangeSim)) {
			return undefined;
		}
		const user = Selectors.user.getUser(state);
		if (!user) {
			return undefined;
		}
		const reasonsPOIds = ChangeSimSelector.getReasonsPOIds(state, subscription);
		if (reasonsPOIds.length === 0) {
			ChangeSimSelector.logFeatureUnavailable(
				`No reasons available. Check configuration ${CHANGE_SIM_CONFIGURATION_KEY}.activeSubscriptionReasonsPOIds ` +
					`or ${CHANGE_SIM_CONFIGURATION_KEY}.suspendedSubscriptionReasonsPOIds`
			);
			return undefined;
		}
		const userIdentification = this.getRelevantUserIdentification(state);
		if (!userIdentification) {
			ChangeSimSelector.logFeatureUnavailable(
				"current user doesn't have suitable identification. " +
					`Check user and optional configuration ${CHANGE_SIM_CONFIGURATION_KEY}.identificationsTypePriority`
			);
			return undefined;
		}

		return { poId: ecareChangeSim!.POId!, user, targetAgreementId, reasonsPOIds, subscription };
	}
	static isValidDeliveryDetails = (shippingMethodType: ShippingMethodType, deliveryPostalAddress?: PostalAddress) => {
		switch (shippingMethodType) {
			case ShippingMethodType.HOME_DELIVERY:
				return deliveryPostalAddress && !PostalAddressUtil.isEmptyAddress(deliveryPostalAddress);
			default:
				return false;
		}
	};

	static isValidPaymentSelection(state: AppState): boolean {
		const { selectedPaymentMethod, selectedCustomerPaymentMethod } = state.changeSim;
		if (!selectedPaymentMethod) {
			return false;
		}
		if (PaymentUtil.isBalancePaymentMethodId(selectedPaymentMethod)) {
			const feeAmount = this.getFeeAmount(state);
			const balance = this.getMonetaryChargingBalance(state);
			if (!feeAmount) {
				return false;
			}
			if (!balance) {
				return false;
			}
			return (balance.value || 0) >= (feeAmount.taxFreeAmount || 0);
		}
		if (selectedPaymentMethod === "creditcard") {
			return Boolean(selectedCustomerPaymentMethod);
		}
		return true;
	}
	static canProceedToMakeOrder(state: AppState): boolean {
		return Boolean(
			state.changeSim.selectedReason &&
				!state.changeSim.showingModifyAddressForm &&
				state.changeSim.selectedShippingMethod &&
				this.isValidDeliveryDetails(state.changeSim.selectedShippingMethod.type,
					state.changeSim.deliveryAddress && state.changeSim.deliveryAddress.postalAddress) &&
				(this.isPaymentSelectionNeeded(state) ? this.isValidPaymentSelection(state) : true)
		);
	}

	static getRelevantUserIdentification(state: AppState): Identification | undefined {
		const identifications = Selectors.user.getUserIdentifications(state);
		const typesPriority = state.feature.ecareChangeSim!.identificationsTypePriority;
		const isTypesPriorityConfigured = typesPriority && typesPriority.length > 0;

		return identifications.find(
			identification => !isTypesPriorityConfigured || typesPriority!.includes(identification.type)
		);
	}
	static isPaymentSelectionNeeded(state: AppState): boolean {
		const feeAmount = ChangeSimSelector.getFeeAmount(state);
		return Boolean(feeAmount.taxFreeAmount && feeAmount.taxFreeAmount > 0);
	}
	static getMonetaryChargingBalance(state: AppState): ChargingBalances | undefined {
		const balancePaymentMethod = state.changeSim.paymentMethods.find(paymentMethod =>
			PaymentUtil.isBalancePaymentMethodId(paymentMethod.id)
		);
		return (
			balancePaymentMethod && {
				id: balancePaymentMethod.id,
				value: balancePaymentMethod.balance,
				currency: state.currency.selectedCurrency
			}
		);
	}
}
