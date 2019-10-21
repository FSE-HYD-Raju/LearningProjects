import BaseActions from "./BaseActions";
import { actions, deprecated } from "../../redux";

// values will be saved per channel so we need it here to query

export default class ConsulActions extends BaseActions {
	@deprecated("Use dispatch and actions.consul.changeLanguageByCode(...)")
	changeLanguageByCode(iso6392) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(
				actions.consul.changeLanguageByCode(iso6392)
			);
		};
	}

	@deprecated("Use dispatch and actions.consul.changeLanguage(...)")
	changeLanguage(locale) {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.consul.changeLanguage(locale));
		};
	}

	@deprecated("Use dispatch and actions.consul.initLocale()")
	initializeLanguage() {
		return (dispatch, flux) =>
			flux.reduxStore.dispatch(actions.consul.initLocale());
	}

	@deprecated("Use dispatch and actions.consul.getValues()")
	getValues() {
		return (dispatch, alt) => {
			alt.reduxStore.dispatch(actions.consul.getValues());
		};
	}
}
