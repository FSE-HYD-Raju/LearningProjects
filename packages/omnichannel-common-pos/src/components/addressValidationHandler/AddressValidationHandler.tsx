import { isEmpty } from "lodash";
import { createPortal } from "react-dom";
import { PureComponent } from "react";
import cssns from "../../utils/cssnsConfig";
import OcModal from "../ocComponents/OcModal";
import { PostalAddress } from "../../redux/types";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import messages from "./AddressValidation.messages";
import AddressValidationHandlerProposals from "./AddressValidationHandlerProposals";
import AddressValidationDropdown from "./AddressValidationDropdown";
import { FormattedMessage, FormattedHTMLMessage } from "../../channelUtils";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const { React } = cssns("AddressValidationHandler");

interface AddressValidationHandlerStateProps {
	address: PostalAddress;
	containerRef: React.RefObject<HTMLDivElement> | null;
	className: string;
	displayConfirmation: boolean;
	handlerType?: "modal" | "dropdown";
	proposals: PostalAddress[] | null;
	isValidationFailed: boolean;
	skipProposals: boolean;
	validationMandatory?: boolean;
	allowInvalidAddress?: boolean;
}

interface AddressValidationHandlerActionProps {
	actions: {
		proposalSelected: (model: PostalAddress, forceUpdateAddress: boolean) => void;
		cancel: () => void;
		createCustomer: () => void;
		applyInvalidAddress?: (isChecked: boolean) => void;
		onClose?: () => void;
	};
}

interface AddressValidationHandlerState {
	confirmEnteredAddress?: boolean;
	proposedAddressSelected?: PostalAddress;
	showModal: boolean;
}

type Props = AddressValidationHandlerStateProps & AddressValidationHandlerActionProps;

const MODAL_HANDLER = "modal";

class AddressValidationHandler extends PureComponent<Props, AddressValidationHandlerState> {
	static defaultProps: Partial<Props> = {
		address: {},
		displayConfirmation: true,
		handlerType: "modal",
		proposals: [],
		skipProposals: false,
		validationMandatory: false,
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			confirmEnteredAddress: undefined,
			proposedAddressSelected: undefined,
			showModal: true,
		};

