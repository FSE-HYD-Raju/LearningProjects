import cssns from "../../../utils/cssnsConfig";
import { PureComponent } from "react";
import OcInput from "../../ocComponents/OcInput";
import OcDatePicker from "../../ocComponents/OcDatePicker";
import { FormattedMessage } from "../../../channelUtils";
import { SyntheticEvent } from "react";
import OcLoadingSpinner from "../../ocComponents/OcLoadingSpinner";
import messages from "./MsisdnPortInSelector.messages";
import {
	Eligibilities,
	ProductPath,
	Identification
} from "../../../redux";
import { OcAlert, OcAlertType } from "../../ocComponents/alert/OcAlert";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const { React } = cssns("MsisdnPortInSelector");

interface MsisdnPortInSelectorStateProps {
	eligibilityDecisions?: Eligibilities;
	portInDecisions?: Record<string, {
		queryActive: boolean;
		queryResult?: {
			attributes: {
				result: number
			}
		};
		error?: string;
	}>;
	// posMsisdnConfigurationModal setState
	setModalState?: (CHPortInNumberResource: object) => object;
	// posMsisdnConfigurationModal state
	modalState?: any;
	loadingEligibilityCheck: boolean;
	eligibilityError: string;
	identification?: Identification;
	disableNipCheck: boolean;
	disableNipField: boolean;
	errorMakingNipRequest: object;
	errorPleaseTryAgain: boolean;
	errorNipNotSendToCustomer: boolean;
	msisdnConfiguration: {
		countryCode: number;
	};
	portInPhoneNumberLength: number;
	nipNumberLength: number;
}

interface ValidatePortInType {
	documentType: string;
	documentId: string;
	msisdn: string;
}

interface MsisdnPortInSelectorActionProps {
	actions: {
		validatePortIn: (validatePortInType: ValidatePortInType) => void,
		requestNip: (msisdn: string) => void,
		saveCharacteristic?: (key: string, msisdnNumber: string, path: ProductPath) => void
	};
}

interface MsisdnPortInSelectorState {
	requestedPortInDateRadio: "immediate" | "selected";
	portInNumber: string;
	isMsisdnValid: boolean;
	isNipValid: boolean;
}

type MsisdnPortInSelectorProps = MsisdnPortInSelectorStateProps & MsisdnPortInSelectorActionProps;
class MsisdnPortInSelector extends PureComponent<MsisdnPortInSelectorProps, MsisdnPortInSelectorState> {
	constructor(props: MsisdnPortInSelectorProps) {
		super(props);
		this.state = {
			requestedPortInDateRadio: "immediate",
			portInNumber: "",
			isMsisdnValid: true,
			isNipValid: true,
		};
	}
	
	handlePortInMsisdnInput = (e: SyntheticEvent<any>) => {
		const {value} = e.target as any;
		const { portInPhoneNumberLength, msisdnConfiguration : { countryCode }} = this.props;
		// 10 digit number validation
		const isMsisdnValid = new RegExp(`^\\d{${portInPhoneNumberLength}}$`).test(value);
		this.setState({
			isMsisdnValid
		});

		if (isMsisdnValid && this.props.setModalState) {
			this.props.setModalState({
				selectedNumber: `${countryCode}${value}`
			});
		}
	};

	parsePhoneNumber = (num: string, length: number) => {
		return  num.substr(num.length - length);
	}
	
	validatePortIn = () => {
		const {actions: {validatePortIn}, identification, modalState, portInPhoneNumberLength} = this.props;
		const selectNumber = this.parsePhoneNumber(modalState.selectedNumber, portInPhoneNumberLength);
		if (this.state.isMsisdnValid && identification) {
			validatePortIn(
				{
					documentType: identification.type,
					documentId: identification.identificationId,
					msisdn: selectNumber
				}
			);
		}
	};

	handleRequestNipClick = () => {
		const {actions: {requestNip}, modalState, portInPhoneNumberLength} = this.props;
		requestNip(this.parsePhoneNumber(modalState.selectedNumber, portInPhoneNumberLength));
	};

	saveNIP = (e: SyntheticEvent<any>) => {
		const {value} = e.target as any;
		const { nipNumberLength } = this.props;
		const isNipValid = new RegExp(`^\\d{1,${nipNumberLength}}$`).test(value);
		this.setState({
			isNipValid
		});

		if (isNipValid && this.props.setModalState) {
			this.props.setModalState({
				CH_NIP: value
			});
		}
	};

	saveStartDate = (e: SyntheticEvent<any>) => {
		const {value} = e.target as any;
		if (this.props.setModalState) {
			this.props.setModalState({
				CH_Scheduled_Time: value
			});
		}
	};

