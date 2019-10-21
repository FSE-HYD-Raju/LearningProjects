// @flow
import { type RouterHistory } from "react-router";
import {
	cssns,
	OcDocumentReviewer,
	OcDownloadButton,
	OcFileUpload,
	OcInput,
	OcModal,
	FormattedMessage,
	Flux,
	actions,
	ContextType,
	contextTypesValidationMap,
	OcButton,
	OcButtonType
} from "omnichannel-common-pos";
import PropTypes from "prop-types";
import { Component } from "react";
import { get } from "lodash";
import classnames from "classnames";
import BasketClearedError from "./BasketClearedError";
import POSDigitalSignatureContainer from "./POSDigitalSignatureContainer"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import type {
	BasketStoreType,
} from "omnichannel-flow-pos";
import messages from "../posMessages";
import POSCheckoutPrivacyConsent from "./POSCheckoutPrivacyConsent";

const { BasketActions } = Flux;
const { React } = cssns("Summary");

interface PrivacyConsent {
	source: string;
	name: string;
	description: string;
}

type Props = {
	BasketStore: BasketStoreType,
	saveCheckoutConfigurationToBasket: (string, string) => void,
	BasketActions: BasketActions,
	error: any;
	documentGenerateButtonState: boolean;
	PaymentActions: {
		getEligiblePaymentMethods: (activeBasketId: string) => void,
		resetPaymentStore: () => void
	};
	history: RouterHistory,
	inputCharacteristics: Array<{ basketProductId: string, privacyConsents: PrivacyConsent }>,
	action: {
		backToDetails: () => void,
	}
};

type State = {
	contractRead: boolean,
	termsRead: boolean,
	showContractModal: boolean,
	showTermsModal: boolean,
	contractId: string,
	termsId: string,
	contract: ?Object,
	isFileValidated: boolean,
	isUploadDocumentStarted: boolean,
	selectedConsents: Object<string, boolean>,
};

class POSCheckoutSummary extends Component<Props, State> {
	props: Props;

