import {
	OcSelect,
	withFormal,
	cssns,
	FormattedMessage,
	OcModal,
	InstallationTimeConfig,
	ProductPath,
} from "omnichannel-common-pos";
import * as moment from "moment";
import { Component } from "react";
import yup, { ObjectSchema } from "yup";
import messages from "./InstallationTimeConfiguration.messages";

const Form = require("react-formal");
const { React } = cssns("InstallationTimeConfigurationModal");
const FormalOcSelect = withFormal(OcSelect);

interface InstallationTimeConfigurationModalProps {
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
	toggleInstallationTimeConfigurationModal: (show: boolean, config?: InstallationTimeConfig) => void;
	showInstallationTimeConfigurationModal: boolean;
	installationTimeConfig?: InstallationTimeConfig;
	resetConfigurableInstallationTime: () => void;
}

interface HasInstallationTime {
	installationTime: string | null;
}

interface InstallationTimeConfigurationModalState {
	model: HasInstallationTime;
}

class InstallationTimeConfigurationModal extends Component<InstallationTimeConfigurationModalProps, InstallationTimeConfigurationModalState> {
	schema: ObjectSchema<HasInstallationTime>;

	constructor(props: InstallationTimeConfigurationModalProps) {
		super(props);
		this.schema = yup.object({
			installationTime: yup.string().required()
		});

		this.state = {
			model: {
				installationTime: null
			}
		};
	}

	setInstallationTime() {
		if (this.state.model.installationTime && this.props.installationTimeConfig) {
			this.props.setInputtedCharacteristic(
				this.props.installationTimeConfig.path,
				this.props.installationTimeConfig.key,
				this.state.model.installationTime
			);
			this.props.resetConfigurableInstallationTime();
			this.props.toggleInstallationTimeConfigurationModal(false);
		}
	}

	handleInput(model: HasInstallationTime) {
		this.schema.isValid(model).then(() => {
			this.setState({
				model
			});
		});
	}

	getDateAndReset = () => {
		const date = new Date();
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	};

	generateTimeInterval = (daysFromNow: number, startHours: number, endHours: number) => {
		const start = this.getDateAndReset();
		const end = this.getDateAndReset();

		start.setDate(start.getDate() + daysFromNow);
		start.setHours(startHours);
		end.setDate(end.getDate() + daysFromNow);
		end.setHours(endHours);

		return {
			start,
			end
		};
	};

	generateTimeIntervalLabel = (timeInterval: any, suffix: string) => {
		return (
			moment(timeInterval.start).format("DD.MM.YYYY hh") + " " + suffix + " " + " - " +
			moment(timeInterval.end).format("DD.MM.YYYY hh") + " " + suffix);
	};

	generateTimeIntervalValue = (timeInterval: any) => {
		return (
			timeInterval.start.toISOString() + "/" + timeInterval.end.toISOString()
		);
	};

	render() {

		const timeInterval1 = this.generateTimeInterval(1, 8, 12);
		const timeInterval2 = this.generateTimeInterval(1, 12, 16);
		const timeInterval3 = this.generateTimeInterval(2, 8, 12);

		const options = [
			{
				id: "1",
				label: this.generateTimeIntervalLabel(timeInterval1, "AM"),
				value: this.generateTimeIntervalValue(timeInterval1)
			},
			{
				id: "2",
				label: this.generateTimeIntervalLabel(timeInterval2, "PM"),
				value: this.generateTimeIntervalValue(timeInterval2)
			},
			{
				id: "3",
				label: this.generateTimeIntervalLabel(timeInterval3, "AM"),
				value: this.generateTimeIntervalValue(timeInterval3)
			}
		];

		const { installationTime } = this.state.model;
		const {
			showInstallationTimeConfigurationModal,
			toggleInstallationTimeConfigurationModal
		} = this.props;

		return (
			<OcModal
				showModal={showInstallationTimeConfigurationModal}
				smallModal={true}
				title={<FormattedMessage {...messages.configureFixedLine}/>}
				onClose={() => toggleInstallationTimeConfigurationModal(false)}
				onOk={() => this.setInstallationTime()}
				okDisabled={!installationTime}
			>
				<div className="holder">
					<Form
						schema={this.schema}
						onChange={(model: HasInstallationTime) => this.handleInput(model)}
					>
						<div className="info">
							<i className="fa fa-info-circle" />
							<FormattedMessage {...messages.selectPreferredInstallation}/>
						</div>
						<Form.Field
							name="installationTime"
							id="InstallationTimeConfigurationModal-select"
							type={FormalOcSelect}
							required={true}
						>
							<option
								key={`InstallationTimeConfigurationModal-option-empty`}
								value=""
								id={`InstallationTimeConfigurationModal-option-empty`}
								disabled={true}
							>
								<FormattedMessage {...messages.selectInstallationTime}/>
							</option>
							{options && options.map((option, idx) => {
									return (
										<option
											key={`option_${idx}`}
											value={option.value}
											id={`InstallationTimeConfigurationModal-option-${option.value}`}
										>
											{option.label}
										</option>
									);
								})}
						</Form.Field>
					</Form>
				</div>
			</OcModal>
		);
	}
}
export default InstallationTimeConfigurationModal;
export {
	InstallationTimeConfigurationModalProps,
	InstallationTimeConfigurationModalState,
};
