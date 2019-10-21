import * as React from "react";
import { pick, difference } from "lodash";

const SchemaUtil = require("./SchemaUtil");
import requirementMessages from "./SchemaRequirement.messages";
import invalidityMessages from "./SchemaInvalidity.messages";
import { ContextType, contextTypesValidationMap } from "../types";
import { HasSchema } from "../redux/types";
import { SchemaItem } from "../redux/models/schema/schema.types";

const reportSchemaDiscrepancies = (requestedSchemaNames: string[], foundJsonSchemaNames: string[]) => {
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
export default function withSchemaTS<P extends HasSchema>(schemaNamesOrName: string[] | string) {
	return (ComposedComponent: React.ComponentType<P>): React.ComponentType<Pick<P, Exclude<keyof P, "schema">>> => {
		const WithSchema = (props: Pick<P, Exclude<keyof P, "schema">>, context: ContextType) => {
			let schemaNames: string[];
			if (typeof schemaNamesOrName === "string") {
				schemaNames = [schemaNamesOrName];
			} else {
				schemaNames = schemaNamesOrName;
			}
			schemaNames.sort();

			const logSchemaDiscrepancies = Boolean(context.flux.reduxStore.getState().consul.logSchemaDiscrepancies);

			const foundJsonSchemas = pick(context.flux.reduxStore.getState().schema.schemas, schemaNames);

			const schemaUtil = SchemaUtil.getInstance();

			if (logSchemaDiscrepancies && schemaNames.length > 1) {
				reportSchemaDiscrepancies(schemaNames, Object.keys(foundJsonSchemas).sort());
			}

			const mergedJsonSchema = schemaUtil.mergeMapOfJSONSchemas(foundJsonSchemas);

			const { formatMessage } = context.intl;
			const formattedMessages = requirementMessages ? schemaUtil.formatDefinedMessages(requirementMessages, formatMessage) : undefined;

			let yupSchema: SchemaItem | null = null;
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