	static displayName = "POSCheckoutSummary";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		BasketStore: PropTypes.object,
		UserStore: PropTypes.object,
		saveCheckoutConfigurationToBasket: PropTypes.func,
		BasketActions: PropTypes.shape({
			activateCheckoutStep: PropTypes.func.isRequired
		}).isRequired,
		PaymentActions: PropTypes.object,
		document: PropTypes.object,
		showDigitalSignature: PropTypes.bool,
		customerCaseId: PropTypes.string,
		uploadDocumentConfiguration: PropTypes.object,
	};

	constructor(props: Props, context: ContextType) {
		super(props, context);

		this.isUploadDocumentStarted = false;
		this.state = {
			contractRead: false,
			termsRead: false,
			showContractModal: false,
			showTermsModal: false,
			contract: null,
			contractId: "Contract",
			termsId: "Terms",
			isFileValidated: false,
			acceptedFiles: [],
			isUploadDocumentStarted: false,
			selectedConsents: {},

		};
	}

	componentWillMount(): void {
		this.props.BasketActions.activateCheckoutStep({ step: "SUMMARY" });
	}

	componentDidMount(): void {
		this.checkIfStepReady(this.state);
	}

	componentWillReceiveProps(newProps: Props): void {
		if (newProps.BasketStore.basketItems && !newProps.BasketStore.basketItems.length && !newProps.error) {
			newProps.BasketActions.onError(BasketClearedError);
		}
	}

	handleContractReadCheckbox = (): void => {
		this.setState(
			{
				contractRead: !this.state.contractRead
			},
			() => this.checkIfStepReady(this.state)
		);
	};

	handleTermsReadCheckbox = (): void => {
		this.setState(
			{
				termsRead: !this.state.termsRead
			},
			() => {
				this.checkIfStepReady(this.state);
			}
		);
	};

	checkIfStepReady(state: State): void {
		const { contractRead, termsRead } = state;
		const isValid = contractRead && termsRead;
		this.props.BasketActions.activateCheckoutStep({
			step: "SUMMARY",
			valid: isValid
		});
	}

	openContractModal = (e: SyntheticEvent<*>): void => {
		e.preventDefault();
		this.context.flux.reduxStore.dispatch(actions.document.getDocument(this.state.contractId));
		this.setState({
			showContractModal: true
		});
	};

	openTermsModal = (e: SyntheticEvent<*>): void => {
		e.preventDefault();
		this.context.flux.reduxStore.dispatch(actions.document.getDocument(this.state.termsId));
		this.setState({
			showTermsModal: true
		});
	};

	closeTermsModal = (): void => {
		this.setState({
			showTermsModal: false
		});
	};

	closeContractModal = (): void => {
		this.setState({
			showContractModal: false
		});
	};

	navigateToCheckoutPayment = (): void => {
		this.isUploadDocumentStarted = false;
		this.props.history.push("/servicedesk/checkout/payment");
	}

	preparePaymentStep = (): void => {
		const { BasketStore, PaymentActions, BasketActions, customerCaseId, inputCharacteristics, } = this.props;
		const { acceptedFiles, isFileValidated } = this.state;
		const activeBasketId = BasketStore.activeBasket.id;
		const upfrontPrices =
			BasketStore.activeBasket.attributes &&
			BasketStore.activeBasket.attributes.upfrontPrices;
		PaymentActions.resetPaymentStore();

		if (activeBasketId && upfrontPrices) {
			PaymentActions.getEligiblePaymentMethods(activeBasketId);
		}

		if (inputCharacteristics && inputCharacteristics.length > 0) {
			const selectedConsents = this.state.selectedConsents;
			const inputtedCharacteristics = inputCharacteristics.map(inputCharacteristic => {
				const basketProductId = inputCharacteristic.basketProductId;
				return { basketProductId, "attributes": selectedConsents }
			});
			BasketActions.updateBasketProducts(inputtedCharacteristics);
		}

		if (acceptedFiles.length > 0 && isFileValidated) {
			this.context.flux.reduxStore.dispatch(actions.document.uploadDocument(this.state.acceptedFiles[0], customerCaseId));
			this.isUploadDocumentStarted = true;
		} else {
			this.props.history.push("/servicedesk/checkout/payment");
		}
	};

	preventLinkClick = (e: SyntheticEvent<*>) => {
		e.preventDefault();
	};

	handleFileUpload = (acceptedFiles, isFileValidated) => {
		this.setState({
			acceptedFiles,
			isFileValidated
		});
	}
	backDetails = () => {
		this.props.action.backToDetails();
	};

	renderDocumentUploadSuccessFailMessage = () => {
		const { document } = this.props;
		const { uploadSuccess: isDocumentUploadSuccess, uploadFailed: isDocumentUploadFailed } = document;
		return (
			<div>
				{document.id && isDocumentUploadSuccess &&
					<span className="text-success">
						<i className="fas fa-info-circle info-icon" />
						<FormattedMessage {...messages.paymentSummaryUploadFileSuccess} />
					</span>
				}
				{isDocumentUploadFailed &&
					<span className="text-failed">
						<i className="fas fa-info-circle info-icon" />
						<FormattedMessage {...messages.paymentSummaryUploadFileFailed} />
					</span>}
			</div>
		)
	}

	privacyConsentChangeHandler = (selectedItem: object <string > ) => {
	this.setState({
		selectedConsents: {
			...this.state.selectedConsents,
			...selectedItem,
		},
	})
}

renderPosCheckoutPrivacyConsents = () => {
	const {
		inputCharacteristics
	} = this.props;
	const inputCharacteristicPrivacyConsents = inputCharacteristics && inputCharacteristics.length > 0 && inputCharacteristics[0].privacyConsents; // 0th index for representation of privacy consents.
	const privacyConsentKeys = inputCharacteristicPrivacyConsents && Object.keys(inputCharacteristicPrivacyConsents);
	const privacyConsents = inputCharacteristicPrivacyConsents && Object.values(inputCharacteristicPrivacyConsents);
	return (<POSCheckoutPrivacyConsent privacyConsents={privacyConsents} privacyConsentKeys={privacyConsentKeys}
		changeHandler={this.privacyConsentChangeHandler} />
	)
}

