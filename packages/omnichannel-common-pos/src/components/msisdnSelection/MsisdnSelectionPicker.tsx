import * as R from "react";
import { PureComponent } from "react";
import OcCurrency from "../ocComponents/OcCurrency";
import cssns from "../../utils/cssnsConfig";
import OcInput from "../ocComponents/OcInput";
import MsisdnSelectionPickerMessages from "./MsisdnSelectionPicker.messages";

const React = cssns("MsisdnSelectionPicker").React as typeof R;

import {
	MsisdnGroup,
	MsisdnWithCost,
	MsisdnWithPriceProps
} from "../../redux";

import { isEqual } from "lodash";
import FormattedMessage from "../../channelUtils/FormattedMessage";

interface MsisdnSelectionPickerProps {
	msisdnReservationGroups: Array<MsisdnGroup>;
	onSelectNumber: (msisdn: MsisdnWithCost) => void;
	selectedNumber?: MsisdnWithCost;
	limit: number | undefined;
}

interface MsisdnSelectionPickerState {
	msisdns: Array<MsisdnWithCost>;
}

const MsisdnWithPrice = (props: MsisdnWithPriceProps) => (
	<>
		{props.msisdn.msisdn} <span className="msisdn-price text-muted">
			<OcCurrency cost={props.msisdn.cost.amount} currency={props.msisdn.cost.currency} />
		</span>
	</>
);

const flattenMsisdnGroups = (msisdnGroups: Array<MsisdnGroup>): Array<MsisdnWithCost> =>
	[...msisdnGroups.map(
		(msisdnGroup) =>
			msisdnGroup.msisdns ? msisdnGroup.msisdns.map(
				(msisdn) =>
					({ msisdn, cost: msisdnGroup.cost, reservedFor: msisdnGroup.reservedFor || "", productOffering: msisdnGroup.productOffering })
			) : []
	)].reduce((acc, arr) => [...acc, ...arr], []);

const getNRandomMsisdnsFromList = (msisdnGroups: Array<MsisdnGroup>, quantity?: number): Array<MsisdnWithCost> => {
	const msisdns = flattenMsisdnGroups(msisdnGroups);
	if (!quantity || msisdns.length <= quantity) { return msisdns; }

	const selectedMsisdns = new Set();
	while (selectedMsisdns.size < quantity) {
		const randomIndex = Math.round(Math.random() * (msisdns.length - 1));
		selectedMsisdns.add(msisdns[randomIndex]);
	}
	return Array.from(selectedMsisdns);
};

class MsisdnSelectionPicker extends PureComponent<MsisdnSelectionPickerProps, MsisdnSelectionPickerState> {

	constructor(props: MsisdnSelectionPickerProps) {
		super(props);

		this.state = {
			msisdns: []
		};
	}

	componentWillReceiveProps(newProps: MsisdnSelectionPickerProps) {
		const newMsisdnGroups = newProps.msisdnReservationGroups;
		if (!isEqual(newMsisdnGroups, this.props.msisdnReservationGroups)) {
			const newNumbers: Array<MsisdnWithCost> = getNRandomMsisdnsFromList(newMsisdnGroups, this.props.limit);
			this.setState({
				msisdns: newNumbers
			});
		}
	}

	/**
	 * Conditionally returns localized error message when needed
	 */
	getErrorMessage = (): React.ReactElement<FormattedMessage> | null => {
		if (!this.props.msisdnReservationGroups || !this.props.msisdnReservationGroups.length) {
			return <FormattedMessage {...MsisdnSelectionPickerMessages.errorNoNumbers} />;
		}
		return null;
	};

	render() {
		return (
			<div>
				<div className="custom-table">
					{
						this.state.msisdns.map((msisdn: MsisdnWithCost, idx: number) => {
							return (
								<OcInput
									id={`choosePickNewNumber-${idx}`}
									key={`choosePickNewNumber-${idx}`}
									type="radio"
									name="numberSelect"
									checked={this.props.selectedNumber && (msisdn.msisdn === this.props.selectedNumber.msisdn)}
									label={<MsisdnWithPrice msisdn={msisdn} />}
									onChange={() => this.props.onSelectNumber(msisdn)}
								/>
							);
						})
					}
				</div>
			</div>
		);
	}
}

export default MsisdnSelectionPicker;
export {
	MsisdnSelectionPickerProps,
	MsisdnSelectionPickerState,
};