		/* Parent can call the validation API self and if there is errors, parent PureComponent
		 * can pass the error response to AddressValidationHandler to show proposals to user.
		 */
	}

	componentWillReceiveProps(newProps: Props) {
		if (this.props.proposals !== newProps.proposals && !isEmpty(newProps.proposals) && newProps.proposals && newProps.proposals[0]) {
			this.setState({
				proposedAddressSelected: newProps.proposals[0],
			});
		}
	}

	parentHandleProposalSelected = (address: PostalAddress, forceUpdateAddress: boolean) => {
		this.props.actions.proposalSelected(address, forceUpdateAddress);
		this.setState({ proposedAddressSelected: undefined, showModal: false });
	};

	parentReturnToForm = () => {
		this.props.actions.cancel();
		this.setState({ proposedAddressSelected: undefined, showModal: false });
	};
	closeForm = () => {
		if (this.props.actions.onClose) {
			this.props.actions.onClose();
			this.setState({ proposedAddressSelected: undefined, showModal: false });
		}
	}

	parentCreateCustomer = () => {
		this.props.actions.createCustomer();
	};

	confirmEnteredAddressHandler = (isChecked: boolean) => {
		this.props.actions.applyInvalidAddress && this.props.actions.applyInvalidAddress(isChecked);
		this.setState({
			confirmEnteredAddress: isChecked,
		});
	};

	forceSaveAddress = (isChecked: boolean) => {
		// TODO refactor logic of checkbox
		if (!isChecked) {
			this.confirmEnteredAddressHandler(false);
			return;
		}
		// To secure change sim functionality
		if (this.props.className === "inner-block-message") {
			this.parentCreateCustomer();
			this.setState({
				confirmEnteredAddress: true,
				showModal: false,
			});
		} else {
			this.confirmEnteredAddressHandler(true);
		}
	};

	handleSubmit = () => {
		if (this.proposalIsSelected() && !this.state.confirmEnteredAddress) {
			this.parentHandleProposalSelected(this.state.proposedAddressSelected!, !this.validationIsMandatory());
		} else if (this.props.allowInvalidAddress) {
			this.parentCreateCustomer();
			this.setState({ proposedAddressSelected: undefined, showModal: false });
		} else {
			this.parentReturnToForm();
		}
	};

	handleClose = () => {
		this.setState({ showModal: false });
		this.closeForm();
	};

	showingProposals = (): boolean => {
		if (this.props.skipProposals) {
			return false;
		} else {
			return this.thereIsProposals();
		}
	};

	getTitle() {
		if (this.showingProposals()) {
			return (
				<div>
					<i className="fa fa-exclamation-triangle" />
					<FormattedMessage {...messages.addressNotFound} />
				</div>
			);
		}
		if (!this.showingProposals() && !this.validationIsMandatory()) {
			return (
				<div>
					<i className="fa fa-info-circle" />
					<FormattedMessage {...messages.addressNotFound} />
				</div>
			);
		}
		if (!this.thereIsProposals() && this.validationIsMandatory()) {
			return (
				<div>
					<i className="fa fa-exclamation-triangle" />
					<FormattedMessage {...messages.invalidAddress} />
				</div>
			);
		}
		return <FormattedMessage {...messages.insertAddress} />;
	}

	handleProposalSelected = (address: PostalAddress) => {
		this.setState({ proposedAddressSelected: address });
	};

	proposalIsSelected = (): boolean => {
		return Boolean(this.state.proposedAddressSelected && !isEmpty(this.state.proposedAddressSelected!));
	};

	canSave = (): boolean => {
		if (this.showingProposals()) {
			return this.proposalIsSelected() || Boolean(this.state.confirmEnteredAddress);
		} else {
			return Boolean(!this.state.confirmEnteredAddress);
		}
	};

	validationIsMandatory = (): boolean => {
		return Boolean(this.props.validationMandatory);
	};

	thereIsProposals = (): boolean => {
		return !isEmpty(this.props.proposals);
	};

	/* should be removed as no longer part of design */
	getSaveButton = () => {
		return (
			<div id="addressSaveButton">
				<OcButton
					id="save-address-apply"
					onClick={this.handleSubmit}
					disabled={!this.canSave()}
					buttonType={OcButtonType.PRIMARY}
					className="apply-button"
				>
					<FormattedMessage {...(!this.validationIsMandatory() && !this.thereIsProposals() ? messages.saveAnyway : messages.saveAddress)} />
				</OcButton>
			</div>
		);
	};

	usePortal(node: any, containerRef: React.RefObject<HTMLDivElement> | null): any {
		if (containerRef && containerRef.current) {
			return createPortal(node, containerRef.current);
		}
		return node;
	}

	getProposals(props: Props): PostalAddress[] | null {
		return props.skipProposals ? [] : props.proposals;
	}

	render() {
		const { address, isValidationFailed } = this.props;
		const proposals = this.getProposals(this.props);

		const addressParts = PostalAddressUtil.getAddressForMessage(address);
		const addressAsString = PostalAddressUtil.getAddressAsString(addressParts, addressParts.countryName);

		/* should be removed as no longer part of design */
		const okButtonLabel = <FormattedMessage
			{...(!this.validationIsMandatory() && !this.thereIsProposals() ? messages.saveAnyway : messages.saveAddress)}
		/>;

		if (!address || !isValidationFailed) {
			return null;
		}

		return this.props.handlerType === MODAL_HANDLER ? (
			<OcModal
				className="AddressValidationHandler-modal"
				showModal={this.state.showModal}
				smallModal={true}
				title={this.getTitle()}
				onOk={() => this.handleSubmit()}
				okDisabled={!this.canSave()}
				onClose={this.handleClose}
				okButtonLabel={okButtonLabel}
				fitScreen={true}
			>
				<div className="modal-content">
					{!this.thereIsProposals() &&
						this.validationIsMandatory() && (
							<div className="form" data-test-name="address-not-found-message">
								<FormattedHTMLMessage
									{...messages.addressNotFoundFor}
									values={{
										address: addressAsString,
									}}
								/>
							</div>
						)}
					{this.thereIsProposals() && (
						<div>
							<AddressValidationHandlerProposals
								proposals={this.props.proposals}
								proposalSelected={this.state.proposedAddressSelected}
								currentAddress={this.props.address}
								validationIsMandatory={this.validationIsMandatory()}
								confirmAnyway={Boolean(this.state.confirmEnteredAddress)}
								actions={{
									onChange: this.handleProposalSelected,
								}}
							/>
						</div>
					)}
					{!this.thereIsProposals() &&
						!this.validationIsMandatory() && (
							<div data-test-name="address-not-found-save-anyway-question">
								<FormattedHTMLMessage
									{...messages.addressNotFoundSaveAnyway}
									values={{
										address: addressAsString,
									}}
								/>
							</div>
						)}
				</div>
			</OcModal>
		) : (
			this.usePortal(
				<AddressValidationDropdown
					validationIsMandatory={this.validationIsMandatory()}
					proposals={proposals}
					proposalSelected={this.state.proposedAddressSelected}
					address={this.props.address}
					displayConfirmation={this.props.displayConfirmation}
					className={this.props.className}
					actions={{
						onChange: (address: PostalAddress) => this.handleProposalSelected(address),
						getSaveButton: () => this.getSaveButton(),
						cancel: () => this.parentReturnToForm(),
						forceSaveAddress: (isChecked: boolean) => {
							this.forceSaveAddress(isChecked);
						},
					}}
				/>,
				this.props.containerRef
			)
		);
	}
}

export default AddressValidationHandler;

export { AddressValidationHandlerStateProps, AddressValidationHandlerActionProps };
