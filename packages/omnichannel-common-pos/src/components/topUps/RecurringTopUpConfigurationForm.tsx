import ProductUtil from "../../utils/product/ProductUtil";
import cssns from "../../utils/cssnsConfig";
import FormattedMessage, { FormattedMessageDescriptor } from "../../channelUtils/FormattedMessage";
import FormattedHTMLMessage from "../../channelUtils/FormattedHTMLMessage";
import { get, uniqBy, head } from "lodash";
import { Component, ReactNode } from "react";
import { RecurringTopUpModelType, RecurringTopUpType } from "../../redux/types/RecurringTopUpModelType";
import {
	Basket,
	BasketItem,
	Configurations,
	CustomerPaymentMethod,
	BasketActionAddProductToBasket,
	TopupType,
	ProductOfferingGroup,
	ProductOffering
} from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import messages from "./RecurringTopUpConfigurationForm.messages";
import withFormal from "../ocComponents/withFormal";
import OcInput from "../ocComponents/OcInput";
import OcSelect from "../ocComponents/OcSelect";
import PaymentUtil from "../../utils/PaymentUtil";
import CheckoutThresholdTopUpFormContainer from "./CheckoutThresholdTopUpFormContainer";
import CheckoutMonthlyTopUpFormContainer from "./CheckoutMonthlyTopUpFormContainer";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";

const Form = require("react-formal");
const withSchema = require("../../schemas/withSchema");
const FormalOcSelect = withFormal(OcSelect);
const FormalRadioInput = withFormal(OcInput, { inputType: "radio" });

const { React } = cssns("RecurringTopUpConfigurationForm");

// TODO: this component requires refactoring to re-use components from ./components/topUps/forms

interface RecurringTopUpConfigurationFormStateProps {
	schema?: any;
	basket?: Basket;
	paymentMethods?: Array<CustomerPaymentMethod>;
	basketItemsOfParentProduct?: BasketItem;
	model?: RecurringTopUpModelType;
	customFooter?: ReactNode;
	selectedCurrency: string;
	topUpProductOfferingGroup?: ProductOfferingGroup;
	pricesPerRow: number;
	phoneNumbers?: Array<string>;
	allowUsingNewCreditCard?: boolean;
	addToBasket?: boolean;
}

interface RecurringTopUpConfigurationFormActionProps {
	actions: {
		addProductToBasket: BasketActionAddProductToBasket,
		customSubmit?: (model: object) => void,
		onCancel?: (model: object) => void,
		setSelectedTopupType?: (typeMessage: any) => void,
		storeTopupProduct: (payload: TopupType | null) => void,
		handleStoreCustomerPaymentMethodSelection?: (isStored: boolean) => void,
	};
}

interface RecurringTopUpConfigurationFormState {
	model?: RecurringTopUpModelType | null;
	enableSaveButton: boolean;
	topUpAmount?: number;
	recurringTopUpCharacteristic: string;
}

type Characteristics = {
	CH_Monthly_TopUp_Limit?: number;
	CH_Threshold_Value?: number;
	CH_TopUp_Amount?: number;
};

const THRESHOLD = "threshold";
const MONTHLY = "monthly";

type RecurringTopUpConfigurationFormProps = RecurringTopUpConfigurationFormStateProps & RecurringTopUpConfigurationFormActionProps;

class RecurringTopUpConfigurationForm extends Component<RecurringTopUpConfigurationFormProps, RecurringTopUpConfigurationFormState> {
	static displayName = "RecurringTopUpConfigurationForm";
	static contextTypes = contextTypesValidationMap;

	constructor(props: RecurringTopUpConfigurationFormProps, context: ContextType) {
		super(props, context);

		this.state = {
			model: {
				recurringTopUp: RecurringTopUpType.CANCEL,
			},
			enableSaveButton: false,
			recurringTopUpCharacteristic: "",
		};
	}

