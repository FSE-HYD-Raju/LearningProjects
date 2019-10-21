import cssns from "../../../utils/cssnsConfig";
import * as classnames from "classnames";
import OcInput from "../../ocComponents/OcInput";
import OcSelect from "../../ocComponents/OcSelect";
import SubscriptionStateNoun  from "./SubscriptionStateNoun";
import stateChangeMessages from "./StateChange.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import OcModal from "../../ocComponents/OcModal";
import { ChangeEvent, Component, ReactNode } from "react";
import {
	BasketItem,
	ContextualPaymentMethod,
	Price,
	PriceTypeEnum,
	ProductModificationCombined,
	Reason, ServiceModificationCombined
} from "../../../redux/types";
import { get } from "lodash";
import SubscriptionState from "../SubscriptionState";
import OcCurrency from "../../ocComponents/OcCurrency";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import messages from "../../../commonMessages";
import { OcButton, OcButtonType } from "../../ocComponents";

const { React } = cssns("StateChangeModal");

const findLifecycleTranslationFromMessages = (lifecycle: string | undefined): FormattedMessageDescriptor | null => {
	if (lifecycle) {
		const prefix = "lifeCycleStatus";
		const upperCaseLifecycle = lifecycle.charAt(0).toUpperCase() + lifecycle.toLowerCase().slice(1);
		const messageId = prefix + upperCaseLifecycle;
		const message = (messages as any)[messageId];

		return message ? message : null;
	}
	return null;
};

const renderTitle = (showDisable: boolean, isAddon: boolean, stateTransitionCode: string) => {
	return (
		<div>
			{showDisable ? (<FormattedMessage {...(isAddon ? stateChangeMessages.deactivateAddon : stateChangeMessages.deactivateService)}/>) : (
				<span>
					<FormattedMessage {...stateChangeMessages.confirm}/>
					{/* tslint:disable-next-line:jsx-use-translation-function */}
					&nbsp;
					{isAddon ? <FormattedMessage {...stateChangeMessages.addon}/> : <FormattedMessage {...stateChangeMessages.service}/>}
					{/* tslint:disable-next-line:jsx-use-translation-function */}
					&nbsp;
					<SubscriptionStateNoun state={stateTransitionCode} />
				</span>
			)}
		</div>
	);
};

const findLifecycleEventPrice = (totalPrices: Array<Price>): number => {
	if (totalPrices && totalPrices.length > 0) {
		const price = totalPrices[0];
		if (price && price.type === PriceTypeEnum.ONE_TIME) {
			return price.taxFreeAmount || 0;
		}
	}

	return 0;
};

interface StateChangeModalConfirmationProps {
	showDisable: boolean;
	isAddon: boolean;
	stateTransitionCode: string;
	modification?: ProductModificationCombined | ServiceModificationCombined;
	selectedPaymentMethod?: string;
	selectedReason: string; // this.userHasSelectedReason();
	phoneNumber?: string;
	name: string;
	description: string;
	currency: string;
	requireReasonSelect: boolean;
	reasons: Array<Reason>;
	handleOkClick: () => void;
	handleClose: () => void;
	handleSelectReason: (reason: string) => void;
	handleSelectPaymentMethod: (methodId: string | undefined) => void;
}

class StateChangeModalConfirmation extends Component<StateChangeModalConfirmationProps> {

	shouldDisableOkButton = (paymentIsRequired: boolean, topUpAmount: number, isDisableModal: boolean) => {
		if (isDisableModal) {
			return false;
		}
		const topUpRequired = topUpAmount > 0;

		if (this.props.requireReasonSelect && !this.doesUserHaveSelectedReason()) {
			return true;
		}

		if (!paymentIsRequired) {
			return false;
		}

		if (topUpRequired) {
			return true;
		} else {
			return !this.props.selectedPaymentMethod;
		}
	};

	handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		this.props.handleSelectReason(event.target.value);
	};

	doesUserHaveSelectedReason = (): boolean => {
		return this.props.selectedReason !== "default";
	};

	getModalFooter = (): ReactNode => {
		const {
			showDisable, isAddon, modification, stateTransitionCode
		} = this.props;
		const priceArray: Array<Price> = get(modification, "basketItems[0].attributes.totalPrices", []);
		const paymentMethods: Array<ContextualPaymentMethod> = get(modification, "resource.attributes.paymentMethods", []);
		const paymentMethodBalance: ContextualPaymentMethod | undefined = paymentMethods.find(
			pm => pm.id === "balance"
		);
		const lifecycleEventPrice = findLifecycleEventPrice(priceArray);
		const balanceSuffices: boolean = paymentMethodBalance && lifecycleEventPrice && !isNaN(lifecycleEventPrice)
			? paymentMethodBalance.balance > lifecycleEventPrice
			: false;
		const paymentIsRequired = Boolean(lifecycleEventPrice && lifecycleEventPrice > 0);

		const topUpAmount: number = paymentIsRequired && balanceSuffices ? 0
			: (paymentMethodBalance ? lifecycleEventPrice! - paymentMethodBalance.balance : 0);

		const confirmButtonClasses = classnames({
			"confirm-button": true,
			"btn-primary": !showDisable,
			"btn-danger": showDisable
		});
		const confirmMessage = showDisable ? stateChangeMessages.stateTransitionDeactivate : stateChangeMessages.confirm;
		return (
			<div className="modal-footer justify-content-between">
				<OcButton
					id="oc-modal-cancel-button"
					onClick={this.props.handleClose}
					buttonType={OcButtonType.PRIMARY}
					outline={true}
				>
					<FormattedMessage {...stateChangeMessages.cancel}/>
				</OcButton>
				<OcButton
					className={confirmButtonClasses}
					id="buttonAcceptServiceStateTransition"
					disabled={this.shouldDisableOkButton(
						paymentIsRequired,
						topUpAmount,
						showDisable
					)}
					onClick={this.props.handleOkClick}
					buttonType={OcButtonType.SUCCESS}
				>
					{showDisable ? (
						<FormattedMessage {...confirmMessage} />
					) : (
						<span>
						<SubscriptionState state={stateTransitionCode}/>
							{/* tslint:disable-next-line:jsx-use-translation-function */}
							&nbsp;{isAddon ? <FormattedMessage {...stateChangeMessages.addon}/> :
							<FormattedMessage {...stateChangeMessages.service}/>}
					</span>
					)}
				</OcButton>
			</div>
		);
	};

	render() {
		const {
			showDisable, isAddon, modification, stateTransitionCode,
			name, description, currency, requireReasonSelect
		} = this.props;

		const basketItems: Array<BasketItem> = modification ? modification.basketItems || [] : [];

		const priceArray: Array<Price> = get(modification, "basketItems[0].attributes.totalPrices", []);
		const paymentMethods: Array<ContextualPaymentMethod> = get(modification, "resource.attributes.paymentMethods", []);
		const defaultCurrency = get(modification, "products[0].prices[0].currency");
		const lifecycleEventPrice = findLifecycleEventPrice(priceArray);

		const paymentMethodBalance: ContextualPaymentMethod | undefined = paymentMethods.find(
			pm => pm.id === "balance"
		);

		const balanceSuffices: boolean = paymentMethodBalance && lifecycleEventPrice && !isNaN(lifecycleEventPrice)
			? paymentMethodBalance.balance > lifecycleEventPrice
			: false;

		const paymentIsRequired = Boolean(lifecycleEventPrice && lifecycleEventPrice > 0);

		const topUpAmount: number = paymentIsRequired && balanceSuffices ? 0
			: (paymentMethodBalance ? lifecycleEventPrice! - paymentMethodBalance.balance : 0);


		const containerClasses = classnames({
			"deactivation-modal": showDisable,
			container: true
		});

		return (
			<OcModal
				className="ServiceStateChangeModal"
				showModal={true}
				smallModal={true}
				title={renderTitle(showDisable, isAddon, stateTransitionCode)}
				customFooter={this.getModalFooter()}
				onClose={this.props.handleClose}
			>
				<div className={containerClasses}>
					{showDisable && (
						<div className="deactivate-service-main-container">
							<div className="top-container">
								<div className="title">
									<FormattedMessage {...stateChangeMessages.msisdn}/>
								</div>
								<div className="number data">
									{this.props.phoneNumber}
								</div>
							</div>
						</div>
					)}
					<div className="modal-row">
						<div className="label"><FormattedMessage {...stateChangeMessages.serviceName}/></div>
						<div className="data">{name}</div>
					</div>

					<div className="modal-row">
						<div className="label"><FormattedMessage {...stateChangeMessages.description}/></div>
						<div className="data">{description}</div>
					</div>

					<div className="modal-row">
						<div className="label"><span/></div>
						<div className="data"><FormattedMessage {...stateChangeMessages.questionDeactivate}/></div>
					</div>

					{!showDisable && requireReasonSelect && (
						<div className="modal-row">
							<div className="label"><FormattedMessage {...stateChangeMessages.reason}/></div>
							<div className="data">
								<OcSelect
									id={`state_change_reason_${name}_${stateTransitionCode}`}
									required={true}
									value={this.props.selectedReason || ""}
									onChange={this.handleSelectChange}
									data-test-name="state_change_reason"
								>
									<option value="default" disabled={true}>
										<FormattedMessage {...stateChangeMessages.selectReason}/>
									</option>
									{this.props.reasons.map(reason => (
											<option key={`state_change_reason_select_${reason.id}`} value={reason.attributes!.value}>
												{reason.attributes!.name}
											</option>
										)
									)}
								</OcSelect>
							</div>
						</div>
					)}

					<div className="confirmation-modal">
						{this.doesUserHaveSelectedReason() && (
							<div className="confirmation-modal-flex confirmation-modal-flex-column">
								{!isNaN(lifecycleEventPrice) && lifecycleEventPrice > 0 && (
									<div className="confirmation-modal-flex" data-test-name="fee-row">
										<div className="confirmation-modal-flex confirmation-modal-fee-label">
											<FormattedMessage {...stateChangeMessages.fees}/>
										</div>
										<div className="confirmation-modal-flex confirmation-modal-fee-value" data-test-name="fee-label-and-amount">
											<FormattedMessage
												{...stateChangeMessages.stateTransitionFee}
												values={{
													stateTransitionWord: (<SubscriptionStateNoun state={stateTransitionCode}/>)
												}}
											/>
											<OcCurrency
												cost={lifecycleEventPrice}
												currency={currency}
												className="confirmation-modal-currency"
											/>
										</div>
									</div>
								)}

								<div className="confirmation-modal-flex confirmation-modal-addon">
									<div className="confirmation-modal-flex">
										{isAddon ? (
											<FormattedMessage
												{...stateChangeMessages.transitionAddonAreYouSure}
												values={{
													stateTransitionWord: (
														<span className="state-transition-name">
															<SubscriptionState state={stateTransitionCode}/>
														</span>
													),
													name
												}}
											/>
										) : (
											<FormattedMessage
												{...stateChangeMessages.transitionServiceAreYouSure}
												values={{
													stateTransitionWord: (
														<span className="state-transition-name">
															<SubscriptionState state={stateTransitionCode}/>
														</span>
													),
													name
												}}
											/>
										)}
									</div>
								</div>
								{/* Consequences is hidden in customization as per SCT-09-02-02 */}
								{basketItems.length > 0 && (
									<div className="confirmation-modal-flex">
										<FormattedMessage {...stateChangeMessages.consequences}/>
									</div>
								)}

								<div className="consequences confirmation-modal-flex">
									{basketItems.map((basketItem: BasketItem, idx: number) => {
										const message = findLifecycleTranslationFromMessages(get(basketItem, "attributes.targetLifecycleStatus"));

										const key = "service-plan-and-products-" + basketItem.id + "-" + idx;
										const productName = get(basketItem, "attributes.product.name", name);

										const productPrice = basketItem.attributes!.totalPrices.find(
											price => price.type === PriceTypeEnum.ONE_TIME
										);

										return (
											<div className="confirmation-modal-flex consequences-basket-item" key={key}>
												<div className="confirmation-modal-flex consequences-product-name">
													{productName}
												</div>
												<div className="confirmation-modal-flex consequences-icon">
													<i className="fa fa-long-arrow-right"/>
												</div>
												<div className="confirmation-modal-flex consequences-resulting-state" data-test-name="resulting-state">
													{message && (<FormattedMessage{...message}/>)}
													<span className="consequences-resulting-state-price">
													{productPrice && (
														<span>
															{/* tslint:disable-next-line:jsx-use-translation-function */}
															{"("}<OcCurrency cost={productPrice.taxFreeAmount} currency={productPrice.currency}/>{")"}
														</span>
													)}
												</span>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
						{(lifecycleEventPrice > 0) && (
							<div className="confirmation-modal-flex confirmation-modal-flex-column payment-methods">
								{paymentMethods.length > 0 && (
									<div className="confirmation-modal-flex payment-methods-label">
										<FormattedMessage {...stateChangeMessages.paymentMethods}/>
									</div>
								)}
								<div className="confirmation-modal-flex payment-methods-values">
									{paymentMethods.map(method => (
										<div className="confirmation-modal-flex payment-methods-single" key={`column-${method.id}`}>
											<div key={method.id} className="confirmation-modal-flex payment-method-radio">
												<OcInput
													id={`payment-method-${method.id}`}
													type="radio"
													onChange={() => this.props.handleSelectPaymentMethod(this.props.selectedPaymentMethod ? undefined : method.id)}
													checked={this.props.selectedPaymentMethod === method.id}
													label={method.label}
												/>
											</div>
											{method.id === "balance" && this.props.selectedPaymentMethod === method.id && (
												<div className="confirmation-modal-flex payment-method-selected">
													<div className="balance confirmation-modal-flex">
														<div className="confirmation-modal-flex before-row">
														<span className="title">
															<FormattedMessage {...stateChangeMessages.balanceBefore}/>
														</span>
														<span className="amount">
															<OcCurrency cost={method.balance} currency={defaultCurrency}/>
														</span>
														</div>
														<div className="confirmation-modal-flex action-row">
														<span className="title">
															<FormattedMessage
																{...stateChangeMessages.activationFee}
																values={{
																	actionName: (<SubscriptionState state={stateTransitionCode}/>)
																}}
															/>
														</span>
														<span className={classnames({amount: true, negative: lifecycleEventPrice !== 0})}>
															<OcCurrency cost={-lifecycleEventPrice} currency={defaultCurrency}/>
														</span>
														</div>

														<div className="confirmation-modal-flex total-row">
														<span className="title">
															<FormattedMessage {...stateChangeMessages.balanceAfter}/>
														</span>
														<span className={classnames({amount: true, negative: method.balance < lifecycleEventPrice})}>
															<OcCurrency cost={method.balance - lifecycleEventPrice} currency={defaultCurrency}/>
														</span>
														</div>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					{!balanceSuffices && this.props.selectedPaymentMethod === "balance" && (
						<div className="balance-top-up-alert confirmation-modal-flex">
							<i className="fa fa-exclamation-triangle" aria-hidden="true"/>
							<FormattedMessage
								{...stateChangeMessages.needTopUp}
								values={{
									topUpAmount: (<OcCurrency cost={topUpAmount} currency={defaultCurrency}/>),
									stateTransitionWord: (
										<span className="state-transition-name">
											<SubscriptionStateNoun state={stateTransitionCode}/>
										</span>
									)
								}}
							/>
						</div>
					)}
				</div>
			</OcModal>
		);
	}
}

export default StateChangeModalConfirmation;
export {
	StateChangeModalConfirmationProps
};
