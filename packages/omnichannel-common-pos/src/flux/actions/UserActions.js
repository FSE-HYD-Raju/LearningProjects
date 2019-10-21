// @flow

import BaseActions from "./BaseActions";
import { ErrorContainer, deprecated, actions, Selectors } from "../../redux";

import { restUrl } from "../../utils/urls";
import { SessionKeys, SessionUtils, parseJSON } from "../../utils/SessionUtils";

import {
	isChannelB2c,
	isChannelCmsAdmin,
	isChannelPos
} from "../../utils/Channel.utils";
import isClient from "../../utils/isClient";

import type { UserType, PersonDetailsFormModelType } from "omnichannel-flow-pos";
import R from "ramda";
import _ from "lodash";
import Cookies from "universal-cookie";
import PostalAddressService from "../../redux/services/PostalAddressService";
import PersonService from "../../redux/services/PersonService";
import { withFunctionCustomization, B2CFunctionCustomizationPoints } from "../../customization";
import DateUtil from "../../utils/DateUtil";

/**
 * Customization function that should return a redirect URL that is used for redirection instead of result coming from
 * API.
 */
const resolveCustomizedLoginRedirectUrl = withFunctionCustomization(B2CFunctionCustomizationPoints.CUSTOM_LOGIN_URL_PROVIDER, () => null);

const URI_LOCATION_STATE = "uriLocation";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };
const addressValidationHeaders = forceAddressUpdate => {
	return {
		...commonHeaders,
		"X-Force-Address-Update": forceAddressUpdate ? "true" : "false"
	};
};

export function addAttributesToUser(user: Object, resp: Object): Object {
	const attr = _.get(resp, "data.attributes");
	return attr
		? {
			...user,
			attributes: attr
		}
		: user;
}

class UserActions extends BaseActions {
	loginError(error: ?Object) {
		return error;
	}

	setDisableGsmAuthCookie(alt: Object) {
		const maxAge =
			alt.reduxStore.getState().feature.gsmAuthorizationDisableMaxTimeInMinutes * 60;
		new Cookies().set("disable_gsm_auth", "", {
			path: "/",
			maxAge
		});
	}

