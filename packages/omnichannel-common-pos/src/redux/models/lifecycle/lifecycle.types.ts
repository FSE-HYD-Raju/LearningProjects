import { Reason } from "../../types/Reason";
import {
	ProductModificationCombined,
	ServiceModificationCombined,
	ServiceModificationInitialization
} from "../../types";
import { ProductModificationResult } from "../../types/ProductModification";
import { LifecycleChangeAction } from "../../types/LifecycleChangeAction";
import { Service } from "../../types/Service";
import { Product } from "../../types/Product";

interface InitializeServiceStateTransitionsParam {
	service: Service;
	stateTransition: LifecycleChangeAction;
	agreementId: string | undefined;
	customerId: string | undefined;
	reason: string | undefined;
}

interface InitializeAddonStateTransitionParam {
	agreementId: string;
	addon: Product;
	stateTransition: LifecycleChangeAction;
	customerAccountId: string | undefined;
	paymentMethodId: string | undefined;
	reason: string | undefined;
}

type LifecycleState = {
	productModification?: ProductModificationCombined;
	serviceModification?: ServiceModificationCombined;
	reasons: Array<Reason>;
	transition?: LifecycleChangeAction;
	selectedService?: Service;
	selectedAddon?: Product;
	stateTransitionByActionName?: Record<string, Array<string> | string>;
	serviceStateTransitionByActionName: any;
};

export {
	InitializeServiceStateTransitionsParam,
	InitializeAddonStateTransitionParam,
	LifecycleState,
};
