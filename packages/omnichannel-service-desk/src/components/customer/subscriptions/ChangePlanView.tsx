"use strict";
import * as React from "react";
import ChangePlanButtonContainer from "./ChangePlanButtonContainer";
import { merge } from "lodash";
import { withRouter, RouteComponentProps } from "react-router";
import {
	PlanListModal,
	PlanConfigurationModal,
	ProductOfferingUtil,
	ProductOfferingType,
	Product,
	ProductOffering,
	Configurations,
	BasketActionAddChangePlanBasketItem,
	BasketActionCreateBasket,
	BasketActionDiscardBackendBasket,
	BasketActionAddProductToBasket,
	ProductPath,
} from "omnichannel-common-pos";
import messages from "../../../index.messages";

export interface ChangePlanViewStoreProps {
	subscription: Product;
	eligibilityQueryActive: boolean;
	addonCompatibilityQueryActive: boolean;
	alternatePlans: Array<ProductOffering>;
	msisdn?: string;
	addons: {
		compatible: Array<Product>;
		incompatible: Array<Product>;
	};
	configurations: any;
	errorCode?: string;
	basketId: string;
	customerId: string;
	enableChangeSubscription: boolean;
}

export interface ChangePlanViewActionProps {
	actions: {
		checkEligibilities: () => void;
		checkAddonCompatibilities: (newPlanId: string, addonIds: Array<string>) => void;
		deleteUIbasket: () => void;
		discardBackendBasket: BasketActionDiscardBackendBasket;
		createBasket: BasketActionCreateBasket;
		addProductToBasket: BasketActionAddProductToBasket;
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		addChangePlanBasketItem: BasketActionAddChangePlanBasketItem;
		toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		changeActiveAgreement: (agreementId: string) => void;
	};
}

export type Props = ChangePlanViewStoreProps & ChangePlanViewActionProps & RouteComponentProps<any>;

export type State = {
	currentModal: string | undefined;
	selectedPlan?: ProductOffering;
	creatingBasket: boolean;
};

export enum ModalType {
	LIST = "PlanListModal",
	CONFIGURATION = "PlanConfigurationModal",
	CONFIRMATION = "PlanChangeConfirmationModal"
}

class ChangePlanView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			currentModal: undefined,
			selectedPlan: undefined,
			creatingBasket: false
		};
	}

	showPlanConfiguration = (selectedPlan?: ProductOffering) => {
		const { actions: { checkAddonCompatibilities }, subscription } = this.props;
		if (selectedPlan) {
			checkAddonCompatibilities(selectedPlan.id, this.getAddonIds(subscription));
		}
		this.setState({
			currentModal: ModalType.CONFIGURATION,
			selectedPlan
		});
	};

	getAddonIds = (subscription: Product): Array<string> => {
		const childProducts: Product[] = subscription.childProducts || [];
		return childProducts.filter((child: Product) =>
				child.lifeCycleStatus === "ACTIVE" && child.specSubType === "ADDITIONAL")
			.map(child => child.productOfferingId);
	};

	showPlanList = () => {
		this.setState({
			currentModal: ModalType.LIST,
			selectedPlan: undefined
		});
	};

	closeModal = () => {
		this.setState({
			currentModal: undefined,
			selectedPlan: undefined
		});
	};

	initiateChange = () => {
		const { actions: { checkEligibilities } } = this.props;
		checkEligibilities();
		this.showPlanList();
	};

	proceedToPayment = async (agreementId: string, productOfferingConfiguration: Configurations) => {
		const { actions: { discardBackendBasket, createBasket, addChangePlanBasketItem, deleteUIbasket, changeActiveAgreement }, basketId, customerId, subscription } = this.props;
		this.setState({ creatingBasket: true });
		await deleteUIbasket();
		await discardBackendBasket(basketId, true);
		await createBasket(customerId);
		await changeActiveAgreement(agreementId);
		const mergedProduct = ProductOfferingUtil.mergeConfigurations(this.state.selectedPlan as ProductOfferingType, productOfferingConfiguration);
		const hybridPrePlan = subscription.instanceCharacteristics && !!subscription.instanceCharacteristics['CH_change_plan_type']  ?
			subscription.instanceCharacteristics['CH_change_plan_type'].values[0].value : undefined;
		// Need to manually modify the product since change subscription/plan requires it
		const mergedProductWithChangePlanCharacteristics = merge(mergedProduct, {
			id: hybridPrePlan || "PO_Change_Plan",
			attributes: {
				inputtedCharacteristics: {
					CH_Inventory_Id: subscription && subscription.id,
					CH_New_Plan_Offer_ID: this.state.selectedPlan && this.state.selectedPlan.id
				}
			}
		});

		await addChangePlanBasketItem({
			productOffering: mergedProductWithChangePlanCharacteristics,
			basketId: this.props.basketId,
			targetAgreementId: agreementId,
			oldSubscriptionProductId: subscription.id
		});

		this.setState({ creatingBasket: false }, () => this.props.history.push("/servicedesk/checkout"));
	};

	render() {
		const {
			addons,
			errorCode,
			subscription,
			alternatePlans,
			eligibilityQueryActive,
			addonCompatibilityQueryActive,
			configurations,
			actions: {
				setInputtedCharacteristic,
				toggleProductOffering,
				selectProductOffering,
			},
			enableChangeSubscription
		} = this.props;

		const productOfferingConfiguration = configurations && this.state.selectedPlan && configurations[this.state.selectedPlan.id];
		const messageKey = errorCode && ("changePlan_" + errorCode.trim());
		const errorMessage = messageKey && (messages as any)[messageKey];
		const subscriptionTypeFlag = enableChangeSubscription && !(subscription && subscription.realizingResources[0].type=== "DEVICE");
		
			return subscriptionTypeFlag ? (
				<div>
					<ChangePlanButtonContainer handleClick={this.initiateChange} />
					{this.state.currentModal === ModalType.LIST && (
						<PlanListModal
							currentSubscriptionTitle={subscription && subscription.name}
							plans={alternatePlans}
							actions={{
								handleSelect: (offering: ProductOffering) => this.showPlanConfiguration(offering),
								handleClose: this.closeModal,
							}}
							showLoadingIndicator={eligibilityQueryActive}
							errorMessage={errorMessage}
						/>
					)}
					{this.state.currentModal === ModalType.CONFIGURATION && (
						<PlanConfigurationModal
							productOffering={this.state.selectedPlan}
							currentProduct={subscription}
							actions={{
								setInputtedCharacteristic: setInputtedCharacteristic,
								toggleProductOffering: toggleProductOffering,
								selectProductOffering: selectProductOffering,
								proceedToPayment: () => this.proceedToPayment(subscription.agreementId, productOfferingConfiguration),
								handleBack: this.showPlanList,
								handleClose: this.closeModal
							}}
							hideConfigs={true}
							addons={addons}
							showLoadingIndicator={addonCompatibilityQueryActive || this.state.creatingBasket}
						/>
					)}
				</div>
			) : (
				null
			);
				
	}
}

const ChangePlanViewWithRouter: React.ComponentClass<ChangePlanViewStoreProps & ChangePlanViewActionProps> = withRouter<Props>(ChangePlanView);
export default ChangePlanViewWithRouter;