render() {
	const defaultAcceptedFileFormats = ["application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/pdf",
		"image/png",
		"image/jpeg"];
	const { BasketStore, uploadDocumentConfiguration, document: documentState, inputCharacteristics } = this.props;
	const { activeBasket, checkoutSteps } = BasketStore;
	const { isEnabled: isDocumentUploadFeatureEnabled, mandatory: isDocumentUploadFeatureMandatory, acceptedFileFormats } = uploadDocumentConfiguration;
	const { uploadSuccess: isDocumentUploadSuccess } = documentState;
	const document = documentState.documents && documentState.documents[this.state.contractId];
	const title = document ? document.title : "";
	const file = document ? document.file : "";
	const acceptedFileTypes = acceptedFileFormats.length > 0 ?
		acceptedFileFormats : defaultAcceptedFileFormats;

	const { acceptedFiles, isFileValidated } = this.state;

	if (this.isUploadDocumentStarted && isDocumentUploadSuccess) {
		this.navigateToCheckoutPayment();
	}

	if (!activeBasket) {
		return null;
	}

	const inputCharacteristicPrivacyConsents = inputCharacteristics && inputCharacteristics.length > 0 && inputCharacteristics[0].privacyConsents; // validating the selected privacy consents with 0th index of privacy consents
	const isPrivacyConsentsSelected = inputCharacteristicPrivacyConsents
		&& Object.keys(inputCharacteristicPrivacyConsents).every(key => key in this.state.selectedConsents);

	let summaryDone =
		checkoutSteps &&
		checkoutSteps.SUMMARY &&
		((isDocumentUploadFeatureEnabled &&
			isDocumentUploadSuccess &&
			acceptedFiles.length === 0) ||
			(isDocumentUploadFeatureEnabled &&
				(isDocumentUploadFeatureMandatory || acceptedFiles.length > 0) ?
				isFileValidated : true));

	if (inputCharacteristics && inputCharacteristics.length > 0) {
		summaryDone = summaryDone && isPrivacyConsentsSelected;
	}
	const contractLink = (
		<FormattedMessage {...messages.summaryContractLink} >
			{message => (
				<a className="contract-link" onClick={this.openContractModal}>
					{message}
				</a>
			)}
		</FormattedMessage>
	);

	const termsLink = (
		<FormattedMessage {...messages.summaryTermLink} >
			{message => (
				<a className="terms-link" onClick={this.openTermsModal}>
					{message}
				</a>
			)}
		</FormattedMessage>
	);

	return (
		<section className="this">
			<div className="w-box">
				{
					inputCharacteristics && inputCharacteristics.length > 0 && this.renderPosCheckoutPrivacyConsents()
				}
				<h3>
					<FormattedMessage {...messages.summaryCheckOrder} />
				</h3>
				{(this.props.showDigitalSignature && this.props.documentGenerateButtonState &&
					<POSDigitalSignatureContainer />
				)}
				<div className="contract">
					<div className="contract-row">
						<OcInput
							id="pos-checkout-summary-contract-read"
							type="checkbox"
							name="contract"
							value={this.state.contractRead}
							standalone={true}
							onChange={this.handleContractReadCheckbox}
							label={
								<FormattedMessage
									{...messages.summaryHaveReadContract}
									values={{ link: contractLink }}
								/>
							}
						/>
					</div>
					<div className="contract-row">
						<OcInput
							id="pos-checkout-summary-term-and-conditions-read"
							type="checkbox"
							name="terms"
							onChange={this.handleTermsReadCheckbox}
							value={this.state.termsRead}
							standalone={true}
							label={
								<FormattedMessage
									{...messages.summaryHaveRead}
									values={{ link: termsLink }}
								/>
							}
						/>
					</div>
					{isDocumentUploadFeatureEnabled &&
						(<div className="contract-row">
							<OcFileUpload
								action={this.handleFileUpload}
								failureMessage={messages.documentTypeNotSupport}
								acceptedFileTypes={acceptedFileTypes}
								acceptMultipleFiles={false}>
								<a className="btn btn-outline-primary" onClick={e => { e.preventDefault(); }}>
									<FormattedMessage {...messages.paymentSummaryUploadFile} />
								</a>
							</OcFileUpload>

							{this.renderDocumentUploadSuccessFailMessage()}
						</div>)
					}
					<OcModal
						showModal={this.state.showContractModal}
						className="modal-large modal-fit-screen"
						title={title}
						headerActionButton={<OcDownloadButton file={file} className="Summary-download-button" />}
						onClose={this.closeContractModal}>
						<OcDocumentReviewer document={document} />
					</OcModal>

					<OcModal
						showModal={this.state.showTermsModal}
						className="modal-large modal-fit-screen"
						title={title}
						headerActionButton={<OcDownloadButton file={file} classes="Summary-download-button" />}
						onClose={this.closeTermsModal}>
						<OcDocumentReviewer document={documentState.documents && documentState.documents[this.state.termsId]} />
					</OcModal>
				</div>

				<footer>
					<Link to="/servicedesk/checkout/setup" id="pos-checkout-summary-back-to-details" className="btn btn-outline-secondary" onClick={this.backDetails}>
						<FormattedMessage {...messages.checkoutBackDetails} />
					</Link>

					<OcButton className={classnames({
						btn: true,
						"btn-primary": true,
						disabled: !summaryDone
							|| (this.props.showDigitalSignature
								&& this.props.documentGenerateButtonState
								&& !this.props.document.isAvailableForNextStep)
					})}
						id="pos-checkout-summary-to-to-payment"
						buttonType={OcButtonType.PRIMARY}
						onClick={summaryDone ? (this.preparePaymentStep) : (this.preventLinkClick)}>
						<FormattedMessage {...messages.summaryGoPayment} />
					</OcButton>

				</footer>
			</div>
		</section>
	);
}
}