	handleInputChange = (model: RecurringTopUpModelType, topUpAmount?: number): void => {
		let newModel;
		let recurringTopUpCharacteristic = "";
		let topupType;

		switch (model.recurringTopUp) {
			case THRESHOLD:
				newModel = { // merging only threshold
					recurringTopUp: model.recurringTopUp,
					...(model.thresholdValue && !isNaN(model.thresholdValue) ? { thresholdValue: Number(model.thresholdValue) } : {}),
					...(model.topUpAmount && !isNaN(model.topUpAmount) ? { topUpAmount: Number(model.topUpAmount) } : {}),
					...(model.limitInMonth && !isNaN(model.limitInMonth) ? { limitInMonth: Number(model.limitInMonth) } : {}),
				};
				recurringTopUpCharacteristic = "TOPUP_THRESHOLD";
				topupType = (<FormattedHTMLMessage {...messages.thresholdTopUpSaved} />);
				if (this.props.actions.setSelectedTopupType) { this.props.actions.setSelectedTopupType(topupType); }
				break;
			case MONTHLY: // merging only monthly
				newModel = {
					recurringTopUp: model.recurringTopUp,
					...(model.topUpAmountMonthly && !isNaN(model.topUpAmountMonthly) ? { topUpAmountMonthly: Number(model.topUpAmountMonthly) } : {}),
				};
				recurringTopUpCharacteristic = "TOPUP_TIME_MONTH";
				topupType = (<FormattedHTMLMessage {...messages.monthlyTopUpSaved} />);
				if (this.props.actions.setSelectedTopupType) { this.props.actions.setSelectedTopupType(topupType); }
				break;
			default: // merging all
				newModel = {
					recurringTopUp: model.recurringTopUp,
					...(model.thresholdValue && !isNaN(model.thresholdValue) ? { thresholdValue: Number(model.thresholdValue) } : {}),
					...(model.topUpAmount && !isNaN(model.topUpAmount) ? { topUpAmount: Number(model.topUpAmount) } : {}),
					...(model.limitInMonth && !isNaN(model.limitInMonth) ? { limitInMonth: Number(model.limitInMonth) } : {}),
				};
		}

		const { paymentMethodType, paymentMethod, subscription } = model;

		if (paymentMethodType) {
			newModel = { ...newModel, paymentMethodType, paymentMethod };
		}
		if (subscription) {
			newModel = { ...newModel, subscription };
		}

		this.setState({
			model: { ...newModel },
			enableSaveButton: true,
			recurringTopUpCharacteristic,
			...(topUpAmount && !isNaN(topUpAmount) ? { topUpAmount: Number(topUpAmount) } : {}),
		});

		this.handleSubmit(newModel);
	};

	modelToCharacteristics = (model: RecurringTopUpModelType): Characteristics => {
		if (!this.state.recurringTopUpCharacteristic) {
			return {};
		}

		const characteristics: Characteristics =
			this.state.recurringTopUpCharacteristic === "TOPUP_SMART" ? {} : {
				CH_TopUp_Amount: this.state.topUpAmount ? Number(this.state.topUpAmount) : undefined
			};

		if (model.recurringTopUp === THRESHOLD) {
			characteristics.CH_TopUp_Amount = model.topUpAmount && !isNaN(model.topUpAmount) && Number(model.topUpAmount) || undefined;
			characteristics.CH_Monthly_TopUp_Limit = model.limitInMonth && !isNaN(model.limitInMonth) && Number(model.limitInMonth) || undefined;
			characteristics.CH_Threshold_Value = model.thresholdValue && !isNaN(model.thresholdValue) && Number(model.thresholdValue) || undefined;
		} else if (model.recurringTopUp === MONTHLY) {
			characteristics.CH_TopUp_Amount = model.topUpAmountMonthly && !isNaN(model.topUpAmountMonthly) && Number(model.topUpAmountMonthly) || undefined;
		}

		return characteristics;
	};

	getPaymentMethods = () => {
		const { paymentMethods } = this.props;
		const activePaymentMethods = PaymentUtil.getActiveCustomerPaymentMethods(paymentMethods);
		return uniqBy(activePaymentMethods, "attributes.type").map((paymentMethod: CustomerPaymentMethod, idx: number) => {
			const paymentMethodType = get(paymentMethod, "attributes.type");
			return (
				<option value={paymentMethodType} key={`payment_method_${idx}`}>
					{this.formatType(paymentMethodType)}
				</option>
			);
		});
	};

	getCreditCards = () => {
		const { paymentMethods } = this.props;
		const activePaymentMethods = PaymentUtil.getActiveCustomerPaymentMethods(paymentMethods);
		return activePaymentMethods.filter((paymentMethod: CustomerPaymentMethod) => {
			return get(paymentMethod, "attributes.type") === "credit-card";
		}).map((paymentMethod: CustomerPaymentMethod, idx: number) => {
			const cardType = get(paymentMethod, "attributes.creditCard.cardType");
			const cardEnding = get(paymentMethod, "attributes.creditCard.maskedCardNumber").slice(-4);
			return (
				<option value={paymentMethod.id} key={`credit_card_${idx}`}>
					{this.context.intl.formatMessage(
						{ ...messages.recurringTopUpCardDescription },
						{ cardType, cardEnding }
					)}
				</option>
			);
		});
	};

