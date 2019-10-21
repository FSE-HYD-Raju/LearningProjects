import * as R from "react";
import { get, isEmpty } from "lodash";
import {
	Agreement,
	Basket,
	BasketActionDiscardBasket,
	BasketActionSubmitBasket, Configurations,
	ContextualPaymentMethodsWithExtraInfo,
	Product,
	ProductOffering, ProductOfferingsConfigObject, ProductPath,
	SalesActionInitializeNewPlanOrder,
	SalesActionSubmitNewPlanOrder
} from "../../../redux/types";
import ProductUtil from "../../../utils/product/ProductUtil";
import PlanListModal from "./modals/PlanListModal";
import PlanConfigurationModal from "./modals/PlanConfigurationModal";
import PlanChangeConfirmationModal from "./modals/PlanChangeConfirmationModal";
import PlanChangeResultModal from "./modals/PlanChangeResultModal";
import messages from "./Plans.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { PureComponent } from "react";
import cssns from "../../../utils/cssnsConfig";
import PaymentInvocation from "../../../redux/types/payment/PaymentInvocation";
import { OcButton, OcButtonSize, OcButtonType } from "../../ocComponents/button/OcButton";

const React = cssns("AddNewPlanContainer").React as typeof R;

interface AddNewPlanContainerStateProps {
	agreement?: Agreement;
	subscription?: Product;
	alternatePlans: Array<ProductOffering>;
	configurations: Configurations;
	paymentInfo?: PaymentInvocation;
	individualId?: string;
	submittedBasket?: Basket;
	contextualPaymentMethodsWithExtraInfo?: ContextualPaymentMethodsWithExtraInfo;
}

interface AddNewPlanContainerActionProps {
	actions: {
		discardBasket: BasketActionDiscardBasket;
		submitBasket: BasketActionSubmitBasket;
		resetNewPlanOrder: () => void;
		resetConfigurations: () => void;
		submitNewPlanOrder: SalesActionSubmitNewPlanOrder;
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => void;
		initializeNewPlanOrder: SalesActionInitializeNewPlanOrder;
		getAvailablePlans: () => void;
	};
}

interface AddNewPlanContainerState {
	currentModal: string;
	retiringPlan?: ProductOffering;
	focusedOffering?: ProductOffering;
	productReplaceResult: object;
	expanded: boolean;
	selectedPlan?: ProductOffering;
	msisdnModalVisible: boolean;
	productConfiguration?: ProductOfferingsConfigObject;
}

type AddNewPlanContainerProps = AddNewPlanContainerStateProps & AddNewPlanContainerActionProps;

class AddNewPlanContainer extends PureComponent<AddNewPlanContainerProps, AddNewPlanContainerState> {
	static displayName = "AddNewPlanContainer";

	constructor(props: AddNewPlanContainerProps) {
		super(props);

		this.state = {
			currentModal: "",
			productReplaceResult: {},
			expanded: true,
			msisdnModalVisible: false,
		};
	}

	componentWillReceiveProps(props: AddNewPlanContainerProps) {
		const { paymentInfo, submittedBasket, contextualPaymentMethodsWithExtraInfo } = props;

		if ((!isEmpty(paymentInfo) || (!isEmpty(submittedBasket) && !submittedBasket!.hideLifeCycleStatusChangeModal))
			&& !isEmpty(contextualPaymentMethodsWithExtraInfo)) {
			this.setState({
				currentModal: "PlanChangeResultModal"
			});
		}
	}

	componentDidMount() {
		this.props.actions.getAvailablePlans();
	}

	closeModal = () => {
		this.setState({
			currentModal: "",
			focusedOffering: undefined,
		});
		this.props.actions.resetConfigurations();
		this.props.actions.resetNewPlanOrder();
	};

	showPlanList = () => {
		this.setState({
			currentModal: "PlanListModal"
		});
	};

	showPlanConfiguration = (focusedOffering: ProductOffering) => {
		this.setState({
			currentModal: "PlanConfigurationModal",
			focusedOffering
		});
	};

	showPlanChangeConfirmation = (focusedOffering: ProductOffering) => {
		this.setState({
			currentModal: "PlanChangeConfirmationModal",
			focusedOffering
		});
	};

	toggleExpanded = (value: boolean) => {
		this.setState({
			expanded: Boolean(value)
		});
	};

