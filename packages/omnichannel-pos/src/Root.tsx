import * as React from "react";
import { Provider } from "react-redux";
import { getFlux, history } from "./channelSetup";
import { getStore } from "./redux";
import { connectFluxReduxChannel } from "./redux/setupRedux";
import { ConnectedRouter } from "connected-react-router";
import {
	CustomizationPointsMapping,
	AppComponentProps,
	bootstrapAppWithCustomization,
	RootContainer,
	AppState,
	DevTools
} from "omnichannel-common-pos";
const AppContainer: React.ComponentClass<AppComponentProps<AppState>> = require("./app/AppContainer");

// Run Alt -> Redux settings
const isDev = process.env.NODE_ENV === "development";

export interface RootProps {
	customizationPointsMapping: CustomizationPointsMapping<AppState>;
}

const Root: React.FC<RootProps> = (props: RootProps) => {
	const { flux, store, customizationPointsMapping } = bootstrapAppWithCustomization({
		getFlux,
		getStore,
		connectFluxReduxChannel,
		customizationPointsMapping: props.customizationPointsMapping
	});

	if (isDev) {
		(window as any).store = store;
		(window as any).flux = flux;
	}

	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
					<React.Fragment>
						<RootContainer
							id="w-app"
							application={AppContainer}
							flux={flux}
							store={store}
							history={history}
						/>
						{isDev ? <DevTools/> : null}
					</React.Fragment>
			</ConnectedRouter>
		</Provider>
	);
};
Root.defaultProps = {
	customizationPointsMapping: {}
};
export default Root;
