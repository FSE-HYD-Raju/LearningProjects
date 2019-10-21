import * as React from "react";
import { isEqual } from "lodash";
import { SessionUtils, SessionKeys } from "../../../utils/SessionUtils";
import { FormattedMessage, setAxiosInterceptor } from "../../../channelUtils";
import { RouteComponentProps } from "react-router";
import messages from "./OcRouteAuth.messages";
import { ContextType, contextTypesValidationMap } from "../../../types";

interface OcRouteAuthOwnProps {
	anonymous?: boolean;
}

interface OcRouteAuthStateProps {
	children?: React.ReactNode;
	anonymousAuthenticationEnabled: boolean;
	isLoggedIn: boolean;
	userOrAnonymousSet: boolean;
}

interface OcRouteAuthActionProps {
	actions: {
		setAnonymousUser: (anonymous: boolean) => void;
		aaLogin: (anonymous: boolean, loginHint?: string | undefined) => void;
		persistToStorage: () => void;
	};
}

type OcRouteAuthProps = OcRouteAuthOwnProps & OcRouteAuthActionProps & OcRouteAuthStateProps & RouteComponentProps<any>;

class OcRouteAuth extends React.Component<OcRouteAuthProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: OcRouteAuthProps, context: ContextType) {
		super(props, context);

		if (setAxiosInterceptor) {
			setAxiosInterceptor({flux: context.flux, store: context.flux.reduxStore, intl: context.intl});
		}
	}

	componentDidMount() {
		this.redirectToLoginIfNeeded(this.props);
	}

	componentWillReceiveProps(newprops: OcRouteAuthProps) {
		if (!isEqual(newprops, this.props)) {
			this.redirectToLoginIfNeeded(newprops);
		}
	}

	redirectToLoginIfNeeded(props: OcRouteAuthProps) {
		const shouldProcced: boolean | undefined = !window.location.pathname.startsWith("/aalogin/callback") && this.needsAuthentication(props);

		const { anonymousAuthenticationEnabled } = props;

		if (shouldProcced) {
			window.console.log("AA ENABLED", anonymousAuthenticationEnabled);

			if (props.anonymous && !anonymousAuthenticationEnabled) {
				window.console.log("SETTING ANON");
				props.actions.setAnonymousUser(true);
			} else {
				window.console.log("ATTEMPTING AA LOGIN");
				const loginHintParam: string | undefined = this.getLoginHintParam();
				props.actions.persistToStorage();
				props.actions.aaLogin(!!props.anonymous, loginHintParam);
			}
		}
	}

	getLoginHintParam = (): string | undefined => {
		const searchParams = new URLSearchParams(this.props.location.search);
		const result = searchParams.get("login_hint");
		return result ? result : undefined;
	};

	needsAuthentication(props: OcRouteAuthProps) {
		if (props.anonymous && !props.anonymousAuthenticationEnabled) {
			return false;
		}

		return ((!props.anonymous && !props.isLoggedIn) ||
			(props.anonymous && !window.location.pathname.includes("ssoredirect") &&
				!props.userOrAnonymousSet && !SessionUtils.getItem(SessionKeys.anonymousUser))
		);
	}

	render() {
		// render children only, if we have a user, or an anonymous user set
		const needsAuthentication = this.needsAuthentication(this.props);

		if (!needsAuthentication) {
			return <React.Fragment>{this.props.children}</React.Fragment>;
		}

		const token = SessionUtils.getItem(SessionKeys.auth);

		/* Only show login form if there was no auth token in sessionStorage */
		/* Do not also show for b2c cold landing and automatic anonymous login */
		if (token || this.props.anonymous) {
			return <span />;
		} else {
			return (
				<div className="OcRouteAuthForm-form-container">
					<h1 className="OcRouteAuthForm-need-auth-message">
						<FormattedMessage {...messages.youNeedToAuthenticate} />
					</h1>
				</div>
			);
		}
	}
}
const sessionKeyPostLoginRedirect = "post_login_redirect";

export {
	sessionKeyPostLoginRedirect,
	OcRouteAuthStateProps,
	OcRouteAuthActionProps,
	OcRouteAuthOwnProps,
	OcRouteAuthProps,
	OcRouteAuth
};
