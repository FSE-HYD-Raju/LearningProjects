import yup, { Schema, StringSchema } from "yup";
import messages from "../../../../commonMessages";
import {
	CallForwardingCharacteristic,
	CallForwardingService,
	CallForwardingType,
	ServiceStatusEnum
} from "./CallForwardingConstants";
import { Characteristic, Service } from "../../../../redux/types";
import {
	CallForwardingConfiguration,
	CallForwardingConfigurationItem,
	CallForwardingConfigurationModel
} from "./CallForwardingConfigurationState";
import { CharacteristicValue } from "../../../../redux/types/CharacteristicValue";
import { InjectedIntl } from "react-intl";

/**
 * This file contains some utility functions for handling
 * CallForwarding model manipulation
 */

const setCharacteristicValue = (configuration: CallForwardingConfiguration | undefined, id: CallForwardingService,
								property: CallForwardingCharacteristic, value: ServiceStatusEnum): CallForwardingConfiguration => {
	if (!configuration) {
		configuration = {};
	}
	if (!configuration[id]) {
		configuration[id] = {inputtedCharacteristics: {}};
	}

	const configurationItem: CallForwardingConfigurationItem = configuration[id];

	if (configurationItem) {
		if (!configurationItem.inputtedCharacteristics) {
			configurationItem.inputtedCharacteristics = {};
		}
		configurationItem.inputtedCharacteristics[property] = value;
	}
	return configuration;
};

const isCharacteristicEmpty = (configuration: CallForwardingConfiguration | undefined, id: CallForwardingService, property: string) => {
	const propertyValue: string | undefined = configuration && configuration[id] ? configuration[id].inputtedCharacteristics[property] : undefined;

	return !propertyValue;
};

const modifyServiceStatusOnChange = (configuration: CallForwardingConfiguration | undefined, id: CallForwardingService) => {
	const status = isCharacteristicEmpty(configuration, id, CallForwardingCharacteristic.CFMSISDN)
		? ServiceStatusEnum.DISABLED
		: ServiceStatusEnum.ENABLED;
	return setCharacteristicValue(configuration, id, CallForwardingCharacteristic.CFSTATUS, status);
};

const initService = (model: CallForwardingConfigurationModel, services: Array<Service>, reasonCode: string | undefined,
					 id: CallForwardingService, characteristicKeys: Array<CallForwardingCharacteristic>) => {
	if (services) {
		const service: Service | undefined = services.find((service: Service) => {
			return service.characteristics[CallForwardingCharacteristic.SERVICEID] === id;
		});

		if (service) {
			if (!model.configuration) {
				model.configuration = {};
			}
			let { configuration } = model;
			characteristicKeys.forEach((ckey: CallForwardingCharacteristic) => {
				configuration = setCharacteristicValue(configuration!, id, ckey, service.characteristics[ckey] as ServiceStatusEnum);
			});
			model.configuration[id].specificationId = service.specification ? service.specification.id : "";
			model.configuration[id].reason = reasonCode;
		}
	}

	return model;
};

const updateServiceStatus = (configuration: CallForwardingConfiguration | undefined,
							 service: {id: CallForwardingService, value: ServiceStatusEnum}): CallForwardingConfiguration => {
	return setCharacteristicValue(configuration, service.id, CallForwardingCharacteristic.CFSTATUS, service.value);
};

const updateServiceStatuses = (serviceStatuses: Array<{id: CallForwardingService, value: ServiceStatusEnum}>,
							   configuration: CallForwardingConfiguration | undefined): CallForwardingConfiguration => {
	if (!configuration) {
		configuration = {};
	}
	serviceStatuses.forEach((s: {id: CallForwardingService, value: ServiceStatusEnum}) => {
		// don't allow activating service without number
		const allowUpdate =
			(s.value === ServiceStatusEnum.ENABLED && !isCharacteristicEmpty(configuration, s.id, CallForwardingCharacteristic.CFMSISDN)) ||
			s.value === ServiceStatusEnum.DISABLED;
		if (allowUpdate) {
			configuration = updateServiceStatus(configuration, s);
		}
	});
	return configuration;
};

