import * as R from "react";
import {
	Basket,
	ContextualPaymentMethod,
	Price,
	PriceType,
	PriceTypeEnum,
	Product,
	ProductOffering,
	SimplePrice
} from "../../../../redux/types";
import OcModal from "../../../ocComponents/OcModal";
import { get, head, upperFirst } from "lodash";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { FC } from "react";
import OcCurrency from "../../../ocComponents/OcCurrency";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import messages from "../Plans.messages";
import cssns from "../../../../utils/cssnsConfig";
import PlanUtils from "../Plan.utils";
import { OcAlert, OcAlertType } from "../../../ocComponents/alert/OcAlert";
import { OcButton, OcButtonType } from "../../../ocComponents/button/OcButton";

const React = cssns("PlanChangeConfirmationModal").React as typeof R;

interface PlanChangeConfirmationModalStateProps {
	contextualPaymentMethods?: Array<ContextualPaymentMethod>;
	currentProduct?: Product;
	selectedOffering?: ProductOffering;
	totalPrices?: Record<PriceType, Array<Price>> | null;
	initializedBasket: Basket;
}

interface PlanChangeConfirmationModalActionProps {
	actions: {
		handleBack: () => void;
		handleClose: () => void;
		pay: (paymentMethodId?: string) => void;
	};
}

type PlanChangeConfirmationModalProps = PlanChangeConfirmationModalStateProps & PlanChangeConfirmationModalActionProps;

