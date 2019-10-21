import * as React from "react";
import setAxiosInterceptor from "./setAxiosInterceptor";
import AALoginCallbackContainer from "../components/auth/AALoginCallbackContainer";
import { contextTypesValidationMap, ContextType } from "../types";
import { RouteComponentProps } from "react-router";

interface AuthenticationProviderStatePropsOwnProps {
	flux: any;
	store: any;
	children: React.ReactNode;
	loaderComponent: React.ComponentType<any>;
}

interface AuthenticationProviderStateProps {
	isAnonymousAuthenticationEnabled: boolean;
	isAuthenticated: boolean;
	location: {
		pathname: string;
		search?: string;
	};
	securedRoutes: Array<string>;
}

interface AuthenticationProviderActionProps {
	login: (anonymous: boolean, loginHint?: string) => void;
}

type AuthenticationProviderProps = AuthenticationProviderStatePropsOwnProps & AuthenticationProviderStateProps
	& AuthenticationProviderActionProps & RouteComponentProps<any>;

class AuthenticationProvider extends React.Component<AuthenticationProviderProps> {
	static contextTypes: React.ValidationMap<ContextType> = contextTypesValidationMap;

	public static AALOGIN_CALLBACK: string = "/aalogin/callback";
	public static AALOGOUT_REDIRECT: string = "/logout/redirect";
	public static AALOGOUT_REDIRECT_PARAM: string = "uri";

	constructor(props: AuthenticationProviderProps, context: ContextType) {
		super(props, context);
		setAxiosInterceptor({
			flux: props.flux,
			store: props.store,
			intl: context.intl
		});

		this.state = {
			locales: []
		};
	}

	componentWillMount() {
		if (this.props.location.pathname === AuthenticationProvider.AALOGOUT_REDIRECT) {
			const params: URLSearchParams = new URLSearchParams(this.props.location.search);
			const redirectUrl = params.get(AuthenticationProvider.AALOGOUT_REDIRECT_PARAM);
			if (redirectUrl) {
				window.location.replace(redirectUrl);
			}
		}
	}

	componentDidMount() {
		this.loginIfNeeded();
	}

	// Needed for login after redirect for some secure path
	componentDidUpdate() {
		this.loginIfNeeded();
	}

	loginIfNeeded() {
		if (this.shouldPerformLogin() && !this.isLoginCallback()) {
			this.props.login(!this.isInSecureRoute(), this.getLoginHintParam());
		}
	}

	/**
	 * Login should be performed if:
	 * - user is not authenticated AND
	 * - user is in secured route OR anonymous authentication is enabled
	 */
	shouldPerformLogin = () => {
		return !this.props.isAuthenticated && (this.isInSecureRoute() || this.props.isAnonymousAuthenticationEnabled);
	};

	/**
	 * Application should be rendered if:
	 * - login isn't needed AND
	 * - we are not in a login callback
	 */
	shouldRenderApplication = () => {
		return !this.shouldPerformLogin() && !this.isLoginCallback();
	};

	isLoginCallback = () => {
		return this.props.location.pathname === AuthenticationProvider.AALOGIN_CALLBACK;
	};

	/**
	 * Checks if current path is defined to be secured in active configuration.
	 * Configuration should be a list of paths, such as ["/digilife"].
	 */
	isInSecureRoute = () => {
		return this.props.securedRoutes.some(path => {
			return this.props.location.pathname.includes(path);
		});
	};

	getLoginHintParam = (): string | undefined => {
		const queryParams =
			this.props.location.search &&
			this.props.location.search
				.replace("?", "")
				.split("&")
				.reduce((params: any, param: string) => {
					const kv = param.split("=");
					params[kv[0]] = kv[1];
					return params;
				}, {})  || {};
		return queryParams.login_hint;
	};

	shouldComponentUpdate(nextProps: AuthenticationProviderProps) {
		return this.props.location.pathname !== nextProps.location.pathname ||
			this.props.location.search !== nextProps.location.search ||
			this.props.isAuthenticated !== nextProps.isAuthenticated ||
			this.props.securedRoutes !== nextProps.securedRoutes;
	}

	render() {
		const LoaderComponent = this.props.loaderComponent;
		return this.shouldRenderApplication() ? (
			<>{this.props.children}</>
		) : (
			<AALoginCallbackContainer flux={this.props.flux}>
				<LoaderComponent />
			</AALoginCallbackContainer>
		);
	}
}

export {
	AuthenticationProviderStatePropsOwnProps,
	AuthenticationProviderStateProps,
	AuthenticationProviderActionProps,
	AuthenticationProviderProps,
};

export default AuthenticationProvider;
