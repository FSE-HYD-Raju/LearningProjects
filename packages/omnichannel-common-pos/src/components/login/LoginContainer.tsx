import * as React from "react";
import yup, { Schema } from "yup";
import { RouteComponentProps, withRouter } from "react-router";
import { SessionUtils, SessionKeys } from "../../utils/SessionUtils";
import { ContextType, contextTypesValidationMap } from "../../types";
import { User } from "../../redux";
import { commonDigitalLifeRoutes, commonServiceDeskRoutes } from "../../routes/commonRoutesMap";
import messages from "../../commonMessages";

interface LoginContainerActionProps {
	actions: {
		login: (email?: string, password?: string) => void;
		logout: () => void;
	};
}

interface LoginContainerStateProps {
	error?: any;
	user?: User;
}

interface LoginContainerOwnProps {
	alternativeRoute?: string;
	hideLogin?: () => void;
}

type LoginContainerProps = LoginContainerOwnProps & LoginContainerStateProps & LoginContainerActionProps & RouteComponentProps<any>;

interface LoginContainerState {
	email?: string;
	password?: string;
	error?: any;
	errors: object;
}

interface LoginSchemaModel {
	email?: string;
	password?: string;
}

interface LoginContainerProvidedProps extends LoginContainerState {
	handleInput: (loginInfo: {email: string, password: string}) => void;
	handleLogout: () => void;
	handleLogin: () => void;
	schema: Schema<LoginSchemaModel>;
	handleSubmit: () => void;
	onError: (errors: object) => void;
}

class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {

	static contextTypes = contextTypesValidationMap;

	schema: Schema<LoginSchemaModel>;

	constructor(props: LoginContainerProps, context: ContextType) {
		super(props);

		const { formatMessage } = context.intl;

		this.schema = yup.object({
			email: yup.string().email(formatMessage(messages.loginEmailError)).required(formatMessage(messages.emailRequired)),
			password: yup.string().required(formatMessage(messages.passwordRequired))
		});
		this.state = {
			errors: {}
		};
	}

	handleInput = (loginInfo: LoginSchemaModel) => {
		this.setState({
			email: loginInfo.email,
			password: loginInfo.password,
			error: undefined,
			errors: {}
		});
	};

	handleSubmit = () => {
		const model: LoginSchemaModel = {
			email: this.state.email,
			password: this.state.password
		};
		this.schema.validate(model).then(() => {
			this.handleLogin();
		});
	};

	handleLogin = () => {
		this.props.actions.login(this.state.email, this.state.password);
	};

	handleLogout = () => {
		window.console.log("HANDLE LOGOUT");
		this.props.actions.logout();
	};

	onError = (errors: object) => {
		this.setState({ errors });
	};

	componentWillReceiveProps(newprops: LoginContainerProps) {
		if (newprops.error) {
			this.setState({ error: newprops.error });
		} else if (!this.props.user) {
			if (newprops.user && !newprops.error) {
				if (this.props.hideLogin) {
					this.props.hideLogin();
				}
				SessionUtils.removeItem(SessionKeys.activeBasketId);
				if (newprops.alternativeRoute) {
					this.props.history.push(newprops.alternativeRoute);
				} else {
					const app = process && process.env && process.env.omnichannel;
					switch (app) {
						case "telesales":
							this.props.history.push(commonServiceDeskRoutes.SERVICE_DESK_INDEX.createLink());
							break;
						case "pos":
							this.props.history.push(commonServiceDeskRoutes.SERVICE_DESK_INDEX.createLink());
							break;
						case "b2c":
							this.props.history.push(commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink());
							break;
						case "cms_admin":
							this.props.history.push("/cmsadmin/overview/content");
							break;
						default:
							this.props.history.push(commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink());
					}
				}
			}
		}
	}

	render() {
		return (
			<div className="LoginContainer">
				{
					React.Children.map(this.props.children, ((child: React.ReactNode) => {
						return React.cloneElement<LoginContainerProvidedProps>(child as React.ReactElement<LoginContainerProvidedProps>, {
							handleInput: this.handleInput,
							handleLogout: this.handleLogout,
							handleLogin: this.handleLogin,
							schema: this.schema,
							handleSubmit: this.handleSubmit,
							onError: this.onError,
							...this.state
						});
				}))}
			</div>
		);
	}
}

const LoginContainerWithRouter: React.ComponentClass<LoginContainerOwnProps & LoginContainerStateProps & LoginContainerActionProps> =
	withRouter(LoginContainer);

export {
	LoginContainer as LoginContainerUnwrapped,
	LoginContainerWithRouter as LoginContainer,
	LoginContainerProvidedProps,
	LoginContainerState,
	LoginContainerStateProps,
	LoginContainerOwnProps,
	LoginContainerProps,
	LoginContainerActionProps,
	LoginSchemaModel
};
