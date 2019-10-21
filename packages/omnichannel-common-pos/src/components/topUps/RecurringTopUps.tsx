import messages from "./RecurringTopUp.messages";
import { Alert } from "react-bootstrap";
import { Component, ReactNode } from "react";
import { RecurringTopUpUtil } from "./RecurringTopUpUtil";
import OcCurrency from "../ocComponents/OcCurrency";
import cssns from "../../utils/cssnsConfig";
import { CustomerPaymentMethod, RecurringTopUpModelType, User } from "../../redux";
import { ContextType, contextTypesValidationMap } from "../../types";
import FormattedMessage, { FormattedMessageDescriptor } from "../../channelUtils/FormattedMessage";
import { FormattedHTMLMessage } from "../../channelUtils";
import { default as RecurringTopUpAddModal } from "./RecurringTopUpAddModal";
import RecurringTopUpEditModal from "./RecurringTopUpEditModal";
import { RecurringTopUpProductType } from "../../redux/types";
import MsisdnUtil from "../../utils/MsisdnUtil";
import PaymentUtil from "../../utils/PaymentUtil";
import { commonDigitalLifeRoutes } from "../../routes/commonRoutesMap";
import { OcButton, OcButtonType } from "../ocComponents";
import RecurringTopUpsEmptyList from "./RecurringTopUpsEmptyList";
import classnames from "classnames";
import RecurringTopUpNoPaymentMethodModal from "./RecurringTopUpNoPaymentMethodModal";

const { React } = cssns("RecurringTopUps");

interface RecurringTopUpsStateProps {
	user?: User;
	showAlertMessage: boolean;
	currentRecurringTopUps: Array<RecurringTopUpProductType>;
	selectedCurrency: string;
	modelForAdd: RecurringTopUpModelType;
	activePaymentMethods: Array<CustomerPaymentMethod>;
}

interface RecurringTopUpsActionProps {
	actions: {
		getPaymentMethods: (customerAccountId: string) => void;
		historyPush: (newLocation: string) => void;
	};
}

interface RecurringTopUpsState {
	showEditModal: boolean;
	showAddModal: boolean;
	showNoPaymentModal: boolean;
	model: RecurringTopUpModelType;
}

type RecurringTopUpsProps = RecurringTopUpsStateProps & RecurringTopUpsActionProps;

class RecurringTopUps extends Component<RecurringTopUpsProps, RecurringTopUpsState> {
	static displayName = "RecurringTopUps";
	static contextTypes = contextTypesValidationMap;

	constructor(props: RecurringTopUpsProps, context: ContextType) {
		super(props, context);

		this.state = {
			showEditModal: false,
			showAddModal: false,
			showNoPaymentModal: false,
			model: {},
		};
	}

	componentWillMount(): void {
		if (this.props.user) {
			const accountId = this.props.user.attributes ? this.props.user.attributes.customerAccountId : this.props.user.customerAccountId;
			this.props.actions.getPaymentMethods(accountId!);
		}
	}