const disableAllServices = (configuration: CallForwardingConfiguration | undefined): CallForwardingConfiguration => {
	return updateServiceStatuses(
		[
			{id: CallForwardingService.CFUFWD, value: ServiceStatusEnum.DISABLED},
			{id: CallForwardingService.CFBFWD, value: ServiceStatusEnum.DISABLED},
			{id: CallForwardingService.CFNRYFWD, value: ServiceStatusEnum.DISABLED},
			{id: CallForwardingService.CFNRCFWD, value: ServiceStatusEnum.DISABLED}
		],
		configuration
	);
};

const initSuperSwitch = (model: CallForwardingConfigurationModel): CallForwardingConfigurationModel => {
	let switchProps: CallForwardingConfigurationModel = {
		type: "",
		superSwitch: false,
		forwardAllDisabled: true,
		forwardIfDisabled: true
	};
	if (!isCharacteristicEmpty(model.configuration, CallForwardingService.CFUFWD, CallForwardingCharacteristic.CFMSISDN)) {
		switchProps = {
			type: CallForwardingType.FORWARD_ALL,
			superSwitch: true,
			forwardAllDisabled: false,
			forwardIfDisabled: true
		};
	} else if (!isCharacteristicEmpty(model.configuration, CallForwardingService.CFBFWD, CallForwardingCharacteristic.CFMSISDN)
		|| !isCharacteristicEmpty(model.configuration, CallForwardingService.CFNRYFWD, CallForwardingCharacteristic.CFMSISDN)
		|| !isCharacteristicEmpty(model.configuration, CallForwardingService.CFNRCFWD, CallForwardingCharacteristic.CFMSISDN)) {
		switchProps = {
			type: CallForwardingType.FORWARD_IFBUSY,
			superSwitch: true,
			forwardAllDisabled: true,
			forwardIfDisabled: false
		};
	}

	return { ...model, ...switchProps };
};

export const initServices = (model: CallForwardingConfigurationModel, services: Array<Service>, reasonCode: string | undefined) => {
	model = initService(model, services, reasonCode, CallForwardingService.CFUFWD, [
		CallForwardingCharacteristic.CFMSISDN,
		CallForwardingCharacteristic.CFSTATUS,
		CallForwardingCharacteristic.SERVICEID
	]);
	model = initService(model, services, reasonCode, CallForwardingService.CFBFWD, [
		CallForwardingCharacteristic.CFMSISDN,
		CallForwardingCharacteristic.CFSTATUS,
		CallForwardingCharacteristic.SERVICEID
	]);
	model = initService(model, services, reasonCode, CallForwardingService.CFNRYFWD,
		[
			CallForwardingCharacteristic.CFMSISDN,
			CallForwardingCharacteristic.CFSTATUS,
			CallForwardingCharacteristic.SERVICEID
		]
	);
	model = initService(model, services, reasonCode, CallForwardingService.CFNRCFWD,
		[
			CallForwardingCharacteristic.CFMSISDN,
			CallForwardingCharacteristic.CFSTATUS,
			CallForwardingCharacteristic.CFTIME,
			CallForwardingCharacteristic.SERVICEID
		]
	);
	model = initSuperSwitch(model);
	return model;
};

export const handleTypeChange = (type: CallForwardingType, configuration: CallForwardingConfiguration) => {
	const allStatus = type === CallForwardingType.FORWARD_ALL ? ServiceStatusEnum.ENABLED : ServiceStatusEnum.DISABLED;
	const ifStatus = type === CallForwardingType.FORWARD_IFBUSY ? ServiceStatusEnum.ENABLED : ServiceStatusEnum.DISABLED;

	configuration = updateServiceStatuses(
		[
			{ id: CallForwardingService.CFUFWD, value: allStatus },
			{ id: CallForwardingService.CFBFWD, value: ifStatus },
			{ id: CallForwardingService.CFNRYFWD, value: ifStatus },
			{ id: CallForwardingService.CFNRCFWD, value: ifStatus }
		],
		configuration
	);
	return {
		type,
		configuration,
		forwardAllDisabled: allStatus !== ServiceStatusEnum.ENABLED,
		forwardIfDisabled: ifStatus !== ServiceStatusEnum.ENABLED
	};
};