	formatType = (type: string) => {
		return type ? type.charAt(0).toUpperCase() + type.replace("-", " ").slice(1) : "";
	};

	handleSubmit = (model: any): void => {
		const {
			customSubmit,
			onCancel
		} = this.props.actions;

		this.props.schema.validate(model).then((validModel: any) => {
			if (customSubmit) {
				customSubmit(validModel);
			} else if (validModel.recurringTopUp === "cancel") {
				this.props.actions.storeTopupProduct(null);

				if (this.props.actions.handleStoreCustomerPaymentMethodSelection) {
					this.props.actions.handleStoreCustomerPaymentMethodSelection(false);
				}

				if (onCancel) {
					onCancel(validModel);
				}
			} else {
				const product = head(
					ProductUtil.getProductInPoOrPogWithTFormName(
						this.props.topUpProductOfferingGroup!,
						this.state.recurringTopUpCharacteristic
					)
				);

				let configurations: Configurations;
				// we're not afraid of using "!" since it's obvious we always have product here
				configurations = {
					[product!.id]: {
						id: product!.id,
						inputtedCharacteristics: {
							...this.modelToCharacteristics(validModel),
						}
					}
				} as Configurations; // TODO: check

				const { basketItemsOfParentProduct, addToBasket } = this.props;
				const parentBasketItem = basketItemsOfParentProduct && {
					...basketItemsOfParentProduct, // TODO: check if this line is correct
					id: basketItemsOfParentProduct.id
				};

				const { basket } = this.props;

				if (parentBasketItem && basket) {
					const basketId = basket.id;

					/* NOTE what will happen if user changes configuration before leaving the page? should updateBasketItemConfiguration() be called then? */
					if (addToBasket) {
						this.props.actions.addProductToBasket({
							product: product!,
							configurations: configurations || {},
							parentBasketItem,
							basketId,
							hasCustomer: true,
							hasTopUps: false
						});
					} else {
						const payload: TopupType = {
							product: product!,
							configurations,
							parentBasketItem,
							basketId,
							hasCustomer: true
						};
						this.props.actions.storeTopupProduct(payload);
						this.props.actions.handleStoreCustomerPaymentMethodSelection &&
							this.props.actions.handleStoreCustomerPaymentMethodSelection(true);
					}
				}
			}
			this.setState({
				enableSaveButton: false
			});
		})
			.catch((err: any) => {
				console.error("validation error:", err);
			});
	};

	renderRadioInput = ({value, message, productOffering}: {value: string, message?: FormattedMessageDescriptor, productOffering?: ProductOffering}): ReactNode => {
		if (!productOffering && !message) {
			return null;
		}

		const { formatMessage } = this.context.intl;
		const { model } = this.props;

		const labels = [];

		if (message) {
			labels.push(<span key="main-message-span">{formatMessage({ ...message })}</span>);
		}

		if (productOffering) {
			const productOfferingName = ProductOfferingUtil.getPOName(productOffering);
			const reccuringMessage = value === THRESHOLD ? messages.recurringThresholdTopUp : messages.recurringMonthlyTopUp;
			labels.push(<span key="main-message-span">
				<FormattedMessage {...reccuringMessage} values={{ value: productOfferingName }}/>
				</span>);
		}

		if (model && model.recurringTopUp === value) {
			labels.push(
				<span
					key="current-selections-map"
					className="current-selection"
				>
					{formatMessage({ ...messages.recurringTopUpCurrentSelection })}
				</span>
			);
		}

		return (
			<Form.Field
				id={`RecurringTopUpConfigurationForm-${value}-radio`}
				name="recurringTopUp"
				type={FormalRadioInput}
				label={labels}
				defaultValue={value}
				radioButtonGroupValue={value}
				required={true}
			/>
		);
	};

	renderPhoneNumbers = (phoneNumbers: any) => {
		const { formatMessage } = this.context.intl;
		return (phoneNumbers && (
			<div className="subscription-container">
				<Form.Field
					name="subscription"
					id="RecurringTopUpConfigurationForm-subscription-select"
					type={FormalOcSelect}
					label={formatMessage({ ...messages.recurringTopUpSubscription })}
					alwaysShowLabel={true}
				>
					<option
						key="subscription_0"
						value=""
						id="RecurringTopUpConfigurationForm-subscription-option-empty"
						disabled={true}
					>
						{formatMessage({ ...messages.chooseSubscription })}
					</option>
					{phoneNumbers.map((subscription: string, idx: number) => {
						return (
							<option
								key={`subscription_${idx}`}
								value={subscription}
								id={`RecurringTopUpConfigurationForm-subscription-option-${subscription}`}
							>
								{subscription}
							</option>
						);
					})}
				</Form.Field>
			</div>
		)
		);
	};

