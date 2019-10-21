import OcInput from "../ocComponents/OcInput";
import { PostalAddress } from "../../redux/types";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import cssns from "../../utils/cssnsConfig";
import { PureComponent } from "react";
import messages from "./AddressValidation.messages";
import { FormattedMessage, FormattedHTMLMessage } from "../../channelUtils";
import classnames from "classnames";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const { React } = cssns("AddressValidationHandlerProposals");

interface AddressValidationHandlerProposalsStateProps {
	proposals: PostalAddress[] | null;
	currentAddress: PostalAddress;
	proposalSelected?: PostalAddress;
	confirmAnyway?: boolean;
	validationIsMandatory: boolean; // not used ..
}

interface AddressValidationHandlerProposalsActionProps {
	actions: {
		onChange: (address: PostalAddress) => void;
	};
}

interface AddressValidationHandlerProposalsState {
	showCount: number;
	startIndex: number;
	endIndex: number;
}

type Props = AddressValidationHandlerProposalsStateProps & AddressValidationHandlerProposalsActionProps;

class AddressValidationHandlerProposals extends PureComponent<Props, AddressValidationHandlerProposalsState> {
	static defaultProps = {
		currentAddress: {},
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			showCount: 3 /* TODO make configurable */,
			startIndex: 0,
			endIndex: 3,
		};
	}

	showNextProposals = () => {
		const currentIndex = this.state.startIndex;
		const showCount = this.state.showCount;
		const proposalsLength = this.props.proposals ? this.props.proposals.length : 0;
		const startIndex = currentIndex + showCount >= proposalsLength ? 0 : currentIndex + showCount;
		const endIndex = startIndex + showCount;
		this.setState({ startIndex, endIndex });
	};

	isThereMoreProposals = () => {
		const proposalsLength = this.props.proposals ? this.props.proposals.length : 0;

		return proposalsLength > 3;
	};

	isNextButtonDisabled = () => {
		const proposalsLength = this.props.proposals ? this.props.proposals.length : 0;

		return this.state.startIndex + 3 >= proposalsLength;
	};

	showPrevProposals = () => {
		const currentIndex = this.state.startIndex;
		const showCount = this.state.showCount;
		const startIndex = currentIndex - showCount;
		const endIndex = startIndex + showCount;
		this.setState({ startIndex, endIndex });
	};

	render() {
		const { currentAddress, confirmAnyway } = this.props;
		const proposalBlock = classnames({
			"list": true,
			"disabled-proposals": confirmAnyway
		});
		const addressParts = PostalAddressUtil.getAddressForMessage(currentAddress);
		const currentAddressAsString = PostalAddressUtil.getAddressAsString(addressParts, addressParts.countryName);

		const visibleProposals = this.props.proposals ? this.props.proposals.slice(this.state.startIndex, this.state.endIndex) : [];

		return (
			<div className="this">
				<p className="address-not-found-message">
					<FormattedMessage {...messages.addressNotFound} />
				</p>
				{currentAddressAsString && <FormattedHTMLMessage {...messages.addressNotFoundWithAddressItself} values={{ address: currentAddressAsString }} />}
				{!!visibleProposals.length && (
					<div>
						<div className="message-padding">
							<FormattedMessage {...messages.perhapsYouMeantSome} />
						</div>
						<div id="AddressValidationHandlerProposals-list" className={proposalBlock}>
							{visibleProposals.map((address, idx) => {
								const addressParts = PostalAddressUtil.getAddressForMessage(address);
								const proposalAsString = PostalAddressUtil.getAddressAsString(addressParts, addressParts.country);

								return (
									<div
										id={`AddressValidationHandlerProposals-list-item-${idx}`}
										className="list-item"
										key={`AddressValidationHandlerProposals-list-item-${idx}`}
									>
										<OcInput
											id={`AddressValidationHandlerProposals-radio-item-${idx}`}
											type="radio"
											className="check-address"
											checked={JSON.stringify(this.props.proposalSelected) === JSON.stringify(address)}
											onChange={() => this.props.actions.onChange(address)}
											defaultValue={JSON.stringify(address)}
										/>
										<div className="address-proposal">{proposalAsString}</div>
									</div>
								);
							})}
							{this.isThereMoreProposals() && (
								<div className="pagination-container">
									<OcButton
										onClick={this.showPrevProposals}
										buttonType={OcButtonType.LINK}
										className="show-more"
										disabled={this.state.startIndex === 0}
									>
										<FormattedMessage {...messages.prevSuggestion} />
									</OcButton>
									<OcButton
										onClick={this.showNextProposals}
										buttonType={OcButtonType.LINK}
										className="show-more"
										disabled={this.isNextButtonDisabled()}
									>
										<FormattedMessage {...messages.nextSuggestion} />
									</OcButton>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default AddressValidationHandlerProposals;
