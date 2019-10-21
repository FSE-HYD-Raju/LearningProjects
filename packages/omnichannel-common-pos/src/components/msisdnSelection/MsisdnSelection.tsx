import cssns from "../../utils/cssnsConfig";
import { PureComponent } from "react";
import {
	MsisdnReservationCreate,
	MsisdnSelectionUseCase,
	ProductOffering,
	MsisdnReservation,
	MsisdnGroup,
	MsisdnWithCost
} from "../../redux/types";
import MsisdnPatternSearch from "../product/msisdn/MsisdnPatternSearch";
import MsisdnSelectionPicker from "./MsisdnSelectionPicker";
import * as R from "react";
import { InitMsisdnsAction, ReserveMsisdnsAction, UpdateMsisdnAction } from "./MsisdnSelectionContainer";
import { get } from "lodash";
import { withFunctionCustomization, CommonFunctionCustomizationPoints } from "../../customization/";

const React = cssns("MsisdnSelection").React as typeof R;

interface MsisdnSelectionActionProps {
	actions: {
		initMsisdns: InitMsisdnsAction,
		reserveMsisdns: ReserveMsisdnsAction,
		reserveMsisdnsByStock: ReserveMsisdnsAction,
		updateMsisdn: UpdateMsisdnAction
	};
}

interface MsisdnSelectionProps {
	productId: string;
	pattern?: string;
	msisdnReservationNumberCount: number | undefined;
	msisdnPatternSearchInputValidation: string;
	numberClassProductOfferings: Array<ProductOffering>;
	selectedMsisdn?: MsisdnWithCost;
	msisdnsReservationsByUseCase?: Record<MsisdnSelectionUseCase, Array<MsisdnReservation>>;
	customReservationId?: string;
	msisdnPoCategoryId?: string;
}

interface MsisdnSelectionStateProps {
	pattern: string;
	selectionUsecase: MsisdnSelectionUseCase;
	maxLength?: number;
	errors: MsisdnSelectionErrors;
}

type MsisdnSelectionPropsWithActions = MsisdnSelectionActionProps & MsisdnSelectionProps;

type MsisdnSelectionErrors = {
	invalidPattern: boolean;
	invalidLength: boolean;
};

class MsisdnSelection extends PureComponent<MsisdnSelectionPropsWithActions, MsisdnSelectionStateProps> {
	constructor(props: MsisdnSelectionPropsWithActions) {
		super(props);
		this.state = {
			pattern: "",
			errors: {
				invalidPattern: false,
				invalidLength: false
			},
			selectionUsecase: MsisdnSelectionUseCase.PATTERN_SEARCH // TODO: Make this catalog drive / configurable when required (Support for msisdn class selection)
		};
	}

	componentDidMount() {
		this.props.actions.initMsisdns({ poId: this.props.productId });
	}

	onNewPatternInput = (pattern: string) => {
		this.setState({ pattern });
	};

	onSelectNumber = (selectedNumber: any) => {
		this.props.actions.updateMsisdn({ selectedMsisdn: selectedNumber });
	};

	componentWillReceiveProps(newProps: MsisdnSelectionPropsWithActions) {
		// Set maxLenght of input to state from number class PO characteristics if it can be found
		if (!this.state.maxLength) {
			const numberClasses = newProps.numberClassProductOfferings || [];
			const firstPatternClass = numberClasses.find(
				singleNumberClass => get(singleNumberClass, "instanceCharacteristics.T_FORM_NAME.values[0].value") === MsisdnSelectionUseCase.PATTERN_SEARCH
			);
			const snLength = get(firstPatternClass, "instanceCharacteristics[msisdn-sn-length].values[0].value");
			if (snLength) {
				this.setState({
					maxLength: parseInt(snLength, 10)
				});
			}
		}
	}

	/**
	 * Customizable function that takes in pattern, and performs something to it, and returns modified pattern.
	 * E.g In E/// case pattern should always be prefixed with asterisk.
	 */
	handlePattern = (pattern: string): string => {
		const handlePattern = withFunctionCustomization(
			CommonFunctionCustomizationPoints.MSISDN_SELECTION_HANDLE_PATTERN,
			(pattern: string) => pattern
		);
		return handlePattern(pattern);
	};

	onGetNewSet = () => {
		const { pattern, selectionUsecase } = this.state;
		const { msisdnReservationNumberCount, customReservationId } = this.props;
		const msisdnReservationCreate: MsisdnReservationCreate = {
			attributes: {
				pattern: this.handlePattern(pattern),
				limit: msisdnReservationNumberCount
			}
		};

		if (this.props.msisdnPoCategoryId) {
			this.props.actions.reserveMsisdnsByStock({
				msisdnSelectionUseCase: this.state.selectionUsecase,
				msisdnReservationCreate,
				reservedFor: customReservationId,
				msisdnPoCategoryId: this.props.msisdnPoCategoryId
			});
		} else {
			this.props.actions.reserveMsisdns({
				msisdnSelectionUseCase: this.state.selectionUsecase,
				msisdnReservationCreate,
				reservedFor: customReservationId,
			});
		}
	};

	getMsisdnReservationGroups = (): Array<MsisdnGroup> => {
		return this.props.msisdnsReservationsByUseCase && this.props.msisdnsReservationsByUseCase[this.state.selectionUsecase].map(
			(singleReservationGroup: MsisdnReservation): MsisdnGroup => {
				return {
					msisdns: get(singleReservationGroup, "attributes.msisdns", []),
					cost: {
						currency: get(singleReservationGroup, "attributes.price.currency"),
						amount: get(singleReservationGroup, "attributes.price.taxIncludedAmount")
					},
					reservedFor: get(singleReservationGroup, "attributes.reservedFor"),
					productOffering: this.props.numberClassProductOfferings.find(
						singlePo => singlePo.id === get(singleReservationGroup, "attributes.poId")
					)
				};
			}
		) || [];
	};

	/**
	 * Validates input from event and saves it to state if it passes validationm otherwise sets error flags
	 */
	validateInput = (e: any): void => {
		let invalidLength: boolean;
		let invalidPattern = false;
		const value = get(e, "target.value");

		if (this.props.msisdnPatternSearchInputValidation && value) {
			const regexp = new RegExp(this.props.msisdnPatternSearchInputValidation);
			invalidPattern = !regexp.test(e.target.value);
		} else {
			invalidPattern = false;
		}

		invalidLength = this.state.maxLength && value && value.length > this.state.maxLength;

		this.setState({
			errors: {
				...this.state.errors,
				invalidLength,
				invalidPattern
			}
		});

		if (!invalidLength && !invalidPattern) {
			this.setState({
				pattern: value
			});
		}
	};

	render() {
		const { selectedMsisdn, msisdnReservationNumberCount } = this.props;

		return (
			<div>
				<div className="form-group">
					<MsisdnPatternSearch
						validateInput={this.validateInput}
						errors={this.state.errors}
						required={false}
						maxLength={this.state.maxLength}
						onGetNewSet={this.onGetNewSet}
					/>
					<MsisdnSelectionPicker
						selectedNumber={selectedMsisdn}
						msisdnReservationGroups={this.getMsisdnReservationGroups()}
						limit={msisdnReservationNumberCount}
						onSelectNumber={this.onSelectNumber}
					/>
				</div>
			</div>
		);
	}
}

export default MsisdnSelection;
export {
	MsisdnSelectionPropsWithActions,
	MsisdnSelectionActionProps,
	MsisdnSelectionStateProps,
	MsisdnSelectionProps,
	MsisdnSelectionErrors,
};
