import * as R from "react";
import cssnsConfig from "../../utils/cssnsConfig";
import { get } from "lodash";
import messages from "./OcInput.messages";
const React = cssnsConfig("OcInput").React as typeof R;
import * as classnames from "classnames";

enum OcInputType {
	text = "text",
	textarea = "textarea",
	radio = "radio",
	checkbox = "checkbox",
	autosuggest = "autosuggest",
	password = "password",
	email = "email",
	number = "number"
}

interface OcInputProps {
	autoFocus: boolean;
	autocomplete: "off" |
		"on" |
		"name" |
		"honorific-prefix" |
		"given-name" |
		"additional-name" |
		"family-name" |
		"honorific-suffix" |
		"nickname" |
		"email" |
		"username" |
		"new-password" |
		"current-password" |
		"organization-title" |
		"organization" |
		"street-address" |
		"address-line1" |
		"address-line2" |
		"address-line3" |
		"address-level1" |
		"address-level2" |
		"address-level3" |
		"address-level4" |
		"country" |
		"country-name" |
		"postal-code" |
		"cc-name" |
		"cc-given-name" |
		"cc-additional-name" |
		"cc-family-name" |
		"cc-number" |
		"cc-exp" |
		"cc-exp-month" |
		"cc-exp-year" |
		"cc-csc" |
		"cc-type" |
		"transaction-currency" |
		"transaction-amount" |
		"language" |
		"bday" |
		"bday-day" |
		"bday-month" |
		"bday-year" |
		"sex" |
		"tel" |
		"url" |
		"photo";
	autocorrect: boolean;
	checked: boolean;
	children: React.ReactNode;
	className: string;
	defaultValue: string | string[];
	disabled: boolean;
	errorMessage: string | object;
	errors: any;
	hasError: boolean;
	id: string;
	indeterminate: boolean;
	inputProps: any;
	inputType: keyof typeof OcInputType;
	label: React.ReactNode | string;
	max: number;
	meta: any;
	min: number;
	name: string;
	onBlur: (event: React.FocusEvent<any>) => void;
	onChange: (event: React.ChangeEvent<any>) => void;
	onChangeAsObject: (event: React.ChangeEvent<any>) => void;
	onFocus: (event: React.FocusEvent<any>) => void;
	onKeyPress: (event: React.KeyboardEvent<any>) => void;
	overrideValue: string; // WARNING DONT EVER USE. SERIOUSLY.;
	pattern: string;
	placeholder: string;
	radioButtonGroupValue: boolean | string;
	required: boolean;
	setAutofillValue: (value: {name: string, value: string}) => void;
	standalone: boolean;
	type: keyof typeof OcInputType;
	value: string | string[] | number;
	values: Array<string | string[] | number>;
}

interface OcInputState {
	name: string;
	value: string | string[] | number;
	checked: boolean;
	typeOverride: string | null;
	focused: boolean;
}

class OcInput extends (React as typeof R).Component<Partial<OcInputProps>, Partial<OcInputState>> {
	inputElement: HTMLInputElement | null;

	constructor(props: OcInputProps) {
		super(props);
		this.state = {
			checked: props.checked,
			value:
				(props.value === 0
					? 0
					: props.value) || ""
		};
		this.inputElement = null;
	}

	componentDidMount() {
		if (this.props.setAutofillValue) {
			// wait for a while autofill to kick.
			setTimeout(this.getAutofillValue, 500);
		}
	}

	getAutofillValue = () => {
		if (this.inputElement && this.inputElement.value && this.props.setAutofillValue) {
			const elementObject = {
				name: this.inputElement.name,
				value: this.inputElement.value
			};
			this.props.setAutofillValue(elementObject);
		}
	};

	componentWillReceiveProps(newProps: OcInputProps) {
		this.setState({
			checked: newProps.checked,
			value: newProps.value
		});
	}

