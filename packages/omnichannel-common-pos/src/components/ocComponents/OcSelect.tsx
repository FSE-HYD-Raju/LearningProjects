import * as R from "react";
import cssnsConfig from "../../utils/cssnsConfig";
import * as classnames from "classnames";

const React = cssnsConfig("OcInput").React as typeof R;

interface OcSelectProps {
	alwaysShowLabel: boolean;
	autoFocus: boolean;
	children: React.ReactNode;
	classes: string;
	className: string;
	defaultValue: string;
	disabled: boolean;
	errorMessage: string;
	errors: Array<string> | Object;
	forceLabel: boolean;
	handleForm: (event: React.SyntheticEvent<HTMLSelectElement>) => void;
	hidePlaceholderOption: boolean;
	id: string;
	isRequired: boolean;
	label: string;
	multiple: boolean;
	name: string;
	noLabel: boolean;
	onBlur: (event: React.FocusEvent<HTMLSelectElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	onFocus: (event: React.FocusEvent<HTMLSelectElement>) => void;
	onKeyDown: (event: React.KeyboardEvent<HTMLSelectElement>) => void;
	placeholder: string;
	required: boolean;
	style: Object;
	type: string;
	value: string[] | string | number;
	values: Array<{name: string, value: string}>;
}
interface OcSelectStats {
	placeholder: React.ReactNode | string;
	value: string[] | string | number;
	name: string;
}

class OcSelect extends (React as typeof R).Component<Partial<OcSelectProps>, Partial<OcSelectStats>> {
	static defaultProps = {
		noLabel: false
	};

	constructor(props: Partial<OcSelectProps>) {
		super(props);
		this.state = {
			placeholder: props.placeholder,
			value: props.value
		};
	}

	handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		this.setState({
			value
		});
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	componentWillReceiveProps(newprops: Partial<OcSelectProps>) {
		this.setState({
			value: newprops.value
		});
	}

	render() {
		const { value } = this.state;
		const {
			autoFocus,
			name,
			disabled,
			classes,
			className,
			hidePlaceholderOption,
			id,
			label,
			multiple,
			required,
			defaultValue,
			errorMessage,
			noLabel,
			onBlur,
			onFocus,
			onKeyDown,
			placeholder
		} = this.props;

		const selectElementId = !id && name ? name : id;
		const errorClasses = errorMessage ? "is-invalid was-validated" : "";

		return (
			<div
				className={classnames({
					this: true,
					"form-group": true,
					"form-group-filled": !!value,
					"form-group-unfilled": !value,
					"error": errorMessage,
					[`${className}`]: !!className
				})}
			>
				{!noLabel && (
					<label className="label-control custom-select-label" htmlFor={selectElementId}>
						<span className="label-text">{label || placeholder}</span>
						{required && <i className="fa fa-asterisk required-field-icon" />}
					</label>
				)}
				<select
					autoFocus={autoFocus}
					className={classnames({ "custom-select": true, classes: !!classes }, errorClasses)}
					disabled={disabled}
					id={selectElementId}
					name={name}
					multiple={multiple}
					onBlur={event => onBlur && onBlur(event)}
					onChange={this.handleSelect}
					onFocus={event => onFocus && onFocus(event)}
					onKeyDown={event => onKeyDown && onKeyDown(event)}
					placeholder={placeholder}
					required={required || false}
					value={value || defaultValue || ""}
				>
					{ placeholder && !hidePlaceholderOption && <option
						value=""
						disabled={true}
					>
						{placeholder}
					</option> }

					{/* TODO: This is temporary solution that maintains compatibility with earlier implementation of OcInput. */}
					{!this.props.children && this.props.values}

					{!this.props.values && this.props.children}
				</select>

				{errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
			</div>
		);
	}
}

export default OcSelect;
export { OcSelectProps, OcSelectStats };
