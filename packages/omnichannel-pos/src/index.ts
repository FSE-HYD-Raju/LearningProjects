import Root from "./Root";
export * from "omnichannel-service-desk";

import { history } from "./channelSetup";
const AppContainer = require("./app/AppContainer");

import { fluxStoreToReduxMap, connectFluxReduxChannel } from "./redux/setupRedux";
const { CustomPersonDetailsForm, PersonDetailsForm }  = require("./checkout/PersonDetailsForm");

export {
	AppContainer,
	history,
	Root,
	fluxStoreToReduxMap,
	connectFluxReduxChannel,
	CustomPersonDetailsForm,
	PersonDetailsForm,
};