	render() {
		const {
			loadingEligibilityCheck,
			eligibilityError,
			identification,
			disableNipCheck,
			disableNipField,
			errorMakingNipRequest,
			errorPleaseTryAgain,
			errorNipNotSendToCustomer,
			modalState,
			portInPhoneNumberLength,
			nipNumberLength,
		} = this.props;
		const nextDayDate = new Date();
		nextDayDate.setDate(nextDayDate.getDate() + 1);

		return (
			<div>
				{!identification &&
				<OcAlert alertType={OcAlertType.WARNING}>
					<FormattedMessage {...messages.sessionWithValidIdentificationRequired} />
				</OcAlert>
				}

				{errorMakingNipRequest &&
				<OcAlert alertType={OcAlertType.WARNING}>
					<FormattedMessage {...messages.requestingNipFailed} />
				</OcAlert>
				}

				{errorPleaseTryAgain &&
				<OcAlert alertType={OcAlertType.WARNING}>
					<FormattedMessage {...messages.errorInRequest} />
				</OcAlert>
				}

				{errorNipNotSendToCustomer &&
				<OcAlert alertType={OcAlertType.WARNING}>
					<FormattedMessage {...messages.nipRequestNotSent}/>
				</OcAlert>
				}

				<div className="msisdn-inner-container">
					<div className="select-new-msisdn-container">
						<div className="port-in-row port-in-phone-number-container">
							<div className="row-label">
								<FormattedMessage {...messages.portInPhoneNumber}/>
							</div>
							<div className="row-input">
								<OcInput
									id="inputCurrentNumberInTransferNumber"
									value={this.state.portInNumber}
									type="text"
									onChange={this.handlePortInMsisdnInput}
									onBlur={this.validatePortIn}
									errorMessage={eligibilityError === "ERR_MSISDN_NOT_PORTABLE" ?
											<FormattedMessage {...messages.portingInNumberIsNotValid} />
											: eligibilityError === "ERR_CUSTOMER_BLACKLISTED"
												? <FormattedMessage {...messages.customerIsInBlacklist}/>
												: !this.state.isMsisdnValid ? 
												<FormattedMessage {...messages.numberLimit} values={{value:portInPhoneNumberLength}}/> 
												: undefined
									}
								/>
							</div>
							<div className="row-button">
								<OcButton
									outline={true}
									buttonType={OcButtonType.PRIMARY}
									id="port-in-request-nip-button"
									className="msisdn-input"
									disabled={disableNipCheck}
									onClick={this.handleRequestNipClick}
								>
									<FormattedMessage {...messages.requestNip}/>
									<OcLoadingSpinner loading={loadingEligibilityCheck} inline={true}/>
								</OcButton>
							</div>
						</div>
						<div className="port-in-row">
							<div className="row-label">
								<FormattedMessage {...messages.nip}/>
							</div>
							<div className="row-input">
								<OcInput
									disabled={disableNipField}
									onChange={this.saveNIP}
									errorMessage={ !this.state.isNipValid ? <FormattedMessage {...messages.nipNumberLimit} values={{value: nipNumberLength}} /> : undefined}
								/>
							</div>
						</div>
						<div className="port-in-row port-in-requested-port-in-date-container">
							<div className="row-label">
								<FormattedMessage {...messages.requestedPortInDate}/>
							</div>
							<div className="row-input port-in-request-date-row">
								<div
									className="port-in-request-immediate"
									onClick={() => {
										this.setState({requestedPortInDateRadio: "immediate"});
										if (this.props.setModalState) {
                                            // Set CH_Scheduled_Time to empty, so the request executes immediately
											this.props.setModalState({
												CH_Scheduled_Time: ""
											});
										}
									}
									}
								>
									<OcInput
										type="radio"
										radioButtonGroupValue={this.state.requestedPortInDateRadio}
										value="immediate"
										label={
											<FormattedMessage
												{...messages.immediate}
												values={{value: new Date().toLocaleDateString("en-US")}}
											/>
										}
									/>
								</div>

								<div
									className="port-in-request-selected"
									onClick={() => this.setState({
										requestedPortInDateRadio: "selected"
									})}
								>
									<OcInput
										id="select-portIn-date"
										key="selected-portIn-date"
										type="radio"
										radioButtonGroupValue={this.state.requestedPortInDateRadio}
										value="selected"
										label={<FormattedMessage {...messages.selectedDate}/>}
										onChange={() => {
											if (this.props.setModalState) {
												this.props.setModalState({
													CH_Scheduled_Time: nextDayDate
												});
											}
										}
										}
									/>
									<OcDatePicker
										name="dateRangeStart"
										selectedDate={modalState.CH_Scheduled_Time ? new Date(modalState.CH_Scheduled_Time): new Date()}
										withClock={false}
										step={1}
										onChange={(date: Date | string) => {
											if (this.props.setModalState) {
												this.props.setModalState({
													CH_Scheduled_Time: date
												});
											}
										}}
										min={nextDayDate}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MsisdnPortInSelector;
export {
	MsisdnPortInSelectorProps,
	MsisdnPortInSelectorStateProps,
	MsisdnPortInSelectorActionProps,
	MsisdnPortInSelectorState,
	ValidatePortInType,
};
