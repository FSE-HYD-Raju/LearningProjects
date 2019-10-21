import ConsulUtil from "./utils/ConsulUtil";
import { Consul, ConsulKey } from "./types";

import { debounce, get, isArray, isEqual, keys } from "lodash";
import debug from "debug";

const urlParser = require("url");

export interface ConsulProperty {
	consulServiceName: string;
	consulApiVersion: string;
	consulKvBase: string;
	propertiesFolder: string;
	consulServiceKey: string;
}

export interface FullConsulProperty extends ConsulProperty {
	consulKeys: ConsulKey[];
}

export type ConsulValue = Record<string, any>;

export interface ConsulServiceLocation {
	[key: string]: string;
}

export interface KoaUtilInstance {
	config: FullConsulProperty;
	refreshConsulValues: (values: any, boot: boolean) => void;
	refreshConsulServiceLocations?: (values: any) => void;
}

class KoaConsulClient {
	keys: ConsulKey[];
	refreshConsulValues: any;
	refreshConsulServiceLocations: any;
	consulProperties: ConsulProperty;
	consulValues: ConsulValue;
	consulServiceLocations: ConsulServiceLocation;
	configConsul?: Consul;
	serviceConsul?: Consul;

	constructor(koaUtilInstance: KoaUtilInstance) {
		const config = koaUtilInstance.config;
		this.keys = config.consulKeys;
		this.consulProperties = {
			consulServiceName: config.consulServiceName,
			consulServiceKey: config.consulServiceKey,
			consulApiVersion: config.consulApiVersion,
			consulKvBase: config.consulKvBase,
			propertiesFolder: config.propertiesFolder
		};
		this.consulValues = {};
		this.consulServiceLocations = {};
		this.refreshConsulValues = (values: any, boot: boolean) =>
			koaUtilInstance.refreshConsulValues(values, boot);
		this.refreshConsulServiceLocations = (serviceLocations: any) =>
			koaUtilInstance.refreshConsulServiceLocations &&
			koaUtilInstance.refreshConsulServiceLocations(serviceLocations);
		// FIXME: This debounce logic may cause a situation where reboot == true in one of the debounced calls, but the
		// actual sent call may still contain reboot == false, depending on the order of the calls.
		this.refreshConsulValues = debounce(this.refreshConsulValues, 5000, {
			trailing: true
		});
	}

	initConsul(): void {
		this.initConfigConsul();
		this.initServiceConsul();
	}

