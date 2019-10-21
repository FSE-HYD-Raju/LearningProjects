// @flow

import { actions } from "../../redux";
export default class BaseActions {
	constructor() {
		// $FlowFixMe
		this.generateActions("isUpdating");
	}

	onError(error: any) {
		return (dispatch: Function, alt: Object) => {
			alt.resolve(async () => {
				alt.reduxStore.dispatch(actions.error.showErrorModal(error));
				return Promise.resolve(dispatch(error));
			});
		};
	}
}
