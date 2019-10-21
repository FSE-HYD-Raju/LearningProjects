"use strict";

import { Component, ValidationMap } from "react";
import cssns from "../../../utils/cssnsConfig";
import msisdnPatternSearchMessages from "./MsisdnPatternSearch.messages";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { MsisdnSelectionErrors } from "../../msisdnSelection/MsisdnSelection";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { OcTextInput } from "../../ocComponents/input/OcTextInput";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";
const { React } = cssns("MsisdnPatternSearch");

interface MsisdnPatternSearchProps {
	required: boolean;
	validateInput: (e: any) => void;
	onGetNewSet: (e: any) => void;
	errors: MsisdnSelectionErrors;
	maxLength?: number;
}

class MsisdnPatternSearch extends Component<MsisdnPatternSearchProps> {
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: MsisdnPatternSearchProps, context: ContextType) {
		super(props, context);
		this.state = {};
	}

	getErrorMessage = (): any => {
		if (this.props.errors.invalidLength && this.props.maxLength) {
			return (
				<FormattedMessage
					{...msisdnPatternSearchMessages.errorMaxLength}
					values={{
						maxLength: this.props.maxLength
					}}
				/>
			);
		} else if (this.props.errors.invalidPattern) {
			return <FormattedMessage {...msisdnPatternSearchMessages.errorInvalidPattern} />;
		}
		return null;
	};

	render() {
		const { required } = this.props;
		const { formatMessage } = this.context.intl;
		const errorMessage = this.getErrorMessage();
		const buttonMessage = <FormattedMessage {...msisdnPatternSearchMessages.searchPattern} />;

		return (
			<div className="inputContainer">
				<label className="label">
					<FormattedMessage {...msisdnPatternSearchMessages.specifyPattern} />

				</label>
				<div className="pattern-container">
					<OcTextInput
						className="msisdnPatternSearchInput"
						id="msisdn_pattern_search_input"
						placeholder={formatMessage({ ...msisdnPatternSearchMessages.patternInputPlaceholder })}
						required={required}
						errorMessage={errorMessage}
						onChange={this.props.validateInput}
					/>
					<OcButton
						outline={true}
						buttonType={OcButtonType.PRIMARY}
						className="form-group search-button"
						onClick={this.props.onGetNewSet}
						disabled={this.props.errors.invalidLength || this.props.errors.invalidPattern}
					>
						{buttonMessage}
					</OcButton>
				</div>
			</div>
		);
	}
}

export default MsisdnPatternSearch;
export {
	MsisdnPatternSearchProps,
};
