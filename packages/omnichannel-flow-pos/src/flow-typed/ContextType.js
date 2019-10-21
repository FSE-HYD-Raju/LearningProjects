/* eslint no-undef: 0 */
declare type ContextType = {
	flux: {
		actions: Object,
		stores: Object,
		persist: () => void
	},
	router: ReactRouter,
	intl: Object,
	flux: Object,
	location: Object
};

export {
	ContextType
};
