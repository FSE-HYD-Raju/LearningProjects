import { PostalAddress, User } from "../../types";

// TODO: add typing for user and model
export type UserActionCreateUser = (user: any, deliveryAddress?: any) => Promise<User>;
export type UserActionUpdateUser = (model: any, updateCustomerCase: boolean, forceAddressUpdate: boolean,
                                    isNewUser: boolean, onlyUpdateCustomerCase: boolean, deliveryAddress: any) => void;

export interface UserActionsFlux {
	generateOneTimePassword: () => void;
	aaLogin: (anonymousUser: boolean | undefined, loginHint?: string) => void;
	aaLoginCallback: (queryString: string, redirectUri: string) => Promise<any>;
	setAnonymousUser: (anonymousUser: boolean | undefined, redirectUri?: string) => void;
	getChargingBalances: (billingAccountId: string) => void;
	changePassword: () => void;
	closeChangePasswordModal: () => void;
	updateUserAddresses: (
		user: User,
		places: PostalAddress[],
		updateCustomerCase: boolean,
		forceAddressUpdate: boolean
	) => Promise<Partial<User>>;
	login: (email?: string, password?: string) => void;
	logout: () => void;
	useHomeAddressAsDeliveryAddress: () => void;
	createUser: UserActionCreateUser;
	updateUser: UserActionUpdateUser;
	stopActingAsUser: () => void;
}
