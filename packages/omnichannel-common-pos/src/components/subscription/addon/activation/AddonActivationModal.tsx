import {
	Configurations,
	ContextualPaymentMethod,
	InitializedAddon,
	MessagePack,
	PriceTypeEnum,
	Product,
	ProductOffering,
	SimplePrice
} from "../../../../redux/types";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { AddonActivationPaymentMethods } from "./AddonActivationPaymentMethods";
import { AddonActivationFees } from "./AddonActivationFees";
import { AddonActivationBalance } from "./AddonActivationBalance";
import AddonActivationUtils from "./AddonActivation.utils";
import { SyntheticEvent, PureComponent, ValidationMap } from "react";
import addonMessages from "../Addon.messages";
import {
	EnableAddonConfig,
	InitializeAddonConfig
} from "../../../../redux/services";
import AddonPOActivationContainer from "./AddonPOActivationContainer";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import BalanceError from "../../../payment/BalanceError";
import OcModal from "../../../ocComponents/OcModal";
import cssns from "../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import messages from "./AddonActivationModal.messages";
import { AddonUtils } from "../Addon.utils";
import ProductUtil from "../../../../utils/product/ProductUtil";
import MsisdnUtil from "../../../../utils/MsisdnUtil";

const { React } = cssns("AddonActivationModal");

interface AddonActivationModalStateProps {
	initializedAddon: InitializedAddon | undefined;
	addonInitializeInProgress: boolean;
	addonEnableError: string | undefined;
	personId: string;
	configurations: Configurations;
	planCategoriesIds: string[];
}

interface AddonActivationModalOwnProps {
	product: Product;
	targetAgreementId: string;
	addon: ProductOffering;
	showModal: boolean;
	msisdn: string | undefined;
	onModalClose: (callback?: () => void) => void;
}

interface AddonActivationModalActionProps {
	actions: {
		initializeAddonEnabling: (params: InitializeAddonConfig) => void;
		enableAddon: (config: EnableAddonConfig, messages: MessagePack) => void;
		discardBackendBasket: (basketId: string) => void;
		cancelAddonActivation: (basketId?: string) => void;
	};
}

type AddonActivationModalProps = AddonActivationModalStateProps & AddonActivationModalOwnProps & AddonActivationModalActionProps;

interface AddonActivationModalState {
	selectedPaymentMethod?: ContextualPaymentMethod;
	selectedAddonPrice?: SimplePrice;
	showModal: boolean;
	isFormValid: boolean;
	activationStarted?: boolean;
}

class AddonActivationModal extends PureComponent<AddonActivationModalProps, AddonActivationModalState> {
	static displayName: string = "AddonActivationModal";
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;
	form?: HTMLFormElement;
	messagePack: MessagePack;

	constructor(props: AddonActivationModalProps, context: ContextType) {
		super(props, context);
		this.state = { showModal: false, isFormValid: false };
		this.messagePack = {
			errorMessage: this.context.intl.formatMessage(messages.addonActivationFailed, {addonName: ProductOfferingUtil.getPOName(this.props.addon)}),
			successMessage: this.context.intl.formatMessage(messages.addonSuccessfullyActivated, {addonName: ProductOfferingUtil.getPOName(this.props.addon)}),
		};
	}

	componentWillMount() {
		const { addon } = this.props;

		if (!AddonUtils.isConfigurationRequired(addon)) {
			this.initializeAddon(addon);
		}
	}

	initializeAddon = (addon: ProductOffering) => {
		const { targetAgreementId, personId, product, planCategoriesIds } = this.props;
		const planProduct = (planCategoriesIds && ProductUtil.getPlanFromSubscription(product, planCategoriesIds)) || product;

		const params: InitializeAddonConfig = {
			targetAgreementId,
			inputtedCharacteristics: AddonUtils.ensureParentIdProvided(addon, planProduct.id),
			productId: addon.id,
			personId,

		};
		this.props.actions.initializeAddonEnabling(params);
	};

	componentWillReceiveProps(newProps: AddonActivationModalProps) {
		const { initializedAddon } = newProps;

		// Reset payment method and set form invalid when addon has not been fully initialized
		if (!initializedAddon || !initializedAddon.basketItems) {
			this.setState({
				selectedPaymentMethod: undefined,
				isFormValid: false
			});
		} else {
			// Check form validity and set state accordingly
			this.setState({
				isFormValid: Boolean(this.form && this.form.checkValidity())
			});
		}

		// If the addon is not configurable, auto-select the first payment method on the list
		if (initializedAddon && !AddonUtils.isConfigurationRequired(newProps.addon)) {
			const paymentMethods: Array<ContextualPaymentMethod> = initializedAddon.paymentMethods || [];

			if (paymentMethods.length > 0) {
				this.setState({
					selectedPaymentMethod: paymentMethods[0],
				});
			}
		}
	}

	cancelActivation = (e?: SyntheticEvent<HTMLButtonElement>) => {
		if (e) {
			e.preventDefault();
		}
		this.closeModal();
	};

