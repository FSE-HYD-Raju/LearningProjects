/* eslint no-undef: 0 */
declare type UserStoreState = { // eslint-disable-line
	hasInitialized: boolean,
	user: ?UserType,
	error: ?Object,
	hasResults: boolean,
	salesRepUser: ?Object,
	registration: ?Object,
	registrationError: ?Object,
	updatingUser: boolean,
	identificationExists: boolean,
	salesRepSession: {
		showModal: boolean,
		active: boolean,
		sessionId: string,
		terminals: Array<*>,
		userRoleId: string,
		salesOrganizationRoleId: string
	},
	anonymousUser: boolean,
	deliveryIdentificationId: string
};

export {
	UserStoreState
};
