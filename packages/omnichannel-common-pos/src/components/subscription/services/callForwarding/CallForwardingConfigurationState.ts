import { CallForwardingCharacteristic, CallForwardingService } from "./CallForwardingConstants";

interface CallForwardingConfigurationItem {
	id?: CallForwardingService;
	reason?: string;
	specificationId?: string;
	inputtedCharacteristics: Record<string, string>;
}

type CallForwardingConfiguration = Record<string, CallForwardingConfigurationItem>;

interface CallForwardingConfigurationModel {
	type: string;
	superSwitch?: boolean;
	forwardAllDisabled?: boolean;
	forwardIfDisabled?: boolean;
	configuration?: CallForwardingConfiguration;
}

const callForwardingConfigurationState: CallForwardingConfigurationModel = {
	type: "",
	superSwitch: true,
	forwardAllDisabled: false,
	forwardIfDisabled: false,
	configuration: {
		[CallForwardingService.CFUFWD]: {
			id: CallForwardingService.CFUFWD,
			reason: "",
			specificationId: "",
			inputtedCharacteristics: {
				[CallForwardingCharacteristic.CFMSISDN]: "",
				[CallForwardingCharacteristic.CFSTATUS]: "",
				[CallForwardingCharacteristic.SERVICEID]: ""
			}
		},
		[CallForwardingService.CFBFWD]: {
			id: CallForwardingService.CFBFWD,
			reason: "",
			specificationId: "",
			inputtedCharacteristics: {
				[CallForwardingCharacteristic.CFMSISDN]: "",
				[CallForwardingCharacteristic.CFSTATUS]: "",
				[CallForwardingCharacteristic.SERVICEID]: ""
			}
		},
		[CallForwardingService.CFNRYFWD]: {
			id: CallForwardingService.CFNRYFWD,
			reason: "",
			specificationId: "",
			inputtedCharacteristics: {
				[CallForwardingCharacteristic.CFMSISDN]: "",
				[CallForwardingCharacteristic.CFSTATUS]: "",
				[CallForwardingCharacteristic.SERVICEID]: ""
			}
		},
		[CallForwardingService.CFNRCFWD]: {
			id: CallForwardingService.CFNRCFWD,
			reason: "",
			specificationId: "",
			inputtedCharacteristics: {
				[CallForwardingCharacteristic.CFMSISDN]: "",
				[CallForwardingCharacteristic.CFSTATUS]: "",
				[CallForwardingCharacteristic.CFTIME]: "",
				[CallForwardingCharacteristic.SERVICEID]: ""
			}
		}
	}
};

export {
	callForwardingConfigurationState,
	CallForwardingConfigurationModel,
	CallForwardingConfigurationItem,
	CallForwardingConfiguration,
};
