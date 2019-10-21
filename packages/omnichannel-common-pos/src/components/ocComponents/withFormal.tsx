import * as React from "react";
import { ChangeEvent, Component, ComponentType, SyntheticEvent } from "react";
import { get } from "lodash";
const SchemaUtil = require("../../schemas/SchemaUtil").getInstance();

interface FormalOcInputProps {
	checked: boolean;
	errorMessage: string;
	id: string;
	inputType: string;
	label: React.ReactNode | string;
	meta: any;
	name: string;
	onBlur: (...args: any[]) => void;
	onChange: (...args: any[]) => void;
	onChangeAsObject: (...args: any[]) => void; // react-select pass whole object on change
	required: boolean;
	type: string;
	value: string | string[] | number;
	valueKey: string; // required for react-select
}

function withFormal<P>(Wrapped: ComponentType<any>, defaultProps: Partial<FormalOcInputProps> = {}): ComponentType<Partial<FormalOcInputProps> & P> {
	return class FormalOcInput extends Component<Partial<FormalOcInputProps> & P> {
		onChange = (event: ChangeEvent<any>) => {
			let val;

			if (this.props.valueKey) {
				// is react-select component
				// @ts-ignore
				val = event ? event[this.props.valueKey] : null;
				if (this.props.onChangeAsObject) {
					this.props.onChangeAsObject(event);
				}
			} else if (event && event.target) {
				const { type, value } = event.target;
				val =
					type === "checkbox"
						? !(value === "false" ? false : Boolean(value))
						: value;
			} else {
				// otherwise value as it is
				val = event;
			}

			if (this.props.onChangeAsObject) {
				this.props.onChangeAsObject(event);
			}
			if (this.props.onChange) {
				this.props.onChange(val);
			}
		};

		onBlur = (event: SyntheticEvent<any>) => {
			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
		};

		render() {
			// spreading while have a Generic doesn't supported by TS yet. =(
			// @ts-ignore
			const { name, meta, inputType, type, ...rest } = this.props;
			const errors: Array<any> | undefined = get(meta, `errors.${name}`);
			const errorMessage =
				this.props.errorMessage ||
				(errors && errors.map(error => error.message).join(", "));

			const required = SchemaUtil.checkRequiredFromSchemaField(this.props.meta && this.props.meta.schema) || this.props.required;

			return (
				<Wrapped
					{...rest}
					{...defaultProps}
					errorMessage={errorMessage}
					name={name}
					onBlur={this.onBlur}
					onChange={this.onChange}
					type={inputType || type}
					required={required}
				/>
			);
		}
	};
}

export default withFormal;
export { FormalOcInputProps };

/* This is a utility HOC to be used with OcInput/OcSelect and react-formal
 * Without this HOC, OcInput's onChange event handler returns a regular event
 * With this HOC, it instead returns only the value of the event
*/

/* Example usage:
 * import Form from 'react-formal';
 * import {withFormal, OcInput} from 'omnichannel-common';
 * const FormalInput = withFormal(OcInput);
 *
 * ...
 *
 * <Form>
 * ...
 *	<Form.Field
 * 		type={FormalInput}
 *
*/
