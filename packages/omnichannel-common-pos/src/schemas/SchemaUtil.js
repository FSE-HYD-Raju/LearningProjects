import yup from "yup";
import mapKeys from "lodash/mapKeys";
import first from "lodash/first";
import get from "lodash/get";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import invalidityMessages from "./SchemaInvalidity.messages";
import { withClassCustomization, UtilsCustomizationPoints, withFunctionCustomization } from "../customization";

yup.addMethod(yup.mixed, "sameAs", function(ref, message) {
	return this.test("sameAs", message, function(value) {
		const other = this.resolve(ref);
		return !other || !value || value === other;
	});
});

const setValidationPropertiesOnField = (field, validationProperties, formatMessage) => {
	const type = field._type;
	const defaultMessage = validationProperties.invalidityMessage.defaultMessage;
	let fieldWithValidation = field;

	let invalidityMessage = defaultMessage;
	if (typeof formatMessage === "function") {
		if (validationProperties.invalidityMessageKey && invalidityMessages[validationProperties.invalidityMessageKey]) {
			invalidityMessage = formatMessage(invalidityMessages[validationProperties.invalidityMessageKey]);
		} else if (validationProperties.invalidityMessage) {
			invalidityMessage = formatMessage(validationProperties.invalidityMessage);
		}
	}

	if (validationProperties.enum) {
		fieldWithValidation = field.oneOf(validationProperties.enum);
	} else if (validationProperties.length) {
		const { length } = validationProperties;
		/* yup offers min, max, but how do they work in real life? */
		if (type === "string") {
			if (length.min >= 0) {
				fieldWithValidation = field.min(length.min, invalidityMessage);
			}
			if (length.max >= 0) {
				fieldWithValidation = field.max(length.max, invalidityMessage);
			}
		} else if (type === "date") {
			const today = new Date();
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);

			const tomorrow = new Date(today);
			tomorrow.setDate(yesterday.getDate() + 1);

			function setLimit(which, value) {
				if (value instanceof Date) {
					fieldWithValidation = fieldWithValidation[which](value, invalidityMessage);
				} else if (value === "now" || value === "today") {
					switch(which) {
						case "min": today.setHours(0,0,0,0); break;
						case "max": today.setHours(24,0,0,0); break;
					}
					fieldWithValidation = fieldWithValidation[which](today, invalidityMessage);
				} else if (value === "tomorrow") {
					fieldWithValidation = fieldWithValidation[which](tomorrow, invalidityMessage);
				} else if (value === "yesterday") {
					fieldWithValidation = fieldWithValidation[which](yesterday, invalidityMessage);
				}
			}

			if (length.min) {
				setLimit("min", length.min);
			}

			if (length.max) {
				setLimit("max", length.max);
			}
		}
		/* TODO min, max for number, array. */
	} else if (validationProperties.regexp) {
		fieldWithValidation = field.matches(
			new RegExp(validationProperties.regexp),
			invalidityMessage
		);
	} else if (validationProperties.email) {
		fieldWithValidation = field.email(invalidityMessage);
	} else if (validationProperties.equals) {
		const parts = validationProperties.equals.split(".");

		if (first(parts) === "#" || parts.length === 1) {
			/* referring to a field in this schema -- fields of external schemas not supported yet */
			const nameOfReferredField = last(parts);
			fieldWithValidation = field.sameAs(
				yup.ref(nameOfReferredField),
				invalidityMessage
			);
		}
	} else if (validationProperties.phone) {
		const regex = validationProperties.msisdn
			? "^(\\+|00)?[1-9]{1}[0-9]{7,14}$"
			: "^$|^(\\+?)([0-9\\ ]+)$";
		fieldWithValidation = field.matches(
			new RegExp(regex),
			invalidityMessage
		);
	} else if (validationProperties.number) {
		if (isNumber(validationProperties.min)) {
			fieldWithValidation = field.min(
				validationProperties.min,
				invalidityMessage
			);
		}
		if (isNumber(validationProperties.max)) {
			fieldWithValidation = field.max(
				validationProperties.max,
				invalidityMessage
			);
		}
	}

	// Customized extra property validation for customer specific schema validations, e.g fiscalCode
	const validateExtraProperties = withFunctionCustomization(
		UtilsCustomizationPoints.SCHEMA_UTILS_VALIDATE_EXTRA_PROPERTIES,
		() => fieldWithValidation
	);

	return validateExtraProperties({ fieldWithValidation, validationProperties, field, invalidityMessage, formatMessage });
};

const resolveWithCustomization = () => {
	return withClassCustomization(UtilsCustomizationPoints.SCHEMA_UTILS, SchemaUtil);
};