	returnToConfiguration = (focusedOffering: ProductOffering | undefined = this.state.focusedOffering) => {
		const { contextualPaymentMethodsWithExtraInfo, individualId } = this.props;
		if (contextualPaymentMethodsWithExtraInfo && individualId) {
			this.props.actions.discardBasket(contextualPaymentMethodsWithExtraInfo.basketId, individualId);
		}

		this.setState({
			currentModal: "PlanConfigurationModal",
			focusedOffering
		});
	};

	proceedToPayment = (agreementId: string, productConfiguration?: ProductOfferingsConfigObject) => {
		this.setState({
			currentModal: "PlanChangeConfirmationModal",
			productConfiguration
		});

		this.props.actions.initializeNewPlanOrder(
			this.props.individualId || undefined,
			agreementId,
			this.state.focusedOffering,
			this.props.configurations
		);
	};

	cancelChange = () => {
		const { contextualPaymentMethodsWithExtraInfo, individualId } = this.props;
		if (contextualPaymentMethodsWithExtraInfo && individualId) {
			this.props.actions.discardBasket(contextualPaymentMethodsWithExtraInfo.basketId, individualId);
		}
		this.closeModal();
	};

	pay = (paymentMethodId?: string) => {
		const basketId = this.props.contextualPaymentMethodsWithExtraInfo && this.props.contextualPaymentMethodsWithExtraInfo.basketId;
		if (basketId) {
			this.props.actions.submitNewPlanOrder(basketId, paymentMethodId);
		}
	};

	toggleMsisdnModal = (visible: boolean) => {
		this.setState({
			msisdnModalVisible: visible
		});
	};

	render() {
		const {
			configurations,
			subscription,
			contextualPaymentMethodsWithExtraInfo
		} = this.props;

		const productOfferingConfiguration: ProductOfferingsConfigObject | undefined = configurations && this.state.focusedOffering
			&& configurations[this.state.focusedOffering.id] || undefined;

		const initializedBasket = get(contextualPaymentMethodsWithExtraInfo, "initializedBasket");
		const contextualPaymentMethods = contextualPaymentMethodsWithExtraInfo && contextualPaymentMethodsWithExtraInfo.contextualPaymentMethods;
		const titleText = ProductUtil.getPhoneNumber(subscription);

		const { currentModal } = this.state;
		const { actions } = this.props;

		return (
			<div className="main-container">
				<div className="inner-container">
					<OcButton
						id={"ecare-buttonChangePlan-add-new-plan"}
						buttonSize={OcButtonSize.SMALL}
						buttonType={OcButtonType.PRIMARY}
						onClick={this.showPlanList}
					>
						<FormattedMessage {...messages.addNewPlan} />
					</OcButton>
				</div>
				{currentModal === "PlanListModal" && (
					<PlanListModal
						currentSubscriptionTitle={titleText}
						plans={this.props.alternatePlans}
						actions={{
							handleSelect: (offering: ProductOffering) => this.showPlanConfiguration(offering),
							handleClose: this.closeModal,
						}}
						newPlan={true}
					/>
				)}
				{currentModal === "PlanConfigurationModal" && (
					<PlanConfigurationModal
						actions={{
							handleBack: this.showPlanList,
							handleClose: this.closeModal,
							toggleProductOffering: actions.toggleProductOffering,
							setInputtedCharacteristic: actions.setInputtedCharacteristic,
							selectProductOffering: actions.selectProductOffering,
							proceedToPayment: () => {
								this.proceedToPayment(subscription!.agreementId, productOfferingConfiguration);
							}
						}}
						currentProduct={this.props.subscription}
						configurations={this.props.configurations}
						product={this.state.focusedOffering}
						newPlan={true}
					/>
				)}

				{currentModal === "PlanChangeConfirmationModal" && initializedBasket && (
					<PlanChangeConfirmationModal
						selectedOffering={this.state.focusedOffering}
						totalPrices={
							contextualPaymentMethodsWithExtraInfo ? contextualPaymentMethodsWithExtraInfo.totalPrices : null
						}
						initializedBasket={initializedBasket}
						contextualPaymentMethods={contextualPaymentMethods}
						actions={{
							pay: (paymentMethodId?: string) => { this.pay(paymentMethodId); },
							handleBack: this.returnToConfiguration,
							handleClose: this.cancelChange,
						}}
					/>
				)}

				{currentModal === "PlanChangeResultModal" && (this.props.submittedBasket || this.props.paymentInfo) && (
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

export default AddNewPlanContainer;
export {
	AddNewPlanContainerProps,
	AddNewPlanContainerStateProps,
	AddNewPlanContainerActionProps,
	AddNewPlanContainerState,
};
