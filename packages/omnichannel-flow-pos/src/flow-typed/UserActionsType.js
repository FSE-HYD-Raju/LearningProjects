/* eslint no-undef: 0 */
declare type UserActionsType = {
	createUser: UserActionCreateUser,
	aaLogin: (anonymousUser?: boolean, loginHint: ?string) => void,
	updateUser: UserActionUpdateUser,
	aaLogin: UserActionAaLogin,
	getIdentificationByBusinessIdentityCode:UserActionGetIdentificationByBusinessIdentityCode
};
declare type UserActionCreateUser = (user: Object) => void;
declare type UserActionUpdateUser = (
	model: Object,
	updateCustomerCase: boolean,
	forceAddressUpdate?: boolean,
	isNewUser: boolean,
	onlyUpdateCustomerCase: boolean
) => void;
declare type UserActionAaLogin = (anonymousUser?: boolean, loginHint: ?string) => void;
declare type UserActionGetIdentificationByBusinessIdentityCode = (identificationId: ?string) => Object;
export {
	UserActionCreateUser,
	UserActionUpdateUser,
	UserActionAaLogin,
	UserActionGetIdentificationByBusinessIdentityCode,
	UserActionsType
};
