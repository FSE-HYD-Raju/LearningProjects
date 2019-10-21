import { HasId } from "./HasId";

interface CallForwardingService {
	id: string;
	reason: string;
	specificationId: string;
	inputtedCharacteristics?: Record<string, string>;
}

interface CallForwardingServiceModifyAttributes {
	agreementId?: string;
	callForwardingServices: Array<CallForwardingService>;
}

interface CallForwardingServiceModify extends HasId {
	attributes: CallForwardingServiceModifyAttributes;
}

export {
	CallForwardingServiceModifyAttributes,
	CallForwardingService,
	CallForwardingServiceModify
};
