import cssns from "../../../utils/cssnsConfig";
import messages from "./NominationSearchInput.messages";
import { get, isEmpty } from "lodash";
import { Component } from "react";
import {
	NominationType,
	ProductPath,
	NominationCharacteristics
} from "../../../redux";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { FormattedMessageDescriptor } from "../../../channelUtils";
import { OcTextInput } from "../../ocComponents/input/OcTextInput";
import { OcInputLabelPosition } from "../../ocComponents/input/OcInputContainer";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const { React } = cssns("NominationSearchInput");

interface NominationSearchInputStateProps {
	path?: ProductPath;
	posNominationSubscriptionInformation: NominationType | null;
	nominationPOCharacteristics: NominationCharacteristics | null;
}

interface NominationSearchInputActionProps {
	actions: {
		resetConfigurations: () => void;
		nominationSearch: (searchTerm: string, path: ProductPath, nominationCharacteristics: NominationCharacteristics) => void;
	};
}

interface NominationSearchInputState {
	searchTerm: string;
}

type NominationSearchInputProps = NominationSearchInputStateProps & NominationSearchInputActionProps;

class NominationSearchInput extends Component<NominationSearchInputProps, NominationSearchInputState> {
	static contextTypes = contextTypesValidationMap;
	constructor(props: NominationSearchInputProps, context: ContextType) {
		super(props, context);
		this.state = {
			searchTerm: "",
		};
	}

	componentWillUnmount() {
		this.props.actions.resetConfigurations();
	}

	search = () => {
		if (this.state.searchTerm && this.props.path && this.props.nominationPOCharacteristics) {
			this.props.actions.nominationSearch(this.state.searchTerm, this.props.path, this.props.nominationPOCharacteristics);
		}
	};

	render() {
		if (!this.props.path) {
	 		return null;
		}

		const {
			posNominationSubscriptionInformation,
		} = this.props;

		const formatMessage = this.context.intl.formatMessage;

		const nominationSearchStarted = get(posNominationSubscriptionInformation, "nominationSearchStarted");

		const onKeyPress = (keyCode: string) => {
			if (keyCode === "13") {
				this.search();
			}
		};

		const renderSubscriptionInformationRow = (value: string, label: FormattedMessageDescriptor, errorCode: string) => {
			const errorMessage = errorCode && (messages as any)[errorCode] ? (messages as any)[errorCode] : undefined;
			return (
				<div className="subscription-information-row">
					<div>{formatMessage({ ...label })}</div>
					{errorCode ? (
						<div className="error">
							{formatMessage({...errorMessage})}
						</div>
					) : (
						<div>{value}</div>
					)}
				</div>
			);
		};

		return (
			<div>
				<OcTextInput
					className="this"
					labelWidth={"120px"}
					label={formatMessage({...messages.nominationSearchInputLabel})}
					labelPosition={OcInputLabelPosition.TOP}
					id="nomination-search-input"
					placeholder={formatMessage({...messages.nominationSearchInputPlaceHolder})}
					value={this.state.searchTerm}
					required={true}
					onChange={(event: any) => this.setState({ searchTerm: event.target.value })}
					onKeyPress={(event: any) => onKeyPress(event.target.keyCode)}
					addonRight={
						<OcButton
							buttonType={OcButtonType.DEFAULT}
							onClick={this.search}
							className="nomination-search-button"
							id="nomination-search-button"
						>
							{nominationSearchStarted ? (
								<i className="fas fa-spinner fa-spin" />
							) : (
								<i className="fa fa-search" />
							)}
						</OcButton>
					}
				/>
				{!isEmpty(posNominationSubscriptionInformation) && !nominationSearchStarted && (
					<div className="subscription-information">
						<h6>
							{formatMessage({...messages.nominationSearchInputSubscriptionInformation})}
						</h6>
						<div className="subscription-information-rows">
							{renderSubscriptionInformationRow(
								get(posNominationSubscriptionInformation, "productOffering.attributes.name"),
								messages.nominationSearchInputTariffPlan,
								get(posNominationSubscriptionInformation, "productOffering.errorCode")
							)}
							{renderSubscriptionInformationRow(
								get(posNominationSubscriptionInformation, "msisdn.number"),
								messages.nominationSearchInputMsisdn,
								get(posNominationSubscriptionInformation, "msisdn.errorCode"),
							)}
							{renderSubscriptionInformationRow(
								get(posNominationSubscriptionInformation, "sim.icc"),
								messages.nominationSearchInputICC,
								get(posNominationSubscriptionInformation, "sim.errorCode"),
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default NominationSearchInput;
export {
	NominationSearchInputProps,
	NominationSearchInputStateProps,
	NominationSearchInputActionProps,
	NominationSearchInputState,
};
