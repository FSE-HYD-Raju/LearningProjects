"use strict";

import { Action } from "redux";
import { ChargingBalances, Person, PersonAttributes, PostalAddress } from "../../types";
import { SingleArgumentAction, actionCreator, singleArgumentActionCreator } from "../../utils/actionCreator"
import { ErrorContainer } from "../../services";

export enum UserActions {
	FLUX_SYNC = "User_FLUX_SYNC",

	LOGOUT = "User_LOGOUT",
	LOGOUT_COMPLETE = "User_LOGOUNT_COMPLETE",

	READ_COOKIE = "User_READ_COOKIE",
	ADD_PERSON_DATA = "User_ADD_PERSON_DATA",

	GET_CHARGING_BALANCES = "User_GET_CHARGING_BALANCES",
	GET_CHARGING_BALANCES_COMPLETE = "User_GET_CHARGING_BALANCES_COMPLETE",
	GET_CHARGING_BALANCES_FAIL = "User_GET_CHARGING_BALANCES_FAIL",
	UPDATE_POSTAL_ADDRESS = "User_UPDATE_POSTAL_ADDRESS",
	UPDATE_POSTAL_ADDRESS_COMPLETE = "User_UPDATE_POSTAL_ADDRESS_COMPLETE",
	RESET_IS_POSTAL_ADDRESS_UPDATED = "User_RESET_IS_POSTAL_ADDRESS_UPDATED",
	SET_IS_POSTAL_ADDRESS_UPDATED = "User_SET_IS_POSTAL_ADDRESS_UPDATED",
	GENERATE_ONE_TIME_PASSWORD = "User_GENERATE_ONE_TIME_PASSWORD",
	GENERATE_ONE_TIME_PASSWORD_COMPLETE = "User_GENERATE_ONE_TIME_PASSWORD_COMPLETE",
	GENERATE_ONE_TIME_PASSWORD_FAIL = "User_GENERATE_ONE_TIME_PASSWORD_FAIL",
	CHECK_ONE_TIME_PASSWORD = "User_CHECK_ONE_TIME_PASSWORD",
	CHECK_ONE_TIME_PASSWORD_COMPLETE = "User_CHECK_ONE_TIME_PASSWORD_COMPLETE",
	CHECK_ONE_TIME_PASSWORD_FAIL = "User_CHECK_ONE_TIME_PASSWORD_FAIL",

	AA_LOGIN = "User_AA_LOGIN",
	AA_LOGIN_COMPLETE = "User_AA_LOGIN_COMPLETE",
	LOGIN_ERROR = "User_LOGIN_ERROR",
}

export interface UserActionPayload extends Action<UserActions> {
	fluxState?: any;
	redirectUrl?: string;
	error?: ErrorType;
	read?: boolean;
	person?: Person;
	billingAccountId?: string;
	balances?: Array<ChargingBalances>;
	postalAddress?: PostalAddress;
	forceAddressUpdate?: boolean;
	oneTimePasswordToken?: string;
	oneTimePassword: string;
	isOneTimePasswordValid?: { isValid: boolean };
	userId?: string;
	value?: object;
}

type ErrorType = {
	status: number;
	title: string;
	code: string;
	message: string;
};

export interface UserAALoginPayload extends Action<UserActions.AA_LOGIN> {
	anonymousUser?: boolean;
	loginHint?: string;
	isSilentAuth?: boolean;
}

export interface UserAALoginCompletePayload extends SingleArgumentAction<UserActions.AA_LOGIN_COMPLETE, boolean | undefined> {}

export interface UserLoginErrorPayload extends SingleArgumentAction<UserActions.LOGIN_ERROR, ErrorContainer> {}

export const user = {
	fluxSync: (fluxState: any) => ({ type: UserActions.FLUX_SYNC, fluxState }),

	logout: () => ({ type: UserActions.LOGOUT }),
	logoutComplete: (redirectUrl: string) => ({ type: UserActions.LOGOUT_COMPLETE, redirectUrl }),

	setReadCookie: (read: boolean) => ({ type: UserActions.READ_COOKIE, read }),
	addPersonDataToUser: (person: PersonAttributes) => ({ type: UserActions.ADD_PERSON_DATA, person }),

	getChargingBalances: (billingAccountId: string) => ({ type: UserActions.GET_CHARGING_BALANCES, billingAccountId }),
	getChargingBalancesComplete: (balances: Array<ChargingBalances>) => ({
		type: UserActions.GET_CHARGING_BALANCES_COMPLETE,
		balances
	}),
	getChargingBalancesFail: (error: ErrorType) => ({ type: UserActions.GET_CHARGING_BALANCES_FAIL, error }),
	updatePostalAddress: (postalAddress: PostalAddress, forceAddressUpdate: boolean) => ({
		type: UserActions.UPDATE_POSTAL_ADDRESS,
		postalAddress,
		forceAddressUpdate
	}),
	updatePostalAddressComplete: (postalAddress: PostalAddress) => ({
		type: UserActions.UPDATE_POSTAL_ADDRESS_COMPLETE,
		postalAddress
	}),
	resetIsPostalAddressUpdated: () => ({
		type: UserActions.RESET_IS_POSTAL_ADDRESS_UPDATED
	}),
	setIsPostalAddressUpdated: () => ({
		type: UserActions.SET_IS_POSTAL_ADDRESS_UPDATED
	}),
	generateOneTimePassword: (userId: string) => ({
		type: UserActions.GENERATE_ONE_TIME_PASSWORD,
		userId
	}),
	generateOneTimePasswordComplete: (oneTimePasswordToken: string) => ({
		type: UserActions.GENERATE_ONE_TIME_PASSWORD_COMPLETE,
		oneTimePasswordToken
	}),
	generateOneTimePasswordFail: (error: ErrorType) => ({
		type: UserActions.GENERATE_ONE_TIME_PASSWORD_FAIL,
		error
	}),
	checkOneTimePassword: (oneTimePassword: string, oneTimePasswordToken: string) => ({
		type: UserActions.CHECK_ONE_TIME_PASSWORD,
		oneTimePassword,
		oneTimePasswordToken,
	}),
	checkOneTimePasswordComplete: (isOneTimePasswordValid: { isValid: boolean }) => ({
		type: UserActions.CHECK_ONE_TIME_PASSWORD_COMPLETE,
		isOneTimePasswordValid,
	}),
	checkOneTimePasswordFail: (error: ErrorType) => ({
		type: UserActions.CHECK_ONE_TIME_PASSWORD_FAIL,
		error,
	}),

	aaLogin: actionCreator<UserAALoginPayload>(UserActions.AA_LOGIN),
	aaLoginComplete: singleArgumentActionCreator<boolean | undefined, UserAALoginCompletePayload>(UserActions.AA_LOGIN_COMPLETE),
	loginError: singleArgumentActionCreator<ErrorContainer, UserLoginErrorPayload>(UserActions.LOGIN_ERROR),
};
