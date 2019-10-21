import { AppState } from "../../reducers";

const shouldHideSupport = (state: AppState): boolean =>
	state.feature.componentVisibility.support === false;

const shouldHideQuickActions = (state: AppState): boolean =>
	state.feature.componentVisibility.quickActions === false;

export {
	shouldHideSupport,
	shouldHideQuickActions,
};