const PlanChangeConfirmationModal: FC<PlanChangeConfirmationModalProps> = (props: PlanChangeConfirmationModalProps) => {
	const title = (<FormattedMessage {...messages.confirmChange}/>);

	const {
		contextualPaymentMethods,
		currentProduct,
		selectedOffering,
		totalPrices,
		initializedBasket
	} = props;

	if (!currentProduct) {
		return null;
	}

	const upfrontPrices = get(initializedBasket, "attributes.upfrontPrices") || false;
	const currentProductRecurringFees = currentProduct && ProductOfferingUtil.getSimplePrice(currentProduct!, PriceTypeEnum.RECURRENT);
	const selectedOfferingRecurringFees = totalPrices && totalPrices.RECURRENT || [];
	const selectedOfferingOneTimeFees = totalPrices && totalPrices.ONE_TIME || [];

	const oneTimeFeeSum = selectedOfferingOneTimeFees && selectedOfferingOneTimeFees.reduce((sum: number, fee: SimplePrice) => sum + (fee.taxFreeAmount || 0), 0);

	const productTypeText = (
		<span className="product-type">
				<FormattedMessage {...PlanUtils.getMessage(selectedOffering)} />
			</span>
	);

	const balancePaymentMethod = contextualPaymentMethods && contextualPaymentMethods.find(pm => pm.id === "balance");

	const canPay = (paymentMethod?: ContextualPaymentMethod) => {
		let canPay = true; // TODO: should be false by default?

		if (paymentMethod && paymentMethod.id === "balance") {
			canPay = paymentMethod.balance >= oneTimeFeeSum;
		}

		return canPay;
	};

	const canPayWithBalance = contextualPaymentMethods && canPay(contextualPaymentMethods.find(pm => pm.id === "balance"));

	const paymentButtons = contextualPaymentMethods && contextualPaymentMethods.map((pm: ContextualPaymentMethod) => {
		return (
			<OcButton
				id={`buttonPay-${pm.id}`}
				key={pm.id}
				data-test-payment-method-id={pm.id}
				onClick={() => props.actions.pay(pm.id)}
				buttonType={OcButtonType.PRIMARY}
				disabled={!canPay(pm)}
			>
				<FormattedMessage
					{...messages.payWithMethod}
					values={{ method: pm.label.toLowerCase() }}
				/>
			</OcButton>
		);
	});

	const noPaymentButtons = [
		(
			<OcButton
				id={"buttonPay-no-payment"}
				key={"no-payment"}
				onClick={() => props.actions.pay()}
				buttonType={OcButtonType.PRIMARY}
				disabled={false}
			>
				<FormattedMessage {...messages.confirm}/>
			</OcButton>
		)
	];

	const balanceCurrency = selectedOffering ? get(head(selectedOffering.attributes && selectedOffering.attributes.prices), "currency") : "";

	const planChangeConfirmationFooter = (
		<div className="modal-footer justify-content-between">
			<OcButton
				id="buttonBackInModal"
				onClick={() => props.actions.handleBack()}
				buttonType={OcButtonType.DEFAULT}
			>
				<FormattedMessage {...messages.back}/>
			</OcButton>
			{upfrontPrices ? paymentButtons : noPaymentButtons}
		</div>
	);

	return upfrontPrices && contextualPaymentMethods && contextualPaymentMethods.length === 1 ? (
		<OcModal
			showModal={true}
			title={title}
			onClose={props.actions.handleClose}
			style={PlanUtils.stylesForOcModal}
			customFooter={planChangeConfirmationFooter}
		>
			<div className="container">
				<div className="container-inner">
					<div className="message">
						<FormattedMessage
							{...messages.currentProductType}
							values={{ productType: productTypeText }}
						/>
					</div>
					<div className="message-holder">
						{currentProduct && currentProduct.name}
					</div>
					<div className="amount">
						{currentProductRecurringFees && currentProductRecurringFees.length > 0 && (
							<FormattedMessage
								{...messages.amountPerMonth}
								values={{
									amount: (
										<OcCurrency
											cost={currentProductRecurringFees[0].taxFreeAmount}
											currency={currentProductRecurringFees[0].currency}
										/>
									)
								}}
							/>
						)}
					</div>
				</div>
				<div className="selected-offering">
					<div className="message">
						<FormattedMessage
							{...messages.selectedProductType}
							values={{productType: productTypeText}}
						/>
					</div>
					<div className="offering-name">
						{selectedOffering && selectedOffering.attributes && selectedOffering.attributes.name}
					</div>
				</div>

				<div className="recurring-container">
					<div className="type-message">
						<FormattedMessage {...messages.recurringFees}/>
					</div>
					<div className="recurring-fees-container">
						{selectedOfferingRecurringFees && selectedOfferingRecurringFees.length > 0 &&
							selectedOfferingRecurringFees.map((fee: SimplePrice, index: number) => {
								const period = upperFirst(fee.recurringChargePeriod.interval.toLowerCase());

								return (
									<div className="flex-four" key={`row-key-${index}`}>
										<div className="message">
											{fee.name}
										</div>
										<div className="amount">
											<FormattedMessage
												{...messages.amountPerPeriod}
												values={{
													amount: (
														<OcCurrency
															cost={selectedOfferingRecurringFees[0].taxFreeAmount}
															currency={selectedOfferingRecurringFees[0].currency}
														/>
													),
													period: period.toLowerCase()
												}}
											/>
										</div>
									</div>
								);
							})}
						{selectedOfferingRecurringFees && selectedOfferingRecurringFees.length === 0 && (
							<div className="flex-four">
								<FormattedMessage {...messages.freeRecurring}/>
							</div>
						)}
					</div>
				</div>
				<div className="one-time-fees">
					<div className="message">
						<FormattedMessage {...messages.oneTimeFees}/>
					</div>
					{selectedOfferingOneTimeFees && selectedOfferingOneTimeFees.length > 0 &&
						selectedOfferingOneTimeFees.map((fee: SimplePrice, index: number) => {
							return (
								<div className="flex-four" key={`row-key-${index}`}>
									<div className="message">
										{fee.name}
									</div>
									<div className="amount">
										<OcCurrency
											cost={fee.taxFreeAmount}
											currency={fee.currency}
										/>
									</div>
								</div>
							);
						})}
					{selectedOfferingOneTimeFees && selectedOfferingOneTimeFees.length === 0 && (
						<div className="flex-four">
							<FormattedMessage {...messages.freeOneTime} />
						</div>
					)}
				</div>

				{canPayWithBalance && (
					<div className="can-pay-with-balance">
						<div className="row-message">
							<FormattedMessage
								{...messages.currentBalance}
								values={{
									balanceAmount: (
										<OcCurrency
											cost={balancePaymentMethod && balancePaymentMethod.balance}
											currency={balanceCurrency}
										/>
									)
								}}
							/>
						</div>
						<div className="row-message">
							<FormattedMessage
								{...messages.oneTimeFeeDeductionText}
								values={{
									oneTimeFeeSum: (
										<OcCurrency
											cost={oneTimeFeeSum}
											currency={balanceCurrency}
										/>
									)
								}}
							/>
						</div>
					</div>
				)}
				{!canPayWithBalance && (
					<div className="message">
						<div className="wide">
							<OcAlert alertType={OcAlertType.DANGER} className="alert-message">
								<FormattedMessage {...messages.balanceTooLow}/>
							</OcAlert>
						</div>
					</div>
				)}
			</div>
		</OcModal>
	) : !upfrontPrices ? (
		<OcModal
			showModal={true}
			title={title}
			onClose={props.actions.handleClose}
			style={PlanUtils.stylesForOcModal}
			customFooter={planChangeConfirmationFooter}
		>
			<div className="message-container-with-margin">
				<FormattedMessage {...messages.pleaseConfirmChange}/>
			</div>
		</OcModal>
	) : (
		<OcModal
			showModal={true}
			title={title}
			onClose={props.actions.handleClose}
			style={PlanUtils.stylesForOcModal}
		>
			<div className="message-container-with-margin">
				<FormattedMessage {...messages.unableToContinueUnexpectedResponse} />
			</div>
		</OcModal>
	);
};

export default PlanChangeConfirmationModal;
export {
	PlanChangeConfirmationModalProps,
	PlanChangeConfirmationModalActionProps,
	PlanChangeConfirmationModalStateProps
};
