import * as React from "react";
import { ContextType, contextTypesValidationMap } from "../../types";
import messages from "./OcComponents.messages";
import OcSelect from "./OcSelect";

interface OcSelectCountryProps {
	className?: string;
	countries: Array<{ code: string, name: string }>;
	defaultValue?: string;
	errorMessage?: string;
	id?: string;
	label?: string;
	name?: string;
	onBlur?: (event: React.SyntheticEvent<any>) => void;
	onChange?: (event: React.SyntheticEvent<any>) => void;
	placeholder?: React.ReactNode | string;
	required?: boolean;
	value?: string;
}

class OcSelectCountry extends React.Component<OcSelectCountryProps> {
	static displayName = "OcSelectCountry";
	static contextTypes = contextTypesValidationMap;

	constructor(props: OcSelectCountryProps, context: ContextType) {
		super(props, context);
		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(event: React.SyntheticEvent<any>) {
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}

	render() {
		const {
			className,
			countries,
			defaultValue,
			errorMessage,
			id,
			label,
			name,
			onBlur,
			placeholder,
			required,
			value
		} = this.props;
		const errorClasses = errorMessage ? "is-invalid was-validated" : "";

		return (
			<OcSelect
				id={id}
				className={className}
				defaultValue={defaultValue}
				errorMessage={errorMessage}
				name={name || "country-selection"}
				label={label || this.context.intl.formatMessage({ ...messages.pickCountry })}
				onBlur={onBlur}
				onChange={this.handleSelect}
				placeholder={placeholder || this.context.intl.formatMessage({ ...messages.pickCountry })}
				required={required}
				value={value || ""}
			>
				{countries.map((country) => {
					return (
						<option key={country.code} value={country.code}>
							{country.name}
						</option>
					);
				})}
			</OcSelect>
		);
	}
}
export default OcSelectCountry;
export { OcSelectCountryProps };