	closeModal = () => {
		this.props.onModalClose();

		if (this.props.initializedAddon) {
			this.props.actions.cancelAddonActivation(this.props.initializedAddon.basketId);
		}
	};

	handlePaymentMethodSelect = (method: ContextualPaymentMethod) => {
		this.setState({selectedPaymentMethod: method});
	};

	hasEnoughBalance = (): boolean => {
		const { initializedAddon } = this.props;
		const { selectedPaymentMethod } = this.state;

		if (!initializedAddon || !selectedPaymentMethod) {
			return false;
		}

		if (selectedPaymentMethod) {
			const totalFee = AddonActivationUtils.calculateAddonTotalFees(initializedAddon);
			const selectedPaymentMethodBalance = (selectedPaymentMethod && selectedPaymentMethod.balance) || 0;
			return selectedPaymentMethodBalance >= totalFee;
		}
		return false;
	};

	handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const basketId = this.props.initializedAddon ? this.props.initializedAddon.basketId : undefined;
		const selectedPaymentMethodId = this.state.selectedPaymentMethod ? this.state.selectedPaymentMethod.id : undefined;
		const enableAddonConfig: EnableAddonConfig = {basketId: basketId!, paymentMethod: selectedPaymentMethodId,
													  targetAgreementId: this.props.targetAgreementId};

		this.props.actions.enableAddon(enableAddonConfig, this.messagePack);
	};

	handleFormRefCreated = (form: HTMLFormElement) => {
		this.form = form;
	};

	render() {
		const { addon, initializedAddon, configurations, msisdn, showModal } = this.props;

		if (!addon) {
			return null;
		}

		const addonForConfiguration = AddonActivationUtils.updateConfigurationForAddon(addon, configurations);
		const description: string | undefined = AddonActivationUtils.getDescription(addon);

		const hasEnoughBalance = this.hasEnoughBalance();
		const isTotalFeeGreaterZero = AddonActivationUtils.calculateAddonTotalFees(initializedAddon) > 0;

		const disabled: boolean = AddonUtils.isConfigurationRequired(addon)
			? (!this.state.isFormValid || !hasEnoughBalance) && isTotalFeeGreaterZero
			: !hasEnoughBalance && isTotalFeeGreaterZero || !initializedAddon;

		const msisdnWithSeparatedAreaCode = msisdn && MsisdnUtil.getMsisdnWithSeparatedAreaCode(msisdn);

		return (
			<OcModal
				showModal={showModal}
				onClose={this.cancelActivation}
				smallModal={true}
				className="ActivationModal"
				title={<FormattedMessage {...addonMessages.configurationActivateAddon}/>}
				onOk={this.handleSubmit}
				okButtonLabel={<FormattedMessage {...addonMessages.configurationActivate}/>}
				okDisabled={disabled}

			>
				<form
					className="AddonActivationModal"
					id="activateAddonModal"
					name="activateAddonModal"
					ref={this.handleFormRefCreated}
				>
					<div className="wrapper">
						<div className="AddonActivationModal-main-container">
							<div className="AddonActivationModal-info-container">
								<div className="AddonActivationModal-label">
									<FormattedMessage {...addonMessages.configurationMsisdn}/>
								</div>
								<span className="AddonActivationModal-data">{msisdnWithSeparatedAreaCode}</span>
							</div>
							<div className="AddonActivationModal-info-container AddonActivationModal-new-section">
								<div className="AddonActivationModal-label">
									<FormattedMessage {...addonMessages.configurationServiceName}/>
								</div>
								<span className="AddonActivationModal-data">{addon.attributes!.name}</span>
							</div>
							<div className="AddonActivationModal-info-container">
								<div className="AddonActivationModal-label">
									<FormattedMessage {...addonMessages.configurationDescription}/>
								</div>
								<span className="AddonActivationModal-data">{description}</span>
							</div>

							{AddonUtils.isConfigurationRequired(addon) && (
								<AddonPOActivationContainer product={addonForConfiguration} />
							)}

							<AddonActivationFees initializedAddon={initializedAddon}/>

							{isTotalFeeGreaterZero && (
								<>
									<AddonActivationPaymentMethods
										initializedAddon={initializedAddon}
										selectedPaymentMethod={this.state.selectedPaymentMethod}
										handleSelect={this.handlePaymentMethodSelect}
									/>
									<AddonActivationBalance
										initializedAddon={initializedAddon}
										selectedPaymentMethod={this.state.selectedPaymentMethod}
									/>
								</>
							)}
							{this.props.addonEnableError && (
								<BalanceError error={this.props.addonEnableError} />
							)}
						</div>
						{isTotalFeeGreaterZero && !hasEnoughBalance && (
							<div className="AddonActivationModal-not-enough-balance-alert">
								<i className="fa fa-exclamation-triangle" />
								<FormattedMessage {...addonMessages.configurationNotEnoughBalance}/>
							</div>
						)}
					</div>
				</form>
			</OcModal>
		);
	}
}

export {
	AddonActivationModalProps,
	AddonActivationModalActionProps,
	AddonActivationModalOwnProps,
	AddonActivationModalStateProps,
	AddonActivationModalState,
	AddonActivationModal
};
