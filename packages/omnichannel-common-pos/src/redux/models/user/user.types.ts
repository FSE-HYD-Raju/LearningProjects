import { ChargingBalances, Person } from "../../types";

interface PersonDetailsFormModelType {
	city: string;
	mobileNumber: string;
	email: string;
	country: string;
	postalCode: string;
	street: string;
	firstName: string;
	lastName: string;
	gender: string;
}

interface User extends Person {
	id: string;
	individualId: string;
	roles: Array<{ name: string }>;
	email: string;
	password?: string;
	created?: string;
	modified?: string;
	locale?: string;
}

type UserState = {
	anonymousUser: boolean;
	hasInitialized: boolean;
	user?: User;
	newUser?: User;
	error?: object;
	hasResults: boolean;
	salesRepUser?: Person;
	registration?: object;
	registrationError?: object;
	updatingUser: boolean;
	salesRepSession: {
		showModal: boolean;
		active: boolean;
		sessionId: string;
		terminals: Array<any>;
		userRoleId: string;
		salesOrganizationRoleId: string;
	};
	sessionState?: string;
	impersonatedIndividualId: string|null;
	chargingBalances: Array<ChargingBalances>;
	showPasswordChangeConfirmation?: boolean;
	identification?: any;
	isPostalAddressUpdated: boolean;
	resendSuccessful: boolean;
	toolmodeIndividualId: string | null;
	identificationExists?: boolean;
	deliveryIdentificationId: string;
	oneTimePassword?: string;
	oneTimePasswordToken?: string;
	isOneTimePasswordValid?: { isValid: boolean };
};

declare type UserIdentificationType = {
	id: string,
	identificationId: string,
	type: string
};

export {
	User,
	UserIdentificationType,
	UserState,
	PersonDetailsFormModelType
};
