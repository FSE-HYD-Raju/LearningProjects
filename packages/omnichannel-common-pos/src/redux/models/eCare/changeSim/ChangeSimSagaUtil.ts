import { ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import {
	ChangeResourceInitialization,
	ChangeSimActionInitializeRequest,
	ContextualPaymentMethod,
	ProductOfferingShippingMethod,
	ProductOfferingType
} from "../../../types";
import { ChangeSimService, DeliveryService } from "../../../services";
import ProductOfferingService from "../../../services/ProductOfferingService";
import CasesService from "../../../services/CasesService";
import { ChangeSimUtil } from "./changeSim.util";
import { isEmpty } from "lodash";
import TraceUtil from "../../../../utils/TraceUtil";
import { CHANGE_SIM_CONFIGURATION_KEY } from "./changeSim.feature";

export interface ReinitializationResult {
	basketId: string;
	basketItemIdToRemove: string;
}
export default class ChangeSimSagaUtil {
	static async reinitializeBeforeSubmit(
		submitData: ChangeSimServiceSubmitData
	): Promise<ReinitializationResult | undefined> {
		const changeSimInitializeResult: ChangeResourceInitialization | undefined = await ChangeSimService.initialize(
			submitData.initializeRequest
		);
		const basketId = ChangeSimUtil.extractBasketId(changeSimInitializeResult);
		const basketItemIdToRemove = ChangeSimUtil.extractBasketItemIdToRemove(changeSimInitializeResult);
		if (!basketId || !basketItemIdToRemove) {
			console.error("Cannot reinitialize basket on change SIM submit retry");
			return;
		}
		return { basketId, basketItemIdToRemove };
	}
	static async submitCaseWithAttachments(submitData: ChangeSimServiceSubmitData): Promise<void> {
		const caseAttachments = submitData.caseAttachments;
		// create case only if have attachments
		if (!caseAttachments || caseAttachments.length === 0) {
			return;
		}
		if (isEmpty(submitData.caseCategoryId)) {
			TraceUtil.logOnce(
				"Change SIM feature is not fully functional. " +
					`Case cannot be created, check configuration ${CHANGE_SIM_CONFIGURATION_KEY}.caseCategoryId`
			);
			return;
		}
		await CasesService.addCustomerCase({
			actorId: submitData.initializeRequest.user.id,
			description: "",
			categoryId: submitData.caseCategoryId,
			formattedName: submitData.initializeRequest.user.attributes.formattedName,
			attachments: caseAttachments
		});
	}
	static async fetchReasons(reasonsPOIds: string[]): Promise<ProductOfferingType[]> {
		const reasons: ProductOfferingType[] = [];
		for (const reasonPOId of reasonsPOIds) {
			try {
				const po = await Promise.resolve(ProductOfferingService.getProductOffering(reasonPOId));
				reasons.push(po);
			} catch (e) {
				// skip fetching PO error
			}
		}
		return reasons;
	}

	static hasCreditCardPaymentMethod(changeSimInitializeResult: ChangeResourceInitialization): boolean {
		if (
			!changeSimInitializeResult ||
			!changeSimInitializeResult.attributes ||
			!changeSimInitializeResult.attributes.paymentMethods
		) {
			return false;
		}
		const paymentMethods = changeSimInitializeResult.attributes.paymentMethods;
		return Boolean(paymentMethods.find(paymentMethod => paymentMethod.id === "creditcard"));
	}
}