	renderPaymentMethods = (paymentMethods: any, model: any, allowUsingNewCreditCard?: boolean) => {
		const { formatMessage } = this.context.intl;
		return (paymentMethods && (
			<div className="payment-container">
				<div className="payment-methods">
					<Form.Field
						name="paymentMethodType"
						id="RecurringTopUpConfigurationForm-payment-method-type-select"
						type={FormalOcSelect}
						label={formatMessage({ ...messages.recurringTopUpPaymentMethod })}
						alwaysShowLabel={true}
					>
						<option
							key={"payment_method_0"}
							value=""
							id={"RecurringTopUpConfigurationForm-payment-method-type-option-empty"}
							disabled={true}
						>
							{formatMessage({ ...messages.recurringTopUpSelectPaymentMethod })}
						</option>
						{this.getPaymentMethods()}
					</Form.Field>
					{model.paymentMethodType === "credit-card" && (
						<Form.Field
							name="paymentMethod"
							id="RecurringTopUpConfigurationForm-payment-method-select"
							type={FormalOcSelect}
							label={""}
						>
							<option
								key={"method_0"}
								value=""
								id={"RecurringTopUpConfigurationForm-payment-method-option-empty"}
								disabled={true}
							>
								{formatMessage({ ...messages.recurringTopUpSelectCard })}
							</option>
							{this.getCreditCards()}
							{allowUsingNewCreditCard && (
								<option
									key="use-new-card"
									value="use-new-card"
								>
									{formatMessage({ ...messages.topUpModalUseNewCreditCardOption })}
								</option>
							)}
						</Form.Field>
					)}
				</div>
			</div>
		));
	};

	render() {
		const {
			customFooter,
			paymentMethods,
			phoneNumbers,
			allowUsingNewCreditCard,
			topUpProductOfferingGroup
		} = this.props;

		const thresholdTopUpProductOffering = topUpProductOfferingGroup
			&& head(ProductUtil.getProductInPoOrPogWithTFormName(topUpProductOfferingGroup, "TOPUP_THRESHOLD")) || undefined;

		const monthlyTopUpProductOffering = topUpProductOfferingGroup
			&& head(ProductUtil.getProductInPoOrPogWithTFormName(topUpProductOfferingGroup, "TOPUP_TIME_MONTH")) || undefined;

		const {
			customSubmit
		} = this.props.actions;

		const model = this.state.model || this.props.model || {};

		return (
			<Form
				className="this"
				schema={this.props.schema}
				debug={true}
				noValidate={true}
				onChange={this.handleInputChange}
				value={model}
				onSubmit={(model: any) => { this.handleSubmit(model); }}
			>
				<div className="container">
					{this.renderPhoneNumbers(phoneNumbers)}
					<div className="top-ups">
						<h5 className="top-up-type">
							<FormattedMessage {...messages.topUpType} />
						</h5>
						<div className="main-form-container">
							{thresholdTopUpProductOffering && this.renderRadioInput({value: THRESHOLD, productOffering: thresholdTopUpProductOffering})}
							{thresholdTopUpProductOffering && model.recurringTopUp === THRESHOLD && (
								<CheckoutThresholdTopUpFormContainer
									productOffering={thresholdTopUpProductOffering}
								/>
							)}
							{monthlyTopUpProductOffering && this.renderRadioInput({value: MONTHLY, productOffering: monthlyTopUpProductOffering})}
							{monthlyTopUpProductOffering && model.recurringTopUp === MONTHLY && (
								<CheckoutMonthlyTopUpFormContainer
									productOffering={monthlyTopUpProductOffering}
								/>
							)}
							{this.renderRadioInput({value: "cancel", message: messages.recurringTopUpCancel})}
						</div>
					</div>
					{this.renderPaymentMethods(paymentMethods, model, allowUsingNewCreditCard)}
					{customSubmit && customFooter}
				</div>
			</Form>
		);
	}
}

export default withSchema(["recurringTopUpForm"])(
	RecurringTopUpConfigurationForm,
);

export {
	RecurringTopUpConfigurationFormStateProps,
	RecurringTopUpConfigurationFormActionProps,
	RecurringTopUpConfigurationFormState,
	RecurringTopUpConfigurationFormProps,
};
