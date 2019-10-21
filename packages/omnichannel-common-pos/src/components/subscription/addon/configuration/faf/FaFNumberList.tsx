"use strict";
import cssns from "../../../../../utils/cssnsConfig";
import { PureComponent, SyntheticEvent } from "react";
import FaFNumberModalAddNumber from "./FaFNumberModalAddNumber";
import messages from "./FaF.messages";
import { FormattedMessage } from "../../../../../channelUtils";
import { OcButton, OcButtonType } from "../../../../ocComponents/button/OcButton";

const { React } = cssns("FaFNumberModal");

interface FaFNumberListProps {
	addNumber: (value: string) => void;
	removeNumber: (value: string) => void;
	numbers: Array<string>;
	descriptionText: string;
	validationPattern?: string;
	maximumNumbers: number;
}
type FaFNumberListState = {
	addInputActive: boolean;
	newNumber: string;
};

const PLUS_SIGN: string = "+ ";

class FaFNumberList extends PureComponent<FaFNumberListProps, FaFNumberListState> {

	constructor(props: FaFNumberListProps) {
		super(props);
		this.state = { addInputActive: false, newNumber: "" };
	}

	saveNumber = () => {
		this.closeAddNumber();
		this.props.addNumber(this.state.newNumber);
	};

	openAddNumber = () => {
		this.setState({
			addInputActive: true
		});
	};

	onChange = (event: SyntheticEvent<HTMLInputElement>) => {
		const target: HTMLInputElement = event.target as HTMLInputElement;
		this.setState({
			newNumber: target.value
		});
	};

	closeAddNumber = () => {
		this.setState({
			addInputActive: false
		});
	};

	render() {
		return (
			<div className="FaFNumberList">
				{this.props.numbers &&
					this.props.numbers.map((value: string, i) => {
						return (
							<div className="fafrow number-row" key={value}>
								<div className="item">
									{"Number " + (i + 1)}
								</div>
								<div className="number">{value}</div>
								{this.state.addInputActive ? null : (
									<div className="item">
										<OcButton
											className="removeButton"
											id={"buttonRemoveFaFNumber" + i}
											buttonType={OcButtonType.LINK}
											onClick={() => {
												this.props.removeNumber(value);
											}}
										>
											<FormattedMessage {...messages.remove} />
										</OcButton>
									</div>
								)}
							</div>
						);
					})}
				{this.state.addInputActive ? (
					<FaFNumberModalAddNumber
						save={this.saveNumber}
						close={this.closeAddNumber}
						onChange={this.onChange}
						validationPattern={this.props.validationPattern}
					/>
				) : (
					<div className="fafrow">
						<OcButton
							id="buttonAddFaFNumber"
							buttonType={OcButtonType.PRIMARY}
							disabled={
								this.props.numbers.length >=
								this.props.maximumNumbers
							}
							onClick={this.openAddNumber}
						>
							{PLUS_SIGN}
							<FormattedMessage {...messages.addNewNumber} />
						</OcButton>
					</div>
				)}
				<div className="fafrow information">
					<div className="info-label">
						<i className="fa fa-info-circle" />
					</div>
					<div className="info-content">
						{this.props.descriptionText}
					</div>
				</div>
				<div className="fafrow information">
					<div className="info-label" />
					<div className="info-content">
						<FormattedMessage
							{...messages.youCanHaveMaximumNumbers}
							values={{ maximum: this.props.maximumNumbers }}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default FaFNumberList;

export {
	FaFNumberListProps,
	FaFNumberListState
};
