import messages from "../../index.messages";
import moment from "moment";
import PropTypes from "prop-types";
import { cssns, Flex, LanguagesUtil, FormattedMessage, nationalityMessages, contextTypesValidationMap } from "omnichannel-common-pos";
import _ from "lodash";
const { React } = cssns("CustomerDetailsView");

const CustomerSubDetailsView = (props, context) => {
	const { formatMessage } = context.intl;
	const getValueFromOptions = (options, value, fieldName = "") => {
		const displayedValue = _.find(options, option => {
			return option.code === value;
		});

		const message = nationalityMessages[`nationalityName${value}`];
		const translatedNationality = message && formatMessage(message);

		return fieldName === "country" || fieldName === "language"
			? _.get(displayedValue, "name", value)
			: translatedNationality;
	};

	const validateField = (fieldNames, field) =>
		fieldNames.find(fName => fName === field.fieldName) &&
		field.type === "select" &&
		field.options;

	const getDisplayedValue = field => {
		let displayedValue = field.value;

		if (displayedValue) {
			if (validateField(["nationality", "country"], field)) {
				displayedValue = getValueFromOptions(
					field.options,
					field.value,
					field.fieldName
				);
			} else if (field.type === "date") {
				displayedValue = moment(field.value).format("LL");
			} else if (validateField(["language"], field)) {
				const uniqueLanguageOptions = LanguagesUtil.uniqueLanguageCodes(field.options);
				displayedValue = getValueFromOptions(uniqueLanguageOptions, field.value, field.fieldName);
			}
		}
		return displayedValue;
	};

	return (
		<div>
			{props.fields &&
				props.fields.length > 0 &&
				props.fields.map((field, index) => {
					const displayedValue = getDisplayedValue(field);

					return (
						<Flex
							className="subDetails-field"
							alignItems="center"
							key={field.fieldName || index}
						>
							{field.label ? (
								<span className="subDetails-field-name">
									{messages[field.label] && (
										<FormattedMessage
											{...messages[field.label]}
										/>
									)}
								</span>
							) : (
								<span className="subDetails-field-name">
									{field.fieldName &&
									messages[field.fieldName] && (
										<FormattedMessage
											{...messages[field.fieldName]}
										/>
									)}
								</span>
							)}
							<span className="subDetails-field-value">
								{displayedValue ? (
									displayedValue
								) : (
									<FormattedMessage {...messages.noInfo} />
								)}
							</span>
						</Flex>
					);
				})}
		</div>
	);
};

CustomerSubDetailsView.propTypes = {
	fields: PropTypes.array
};

CustomerSubDetailsView.contextTypes = contextTypesValidationMap;

export default CustomerSubDetailsView;