export const handleModelChange = (model: CallForwardingConfigurationModel) => {
	let configuration = model.configuration;
	if (model.type === CallForwardingType.FORWARD_IFBUSY) {
		configuration = modifyServiceStatusOnChange(configuration, CallForwardingService.CFBFWD);
		configuration = modifyServiceStatusOnChange(configuration, CallForwardingService.CFNRYFWD);
		configuration = modifyServiceStatusOnChange(configuration, CallForwardingService.CFNRCFWD);
		model.configuration = configuration;
	} else if (model.type === CallForwardingType.FORWARD_ALL) {
		configuration = modifyServiceStatusOnChange(configuration, CallForwardingService.CFUFWD);
	}
	model.configuration = configuration;
	return model;
};

/**
 * Handles logic for ON / OFF switch
 */
export const handleSuperSwitchToggle = (model: CallForwardingConfigurationModel) => {
	const superSwitch = !model.superSwitch;
	const configuration = model.configuration;

	let props: CallForwardingConfigurationModel = {...model};

	// Disable all services if switch is toggled OFF
	if (!superSwitch) {
		props = {
			superSwitch,
			configuration: disableAllServices(configuration),
			forwardAllDisabled: true,
			forwardIfDisabled: true,
			type: ""
		};
		// Enable "forward all" UI controls, if switch is toggled on AND service contains phone number
		// Disable "forward if" UI controls
	} else if (!isCharacteristicEmpty(configuration, CallForwardingService.CFUFWD, CallForwardingCharacteristic.CFMSISDN)) {
		props = {
			superSwitch,
			configuration: updateServiceStatuses([{id: CallForwardingService.CFUFWD, value: ServiceStatusEnum.ENABLED}], configuration),
			forwardAllDisabled: false,
			forwardIfDisabled: true,
			type: CallForwardingType.FORWARD_ALL
		};
	} else {
		// Disable "forward all" UI controls
		// Enable "forward if" UI controls, if switch is toggled on AND any "forward if" service contains phone number
		updateServiceStatuses(
			[
				{id: CallForwardingService.CFBFWD, value: ServiceStatusEnum.ENABLED},
				{id: CallForwardingService.CFNRYFWD, value: ServiceStatusEnum.ENABLED},
				{id: CallForwardingService.CFNRCFWD, value: ServiceStatusEnum.ENABLED}
			],
			configuration
		);
		props = {
			superSwitch,
			configuration,
			forwardAllDisabled: true,
			forwardIfDisabled: false,
			type: CallForwardingType.FORWARD_IFBUSY
		};
	}
	return {
		...model,
		...props
	};
};

export const constructSchema = (services: Array<Service>, formatMessage: InjectedIntl["formatMessage"]): Schema<CallForwardingConfigurationModel> => {
	const serviceProps: Record<string, Schema<CallForwardingConfigurationItem>> = {};
	if (services) {
		services.forEach((service: Service) => {
			const characteristics: Record<string, Characteristic> | undefined =
				service && service.specification ? service.specification.inputCharacteristics : undefined;
			const serviceInputtedCharacteristics: Record<string, StringSchema> = {};
			if (characteristics) {
				Object.keys(characteristics).forEach((key: string) => {
					const regex = characteristics[key].validation;
					serviceInputtedCharacteristics[key] = yup.string();
					if (regex) {
						serviceInputtedCharacteristics[key] = serviceInputtedCharacteristics[key]
							.matches(new RegExp(regex), formatMessage({...messages.invalidPhone}));
					}
					const serviceId: string | undefined = service.characteristics
						? service.characteristics[CallForwardingCharacteristic.SERVICEID] : undefined;
					if (serviceId) {
						serviceProps[serviceId] = yup.object({
							inputtedCharacteristics: yup.object({
								...serviceInputtedCharacteristics
							})
						});
					}

				});
			}
		});
	}

	return yup.object({
		type: yup.string(),
		configuration: yup.object({
			...serviceProps
		})
	});
};

export const getTimeValues = (services: Array<Service>): Array<CharacteristicValue> => {
	if (services) {
		const service = services.find((service: Service) => {
			return service.characteristics[CallForwardingCharacteristic.SERVICEID] === CallForwardingService.CFNRCFWD;
		});
		if (service && service.specification && service.specification.inputCharacteristics[CallForwardingCharacteristic.CFTIME]) {
			return service.specification.inputCharacteristics[CallForwardingCharacteristic.CFTIME].values;
		}
	}

	return [];
};
