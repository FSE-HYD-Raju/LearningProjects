import { isEmpty } from "lodash";
import * as R from "react";
import onClickOutside, { HandleClickOutside, InjectedOnClickOutProps } from "react-onclickoutside";
import classnames from "classnames";
import { PostalAddress } from "../../redux/types";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import { FormattedMessage, FormattedHTMLMessage } from "../../channelUtils/";
import cssns from "../../utils/cssnsConfig";
import OcDropdown from "../ocComponents/OcDropdown";
import OcInput from "../ocComponents/OcInput";
import messages from "./AddressValidation.messages";
import AddressValidationHandlerProposals from "./AddressValidationHandlerProposals";
import { ContextType, contextTypesValidationMap } from "../../types";

const React = cssns("AddressValidationDropdown").React as typeof R;

interface AddressValidationDropdownStateProps {
	displayConfirmation: boolean;
	validationIsMandatory: boolean;
	proposals: PostalAddress[] | null;
	address: PostalAddress;
	proposalSelected?: PostalAddress;
	className: string;
}

interface AddressValidationDropdownActionProps {
	actions: {
		onChange: (address: PostalAddress) => void;
		getSaveButton: () => React.ReactElement<any> | null;
		forceSaveAddress: (isChecked: boolean) => void;
		cancel: () => void;
	};
}

interface AddressValidationDropdownState {
	isSaveInvalidAddressConfirmed: boolean;
}

type Props = AddressValidationDropdownStateProps & AddressValidationDropdownActionProps;

class AddressValidationDropdown extends (React as typeof R).Component<Props & InjectedOnClickOutProps, AddressValidationDropdownState>
	implements HandleClickOutside<any> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: Props & InjectedOnClickOutProps, context: ContextType) {
		super(props, context);
		this.state = {
			isSaveInvalidAddressConfirmed: false
		};

		if (process.env.BROWSER) {
			props.enableOnClickOutside();
		}
	}

	handleClickOutside = () => {
		this.props.actions.cancel();
	};

	thereIsProposals = () => {
		return !isEmpty(this.props.proposals);
	};

	onConfirmSaveAnyway = (e: any) => {
		if (!e.target.checked) {
			this.props.actions.forceSaveAddress(false);
			this.setState({ isSaveInvalidAddressConfirmed: false });
			return;
		}

		this.setState({ isSaveInvalidAddressConfirmed: true });
		this.props.actions.forceSaveAddress(true);
	};

	render() {
		const addressParts = PostalAddressUtil.getAddressForMessage(this.props.address);
		const addressAsString = PostalAddressUtil.getAddressAsString(addressParts);

		const { formatMessage } = this.context.intl;

		const containerClasses = classnames({
			container: true,
			[this.props.className]: this.props.className
		});

		return (
			<div className={containerClasses}>
				<OcDropdown
					dropdownKey="AddressValidationDropdown-addresses"
					trianglePosition={this.props.className.includes("inner-block-message") ? "top" : ""}
				>
					{!this.thereIsProposals() &&
						this.props.validationIsMandatory && (
							<div className="form">
								<p className="address-not-found-message" data-test-name="address-not-found-message">
									<FormattedMessage
										{...messages.addressNotFound}
									/>
								</p>
								<FormattedHTMLMessage
									{...messages.addressNotFoundFor}
									values={{address: addressAsString}}
								/>
							</div>
						)}
					{(this.thereIsProposals()) && (
						<div className="proposals-container">
							<AddressValidationHandlerProposals
								proposals={this.props.proposals}
								proposalSelected={this.props.proposalSelected}
								currentAddress={this.props.address}
								validationIsMandatory={this.props.validationIsMandatory}
								confirmAnyway={this.state.isSaveInvalidAddressConfirmed}
								actions={{
									onChange: this.props.actions.onChange
								}}
							/>
						</div>
					)}
					{/* better store the 'checked' status to app state.. can't test this */}
					{this.props.displayConfirmation && <OcInput
						type="checkbox"
						name="address-validation-save-anyway-confirm-checkbox"
						onChange={this.onConfirmSaveAnyway}
						label={formatMessage(messages.myAddressIsNotOnTheListConfirmItIsValid)}
						checked={this.state.isSaveInvalidAddressConfirmed}
						standalone={true}
						id="address-validation-save-anyway-confirm-checkbox"
					/>}
					{this.props.actions.getSaveButton()}
				</OcDropdown>
			</div>
		);
	}
}

export default onClickOutside<Props>(AddressValidationDropdown);