const mapStateToProps = (state) => {
	const basketItems = state.basket.basketItems;
	const documentGenerateButtonState = basketItems && basketItems.find(basketItem => {
		const childBasketItems = get(basketItem, "attributes.childBasketItems", []);
		return childBasketItems.find(childBasketItem =>
			get(childBasketItem, "inputtedCharacteristics.CH_PortInNumberResource", false));
	});

	const privacyConsentId = state.posCheckout.privacyConsentId;
	const flatten = (basketItems: Array<BasketItem>) => {
		return basketItems && basketItems.reduce((acc: Array<BasketItem>, item: BasketItem) => {
			if (item && item.childBasketItems && item.childBasketItems.length) {
				acc = acc.concat(flatten(item.childBasketItems));
			} else if (item && item.attributes && item.attributes.childBasketItems && item.attributes.childBasketItems.length) {
				acc = acc.concat(flatten(item.attributes.childBasketItems));
			}

			acc = acc.concat(item);

			return acc;
		}, []);
	};

	const childBasketItems = flatten(basketItems);
	const privacyConsents = childBasketItems && childBasketItems.filter(childBasketItem =>
		childBasketItem && childBasketItem.product && childBasketItem.product.id === privacyConsentId);

	const inputCharacteristics = privacyConsents && privacyConsents.map(item => {
		const basketProductId = item.basketProductId;
		return { basketProductId, "privacyConsents": item.product.inputCharacteristics, };
	});

	const customerCaseId = state.customerCase.customerAccountId;
	return {
		document: state.document,
		showDigitalSignature: state.feature.showDigitalSignature,
		uploadDocumentConfiguration: state.feature.uploadDocumentConfiguration,
		documentGenerateButtonState,
		customerCaseId,
		inputCharacteristics,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		action: {
			backToDetails: () => {
				dispatch(actions.document.resetUploadDocumentFailed());
			}
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(POSCheckoutSummary);
