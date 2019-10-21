import { BasketItem } from "./BasketItem";
import { Basket } from "./Basket";
import { HasId } from "./HasId";
import { ContextualPaymentMethod, Person } from "./index";

interface ServiceModificationInitializationAttributes extends HasId {
	agreementId?: string;
	productId?: string;
	productOfferingId?: string;
	stateTransition?: "RESUME" | "REACTIVATE" | "SUSPEND" | "DISABLE" | "DEACTIVATE";
	owner?: Person;
	reason?: string;
	actionId?: string;
	paymentUseCase?: string;
	paymentMethods?: Array<ContextualPaymentMethod>;
	serviceName: string;
}

interface ServiceModificationInitialization extends ServiceModificationInitializationAttributes {
	attributes?: ServiceModificationInitializationAttributes;
}

interface ServiceModificationInitializationResult {
	data: ServiceModificationInitialization;
	included?: Array<any>;
}

interface ServiceModificationResult {
	id: string;
	basket: Basket;
}

interface ServiceModificationCombined {
	resource: ServiceModificationInitialization;
	basket?: Basket;
	basketItems: Array<BasketItem>;
}

export {
	ServiceModificationInitialization,
	ServiceModificationInitializationAttributes,
	ServiceModificationCombined,
	ServiceModificationInitializationResult,
	ServiceModificationResult
};
