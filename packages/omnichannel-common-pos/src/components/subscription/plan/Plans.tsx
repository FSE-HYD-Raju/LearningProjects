import * as R from "react";
import { get } from "lodash";
import { Component, ComponentType } from "react";
import {
	Agreement,
	Basket,
	BasketActionDiscardBasket,
	BasketActionSubmitBasket,
	SalesActionCommitProductReplace,
	SalesActionSubmitProductConfiguration,
	ContextualPaymentMethodsWithExtraInfo,
	Product,
	ProductOffering,
	SalesActionInitializeProductReplace,
	Configurations,
	ProductAttributes,
	ProductLifecycleStatus, ProductPath, ProductOfferingsConfigObject,
} from "../../../redux/types";
import cssns from "../../../utils/cssnsConfig";
import PlanListModal from "./modals/PlanListModal";
import PlanComparisonModal from "./modals/PlanComparisonModal";
import PlanChangeConfirmationModal from "./modals/PlanChangeConfirmationModal";
import PlanChangeResultModal from "./modals/PlanChangeResultModal";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
import { ContextType, contextTypesValidationMap } from "../../../types";
import PlanUtils from "./Plan.utils";
import { SalesActionGetProductsFromCategory } from "../../../redux/types/fluxActions";
import { ProductConfigurationSummary } from "../../../redux";
import PaymentInvocation from "../../../redux/types/payment/PaymentInvocation";
import ExistingPlanConfigurationModalContainer from "../../product/ExistingPlanConfigurationModalContainer";
import PlanConfigurationModal from "./modals/PlanConfigurationModal";
import { PlansListView, RowRendererProps } from "./list/PlansListView";
import PlanRow from "./list/PlanRow";

const { React } = cssns("Plans");

interface PlansOwnProps {
	hideListing?: boolean;
	subscription: Product;
	focusedProductId?: string;
	showActions?: boolean;
	rowRenderer?: ComponentType<RowRendererProps>;
}

interface PlansStateProps {
	agreements: Array<Agreement>;
	alternatePlans?: Array<ProductOffering>;
	contextualPaymentMethodsWithExtraInfo?: ContextualPaymentMethodsWithExtraInfo;
	focusedPlan?: ProductOffering;
	individualId?: string;
	paymentInfo?: PaymentInvocation;
	productConfigurationSummary?: ProductConfigurationSummary;
	configurations: Configurations;
	submittedBasket?: Basket;
	subscription: Product;
	plan?: ProductOffering;
	showChangePlanAction: (plan: Product) => boolean;
	showConfigurePlanAction: (plan: Product) => boolean;
}

interface PlansActionProps {
	actions: {
		commitProductReplace: SalesActionCommitProductReplace;
		resetProductConfiguration: () => void;
		submitProductConfiguration: SalesActionSubmitProductConfiguration;
		resetProductChange: () => void;
		initializeProductReplace: SalesActionInitializeProductReplace;
		getProductById: (id: string) => void;
		getProductsByIds: (ids: Array<string>) => void;
		getProductsFromCategory: SalesActionGetProductsFromCategory;
		discardBasket: BasketActionDiscardBasket;
		submitBasket: BasketActionSubmitBasket;
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void,
		onChangePlan: (id: string) => void;
	};
}

enum ModalType {
	LIST = "PlanListModal",
	CONFIGURATION = "PlanConfigurationModal",
	CONFIRMATION = "PlanChangeConfirmationModal",
	COMPARISON = "PlanComparisonModal",
	CHANGE_RESULT = "PlanChangeResultModal",
}

interface PlansState {
	currentModal?: ModalType;
	retiringPlan?: Product;
	focusedOffering?: ProductOffering;
	productReplaceResult?: ProductOffering;
	expanded: boolean;
	selectedPlan?: Product;
}

type PlansProps = PlansOwnProps & PlansStateProps & PlansActionProps;

class Plans extends Component<PlansProps, PlansState> {
	static displayName = "Plans";
	static contextTypes = contextTypesValidationMap;

	constructor(props: PlansProps, context: ContextType) {
		super(props, context);
		this.state = {
			expanded: true,
		};
	}

	componentWillReceiveProps(newProps: PlansProps) {
		const {
			alternatePlans,
			focusedProductId,
			paymentInfo,
			submittedBasket,
			contextualPaymentMethodsWithExtraInfo
		} = newProps;

		const hasPlans = alternatePlans && alternatePlans.length > 0;

		if ((paymentInfo || (submittedBasket && !submittedBasket.hideLifeCycleStatusChangeModal)) && contextualPaymentMethodsWithExtraInfo) {
			this.setState({
				currentModal: ModalType.CHANGE_RESULT
			});
		} else if (hasPlans && !this.state.currentModal && focusedProductId) {
			this.showPlanList();
		}
	}