export default class SchemaUtil {

	static supportedTypes = ["array", "boolean", "date", "object", "string"];
	static complexTypes = ["array", "object"];

	static getInstance() {
		const ResolvedSchemaUtil = resolveWithCustomization();
		if (!ResolvedSchemaUtil._instance) {
			ResolvedSchemaUtil._instance = new ResolvedSchemaUtil();
		}

		return ResolvedSchemaUtil._instance;
	}

	static makeAdhocErrorObjectForSingleField(requirement /* string | object | undefined */,
		invalidity /* string | object | undefined */) /*: SchemaErrorMessage */ {
		const obj = [];

		if (requirement) {
			let msg = undefined;
			if (typeof requirement === "string") {
				msg = {
					type: "required",
					message: requirement
				};
			} else if (typeof requirement === "object") {
				msg = requirement;
			}

			if (msg) {
				obj.push(msg);
			}
		}

		if (invalidity) {
			let msg;
			if (typeof invalidity === "string") {
				msg = {
					type: undefined, /* what else?? */
					message: invalidity
				};
			} else if (typeof requirement === "object") {
				msg = invalidity;
			}

			if (msg) {
				obj.push(msg);
			}
		}

		return obj;
	}

	getTitlesOfSchemas(schemas) {
		const keys = Object.keys(schemas);
		return keys.filter(key => !isEmpty(schemas[key])).map(key => schemas[key].title);
	}

	mergeTwoJSONSchemas(a, b) {
		const merged = { ...a };

		if (b && b.properties) {
			merged.properties = {
				...merged.properties,
				...b.properties
			};
		}

		merged.title = a.title;
		if (b && b.title) {
			merged.title += " + " + b.title;
		}

		return merged;
	}

	mergeMapOfJSONSchemas(schemas) {
		let merged = null;
		mapKeys(schemas, schema => {
			merged = this.mergeTwoJSONSchemas(schema, merged);
		});

		return merged;
	}

	requireTheseInSchema(schema, fieldNames) {
		mapKeys(schema.properties, (property, name) => {
			property.required = fieldNames.indexOf(name) >= 0;
		});
	}

	injectValidationProperties(schema, fieldName, validationProperties) {
		const field = schema.properties[fieldName];
		field.validationProperties = validationProperties;
		return schema;
	}

	formatDefinedMessages(
		messages: Object,
		formatMessage: Function
	): ?Object {
		if (!messages) {
			return null;
		}
		const formatted_messages: Object = {};

		Object.keys(messages).forEach((key: string) => {
			const m: Object = messages[key];
			try {
				formatted_messages[key] = formatMessage(m);
			} catch (e) {
				throw new Error(
					"formatMessage threw an error at key '" + key + "'"
				);
			}
		});

		return formatted_messages;
	}

	/**
	 * @param fieldName
	 * @param field
	 * @param validationProperties
	 * @param additionalProperties
	 * additionalProperties := {
	 *	required?: Boolean,
	 *	requirementMessage?: string,
	 *	allFieldProperties?: Object of Objects
	 *	formatMessage?: Object
	 * }
	 * @returns {*}
	 */
	setTestOnField(fieldName, field, validationProperties, additionalProperties = {}) {
		// const { type } = validationProperties;
		// bulkYupSchema[key] = bulkYupSchema[key].test('is-valid-maritalStatus', '${path} is not a valid marital status', (value) => validation);
		const type = field._type;

		if (validationProperties.whenEntered) {
			const parts = validationProperties.whenEntered.split(".");

			if (first(parts) === "#" || parts.length === 1) {
				/* referring to a field in this schema -- fields of external schemas not supported yet */
				const nameOfReferredField = last(parts);
				field = field.when(nameOfReferredField, {
					is: _ => !isEmpty(_),
					then: setValidationPropertiesOnField(
						field,
						validationProperties,
						additionalProperties.formatMessage
					),
					otherwise: yup[type]()
				});
			}
		} else if (validationProperties.skip) {
			const operator = validationProperties.skip;
			const parts = operator.field.split(".");

			if ("whenEntered" in operator) {
				if (first(parts) === "#" || parts.length === 1) {
					/* referring to a field in this schema -- fields of external schemas not supported yet */
					const nameOfReferredField = last(parts);
					const { allFieldProperties } = additionalProperties;

					const typeOfReferredField =
						allFieldProperties[nameOfReferredField].type;

					field = yup[type]().when(nameOfReferredField, {
						is: _ => {
							let t = null;

							if (typeOfReferredField === "boolean") {
								t = operator.whenEntered === _;
							} else if (typeOfReferredField === "string") {
								t = operator.whenEntered && !isEmpty(_);
							} else if (typeOfReferredField === "date") {
								t = operator.whenEntered && !isEmpty(_);
							} else {
								/* object type & others */
								t = operator.whenEntered && !isEmpty(_);
							}

							return t;
						},
						then: setValidationPropertiesOnField(
							field,
							validationProperties,
							additionalProperties.formatMessage
						),
						otherwise: yup[type]()
					});
					const {
						required,
						requirementMessage
					} = additionalProperties;

					if (required) {
						field = field.required(requirementMessage).min(0);
					}
				}
			}
		} else {
			field = setValidationPropertiesOnField(field, validationProperties, additionalProperties.formatMessage);
		}

		return field;
	}