	initConfigConsul(): void {
		debug.enable("consul");

		if (process.env.SERVICE_CONFIG_URL) {
			debug("consul")(
				`Fetching Consul configuration from ${process.env
					.SERVICE_CONFIG_URL}`
			);

			const url = urlParser.parse(process.env.SERVICE_CONFIG_URL);
			this.configConsul = require("consul-javascript-client")({
				host: url.hostname,
				port: url.port
			});

			this.keys.forEach(key => {
				this.watchKeyValue(key, this.consulProperties);
			});

			const loadConsulAgentServices = () => {
				if (this.configConsul) {
					this.configConsul.agent.service.list((err, result) => {
						if (err) {
							debug("consul")(`FATAL ERROR: '${err}'`);
						} else {
							debug("consul")("Agent Services received");
							this.handleServiceLocationsChanged(result);
						}
					});
				}
			};

			setInterval(loadConsulAgentServices,
				process.env.SERVICE_CONFIG_AGENT_LIST_POLLING_INTERVAL || (60 * 1000));
			loadConsulAgentServices();
		} else {
			debug("consul")(
				"SERVICE_CONFIG_URL env variable not set, defaulting to fallback properties"
			);
			this.keys.forEach(key => {
				if (key.service) {
					return;
				}
				const value = ConsulUtil.getFallbackKvProperty(
					`omnichannel_${process.env.omnichannel}`,
					key
				);
				if (typeof value === "object") {
					keys(value).forEach((k: string) => {
						const val = value[k];
						this.consulValues[k] = val && val.replace(/'/g, "\"");
					});
				} else {
					this.consulValues[key.name] = value;
				}
			});

			this.refreshConsulValues(this.consulValues, true);
		}
	}

	initServiceConsul(): void {
		debug.enable("consul");

		const SD_URL = process.env.SERVICE_DISCOVERY_URL
			? process.env.SERVICE_DISCOVERY_URL
			: process.env.SERVICE_CONFIG_URL;

		if (SD_URL) {
			debug("consul")(`Fetching Consul configuration from ${SD_URL}`);

			const url = urlParser.parse(SD_URL);
			this.serviceConsul = require("consul-javascript-client")({
				host: url.hostname,
				port: url.port
			});

			this.keys.forEach(key => {
				this.watchKeyValue(key, this.consulProperties, true);
			});
		} else {
			debug("consul")(
				"SERVICE_CONFIG_URL env variable not set, defaulting to fallback properties"
			);
			this.keys.forEach(key => {
				if (!key.service) {
					return;
				}
				const value = ConsulUtil.getFallbackKvProperty(
					`omnichannel_${process.env.omnichannel}`,
					key
				);
				const serviceUrl = urlParser.parse(
					ConsulUtil.getFallbackDiscoveryVariable(value)
				);
				this.consulValues[key.name] = {
					address: serviceUrl.hostname,
					port: serviceUrl.port
				};
			});

			this.refreshConsulValues(this.consulValues, true);
		}
	}

	watchKeyValue(keyConfig: ConsulKey, consulProperties: ConsulProperty, isService: boolean = false): void {
		ConsulUtil.watchKeyValueConfig(
			isService ? this.serviceConsul! : this.configConsul!,
			consulProperties,
			keyConfig,
			(config: any) => {
				debug("consul")(
					`Change detected in property [${keyConfig.name}].`
				);
				if (keyConfig.folder && isArray(config)) {
					config
						.filter(entry => {
							return entry.Key;
						})
						.forEach(entry => {
							// convert full key to property key: apps/omnichannel_b2c/1/properties/translations/fin => translations/fin
							const propertyKey = entry.Key.substring(
								entry.Key.indexOf(keyConfig.name)
							);
							// handle change by this single key
							this.handleConfigChange(
								get(entry, "Value"),
								{
									name: propertyKey,
									requireBoot: Boolean(keyConfig.requireBoot),
									service: false,
									folder: false
								},
								consulProperties
							);
						});
				} else {
					this.handleConfigChange(
						get(config, "Value"),
						keyConfig,
						consulProperties
					);
				}
			},
			(err: any) => {
				debug("consul")(`FATAL ERROR: '${err}'`);
			}
		);
	}

	handleServiceLocationsChanged(agentServices: any): void {
		const keys = Object.keys(agentServices);
		keys.forEach(key => {
			if (Object.prototype.hasOwnProperty.call(agentServices, key)) {
				const service = agentServices[key];
				this.consulServiceLocations[service.Service] = `${service.Address}:${service.Port}`;
			}
		});
		debug("consul")(`Agent Services: ${JSON.stringify(this.consulServiceLocations)}`);
		this.refreshConsulServiceLocations(this.consulServiceLocations);
	}

	/**
	 * Handles a configuration change coming from Consul.
	 * @param value value of the new configuration (may be undefined)
	 * @param keyConfig (configuration for this key, see init.js for the configured keys)
	 * @param consulProperties (consul properties)
	 */
	handleConfigChange(value: string, keyConfig: ConsulKey, consulProperties: ConsulProperty): void {
		const name = keyConfig.name;
		if (!isEqual(this.consulValues[name], value)) {
			debug("consul")(
				`Setting value '${value}' with key '${name}' for service ${consulProperties.consulServiceName}`
			);

			if (
				consulProperties.consulServiceName ===
				this.consulProperties.consulServiceName
			) {
				this.consulValues[name] = value;
			} else {
				this.consulValues[
				consulProperties.consulServiceKey + "." + name
					] = value; // use key as prefix instead of actual service name
			}
			if (keyConfig.service) {
				this.watchService(keyConfig, value);
				if (keyConfig.keys) {
					keyConfig.keys.forEach((each: ConsulKey) => {
						const {
							consulKvBase,
							consulApiVersion,
							propertiesFolder
						} = this.consulProperties;
						const p = {
							consulServiceKey: name,
							consulServiceName: value,
							consulKvBase,
							consulApiVersion,
							propertiesFolder
						};
						this.watchKeyValue(each, p);
					});
				}
			} else {
				this.refreshConsulValues(
					this.consulValues,
					keyConfig.requireBoot
				);
			}
		}
	}

	watchService(key: ConsulKey, service: string | undefined): void {
		ConsulUtil.watchService(
			this.serviceConsul!,
			service,
			(serviceConfig: any) => {
				debug("consul")(
					`${service} Service config: '${JSON.stringify(
						serviceConfig
					)}'`
				);
				if (serviceConfig && serviceConfig.length > 0) {
					const {Service} = serviceConfig[0];
					const {Address, Port} = Service;
					if (this.consulValues[key.name]) {
						const service = this.consulValues[key.name];
						if (
							!isEqual(service.address, Address) ||
							!isEqual(service.port, Port)
						) {
							this.consulValues[key.name] = {
								address: Address,
								port: Port,
								name: service
							};
							this.refreshConsulValues(
								this.consulValues,
								key.requireBoot
							);
						}
					} else {
						this.consulValues[key.name] = {
							address: Address,
							port: Port
						};
						this.refreshConsulValues(
							this.consulValues,
							key.requireBoot
						);
					}
				}
			},
			(err: any) => {
				debug("consul")(`FATAL ERROR: '${err}'`);
			}
		);
	}
}

export default KoaConsulClient;
