"use strict";

import { get, reduce, replace, pickBy } from "lodash";
import { getParsedValue } from "../../utils";
import { ConsulValues } from "../consul/consul.types";
import { SchemaItem, SchemaState } from "./schema.types";

export function extractValues(payload: ConsulValues, state: Partial<SchemaState>) {
	const schemaKeys = Object.keys(payload).filter(o => o.includes("schemas/"));
	const consulSchemas: any = {};

	schemaKeys.forEach((key, index, schemaKeys) => {
		consulSchemas[replace(schemaKeys[index], "schemas/", "")] = getParsedValue(payload[key], null);
	});

	const combinedSchemas = reduce(state.defaultSchemas, (result: any, defaultSchema: any, key: string) => {
		result[key] = get(consulSchemas, key) || defaultSchema;
		return result;
	}, {});

	const consulSchemasWithNoDefaultSchema =
		pickBy(consulSchemas, (value: Object | null, key: string) => !(key in combinedSchemas) && !!value);

	return {
		schemas: {
			...state.schemas,
			...consulSchemasWithNoDefaultSchema,
			...combinedSchemas,
			
		}
	};
}

export function mergeSchemas(schemas: Record<string, SchemaItem>) {
	return Object.keys(schemas)
		.reduce((res: SchemaItem, key: string) => {
			const properties = res.properties ?
				{ ...res.properties, ...schemas[key].properties } :
				{ ...schemas[key].properties };

			const title = res.title ? `${res.title} + ${schemas[key].title}` : schemas[key].title;

			return {
				...res,
				...schemas[key],
				title,
				properties
			};
		}, {} as SchemaItem);

}