	componentDidMount() {
		if (this.props.subscription) {
			const planProductOfferingIds = (this.props.subscription.childProducts || []).filter((product: Product) => product.isPlan)
				.map((plan: Product) => plan.productOfferingId);
			this.props.actions.getProductsByIds(planProductOfferingIds);
		}
	}

	onChangePlan = (plan: Product) => {
		this.setState({
			retiringPlan: plan
		});
		this.props.actions.onChangePlan(plan.productOfferingId);
	};

	closeModal = () => {
		this.setState({
			retiringPlan: undefined,
			currentModal: undefined,
			focusedOffering: undefined,
			productReplaceResult: undefined
		});
		this.props.actions.resetProductChange();
	};

	showPlanList = (focusedOffering?: ProductOffering) => {
		this.setState({
			currentModal: ModalType.LIST,
			focusedOffering
		});
	};

	showPlanComparison = (focusedOffering?: ProductOffering) => {
		this.setState({
			currentModal: ModalType.COMPARISON,
			focusedOffering
		});
	};

	showPlanConfiguration = (focusedOffering?: ProductOffering) => {
		this.setState({
			currentModal: ModalType.CONFIGURATION,
			focusedOffering
		});
	};

	showPlanChangeConfirmation = (focusedOffering?: ProductOffering) => {
		this.setState({
			currentModal: ModalType.CONFIRMATION,
			focusedOffering
		});
	};

	toggleExpanded = (value: any) => {
		this.setState({
			expanded: Boolean(value)
		});
	};

	returnToConfiguration = (focusedOffering = this.state.focusedOffering) => {
		const { contextualPaymentMethodsWithExtraInfo, individualId } = this.props;
		if (contextualPaymentMethodsWithExtraInfo && individualId) {
			this.props.actions.discardBasket(contextualPaymentMethodsWithExtraInfo.basketId, individualId);
		}

		this.setState({
			currentModal: ModalType.CONFIGURATION,
			focusedOffering
		});
	};

	switchToPlan = (focusedOffering?: ProductOffering) => {
		this.setState({
			currentModal: ModalType.CONFIGURATION,
			focusedOffering
		});
	};

	proceedToPayment = (agreementId: string, productConfiguration?: ProductOfferingsConfigObject) => {
		this.setState({
			currentModal: ModalType.CONFIRMATION,
		});

		const { subscription, focusedProductId } = this.props;
		const { focusedOffering } = this.state;

		const retiringProduct: Product | undefined = this.state.retiringPlan
			|| (subscription!.childProducts || []).find((p: Product) => p.productOfferingId === focusedProductId)
			|| (subscription!.productOfferingId === focusedProductId ? subscription : undefined);

		this.props.actions.initializeProductReplace(
			this.props.individualId!,
			agreementId,
			retiringProduct ? retiringProduct.id : "",
			focusedOffering!.id,
			focusedOffering!.type!,
			(productConfiguration && productConfiguration.inputtedCharacteristics) || productConfiguration || {}
		);
	};

	cancelChange = () => {
		const { contextualPaymentMethodsWithExtraInfo, individualId } = this.props;
		if (individualId && contextualPaymentMethodsWithExtraInfo) {
			this.props.actions.discardBasket(
				contextualPaymentMethodsWithExtraInfo.basketId,
				individualId
			);
		}
		this.closeModal(); // should we close modal only in case we succeeded?
	};

	pay = (paymentMethodId?: string) => {
		const {
			basketId,
			contextualPaymentMethods
		} = this.props.contextualPaymentMethodsWithExtraInfo!;

		if (paymentMethodId && contextualPaymentMethods) {
			this.props.actions.commitProductReplace(basketId, paymentMethodId);
		} else {
			this.props.actions.submitBasket(basketId, true);
		}
	};

	selectPlan = (plan: Product) => {
		this.setState({selectedPlan: plan});
		this.props.actions.getProductById(plan.productOfferingId);
	};

	planWithCharacteristics = (): any => {
		if (this.props.plan && this.state.selectedPlan) {
			const merged: any = {...this.props.plan};
			if (!merged.attributes) {
				merged.attributes = {} as any as ProductAttributes;
			}
			merged.attributes.characteristics = {
				...merged.attributes.characteristics,
			};
			return merged;
		}
		return undefined;
	};

