"use strict";

import { pick } from "lodash";
import { AppState } from "../../reducers";
import { SchemaItem } from "./schema.types";
import { mergeSchemas } from "./schema.utils";

export const getSchemas = (schemaNames: Array<string>) => {
	return (state: AppState) => {
		const jsonSchemas = pick(state.schema.schemas, schemaNames) as Record<string, SchemaItem>;
		return mergeSchemas(jsonSchemas);
	};
};
