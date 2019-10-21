// @flow
import React from "react";
import { AltContainer, MessageBox, FormattedMessage, AuthenticationProviderContainer } from "omnichannel-common-pos";
import type { AppComponentProps } from "omnichannel-flow-pos";
import App from "./App";
import { withRouter } from "react-router";
import messages from "../posMessages";
const AppWithRouter = withRouter(App);

const LoaderComponent = () => {
	return (
		<MessageBox
			boxType="pos"
			title={<FormattedMessage
				{...messages.aaLoginCallback} />
			}
			message={<FormattedMessage
				{...messages.aaLoginProcess} />
			}
		/>
	);
};

const AppContainer = (props: AppComponentProps) => {
	const { flux, store } = props;
	return (
		<AuthenticationProviderContainer flux={flux} store={store} loaderComponent={LoaderComponent}>
			<AltContainer
				stores={{
					UserStore: flux.stores.UserStore,
					CustomerCaseStore: flux.stores.CustomerCaseStore,
					ConsulStore: flux.stores.ConsulStore,
					CMSAdminStore: flux.stores.CMSAdminStore
				}}
				actions={{
					ConsulActions: flux.actions.ConsulActions,
					UserActions: flux.actions.UserActions,
					SessionActions: flux.actions.SessionActions,
					SalesRepSessionActions: flux.actions.SalesRepSessionActions,
				}}
			>
				<AppWithRouter {...props} />
			</AltContainer>
		</AuthenticationProviderContainer>
	);
};

export default AppContainer;