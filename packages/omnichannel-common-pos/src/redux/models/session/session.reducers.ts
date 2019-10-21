"use strict";

import { SessionActionPayload, SessionActions } from "./session.actions";
import { Guid } from "./session.utils";

type SessionState = {
	user?: { id: string },
};

const initialState = {};

const sessionReducer = (state: Partial<SessionState> = initialState, action: SessionActionPayload) => {
	const { type } = action;
	switch (type) {
		case SessionActions.SAVE_USER: {
			const guid = new Guid();
			const user = {
				id: guid.id
			};
			return {
				...state,
				user,
			};
		}
		default:
			return state;
	}
};

export default sessionReducer;
export {
	SessionState,
};
