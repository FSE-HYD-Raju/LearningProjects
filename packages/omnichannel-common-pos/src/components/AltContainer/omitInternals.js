import omit from "lodash/omit";

const omitInternals = store => {
	return omit(store, [
		"alt",
		"StoreModel",
		"boundListeners",
		"config",
		"dispatchToken",
		"displayName",
		"emitChange",
		"lifecycle",
		"preventDefault",
		"reduce",
		"state",
		"subscriptions",
		"transmitter",
		"listen",
		"unlisten",
		"getState"
	]);
};

export default omitInternals;
