import * as React from "react";
import extractQueryParamsFromUrl from "./extractQueryParamsFromUrl";
import { SessionKeys, SessionUtils } from "../../utils/SessionUtils";
import { commonShopRoutes } from "../../routes/commonRoutesMap";

interface AALoginCallbackActionProps {
	actions: {
		aaLoginCallback: (queryString: string, redirectUri: string) => Promise<any>;
		aaLogin: () => void;
		historyPush: (to: string) => void;
	};
}

interface AALoginCallbackStateProps {
	path: string;
	query: string;
	loginCallbackQuery: string;
}

const LOGIN_REQUIRED: string = "login_required";

type AALoginCallbackProps = AALoginCallbackActionProps & AALoginCallbackStateProps;

class AALoginCallback extends React.Component<AALoginCallbackProps> {

	componentDidMount() {
		const loginCallbackQuery = this.props.loginCallbackQuery;
		const queryParams = extractQueryParamsFromUrl(loginCallbackQuery);

		const redirectUriFromLocation = this.props.path + this.props.query;
		const redirectUri = (redirectUriFromLocation.length > 0 && redirectUriFromLocation) || commonShopRoutes.INDEX.createLink();

		if (!loginCallbackQuery) {
			return;
		}

		if (queryParams.error === LOGIN_REQUIRED) {
			this.props.actions.aaLogin();
		}

		if (queryParams.code) {
			this.props.actions.aaLoginCallback(loginCallbackQuery, redirectUri)
				.then(() => {this.props.actions.historyPush(redirectUri); })
				.catch(() => {this.props.actions.historyPush(commonShopRoutes.INDEX.createLink()); });
		}
	}

	render() {
		return this.props.children || null;
	}
}

export default AALoginCallback;

export {
	AALoginCallback,
	AALoginCallbackActionProps,
	AALoginCallbackStateProps,
	AALoginCallbackProps
};
