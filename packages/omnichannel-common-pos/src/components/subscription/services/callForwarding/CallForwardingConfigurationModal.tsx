import { PureComponent } from "react";
import { Schema } from "yup";
import * as classnames from "classnames";
import cssns from "../../../../utils/cssnsConfig";
import OcModal from "../../../ocComponents/OcModal";
import CallForwardingConfigurationForm from "./CallForwardingConfigurationForm";
import {
	initServices,
	handleSuperSwitchToggle,
	handleTypeChange,
	handleModelChange,
	constructSchema,
	getTimeValues
} from "./CallForwardingConfiguration.util";
import {
	CallForwardingConfigurationItem,
	CallForwardingConfigurationModel,
	callForwardingConfigurationState
} from "./CallForwardingConfigurationState";
import { Service } from "../../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import { CallForwardingType } from "./CallForwardingConstants";
import callForwardingMessages from "./CallForwarding.messages";
import { FormattedMessage } from "../../../../channelUtils";
import { OcAlert, OcAlertType } from "../../../ocComponents/alert/OcAlert";

const { React } = cssns("CallForwardingConfigurationModal");

interface CallForwardingConfigurationModalActionProps {
	actions: {
		submitCallForwardingConfiguration: (configuration: Record<string, CallForwardingConfigurationItem>, individualId: string, agreementId: string) => void;
	};
}

interface CallForwardingConfigurationModalStateProps {
	callForwardingReasonCode: string | undefined;
	callForwardingConfigurationErrors: object | undefined;
	customerId: string;
}

interface CallForwardingConfigurationModalOwnProps {
	agreementId: string;
	services: Array<Service>;
	showModal: boolean;
	toggleModal: () => void;
	customClassName?: string;
}

type CallForwardingConfigurationModalProps = CallForwardingConfigurationModalOwnProps
	& CallForwardingConfigurationModalStateProps
	& CallForwardingConfigurationModalActionProps;

interface CallForwardingConfigurationModalState {
	model: CallForwardingConfigurationModel;
	valid?: boolean;
}

class CallForwardingConfigurationModal extends PureComponent<CallForwardingConfigurationModalProps, CallForwardingConfigurationModalState> {
	static displayName = "CallForwardingConfigurationModal";
	static contextTypes = contextTypesValidationMap;

	schema: Schema<CallForwardingConfigurationModel>;

	constructor(props: CallForwardingConfigurationModalProps, context: ContextType) {
		super(props, context);

		this.schema = constructSchema(props.services, context.intl.formatMessage);
		this.state = {model: callForwardingConfigurationState};
	}

	componentWillMount() {
		const { model } = this.state;
		this.validateModel(model);
	}

	resetState() {
		const model = initServices(callForwardingConfigurationState, this.props.services, this.props.callForwardingReasonCode);
		this.setState({
			model: { ...model }
		});
		this.validateModel(model);
	}

	handleTypeChange = (type: CallForwardingType) => {
		const data = handleTypeChange(type, this.state.model.configuration!);
		this.updateModel(data);
	};

	handleSuperSwitchToggle = () => {
		const data = handleSuperSwitchToggle(this.state.model);
		this.updateModel(data);
	};

	handleModelChange = (model: CallForwardingConfigurationModel) => {
		const data = handleModelChange(model);
		this.updateModel(data);
		this.validateModel(model);
	};

	validateModel(model: CallForwardingConfigurationModel) {
		this.schema.isValid(model).then(valid => {
			this.setState({ valid });
		});
	}

	updateModel = (data: Partial<CallForwardingConfigurationModel>) => {
		const { model } = this.state;
		this.setState({
			model: { ...model, ...data }
		});
	};

	getTimeValues() {
		return getTimeValues(this.props.services);
	}

	componentWillReceiveProps(newProps: CallForwardingConfigurationModalProps) {
		if (newProps.showModal && !this.props.showModal) {
			this.resetState();
		}
	}

	submitConfiguration() {
		this.props.actions.submitCallForwardingConfiguration(this.state.model.configuration!, this.props.customerId, this.props.agreementId);
	}

	render() {
		const { props } = this;
		const { customClassName } = props;
		/* $FlowFixMe */
		const { valid, model } = this.state;
		const formClassnames = classnames({
			"form-wrapper": true,
			"call-forwarding-form": true,
			[`${customClassName}`]: customClassName ? true : false
		});
		const modalClassnames = classnames({
			"modal-wrapper": true,
			"modal-large": true,
			[`${customClassName}`]: customClassName ? true : false
		});

		return (
			<OcModal
				showModal={props.showModal}
				title={this.context.intl.formatMessage(callForwardingMessages.title)}
				onClose={props.toggleModal}
				className={modalClassnames}
				onOk={this.submitConfiguration}
				okDisabled={!!(!valid || this.props.callForwardingConfigurationErrors)}
				okButtonLabel={<FormattedMessage {...callForwardingMessages.confirmButtonLabel}/>}
			>
				<div className={formClassnames}>
					{this.props.callForwardingConfigurationErrors && (
						<div className="errors">
							<OcAlert alertType={OcAlertType.DANGER}>
								<FormattedMessage {...callForwardingMessages.submitErrors}/>
							</OcAlert>
						</div>
					)}
					{!this.props.callForwardingConfigurationErrors && (
						<CallForwardingConfigurationForm
							model={model}
							handleTypeChange={this.handleTypeChange}
							handleSuperSwitchToggle={this.handleSuperSwitchToggle}
							handleModelChange={this.handleModelChange}
							timeValues={this.getTimeValues()}
							schema={this.schema}
						/>
					)}
				</div>
			</OcModal>
		);
	}
}

export default CallForwardingConfigurationModal;
export {
	CallForwardingConfigurationModalActionProps,
	CallForwardingConfigurationModalOwnProps,
	CallForwardingConfigurationModalStateProps,
	CallForwardingConfigurationModalProps,
	CallForwardingConfigurationModalState
};
