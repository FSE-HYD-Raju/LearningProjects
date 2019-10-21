import { ContextType, contextTypesValidationMap } from "../../types";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { ChargingBalances, Price, PriceTypeEnum, ProductOffering, SimplePrice } from "../../redux/types";
import cssns from "../../utils/cssnsConfig";
import PaymentMessages from "./Payment.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import * as classnames from "classnames";
import { FC } from "react";
import CurrencyUtil from "../../utils/CurrencyUtil";
import PriceUtil from "../../utils/PriceUtil";
import OcCurrency from "../ocComponents/OcCurrency";

const { React } = cssns("PaymentByBalanceDetails");

interface PaymentFee {
	label?: React.ReactNode;
	price: SimplePrice;
}
interface PaymentByBalanceDetailsProps {
	fees: PaymentFee[];
	mainBalance?: ChargingBalances;
	notEnoughBalanceText?: React.ReactNode;
}

const PaymentByBalanceDetails: FC<PaymentByBalanceDetailsProps> = (props: PaymentByBalanceDetailsProps, context: ContextType) => {
	const { formatMessage } = context.intl;
	const { notEnoughBalanceText, fees } = props;
	const feesPrices: SimplePrice[] = fees.map(fee => fee.price);
	const totalPriceValue: number = feesPrices.map((price: SimplePrice) => price.taxIncludedAmount).reduce<number>((a, b) => (a || 0) + (b || 0), 0);
	const totalPriceCurrency: string | undefined = feesPrices.map((price: SimplePrice) => price.currency).find(Boolean);

	const currentBalanceValue = (props.mainBalance && props.mainBalance.value) || 0;
	const currentBalanceCurrency = (props.mainBalance && props.mainBalance.currency) || totalPriceCurrency || "";

	const remainingBalanceValue = currentBalanceValue - totalPriceValue;

	return (
		<div className="payment-by-balance-details">
			<div className="this details-grey-block">
				<div className="details-row" data-test-name="current-balance-row">
					<div className="type">
						<span>{formatMessage({ ...PaymentMessages.currentBalance })}</span>
					</div>
					<OcCurrency className="price-block" cost={currentBalanceValue} currency={currentBalanceCurrency} allowUndefined />
				</div>
				{fees.map((fee: PaymentFee, index: number) => {
					const label = fee.label || <FormattedMessage {...PaymentMessages.totalFee} />;
					return (
						<div className="details-row" key={index} data-test-name="fee-row">
							<div className="type">
								<span>{label}</span>
							</div>
							{!fee.price.taxIncludedAmount ? (
								<span className="price-block">
									<OcCurrency cost={fee.price.taxIncludedAmount} currency={fee.price.currency} allowUndefined />
								</span>
							) : (
								<span className="price-block red-label">
									<OcCurrency cost={-fee.price.taxIncludedAmount} currency={fee.price.currency} allowUndefined />
								</span>
							)}
						</div>
					);
				})}

				<div className="details-row remaining-balance" data-test-name="remaining-balance-row">
					<div className="type">
						<span>{formatMessage({ ...PaymentMessages.remainingBalance })}</span>
					</div>
					<OcCurrency
						className={classnames({ "red-label": remainingBalanceValue < 0, "price-block": true })}
						cost={remainingBalanceValue}
						currency={currentBalanceCurrency}
						allowUndefined
					/>
				</div>
			</div>
			{remainingBalanceValue < 0 && (
				<div className="not-enough-balance-message">
					<i className="fa fa-exclamation-triangle" />
					{notEnoughBalanceText || <FormattedMessage {...PaymentMessages.notEnoughBalance} />}
				</div>
			)}
		</div>
	);
};

PaymentByBalanceDetails.contextTypes = contextTypesValidationMap;

export { PaymentByBalanceDetails, PaymentByBalanceDetailsProps, PaymentFee };
