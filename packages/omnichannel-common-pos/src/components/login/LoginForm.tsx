import ErrorLabel from "../../components/error/ErrorLabel";
import withFormal from "../ocComponents/withFormal";
import messages from "../../commonMessages";
import cssns from "../../utils/cssnsConfig";
import { ComponentType, FC } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { Schema } from "yup";
import { OcTextInput } from "../ocComponents/input/OcTextInput";
import { OcPasswordInput } from "../ocComponents/input/OcPasswordInput";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";
const Form = require("react-formal");
const { React } = cssns("LoginForm");

const FormalOcInput: ComponentType<any> = withFormal(OcTextInput, {type: "text"});
const FormalPasswordInput: ComponentType<any> = withFormal(OcPasswordInput, {type: "password"});

interface LoginFormProps {
	id?: string;
	email?: string;
	password?: string;
	className?: string;
	fieldStyle?: {color: string};
	handleInput?: (loginInfo: {email: string, password: string}) => void;
	onError?: () => void;
	error?: any;
	errors?: object;
	noAccess?: boolean;
	handleSubmit?: (loginInfo: {email: string, password: string}) => void;
	schema?: Schema<{email: string, password: string}>;
}

const LoginForm: FC<LoginFormProps> = (props: LoginFormProps) => {
	const value = {
		email: props.email,
		password: props.password
	};

	const { fieldStyle } = props;

	if (props.schema) {
		return (
			<div className={`LoginForm ${props.className}`}>
				<Form
					schema={props.schema}
					onChange={props.handleInput}
					value={value}
					errors={props.errors}
					onError={props.onError}
				>
					<Form.Field
						label={<FormattedMessage{...messages.loginModalEmailInput}/>}
						name="email"
						type={FormalOcInput}
						style={fieldStyle}
						id={`${props.id}-LoginForm-email-field`}
						events={["onSubmit"]}
						labelColor={fieldStyle && fieldStyle.color}
					/>

					<Form.Field
						label={<FormattedMessage{...messages.loginModalPasswordInput}/>}
						name="password"
						type={FormalPasswordInput}
						style={fieldStyle}
						id={`${props.id}-LoginForm-password-field`}
						events={["onSubmit"]}
						labelColor={fieldStyle && fieldStyle.color}
					/>
					{(props.error || props.noAccess) && (
						<ErrorLabel message={<FormattedMessage {...messages.loginError} />}/>
					)}

					<div
						className="login-button-container"
						style={{ margin: "16px 0", paddingTop: "16px" }}
					>
						<OcButton
							onClick={props.handleSubmit as any}
							id={`${props.id}-LoginForm-submit-button`}
							buttonType={OcButtonType.PRIMARY}
							htmlBtnType="submit"
							block={true}
						>
							<FormattedMessage {...messages.loginButton} />
						</OcButton>
					</div>
				</Form>
			</div>
		);
	} else {
		return <span />;
	}
};

export {
	LoginFormProps,
	LoginForm
};
