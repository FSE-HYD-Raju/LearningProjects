import { has, mapKeys, pickBy, replace } from "lodash";
import debug from "debug";

import { ConsulKey, Consul } from "../types";

export default class ConsulUtil {
	static watchKeyValueConfig(consul: Consul, p: any, keyConfig: any, successCb: any, errorCb: any) {
		const key = `${p.consulKvBase}/${p.consulApiVersion}/${p.propertiesFolder}/${keyConfig.name}`;
		const options = { key, recurse: Boolean(keyConfig.folder) };
		debug("consul")(
			`Fetching and watching k/v data from '${key}' with config '${JSON.stringify(
				options
			)}'`
		);
		const watch = consul.watch({
			method: consul.kv.get,
			options
		});
		watch.on("change", successCb);
		watch.on("error", errorCb);
		return watch;
	}

	static watchService(consul: Consul, service: any, successCb: any, errorCb: any) {
		debug("consul")(
			`Discovering and watching service by name '${service}'`
		);
		const watch = consul.watch({
			method: consul.health.service,
			options: { service }
		});
		watch.on("change", successCb);
		watch.on("error", errorCb);
		return watch;
	}

	static getFallbackKvProperty(serviceName: string, { name, folder }: ConsulKey) {
		let result: any;
		debug("consul")(`servicename '${serviceName}', key ${name}`);
		const propertyPrefix = `CFG_VALUE_APPS_${this.transformProperty(
			serviceName
		)}_1_PROPERTIES_`;
		const property = propertyPrefix + this.transformProperty(name);
		debug("consul")(`Use fallback property by name '${property}'`);
		if (folder) {
			/**
			 * Example case: {name = auth, folder = true}, process.env contains
			 * CFG_VALUE_APPS_OMNICHANNEL_POS_1_PROPERTIES_AUTH_CLAIMS_USER__ROLE__CLAIM__KEY=x_dbss.role_characteristics_value
			 * -> should get transformed into { "auth/user_role_claim_key": "x_dbss.role_characteristics_value" }
			 */
			return mapKeys(
				pickBy(process.env, (value, key) => key.startsWith(property)),
				(value, key) => {
					return replace(
						replace(
							replace(key, propertyPrefix, ""),
							/_/g,
							"/"
						),
						/\/\//g,
						"_"
					).toLowerCase();
				}
			);
		} else if (has(process.env, property)) {
			result = process.env[property];
		} else {
			debug("koa")("ERROR: No env variable found by key:", property);
		}
		return result;
	}

	static getFallbackDiscoveryVariable(key: any) {
		let result;
		const property = `SD_${this.transformProperty(key)}`;
		debug("consul")(
			`Use fallback service discovery property by name '${property}'`
		);
		if (has(process.env, property)) {
			result = process.env[property];
		} else {
			debug("koa")("ERROR: No env variable found by key:", property);
		}
		return result;
	}

	static transformProperty(property: any) {
		return property.replace(/\//g, "_").toUpperCase();
	}
}