	fieldToYup({ properties, requirementMessage, invalidityMessage, invalidityMessageKey, allFieldProperties, formatMessage }) {
		const { type, name } = properties;
		let field = null;

		if (SchemaUtil.complexTypes.indexOf(type) >= 0) {
			field = this.toYup({
				jsonSchema: properties,
				requirementMessages: { default: requirementMessage },
				invalidityMessages: { default: invalidityMessage },
				formatMessage
			});
		} else {
			field = yup[type]();
		}

		field = field.label(properties.title || name);

		if (properties.required && requirementMessage) {
			field = field.required(requirementMessage);

			if (field._type === "string") {
				field = field.trim();
			}
		}

		if (properties.nullable) {
			field = field.nullable(true);
		}

		if (properties.validation) {
			const validation = {
				...properties.validation,
				invalidityMessage,
				invalidityMessageKey
			};

			field = this.setTestOnField(name, field, validation, {
				required: properties.required,
				requirementMessage,
				allFieldProperties,
				formatMessage
			});
		}

		if (type === "string" && properties.length) {
			if (properties.length.min) {
				field = field.min(properties.length.min);
			}
			if (properties.length.max) {
				field = field.max(properties.length.max);
			}
		}

		return field;
	}

	fieldCollectionToYup({ fieldsProperties, requirementMessages, invalidityMessages, invalidityMessageKey, formatMessage }) {
		const fields = {};

		mapKeys(fieldsProperties, (fieldProperties, name) => {
			const requirementMessage =
				requirementMessages && requirementMessages[name]
					? requirementMessages[name]
					: requirementMessages.default;
			const invalidityMessage =
				invalidityMessages && invalidityMessages[name]
					? invalidityMessages[name]
					: invalidityMessages.default;

			const invalidityMessageKey = get(fieldProperties, "validation.invalidityMessageKey");

			fields[name] = this.fieldToYup({
				properties: { ...fieldProperties, name },
				requirementMessage,
				invalidityMessage,
				invalidityMessageKey,
				allFieldProperties: fieldsProperties,
				formatMessage
			});
		});

		return fields;
	}

	/**
	 * @param jsonSchema
	 * @param requirementMessages
	 * @param invalidityMessages
	 * @param formatMessage
	 * @returns {*}
	 */
	toYup({ jsonSchema, requirementMessages, invalidityMessages, formatMessage }) {
		if (!jsonSchema) {
			throw new Error("Schema is empty");
		}
		const { type } = jsonSchema;

		if (SchemaUtil.complexTypes.indexOf(type) >= 0) {
			if (type === "array") {
				let schema = yup
					.array()
					.of(
						this.toYup({
							jsonSchema: jsonSchema.items,
							requirementMessages,
							invalidityMessages,
							formatMessage
						})
					);

				if (jsonSchema.length) {
					if (jsonSchema.length.min) {
						schema = schema.min(jsonSchema.length.min);
					}
					if (jsonSchema.length.max) {
						schema = schema.max(jsonSchema.length.max);
					}
				}

				if (jsonSchema.title) {
					schema = schema.label(jsonSchema.title);
				}

				return schema;
			} else if (type === "object") {
				const yupFields = this.fieldCollectionToYup({
					fieldsProperties: jsonSchema.properties,
					requirementMessages,
					invalidityMessages,
					formatMessage
				});
				return yup.object(yupFields).label(jsonSchema.title);
			}
		} else {
			return this.fieldToYup({
				properties: jsonSchema,
				requirementMessage: requirementMessages.default,
				invalidityMessage: invalidityMessages.default,
				formatMessage
			});
		}

		return null;
	}

	/**
	 * Check if supplied schema field has test for required, meaning it's defined as a mantory field in schema.
	 */
	checkRequiredFromSchemaField( schemaField ) {
		const tests = Array.isArray(schemaField && schemaField.tests) ? schemaField.tests : [];
		return !!tests.find(
			singleTest => singleTest.TEST_NAME === "required"
		);
	}
}
