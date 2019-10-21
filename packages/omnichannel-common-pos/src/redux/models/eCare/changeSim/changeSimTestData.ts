import { ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import { MockDataMaker } from "../../../../testUtils";
import { ChangeSimActionInitializeRequest } from "./changeSim.types";
import { Product } from "../../../types";

export const initializeRequest: ChangeSimActionInitializeRequest = {
	subscription: { id: "product1" } as Product,
	poId: "PO_change_sim",
	user: MockDataMaker.user.make(),
	targetAgreementId: "TA1",
	reasonsPOIds: ["stolen"]
};
export const submitData: ChangeSimServiceSubmitData = {
	basketId: "basket1",
	selectedPaymentMethod: "balance",
	selectedCustomerPaymentMethod: undefined,
	reasonPO: MockDataMaker.productOffering.make(),
	deliveryPO: MockDataMaker.productOffering.make(),
	targetAgreementId: "TA1",
	initializeRequest,
	changeSimSubscriptionIdCharacteristicName: "T_subscription_id",
	changeSimPaymentMethodCharacteristicName: "T_payment_method",
	reasonFeeAmountCharacteristicName: "T_reason",
	deliveryContactInfoCharacteristicName: "T_postal_address_id",
	deliveryIdentificationIdCharacteristicName: "T_identification_id",
	deliveryVerificationMethodCharacteristicName: "T_verification_method",
	deliveryVerificationMethodCharacteristicValue: "T_simicc",
	basketItemIdToRemove: "basket_item_1",
	userIdentificationId: initializeRequest.user.attributes!.identifications![0].id,
	subscriptionId: initializeRequest.subscription.id,
	deliveryAddress: {
		postalAddress: initializeRequest.user.attributes!.postalAddresses![0],
		forceCreation: true,
	},
	caseCategoryId: "case_category_1",
	caseAttachments: []
};
