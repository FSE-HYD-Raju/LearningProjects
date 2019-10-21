import { BasketValidationAction, HasId } from "./index";

interface BasketValidationInformationAttributes extends HasId {
	action?: BasketValidationAction;
	message?: string;
	referredInput?: Record<string, string>;
	severity?: string;
}

interface BasketValidationInformation {
	attributes: BasketValidationInformationAttributes;
}

export {
	BasketValidationInformation,
	BasketValidationInformationAttributes
};
