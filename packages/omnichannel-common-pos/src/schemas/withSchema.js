import React from "react";
import difference from "lodash/difference";
import pick from "lodash/pick";

import SchemaUtil from "./SchemaUtil";
import requirementMessages from "./SchemaRequirement.messages";
import invalidityMessages from "./SchemaInvalidity.messages";
import { contextTypesValidationMap } from "../types";

const reportSchemaDiscrepancies = (requestedSchemaNames, foundJsonSchemaNames) => {
	const diff = difference(requestedSchemaNames, foundJsonSchemaNames);
	if (diff.length) {
		console.warn(`Schema(s) [${diff.join(",")}] are missing`);
	}
};

/**
 * Example usage:
 *
 * @withSchema(['person', 'postalAddress'])
 * class MyComponent extends Component {
 *     static propTypes = {
 *         schema: PropTypes.object
 *     };
 *
 *     render() {
 *         return (<div className="MyComponent" />);
 *     }
 * }
 *
 * Use withSchema as a decorator above class, passing an array of schema names as the only required argument.
 * withSchema will pass a finished schema to your component as the prop 'schema'.
 *
 * Available schemas are located at omnichannel-common-pos/src/schemas/ with suffix .schema.js.
 * To use a new schema, you can simply place it in SchemaStore.
 * To publish a new schema, it should also be saved to localInitConsul.sh so it is imported to Consul.
 */
export default function withSchema(schemaNames) {
	return function(ComposedComponent) {
		const WithSchema = (props, context) => {
			if (typeof schemaNames === "string") {
				schemaNames = [schemaNames];
			}
			schemaNames.sort();

			const logSchemaDiscrepancies = Boolean(context.flux.reduxStore.getState().consul.logSchemaDiscrepancies);

			const foundJsonSchemas = pick(
				context.flux.reduxStore.getState().schema.schemas,
				schemaNames
			);

			const schemaUtil = SchemaUtil.getInstance();

			if (logSchemaDiscrepancies && schemaNames.length > 1) {
				reportSchemaDiscrepancies(schemaNames, Object.keys(foundJsonSchemas).sort());
			}

			const mergedJsonSchema = schemaUtil.mergeMapOfJSONSchemas(foundJsonSchemas);

			const { formatMessage } = context.intl;
			const formattedMessages = requirementMessages ?
				schemaUtil.formatDefinedMessages(requirementMessages, formatMessage) :
				undefined;

			let yupSchema = null;
			try {
				yupSchema = schemaUtil.toYup({
					jsonSchema: mergedJsonSchema,
					requirementMessages: formattedMessages,
					invalidityMessages,
					formatMessage
				});

			} catch (e) {
				if (logSchemaDiscrepancies) {
					if (e.message === "Schema is empty") {
						console.error(`One or more schemas of [${schemaNames.join(",")}] are missing.`);
					}
				}
			}

			if (yupSchema) {
				return <ComposedComponent {...props} schema={yupSchema} />;
			} else {
				return null;
			}
		};

		WithSchema.contextTypes = contextTypesValidationMap;

		return WithSchema;
	};
}
