"use strict";

import { getDefaultFluxStoreMap } from "../connectFluxRedux";

const isTest = process.env.NODE_ENV === "test";
const storesMap = getDefaultFluxStoreMap();

export const deprecated = (message: string = "Will be removed") => {
	return (target: any, name: string, descriptor: PropertyDescriptor) => {
		if (isTest) {
			return descriptor;
		}

		const store = target.constructor.name.replace("Actions", "Store");
		if (storesMap[store] || storesMap[target.constructor.name]) {
			const prop = storesMap[store];
			message += ` (use redux ${prop}.actions and ${prop}.reducers)`;
		}

		return {
			...descriptor,
			value(...args: Array<any>) {
				console.warn(`Deprecated ${target.constructor.name}.${name}: ${message}`);
				return descriptor.value(...args);
			}
		};
	};
};