	generateRows = (recurringTopUpProducts: Array<RecurringTopUpProductType>): ReactNode => {
		const { selectedCurrency, activePaymentMethods } = this.props;
		return (
			<tbody>
				{recurringTopUpProducts.map((recurringTopUpProduct: RecurringTopUpProductType, idx: number) => {
					const { subscription, characteristicsValue, paymentMethod } = recurringTopUpProduct;
					const { type, thresholdValue, amount } = characteristicsValue;
					const msisdnWithSeparatedAreaCode = subscription && MsisdnUtil.getMsisdnWithSeparatedAreaCode(subscription);
					const creditCardPresentation = paymentMethod && PaymentUtil.getCreditCardPresentation(paymentMethod);
					const cardType = creditCardPresentation && creditCardPresentation.cardType;
					const cardEnding = creditCardPresentation && creditCardPresentation.cardEnding;

					return (
						<tr key={`RecurringTopUps-table-row-${idx}`}>
							<td className="key-value">
								<div className="key">
									<FormattedMessage {...messages.phoneNumberHeader} />
								</div>
								{msisdnWithSeparatedAreaCode}
							</td>
							<td className="key-value">
								<div className="key">
									<FormattedMessage {...messages.topUpTypeHeader} />
								</div>
								{type}
							</td>
							<td className="key-value">
								<div className="key">
									<FormattedMessage {...messages.amountHeader} />
								</div>
								<div className="right-align">
									<OcCurrency cost={Number(amount)} currency={selectedCurrency} round={true} ignoreSpaces={true} />
								</div>
							</td>
							<td className="key-value">
								<div className="key">
									<FormattedMessage {...messages.thresholdHeader} />
								</div>
								<div className="right-align">
									<OcCurrency cost={Number(thresholdValue)} currency={selectedCurrency} round={true} ignoreSpaces={true} />
								</div>
							</td>
							<td className="key-value">
								<div className="key">
									<FormattedMessage {...messages.paymentMethodHeader} />
								</div>
								<span className="payment-method-col mobile-view-payment-method">
									{creditCardPresentation && <FormattedMessage {...messages.cardDescription} values={{ cardType, cardEnding }} />}
									{!creditCardPresentation && (
										<span
											className="fake-btn-link"
											onClick={() => {
												this.openPaymentMethodTabOrEditModal(activePaymentMethods, recurringTopUpProduct);
											}}
										>
											<i className="fa fa-exclamation-circle add-payment-method-icon" />
											<span className="add-payment-method-link">
												<FormattedMessage {...messages.addPaymentMethod} />
											</span>
										</span>
									)}
								</span>
							</td>
							<td className="key-value">
								<div className="right-align">{this.renderEditButton(idx, recurringTopUpProduct)}</div>
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	};

	updateStateWith = (model: RecurringTopUpModelType, showEditModal: boolean) => {
		this.setState({
			model,
			showEditModal: showEditModal,
		});
	};

	openPaymentMethodTabOrEditModal(activePaymentMethods: CustomerPaymentMethod[], recurringTopUpProduct: RecurringTopUpProductType) {
		if (activePaymentMethods.length === 0) {
			this.props.actions.historyPush(commonDigitalLifeRoutes.DIGITAL_LIFE_PAYMENT_METHODS.createLink());
		} else if (activePaymentMethods.length > 0) {
			const model = RecurringTopUpUtil.getModelForEdit(recurringTopUpProduct);
			this.updateStateWith(model, true);
		}
	}

	renderEditButton(idx: number, recurringTopUpProduct: RecurringTopUpProductType): ReactNode {
		const model = RecurringTopUpUtil.getModelForEdit(recurringTopUpProduct);
		return (
			<span className="active-span btn-link" id={`RecurringTopUps-edit-button-${idx}`} onClick={() => this.updateStateWith(model, true)}>
				<i className="fa fa-pencil-alt btn-icon-left" />
				<FormattedMessage {...messages.edit} />
			</span>
		);
	}

	renderAddButton = (): ReactNode => {
		const { modelForAdd, currentRecurringTopUps, activePaymentMethods } = this.props;
		const isRecurringTopUpsNotEmptyList = currentRecurringTopUps && currentRecurringTopUps.length > 0;
		const isPaymentExist = activePaymentMethods && activePaymentMethods.length > 0;
		return (
			<OcButton
				buttonType={OcButtonType.PRIMARY}
				outline
				className="add-button"
				id="RecurringTopUps-add-new-top-up-button"
				onClick={() => {
					this.setState({
						model: modelForAdd,
						showAddModal: isPaymentExist,
						showNoPaymentModal: !isPaymentExist,
					});
				}}
			>
				{isRecurringTopUpsNotEmptyList ? <FormattedMessage {...messages.addNewTopUp} /> : <FormattedMessage {...messages.addTopUp} />}
			</OcButton>
		);
	};

	getTableHeader(message: FormattedMessageDescriptor, alignRight: boolean = false, additionalClassNames: string = ""): ReactNode {
		return (
			<th
				className={classnames({
					"right-align": alignRight,
					[additionalClassNames]: additionalClassNames,
				})}
			>
				<FormattedMessage {...message} />
			</th>
		);
	}

	closeEditModal = (): void => {
		this.setState({
			showEditModal: false,
			model: {},
		});
	};
	closeAddModal = (): void => {
		this.setState({
			showAddModal: false,
			model: {},
		});
	};
	closeNoPaymentModal = (): void => {
		this.setState({
			showNoPaymentModal: false,
		});
	};
	render(): ReactNode {
		const { currentRecurringTopUps, showAlertMessage } = this.props;
		const { showEditModal, showAddModal, showNoPaymentModal, model } = this.state;
		// TODO: implement: hide alert
		return (
			<div className="RecurringTopUps">
				{currentRecurringTopUps && currentRecurringTopUps.length > 0 ? (
					<>
						<header className="w-view-header">
							<h3>
								<FormattedMessage {...messages.recurringTopUpList} />
							</h3>
							{this.renderAddButton()}
						</header>
						{showAlertMessage && (
							<Alert bsStyle="success" onDismiss={() => {}}>
								<FormattedHTMLMessage {...messages.changesHaveBeenMadeSuccessfully} />
							</Alert>
						)}
						<div className="content">
							<table className="table">
								<thead>
									<tr>
										{this.getTableHeader(messages.phoneNumberHeader)}
										{this.getTableHeader(messages.topUpTypeHeader)}
										{this.getTableHeader(messages.amountHeader, true)}
										{this.getTableHeader(messages.thresholdHeader, true)}
										{this.getTableHeader(messages.paymentMethodHeader, false, "payment-method-col")}
										<th />
									</tr>
								</thead>
								{currentRecurringTopUps.length > 0 && this.generateRows(currentRecurringTopUps)}
							</table>
						</div>
					</>
				) : (
					<RecurringTopUpsEmptyList addProductToBasket={this.renderAddButton} />
				)}
				{showEditModal && <RecurringTopUpEditModal show={true} closeModal={this.closeEditModal} initialModel={model} />}
				{showAddModal && <RecurringTopUpAddModal show={true} closeModal={this.closeAddModal} initialModel={model} />}
				{showNoPaymentModal && <RecurringTopUpNoPaymentMethodModal show={true} closeModal={this.closeNoPaymentModal} />}
			</div>
		);
	}
}

export default RecurringTopUps;
export { RecurringTopUpsState, RecurringTopUpsStateProps, RecurringTopUpsActionProps, RecurringTopUpsProps, RecurringTopUps };