	@deprecated()
	logout() {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.user.logout());
		};
	}

	getUiLocalesParam() {
		if (isClient && window.navigator) {
			const languages = window.navigator.languages || [];
			const localesString = languages.join(" ");
			return `&ui_locales=${localesString}`;
		}
		return "uk";
	}

	aaLogin(anonymousUser: boolean, loginHint: ?string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const customizedLoginRedirectUrl = resolveCustomizedLoginRedirectUrl(alt);
				if (customizedLoginRedirectUrl) {
					return dispatch({
						location: customizedLoginRedirectUrl
					});
				}

				if (SessionUtils.getTimedItem(SessionKeys.AALoginInProgress)) {
					return Promise.resolve();
				}
				const { pathname: path, search: query } = window.location;
				alt.reduxStore.dispatch(actions.uriLocation.saveUri(path, query));

				let sessionState = parseJSON(SessionUtils.getItem(SessionKeys.app));
				if (sessionState) {
					const uriLocation = _.get(sessionState, URI_LOCATION_STATE, {});
					sessionState[URI_LOCATION_STATE] = { ...uriLocation, path, query };
				} else {
					sessionState = { [URI_LOCATION_STATE] : { path, query, pathname: "" } };
				}
				SessionUtils.setItem(SessionKeys.app, JSON.stringify(sessionState));

				SessionUtils.setTimedItem(
					SessionKeys.AALoginInProgress,
					"true"
				);
				const devDirect =
					(isClient &&
						process.env.NODE_ENV !== "production" &&
						`&post_login_redirect=${window.location.protocol ||
						"http:"}//${window.location.host}${window.location.pathname}`) || "";
				const loginHintParam = loginHint
					? `&login_hint=${loginHint}`
					: "";
				const uiLocales = this.getUiLocalesParam();
				// const uiLocales = `&language=${alt.stores.ConsulStore.state.locale ||
				// "uk"}`;
				return alt.apiCalls
					.getFromUrl(
						`${restUrl}/oauth2/authorize?anonymous=${(anonymousUser &&
							"true") ||
						"false"}${devDirect}${loginHintParam}${uiLocales}`,
						alt.UserActions
					)
					.then(
						resp => {
							if (resp instanceof ErrorContainer) {
								return this.loginError(resp);
							}
							const modifiedResp = {
								location: resp,
								anonymousUser
							};
							return dispatch(modifiedResp);
						},
						reason => {
							console.log(
								"UserActions.aaLogin promise timed out",
								reason
							);
						}
					);
			});
	}

	aaLoginCallback(queryString: string, redirectUri: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				let user = await alt.apiCalls.getFromUrl(
					`${restUrl}/oauth2/callback${queryString}`,
					alt.UserActions
				);

				if (user instanceof ErrorContainer) {
					console.warn("oauth2/callback failed", user);
					return Promise.reject(user);
				}
				if (!user.anonymous && user.id && user.individualId) {
					if (isChannelB2c()) {
						alt.reduxStore.dispatch(actions.auth.postLoginCleanup());
						await alt.actions.DigitalLifeActions.initAll(user);
						if (!alt.reduxStore.getState().feature.enableBasketSelection) {
							const person = Selectors.digitalLife.getPersonById(
								user.id
							)(alt.reduxStore.getState());
							user = addAttributesToUser(user, person);

							if (alt.stores.BasketStore.state.activeBasket) {
								alt.actions.BasketActions.updateOwnerToBasket(
									alt.stores.BasketStore.state.activeBasket,
									user
								);
							}
						}
					} else if (isChannelPos()) {
						user &&
						user.attributes &&
						this.addPersonDataToUser(user.attributes, true);
					} else if (isChannelCmsAdmin()) {
						// user = await mergePersonToUser(user, alt, false);
					}
				}

				dispatch({
					queryString,
					user
				});
				return Promise.resolve(user);
			});
	}

	changeLanguage(lang: string) {
		return lang;
	}

	changeLocale(locale: string) {
		return locale;
	}

	doLogin(
		user: Object,
		salesRepUser?: ?Object,
		location?: string,
		replaceRoute?: boolean
	) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				if (user.id && user.individualId) {
					if (isChannelB2c() || salesRepUser) {
						await alt.actions.DigitalLifeActions.initAll(user);
					} else if (isChannelPos()) {
						await this.getPersonForPosUser(user);
					} else if (isChannelCmsAdmin()) {
						await this.getPersonForPosUser(user);
						await alt.actions.CMSAdminActions.getPublishTargets();
					}
				}

				if (
					!salesRepUser &&
					alt.stores.BasketStore.state.activeBasket &&
					isChannelPos()
				) {
					await alt.actions.BasketActions.updateOwnerToBasket(
						alt.stores.BasketStore.state.activeBasket,
						user
					);
				}

				const payload = {
					user,
					salesRepUser,
					location,
					replaceRoute
				};
				dispatch(payload);
				return Promise.resolve(payload);
			});
	}

	getIdentificationByBusinessIdentityCode(
		identificationId: ?string
	): Function {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(`/identifications?filter[identificationId]=${String(
					identificationId
					)}&filter[type]=personal-identity-code`
				);
				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				}
				return Promise.resolve(dispatch(resp.data));
			});
	}

	getPersonForPosUser(user: { id: string }) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/sales-rep-persons/${user.id}`
				);
				if (resp instanceof ErrorContainer) {
					console.error(
						"Error fetching sales-rep-persons: " +
						JSON.stringify(resp)
					);
					return this.addPersonDataToUser({});
				} else if (resp && resp.data) {
					const person = resp.data;
					return this.addPersonDataToUser(person.attributes);
				}
				return Promise.resolve(false);
			});
	}

	setAnonymousUser(anonymousUser: boolean, redirectUri?: string) {
		const payload = {
			anonymousUser,
			redirectUri
		};
		return payload;
	}

	@deprecated()
	addPersonDataToUser(attributes: Object, updateLanguage: ?boolean) {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(
				actions.user.addPersonDataToUser(attributes)
			);
		};
	}

	saveSalesRepUser(salesRepUser: Object) {
		return salesRepUser;
	}

	checkUsers() {
		return (dispatch: Function, alt: Object) => {
			if (isClient) {
				const userDump: any = SessionUtils.getItem(SessionKeys.user);
				const user: ?Object = JSON.parse(userDump);

				const salesRepUserDump: any = sessionStorage.getItem(
					"salesRepUser"
				);

				const salesRepUser: ?Object = JSON.parse(salesRepUserDump);

				if (user && !_.isEmpty(user) && salesRepUser) {
					return this.doLogin(user, salesRepUser);
				} else {
					return alt.reduxStore.dispatch(actions.session.saveUser());
				}
			}
			return false;
		};
	}

	actAsUser(salesRepUser: Object, selectedUser: Object, location: string) {
		//get new user info from api and init new actions with that data (this.doLogin)
		//save sales representative to user store

		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const impersonatedIndividualId = _.get(
					alt.stores,
					"UserStore.state.impersonatedIndividualId"
				);
				if (!impersonatedIndividualId) {
					const url = `/persons/${selectedUser.id}`;
					const resp = await alt.apiCalls.get(url);
					if (resp instanceof ErrorContainer) {
						return this.loginError(resp);
					} else if (resp && resp.data && resp.data.id) {
						const user = {
							id: resp.data.id,
							firstName: _.get(resp.data, "attributes.firstName"),
							lastName: _.get(resp.data, "attributes.lastName"),
							attributes: _.get(resp.data, "attributes"),
							email: _.get(
								resp.data,
								"attributes.emails[0].email"
							),
							locale: alt.stores.UserStore.state.user.locale
						};
						return Promise.resolve(
							dispatch(
								this.doLogin(user, salesRepUser, location, true)
							)
						);
					}
				}
				return Promise.resolve(dispatch(false));
			});
	}

	setLocation(location: string) {
		return location;
	}

	setToolmodeId(individualId: string) {
		return individualId;
	}

	stopActingAsUser(salesRepUser: Object, location: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				return Promise.resolve(
					this.doLogin(salesRepUser, null, location, false)
				);
			});
	}

	setNewUser(user: Object) {
		return (dispatch: Function) => {
			dispatch(user);
		};
	}

	updatingUser(isUpdating: boolean) {
		return (dispatch: Function) => {
			dispatch(isUpdating);
		};
	}

	onUserActionsError(error: Object) {
		this.updatingUser(false);
		this.onError(error);
		return null;
	}

	updateUserPrivacySettings(
		user: Object,
		privacySettings: Object,
		updateCustomerCase: boolean
	) {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const existingUserResp = await alt.apiCalls.get(`/persons/${user.id}`);

				if (existingUserResp instanceof ErrorContainer) {
					return Promise.resolve(
						this.onUserActionsError(existingUserResp)
					);
				} else {
					const attributes = R.merge(
						existingUserResp.data.attributes,
						privacySettings
					);

					const payload = {
						type: "persons",
						id: user.id,
						attributes
					};

					const resp = await alt.apiCalls.patch(`/persons/${user.id}`,
						payload,
						commonHeaders
					);
					this.updatingUser(false);
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(this.onUserActionsError(resp));
					} else {
						dispatch(resp.data.data);
						alt.actions.DigitalLifeActions.getPersonForUser(user);
						if (updateCustomerCase) {
							alt.actions.CustomerCaseActions.setCustomer(
								resp.data.data
							);
						}
						return Promise.resolve(resp.data.data);
					}
				}
			});
	}

	updateUserDemoGraphicInfo(
		user: Object,
		demographicInfo: Object,
		updateCustomerCase: boolean
	) {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const existingUserResp = await alt.apiCalls.get(`/persons/${user.id}`);

				if (existingUserResp instanceof ErrorContainer) {
					return Promise.resolve(
						this.onUserActionsError(existingUserResp)
					);
				} else {
					const attributes = R.merge(
						existingUserResp.data.attributes,
						demographicInfo
					);

					const payload = {
						type: "persons",
						id: user.id,
						attributes
					};

					const resp = await alt.apiCalls.patch(`/persons/${user.id}`,
						payload,
						commonHeaders
					);
					this.updatingUser(false);
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(this.onUserActionsError(resp));
					} else {
						dispatch(resp.data.data);
						alt.actions.DigitalLifeActions.getPersonForUser(user);
						if (updateCustomerCase) {
							alt.actions.CustomerCaseActions.setCustomer(
								resp.data.data
							);
						}
						return Promise.resolve(resp.data.data);
					}
				}
			});
	}

	updateUserPreferences(
		user: Object,
		preferences: Object,
		updateCustomerCase: boolean
	) {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const existingUserResp = await alt.apiCalls.get(`/persons/${user.id}`);

				if (existingUserResp instanceof ErrorContainer) {
					return Promise.resolve(
						this.onUserActionsError(existingUserResp)
					);
				} else {
					const primaryEmail = {
						..._.get(existingUserResp, "data.attributes.emails[0]"),
						..._.get(preferences, "emails[0]")
					};

					const primaryPhone = {
						..._.get(
							existingUserResp,
							"data.attributes.mobileNumbers[0]"
						),
						...preferences.phone
					};

					const primaryFixedLineNumber = {
						..._.get(
							existingUserResp,
							"data.attributes.fixedLineNumbers[0]"
						),
						...preferences.fixedLineNumber
					};

					const payload = {
						type: "persons",
						id: user.id,
						attributes: {
							...existingUserResp.data.attributes
						}
					};

					// create new media as PRIMARY

					[
						primaryEmail,
						primaryPhone,
						primaryFixedLineNumber
					].forEach(media => {
						if (!_.get(media, "id")) {
							media.role = "PRIMARY";
						}
					});

					// Create new media only, if there's input. Always update existing media (allow clearing fields).

					if (
						_.get(primaryEmail, "email") ||
						_.get(primaryEmail, "id")
					) {
						payload.attributes.emails[0] = primaryEmail;
					}
					if (
						_.get(primaryPhone, "number") ||
						_.get(primaryPhone, "id")
					) {
						payload.attributes.mobileNumbers[0] = primaryPhone;
					}
					if (
						_.get(primaryFixedLineNumber, "number") ||
						_.get(primaryFixedLineNumber, "id")
					) {
						payload.attributes.fixedLineNumbers[0] = primaryFixedLineNumber;
					}

					if (preferences && preferences.language) {
						payload.attributes.language = preferences.language;
					}

					const resp = await alt.apiCalls.patch(`/persons/${user.id}`,
						payload,
						commonHeaders
					);
					this.updatingUser(false);
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(this.onUserActionsError(resp));
					} else {
						dispatch(resp.data.data);
						alt.actions.DigitalLifeActions.getPersonForUser(user);
						if (updateCustomerCase) {
							alt.actions.CustomerCaseActions.setCustomer(
								resp.data.data
							);
						}
						return Promise.resolve(resp.data.data);
					}
				}
			});
	}
	// TODO: reminder for alt->redux refactoring.
	// this method is called from returns promise with updated user instance,
	// so calling side relies on returned value
	// also after updating address two flux stores are updated
	updateUserAddresses(
		user: Object,
		postalAddresses: Array<*>,
		updateCustomerCase: boolean,
		forceAddressUpdate: boolean
	) {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const responsesPromises = [];
				for (const postalAddress of postalAddresses) {
					responsesPromises.push(PostalAddressService.updateOrCreatePostalAddress({
						postalAddress,
						individualId: user.id,
						forceAddressUpdate
					}));
				}
				try {
					await Promise.all(responsesPromises);
				} catch (e) {
					if (e.errorContainer) {
						return Promise.reject("invalid-postal-address");
					} else {
						// regular error, not invalid-address
						// TODO: the only place where it used is POS
						// best - use approach like in user.saga
						// at least - test in POS, "e" is js Error, not ErrorContainer
						this.onUserActionsError(e);
						return Promise.reject("Update user fail");
					}
				} finally {
					this.updatingUser(false);

				}
				const updatedUserData = await PersonService.getPersons(user.id, []);
				const updatedUser = updatedUserData.data;
				alt.actions.DigitalLifeActions.dispatchPersonForUser(updatedUser);
				if (updateCustomerCase) {
					alt.actions.CustomerCaseActions.setCustomer(
						updatedUser
					);
				}
				this.onUpdateUserAddresses(updatedUser);
				return Promise.resolve(updatedUser);
			});
	}

	onUpdateUserAddresses(resp: Object) {
		return resp;
	}

	updateUser(
		model: Object,
		updateCustomerCase: boolean,
		forceAddressUpdate: boolean,
		isNewUser: boolean,
		onlyUpdateCustomerCase: boolean,
		delivery: Object
	) {
		if (model) {
			const user = model;
			return (dispatch: Function, alt: Object) => {
				return alt.resolve(async () => {
					dispatch();
					const existingPerson = await alt.apiCalls.get(
						`/persons/${user.id}`
					);

					if (existingPerson instanceof ErrorContainer) {
						console.log(
							"FAILED TO FETCH PERSON TO UPDATE",
							existingPerson
						);
						return Promise.resolve(existingPerson);
					} else {
						this.updatingUser(true);

						const newPerson = {
							...existingPerson.data.attributes,
							firstName: user.firstName,
							lastName: user.lastName
						};

						const { postalAddresses } = newPerson;
						const postalAddress = _.head(postalAddresses);
						// not every form has coAddress, without this it will be overriden as undefined
						const getField = name =>
							_.has(user, name) &&
							!_.isUndefined(_.get(user, name))
								? { [name]: user[name] }
								: {};
						const coAddress = getField("coAddress");
						const description = getField("description");
						const stateOrProvince = getField("stateOrProvince");
						const county = getField("county");
						const newPostal = {
							...postalAddress,
							...coAddress,
							...description,
							...stateOrProvince,
							...county,
							street: user.streetAddress || user.street, // MEST KEK
							city: user.city,
							postalCode: user.postalCode,
							country: user.country
						};

						const newDelivery = delivery && {
							building: delivery.building,
							street: delivery.street,
							coAddress: delivery.coAddress,
							description: delivery.description,
							stateOrProvince: delivery.stateOrProvince,
							county: delivery.county,
							city: delivery.city,
							postalCode: delivery.postalCode,
							country: delivery.country,
							role: "DELIVERY"
						};

						const headers = !_.isEqual(newPostal, postalAddress)
							? addressValidationHeaders(forceAddressUpdate)
							: commonHeaders;

						const newPostalAddresses =
							postalAddresses && postalAddresses.length > 0
								? R.update(0, newPostal, postalAddresses)
								: [newPostal];

						newDelivery && newPostalAddresses.push(newDelivery);

						let attributes = R.assoc(
							"postalAddresses",
							newPostalAddresses,
							newPerson
						);

						const { feature } = alt.reduxStore.getState();

						// Check if privacy settings marketing keys have been defined in consul
						const marketingKey =
							_.get(
								feature.privacySettingsKeys,
								"thirdPartyMarketing"
							) || "third-party-marketing";
						const marketingKeySms =
							_.get(
								feature.privacySettingsKeys,
								"thirdPartyMarketingSms"
							) || "third-party-marketing-sms";
						const marketingKeyEmail =
							_.get(
								feature.privacySettingsKeys,
								"thirdPartyMarketingEmail"
							) || "third-party-marketing-email";
						const ownMarketingKey =
							_.get(
								feature.privacySettingsKeys,
								"ownMarketing"
							) || "own-marketing";
						const ownMarketingKeySms =
							_.get(
								feature.privacySettingsKeys,
								"ownMarketingSms"
							) || "own-marketing-sms";
						const ownMarketingKeyEmail =
							_.get(
								feature.privacySettingsKeys,
								"ownMarketingEmail"
							) || "own-marketing-email";

						const privacySettings = {};
						if (user.thirdPartyMarketing) {
							privacySettings[marketingKey] =
								user.thirdPartyMarketing;
							privacySettings[marketingKeySms] =
								user.thirdPartyMarketingSms;
							privacySettings[marketingKeyEmail] =
								user.thirdPartyMarketingEmail;
						} else {
							privacySettings[marketingKey] = false;
							privacySettings[marketingKeySms] = false;
							privacySettings[marketingKeyEmail] = false;
						}
						if (user.ownMarketing) {
							privacySettings[ownMarketingKey] =
								user.ownMarketing;
							privacySettings[ownMarketingKeySms] =
								user.ownMarketingSms;
							privacySettings[ownMarketingKeyEmail] =
								user.ownMarketingEmail;
						} else {
							privacySettings[ownMarketingKey] = false;
							privacySettings[ownMarketingKeySms] = false;
							privacySettings[ownMarketingKeyEmail] = false;
						}

						if (!_.isEmpty(privacySettings)) {
							attributes = R.assoc(
								"privacySettings",
								privacySettings,
								attributes
							);
						}

						/*TODO: this is most probably WIND customization, should be removed from core*/
						if (user.fiscalCode) {
							attributes = this.updateUserHandleWind3Identifications(newPerson, user, attributes);
						} else {
							attributes = this.updateUserHandleIdentifications(existingPerson, user, attributes);
						}

						if (user.countyOfBirth !== null
							&& user.countyOfBirth !== undefined
							&& user.stateOrProvinceOfBirth !== null
							&& user.stateOrProvinceOfBirth !== undefined
						) {
							const characteristics = {
								countyOfBirth: user.countyOfBirth,
								stateOrProvinceOfBirth:
								user.stateOrProvinceOfBirth
							};

							attributes = R.assoc(
								"characteristics",
								characteristics,
								attributes
							);
						}

						if (user.language) {
							attributes = R.assoc(
								"language",
								user.language,
								attributes
							);
						}

						if (user.gender) {
							attributes = R.assoc(
								"gender",
								user.gender,
								attributes
							);
						}

						if (user.nationality) {
							attributes = R.assoc(
								"nationality",
								user.nationality,
								attributes
							);
						}

						if (user.birthDay) {
							attributes = R.assoc(
								"birthDay",
								DateUtil.dateWithTimezoneOffset(user.birthDay),
								attributes
							);
						}

						if (user.countryOfBirth) {
							attributes = R.assoc(
								"countryOfBirth",
								user.countryOfBirth,
								attributes
							);
						}

						if (user.placeOfBirth) {
							attributes = R.assoc(
								"placeOfBirth",
								user.placeOfBirth,
								attributes
							);
						}

						if (user.maritalStatus) {
							attributes = R.assoc(
								"maritalStatus",
								user.maritalStatus,
								attributes
							);
						}

						if (user.emails) {
							attributes = R.assoc(
								"emails",
								user.emails,
								attributes
							);
						}

						if (user.email) {
							const { emails } = newPerson;
							const currentEmailPrimary = _.head(emails);

							const newPrimaryEmail = {
								...currentEmailPrimary,
								email: user.email
							};

							const updatedEmails =
								_.isArray(emails) && emails.length > 0
									? R.update(0, newPrimaryEmail, emails)
									: [newPrimaryEmail];

							attributes = R.assoc(
								"emails",
								updatedEmails,
								attributes
							);
						}

						if (user.fixedLineNumber) {
							const { fixedLineNumbers } = newPerson;
							const currentFixedLineNumberPrimary = _.head(
								fixedLineNumbers
							);

							const newPrimaryFixedLineNumber = {
								...currentFixedLineNumberPrimary,
								number: user.fixedLineNumber
							};

							const updatedFixedLineNumbers =
								fixedLineNumbers && fixedLineNumbers.length > 0
									? R.update(
									0,
									newPrimaryFixedLineNumber,
									fixedLineNumbers
									)
									: [newPrimaryFixedLineNumber];

							attributes = R.assoc(
								"fixedLineNumbers",
								updatedFixedLineNumbers,
								attributes
							);
						}

						if (user.mobileNumbers) {
							// todo: is this needed?
							attributes = R.assoc(
								"mobileNumbers",
								user.mobileNumbers,
								attributes
							);
						} else if (user.mobileNumber) {
							const { mobileNumbers } = newPerson;
							const mobileNumber = _.head(mobileNumbers);
							const newMobileNumber = {
								...mobileNumber,
								number: user.mobileNumber
							};
							const newMobileNumbers =
								mobileNumbers && mobileNumbers.length > 0
									? R.update(
									0,
									newMobileNumber,
									mobileNumbers
									)
									: [newMobileNumber];
							attributes = R.assoc(
								"mobileNumbers",
								newMobileNumbers,
								attributes
							);
						}

						const payload = {
							type: "persons",
							id: user.id,
							attributes: { ...attributes }
						};

						const resp = await alt.apiCalls.patch(
							`/persons/${user.id}`,
							payload,
							headers
						);

						this.updatingUser(false);

						if (resp instanceof ErrorContainer) {
							const invalidPostalAddressError = _.find(
								_.get(resp, "errors"),
								error => {
									return (
										error.code === "invalid-postal-address"
									);
								}
							);
							if (invalidPostalAddressError) {
								return Promise.resolve(
									this.onAddressValidationError(resp)
								);
							} else {
								console.log("FAILED TO UPDATE PERSON", resp);
								return Promise.resolve(
									this.onUserActionsError(resp)
								);
							}
						} else if (onlyUpdateCustomerCase) {
							alt.actions.CustomerCaseActions.setCustomer(
								resp.data.data
							);
							return Promise.resolve(resp.data.data);
						} else if (isNewUser) {
							return Promise.resolve(
								this.onUpdateNewUser(resp.data.data)
							);
						} else {
							const data = _.get(resp, "data.data");
							dispatch(data);
							alt.actions.DigitalLifeActions.getPersonForUser(
								user
							);
							if (updateCustomerCase) {
								alt.actions.CustomerCaseActions.setCustomer(
									data
								);
							}
							return Promise.resolve(data);
						}
					}
				});
			}
		}
		return false;
	}

	updateUserHandleIdentifications(existingPerson, user, attributes) {

		let identifications;

		const existingIdentificationEntityId = _.get(_.find(
			_.get(
				existingPerson,
				"data.attributes.identifications", []),
			identification =>
				identification.type !==
				"personal-identity-code", "id"));

		if (
			user.identificationType &&
			user.identificationId &&
			user.identificationIssuingDate
		) {
			identifications = [
				{
					identificationId: user.identificationId,
					type: user.identificationType,
					issuingAuthority: {
						name:
						user.identificationIssuingAuthority,
						country: user.identificationIssuingAuthorityCountry
					},
					validityPeriod: {
						startDate:
						user.identificationIssuingDate,
						endDate: user.identificationExpiryDate
					}
				}
			];
			if (existingIdentificationEntityId) {
				identifications = [
					R.assoc(
						"id",
						existingIdentificationEntityId,
						identifications[0]
					)
				];
			}
		}

		if (identifications && identifications.length > 0) {
			attributes = R.assoc(
				"identifications",
				identifications,
				attributes
			);
		}
		return attributes;
	}

	// FIXTHIS: This should be re-factored
	updateUserHandleWind3Identifications(newPerson, user, attributes) {

		// fiscal code

		const { identifications } = newPerson;
		const currentIdentificationIdx = _.findIndex(
			identifications,
			identification =>
				identification.type ===
				"personal-identity-code"
		);

		const currentIdentification =
			currentIdentificationIdx > -1
				? identifications[currentIdentificationIdx]
				: {
					type: "personal-identity-code",
					validityPeriod: {
						startDate: new Date(),
						endDate: null
					}
				};

		const newIdentification = {
			...currentIdentification,
			identificationId: user.fiscalCode
		};

		attributes.identifications = [];
		attributes.identifications.push(newIdentification);

		// identity document
		if (
			user.identificationType &&
			user.identificationId &&
			user.identificationIssuingDate
		) {
			const identityDocumentIdentification =
				{
					identificationId: user.identificationId,
					type: user.identificationType,
					issuingAuthority: {
						name:
						user.identificationIssuingAuthority
					},
					validityPeriod: {
						startDate:
						user.identificationIssuingDate,
						endDate: user.identificationExpiryDate
					}
				}
			attributes.identifications.push(identityDocumentIdentification);
			this.setDeliveryIdentificationId(user.identificationId);
		}

		return attributes;
	}

	useHomeAddressAsDeliveryAddress() {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const user = _.get(alt.stores, "UserStore.state.user") || _.get(alt.stores, "UserStore.state.newUser");
				const existingUser = await alt.apiCalls.get(`/persons/${user.id}`);

				if (existingUser instanceof ErrorContainer) {
					return Promise.resolve(
						this.onUserActionsError(existingUser)
					);
				} else {

					const currentDeliveryAddress = _.get(existingUser.data, "attributes.postalAddresses", []).find(address => {
						return address.role === "DELIVERY"
					});
					const currentPrimaryAddress = _.get(existingUser.data, "attributes.postalAddresses", []).find(address => {
						return address.role === "PRIMARY"
					});

					const deliveryAddress = {
						...currentPrimaryAddress,
						id: currentDeliveryAddress ? currentDeliveryAddress.id : undefined,
						role: "DELIVERY"
					};
					this.updatingUser(false);
					return this.updateUserAddresses(existingUser.data, [deliveryAddress], false, false);
				}
			});
	}

	refreshUser(user: Object, updateCustomerCase: boolean) {
		this.updatingUser(true);
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const existingUserResp = await alt.apiCalls.get(`/persons/${user.id}`);
				if (existingUserResp instanceof ErrorContainer) {
					return Promise.resolve(
						this.onUserActionsError(existingUserResp)
					);
				} else {
					dispatch(existingUserResp.data);
					if (updateCustomerCase) {
						alt.actions.CustomerCaseActions.setCustomer(
							existingUserResp.data
						);
					}
					this.updatingUser(false);
					return Promise.resolve(existingUserResp.data);
				}
			});
	}

	findErrorByCode(errors: Array<ErrorContainer>, code) {
		return _.find(errors, error => error.code === code);
	}

	createUser(model: PersonDetailsFormModelType, delivery: any): UserType {
		return (dispatch: Function, alt: Object) => {
			return alt.resolve(async () => {
				//dispatch();
				this.updatingUser(true);

				const {
					firstName,
					lastName,
					city,
					street,
					building,
					coAddress,
					description,
					stateOrProvince,
					county,
					country,
					gender,
					language,
					placeOfBirth,
					postalCode,
					privacy1,
					privacy2,
					email,
					mobileNumber,
					fixedLineNumber,
					fiscalCode,
					stateOrProvinceOfBirth,
					countyOfBirth,
					identificationType,
					identificationId,
					identificationIssuingDate,
					identificationExpiryDate,
					identificationIssuingAuthority,
					identificationIssuingAuthorityCountry
				} = model;

				const postalAddress = street &&
					city &&
					postalCode &&
					country && {
						street,
						building,
						coAddress,
						description,
						stateOrProvince,
						county,
						city,
						postalCode,
						country
					};

				const deliveryAddress = delivery && {
					street: delivery.street,
					building: delivery.building,
					coAddress: delivery.coAddress,
					description: delivery.description,
					stateOrProvince: delivery.stateOrProvince,
					county: delivery.county,
					city: delivery.city,
					postalCode: delivery.postalCode,
					country: delivery.country,
					role: "DELIVERY"
				};

				const identifications = [];
				if (fiscalCode) {
					identifications.push(
						{
							identificationId: fiscalCode,
							type: "personal-identity-code",
							validityPeriod: {
								startDate: new Date(),
								endDate: null
							}
						}
					);
				}

				if (
					identificationType &&
					identificationId &&
					identificationIssuingDate
				) {
					identifications.push(
						{
							identificationId,
							type: identificationType,
							issuingAuthority: {
								name: identificationIssuingAuthority,
								country: identificationIssuingAuthorityCountry
							},
							validityPeriod: {
								startDate: identificationIssuingDate,
								endDate: identificationExpiryDate
							}
						}
					);
					this.setDeliveryIdentificationId(identificationId);
				}

				let characteristics;
				if (stateOrProvinceOfBirth || countyOfBirth) {
					characteristics = {
						stateOrProvinceOfBirth,
						countyOfBirth
					}
				}

				const postalAddresses = [postalAddress];
				deliveryAddress && postalAddresses.push(deliveryAddress);

				const birthDay = DateUtil.dateWithTimezoneOffset(model.birthDay);
				const payload = {
					attributes: {
						firstName,
						lastName,
						gender,
						countryOfBirth: country,
						birthDay,
						emails: email && [{ email }],
						mobileNumbers: mobileNumber && [
							{ number: mobileNumber }
						],
						fixedLineNumbers: fixedLineNumber && [
							{ number: fixedLineNumber }
						],
						language,
						postalAddresses,
						placeOfBirth,
						privacySettings: {
							privacy1: Boolean(privacy1),
							privacy2: Boolean(privacy2)
						},
						identifications,
						characteristics
					},
					type: "persons"
				};

				//	this.getIdentification(identificationId, identificationType);

				const resp = await alt.apiCalls.post(
					`/persons`,
					payload,
					commonHeaders
				);

				this.updatingUser(false);

				if (resp instanceof ErrorContainer) {
					const errors = _.get(resp, "errors", []);
					const invalidPostalAddressError = this.findErrorByCode(
						errors,
						"invalid-postal-address"
					);
					const rejectedCustomerScreeningError = this.findErrorByCode(
						errors,
						"national-identification-number-verification-failed"
					);

					if (invalidPostalAddressError) {
						return Promise.resolve(
							this.onAddressValidationError(resp)
						);
					} else if (rejectedCustomerScreeningError) {
						return Promise.resolve(
							this.onRejectedCustomerScreeningError(resp)
						);
					} else {
						console.log("FAILED TO UPDATE PERSON", resp);
						return Promise.resolve(
							this.onUserActionsError(resp)
						);
					}
				} else {
					dispatch(resp.data.data);
					return Promise.resolve(resp.data.data);
				}
			});
		}
	}

	setDeliveryIdentificationId(
		identificationId: string
	) {
		return identificationId;
	}

	onUpdateNewUser({
						attributes,
						...rest
					}: {
		attributes: Object,
		rest: Array<*>
	}) {
		return (dispatch: Function) => {
			dispatch({
				...rest,
				...attributes
			});
		};
	}

	onAddressValidationError(resp: Object) {
		return resp;
	}

	onRejectedCustomerScreeningError(resp: Object) {
		return resp;
	}

	@deprecated("use actions.user.getChargingBalances")
	getChargingBalances(billingAccountId: string) {
		return (dispatch: Function, alt: Object) => {
			alt.reduxStore.dispatch(actions.user.getChargingBalances(billingAccountId));
		}
	}

	changePassword() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.getRest(
					`/user/request-password-change`
				);
				if (resp instanceof ErrorContainer) {
					return Promise.resolve(this.onUserActionsError(resp));
				}
				return Promise.resolve(dispatch(resp));
			});
	}

	closeChangePasswordModal = () => {
		return false;
	};

	generateOneTimePassword = (user: object, resend: boolean) => {
		let val = Math.floor(100000 + Math.random() * 900000).toString();

		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {

				if (resend && alt.stores.UserStore.state.oneTimePassword) {
					val = alt.stores.UserStore.state.oneTimePassword;
				}

				const resp = await alt.apiCalls.post(
					"/one-time-password-message",
					{
						type: "one-time-password-message",
						"attributes": {
							personId: user.id,
							onetimePassword: val
						}
					},
					commonHeaders
				);
				if (resp) {
					if (resp instanceof ErrorContainer) {
						return Promise.resolve(dispatch(null));
					} else {
						return Promise.resolve(dispatch({ value: val, resend }));
					}
				}
				return Promise.resolve();
			});
	}

	clearPaymentForm = () => true;
}

export default UserActions;