	render() {
		const {
			contextualPaymentMethodsWithExtraInfo,
			focusedProductId,
			configurations,
			subscription,
			showChangePlanAction,
			showConfigurePlanAction,
		} = this.props;

		if (!subscription) {
			return null;
		}

		const contextualPaymentMethods = get(contextualPaymentMethodsWithExtraInfo, "contextualPaymentMethods");
		const initializedBasket = get(contextualPaymentMethodsWithExtraInfo, "initializedBasket");

		const agreement = this.props.agreements && this.props.agreements.find(a => subscription && a.id === subscription.agreementId);

		const plans: Product[] = PlanUtils.extractPlans(agreement).filter((plan: Product) => plan.lifeCycleStatus === ProductLifecycleStatus.ACTIVE);

		const retiringProduct = this.state.retiringPlan || (subscription.childProducts || []).find((p: Product) => p.productOfferingId === focusedProductId);

		const alternatePlans = retiringProduct && this.props.alternatePlans
			&& this.props.alternatePlans.filter(po => po.id !== retiringProduct.productOfferingId);

		const productOfferingConfiguration: ProductOfferingsConfigObject | undefined = configurations && this.state.focusedOffering
			&& configurations[this.state.focusedOffering.id];

		const { currentModal } = this.state;
		return (
			<div className="main-container">
				{!this.props.hideListing && (
					<PlansListView
						plans={plans}
						rowRenderer={this.props.rowRenderer || PlanRow}
						showChangePlanAction={showChangePlanAction}
						showConfigurePlanAction={showConfigurePlanAction}
						subscription={this.props.subscription}
						actions={{
							onChangePlan: this.onChangePlan,
							onConfigurePlan: this.selectPlan,
						}}
					/>
				)}

				{this.planWithCharacteristics() && (
					<ExistingPlanConfigurationModalContainer
						plan={this.planWithCharacteristics()}
						parentProductId={subscription!.id}
						flux={this.context.flux}
					/>
				)}

				{currentModal === ModalType.LIST && (
					<PlanListModal
						currentSubscriptionTitle={subscription && subscription.name}
						plans={alternatePlans}
						actions={{
							handleSelect: (offering: ProductOffering) => this.showPlanConfiguration(offering),
							handleCompare: (plan: ProductOffering) => this.showPlanComparison(plan),
							handleClose: this.closeModal,
						}}
					/>
				)}

				{currentModal === ModalType.COMPARISON && (
					<PlanComparisonModal
						productOfferings={this.props.alternatePlans}
						selectedOffering={this.state.focusedOffering}
						currentPlan={retiringProduct}
						actions={{
							switchToPlan: (offering: ProductOffering) => this.switchToPlan(offering),
							close: this.closeModal,
						}}
					/>
				)}

				{currentModal === ModalType.CONFIGURATION && (
					<PlanConfigurationModal
						productOffering={this.state.focusedOffering as ProductOffering}
						currentProduct={retiringProduct}
						actions={{
							proceedToPayment: () => this.proceedToPayment(subscription.agreementId, productOfferingConfiguration),
							handleBack: () => this.showPlanList(this.state.focusedOffering),
							handleClose: this.closeModal,
							setInputtedCharacteristic: this.props.actions.setInputtedCharacteristic,
							toggleProductOffering: this.props.actions.toggleProductOffering,
							selectProductOffering: this.props.actions.selectProductOffering,
						}}
					/>
				)}

				{currentModal === ModalType.CONFIRMATION && initializedBasket && (
					<PlanChangeConfirmationModal
						selectedOffering={this.state.focusedOffering}
						currentProduct={retiringProduct}
						totalPrices={contextualPaymentMethodsWithExtraInfo ? (contextualPaymentMethodsWithExtraInfo.totalPrices) : null}
						initializedBasket={initializedBasket}
						contextualPaymentMethods={contextualPaymentMethods}
						actions={{
							pay: (paymentMethodId?: string) => this.pay(paymentMethodId),
							handleBack: this.returnToConfiguration,
							handleClose: this.cancelChange,
						}}
					/>
				)}

				{currentModal === ModalType.CHANGE_RESULT && (this.props.submittedBasket || this.props.paymentInfo) && (
					<PlanChangeResultModal
						paymentInfo={this.props.paymentInfo}
						actions={{
							handleBack: this.returnToConfiguration,
							handleClose: this.closeModal,
						}}
						submittedBasket={this.props.submittedBasket}
					/>
				)}
			</div>
		);
	}
}

export default withCustomization<PlansProps>(CommonCustomizationPoints.TARIFF_PLANS, Plans);
export {
	PlansProps,
	PlansOwnProps,
	PlansStateProps,
	PlansActionProps
};