	handleForm = (event: React.ChangeEvent<any>) => {
		const { value } = event.target;
		this.setState({
			value
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	handleRadioButton = (event: React.ChangeEvent<any>) => {
		const { name, value } = event.target;
		this.setState({
			checked: value !== "false" && !!value,
			name,
			value
		});
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	handleCheckbox = (event: React.ChangeEvent<any>) => {
		const { value } = event.target;
		this.setState({
			checked: !this.state.checked,
			value: value === "false" || !!value ? undefined : "on"
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	};

	toggleShowPassword = () => {
		if (this.state.typeOverride) {
			this.setState({
				typeOverride: null
			});
		} else {
			this.setState({
				typeOverride: "text"
			});
		}
	};

	refCb = (input: HTMLInputElement) => {
		this.inputElement = input;
	};

	setFocused = (focused: boolean) => {
		this.setState({
			focused
		});
	};

	renderInput = () => {
		const {
			autoFocus,
			autocomplete,
			className,
			defaultValue,
			disabled,
			errorMessage,
			hasError,
			id,
			indeterminate,
			inputProps,
			inputType,
			max,
			min,
			name,
			onKeyPress,
			pattern,
			placeholder,
			required,
			type,
			value
		} = this.props;
		const { checked } = this.state;

		const placeholderFull = placeholder && required ? `${placeholder} *` : placeholder;
		const switchType = inputType || type;
		switch (switchType) {
			case OcInputType.radio: {
				return (
					<div
						className={classnames({
							this: true,
							"custom-control": true,
							"custom-radio": true,
							[`${className}`]: !!className
						})}
					>
						<input
							id={id}
							className="custom-control-input"
							type="radio"
							value={defaultValue}
							name={name}
							disabled={disabled}
							checked={
								checked ||
								(this.props.radioButtonGroupValue !==
									undefined &&
									value === this.props.radioButtonGroupValue)
							}
							readOnly={true}
							onClick={this.handleRadioButton}
						/>
						<label className="custom-control-label" htmlFor={id}>
							{this.props.label || placeholderFull}
						</label>
					</div>
				);
			}

			case OcInputType.checkbox: {
				return (
					<div
						className={classnames({
							this: true,
							"custom-control": true,
							"custom-checkbox": true,
							[`${className}`]: !!className
						})}
					>
						<input
							id={id}
							className="custom-control-input"
							type="checkbox"
							value={value}
							defaultValue="on"
							name={name}
							disabled={disabled}
							checked={
								checked
							}
							ref={input => {
								if (input) {
									input.indeterminate = indeterminate ? indeterminate : false;
								}
							}}
							onClick={this.handleCheckbox}
						/>
						<label className="custom-control-label" htmlFor={id}>
							{this.props.label || placeholderFull}
						</label>
					</div>
				);
			}

			case OcInputType.textarea: {
				return (
					<textarea
						id={id}
						className={classnames({
							this: true,
							"form-control": true,
							"is-invalid": hasError || errorMessage,
							[`${className}`]: !!className,
							"with-onchange-as-object": !!this.props.onChangeAsObject
						})}
						onChange={this.handleForm}
						onBlur={this.props.onBlur}
						onFocus={this.props.onFocus}
						name={name}
						value={value}
						required={required}
						maxLength={max}
						minLength={min}
						defaultValue={defaultValue || ""}
						autoFocus={autoFocus}
						disabled={disabled}
						placeholder={placeholderFull || ""}
					/>
				);
			}

			case OcInputType.autosuggest: {
				return <input {...inputProps} className={classnames({input: true, text: true})} />;
			}

			default: {
				return (
					<input
						id={id}
						className={classnames({
							this: true,
							"form-control": true,
							[`${className}`]: !!className,
							"is-invalid": hasError || errorMessage
						})}
						type={switchType || "text"}
						onChange={this.handleForm}
						onBlur={(event: React.FocusEvent<any>) => {
							if (this.props.onBlur) {
								this.props.onBlur(event);
							}
							this.setFocused(false);
						}}
						onFocus={(event: React.FocusEvent<any>) => {
							if (this.props.onFocus) {
								this.props.onFocus(event);
							}
							this.setFocused(true);
						}}
						name={name}
						value={
							value === 0 ? 0 : value || defaultValue
						}
						required={required}
						autoFocus={autoFocus}
						disabled={disabled}
						placeholder={placeholderFull || ""}
						autoComplete={autocomplete}
						onKeyPress={onKeyPress && onKeyPress}
						pattern={pattern}
						ref={this.refCb}
						min={min}
						max={max}
					/>
				);
			}
		}
	};

	render() {
		const formatMessage = get(this, "context.intl.formatMessage");
		const value = this.props.overrideValue || this.state.value;

		const type =
			this.state.typeOverride ||
			this.props.inputType ||
			this.props.type;
		const {
			className,
			errorMessage,
			hasError,
			id,
			required,
			standalone
		} = this.props;

		const { focused } = this.state;

		return (
			<div
				className={classnames({
					"form-group": !standalone,
					"form-group-focused": focused,
					"form-group-filled": !!value,
					"form-group-unfilled": !value,
					error: hasError || errorMessage,
					[`${className}`]: !!className
				})}
			>
				{type !== OcInputType.checkbox &&
				type !== OcInputType.radio && (
					<label
						htmlFor={id}
						className={classnames({
							focused,
							"label-control": true
						})}
					>
						<span className="label-text">
							{this.props.label || this.props.placeholder}
						</span>
						{required && (
							<i className="fa fa-asterisk required-field-icon" />
						)}
						{(this.props.type === OcInputType.password ||
							this.props.inputType === OcInputType.password) &&
						value && (
							<i
								className={classnames({
									"show-password-icon": true,
									fa: true,
									"fa-eye": true,
									active: this.state.typeOverride
								})}
								onClick={this.toggleShowPassword}
								title={
									this.state.typeOverride ? (
										formatMessage &&
										formatMessage({
											...messages.hidePassword
										})
									) : (
										formatMessage &&
										formatMessage({
											...messages.showPassword
										})
									)
								}
							/>
						)}
					</label>
				)}

				{this.renderInput()}

				{errorMessage && (
					<div className="invalid-feedback">{errorMessage}</div>
				)}

				{this.props.children}
			</div>
		);
	}
}

export default OcInput;
export { OcInputProps, OcInputState, OcInputType };
