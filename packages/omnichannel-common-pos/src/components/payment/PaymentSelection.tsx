import { Component, ReactNode } from "react";
import PaymentSelectionMessages from "./paymentSelection.messages";
import { isEmpty } from "lodash";
import OcInput from "../ocComponents/OcInput";
import cssns from "../../utils/cssnsConfig";
import CreditCardStorageSelection from "./CreditCardStorageSelection";
import CreditCardSelectionListContainer from "./creditcardselection/CreditCardSelectionListContainer";
import {
	ContextualPaymentMethod,
	CustomerPaymentMethod,
	BALANCE_METHOD_ID,
	CREDIT_CARD_IDENTIFIER,
	CASH_ON_DELIVERY_IDENTIFIER,
	ValidityPeriod,
	StoredCustomerType
} from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { Link } from "react-router-dom";
import { commonShopRoutes } from "../../routes/commonRoutesMap";
import messages from "../../commonMessages";
import MsisdnUtil from "../../utils/MsisdnUtil";

const { React } = cssns("PaymentSelection");

interface PaymentSelectionProps {
	paymentMethods: Array<ContextualPaymentMethod>;
	customerPaymentMethods?: Array<CustomerPaymentMethod>;
	cashPaymentIdentifiers?: Array<string>;
	selectedPaymentMethod?: string;
	selectedCustomerPaymentMethod?: string;
	selectedCurrency?: string;
	cashPaymentEnabled?: boolean;
	storeCustomerPaymentMethod?: boolean;
	showCreditCards?: boolean;
	changePaymentMethod: (event: string) => void;
	mainBalance?: string;
	onChangeCreditCard?: (selectedCreditCard: CustomerPaymentMethod) => void;
	parentClass?: string;
	storedCustomer?: StoredCustomerType;
}

class PaymentSelection extends Component<PaymentSelectionProps> {
	static displayName = "PaymentSelection";

	handleChangeCreditCard = (selectedCreditCard: CustomerPaymentMethod) => {
		if (this.props.onChangeCreditCard) {
			this.props.onChangeCreditCard(selectedCreditCard);
		}
	};

	renderCreditCardList() {
		return (
			<div className="credit-card-radio-buttons">
				<CreditCardSelectionListContainer
					onChangeCreditCard={this.handleChangeCreditCard}
					selectedMethodId={this.props.selectedCustomerPaymentMethod}
				/>
			</div>
		);
	}

	renderPaymentOnDelivery = (): React.ReactNode => {
		return (
			<div className="payment-on-delivery-container">
				<div className="passcode-section">
					{<FormattedMessage{...PaymentSelectionMessages.paymentOnDeliveryOnTimePasscode} />}
					{/* tslint:disable-next-line:jsx-use-translation-function */}
					&nbsp;
					<b>{this.props.storedCustomer && MsisdnUtil.getMsisdnWithSeparatedAreaCode(this.props.storedCustomer.mobileNumber)}</b>
				</div>
				<div className="info-step-section">
					{<FormattedMessage {...PaymentSelectionMessages.paymentOnDeliveryChangeMobileNumber} />}
					<Link id={"more-details-link-bundle-fv"} to={commonShopRoutes.CHECKOUT.createLink()}>
						{/* tslint:disable-next-line:jsx-use-translation-function */}
						&nbsp;
						<FormattedMessage {...PaymentSelectionMessages.paymentOnDeliveryCustomerInfoStep} />
					</Link>
				</div>
			</div>
		);
	};

	renderCreditCardStorageSelection() {
		return (
			<div className="credit-card-payment-section">
				<CreditCardStorageSelection
					parentClass={this.props.parentClass}
				/>
			</div>
		);
	}

	arrayOfValidCreditCards(customerPaymentMethods: Array<CustomerPaymentMethod>) {
		return customerPaymentMethods
			.filter(paymentMethod => {
				const validFor: ValidityPeriod | undefined = paymentMethod.attributes ? paymentMethod.attributes.validFor : undefined;
				const endDate = validFor ? new Date(validFor.endDate!) : undefined;
				return endDate && endDate.getTime() > (new Date()).getTime();
			});
	}

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.changePaymentMethod(event.target.name);
	};

	render() {
		const cashPaymentIdentifiers = this.props.cashPaymentIdentifiers ? this.props.cashPaymentIdentifiers : [];

		return (
			<>
				{this.props.paymentMethods && this.props.paymentMethods.map((pm: ContextualPaymentMethod) => {
					if (!cashPaymentIdentifiers.includes(pm.id) || this.props.cashPaymentEnabled) {
						const label = pm.attributes && pm.attributes.label ? pm.attributes.label : pm.label;

						const mainBalance =
							pm.id === BALANCE_METHOD_ID && this.props.mainBalance
								? ` (${this.props.mainBalance} ${this.props.selectedCurrency})`
								: "";

						const checked = pm.id === this.props.selectedPaymentMethod;
						const isCreditCard = pm.id === CREDIT_CARD_IDENTIFIER;
						const isPaymentOnDelivery = pm.id === CASH_ON_DELIVERY_IDENTIFIER;

						const creditCardsArrayIsEmpty = isCreditCard && this.props.showCreditCards && this.props.customerPaymentMethods
							&& isEmpty(this.arrayOfValidCreditCards(this.props.customerPaymentMethods));

						const paymentMethodDetails: ReactNode = (isCreditCard && checked)
							? (this.props.showCreditCards ? this.renderCreditCardList() : this.renderCreditCardStorageSelection())
							: null;

						const IsPaymentOnDelivery: ReactNode = (isPaymentOnDelivery && checked)
							? this.renderPaymentOnDelivery()
							: null;

						return (
							<div className="payment-selection" key={`payment-selection-${pm.id}`}>
								<OcInput
									type="radio"
									name={pm.id}
									onChange={this.handleChange}
									checked={checked}
									value={pm.id}
									label={label + mainBalance}
									key={`${pm.id}`}
									id={`${pm.id}`}
									standalone={true}
									disabled={creditCardsArrayIsEmpty}
								/>
								{creditCardsArrayIsEmpty && (
									<div className="no-stored-credit-cards"><FormattedMessage {...messages.noStoredCreditCards} /></div>
								)}
								{IsPaymentOnDelivery}
								{paymentMethodDetails}
							</div>
						);
					} else {
						return null;
					}
				})}
			</>
		);
	}
}

export default PaymentSelection;
export {
	PaymentSelectionProps
};
