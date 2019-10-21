// @flow
import isClient from "../../utils/isClient";
import { SessionKeys, SessionUtils } from "../../utils/SessionUtils";
import extractQueryParamsFromUrl from "../../components/auth/extractQueryParamsFromUrl";

import BaseStore from "./BaseStore";
import ImmutableStore from "../seamless-alt";
import type { UserStoreState } from "omnichannel-flow-pos";
import Cookies from "universal-cookie";
import { deprecated, Selectors } from "../../redux";
import { isChannelCmsAdmin } from "../../utils/Channel.utils";

@ImmutableStore
class UserStore extends BaseStore {
	state: UserStoreState;

	constructor() {
		super();
		this.bindActions(this.alt.actions.UserActions);

		this.state = {
			hasInitialized: false,
			user: null,
			error: null,
			hasResults: false,
			salesRepUser: null,
			registration: null,
			registrationError: null,
			updatingUser: false,
			salesRepSession: {
				showModal: false,
				active: false,
				sessionId: "",
				terminals: [],
				userRoleId: "",
				salesOrganizationRoleId: ""
			},
			impersonatedIndividualId: null,
			sessionState: null,
			createdUser: null,
			anonymousUser: false,
			chargingBalances: [],
			showPasswordChangeConfirmation: false,
			toolmodeIndividualId: null,
			identificationExists: false,
			oneTimePassword: "",
			identification: null,
			deliveryIdentificationId: "",
			resendSuccessful: false
		};
		this.exportPublicMethods({
			isLoggedIn: this.isLoggedIn,
			userOrAnonymousSet: this.userOrAnonymousSet
		});
	}

	initialize() {
		this.setState({
			hasInitialized: true
		});
	}

	setDeliveryIdentificationId(
		deliveryIdentificationId: string
	) {
		this.setState({
			deliveryIdentificationId
		});
	}

	aaLogin(payload?: Object) {
		if (!payload) {
			return;
		}

		SessionUtils.setItem(SessionKeys.anonymousUser, payload.anonymousUser);

		this.setState({
			anonymousUser: payload.anonymousUser
		});

		window.location.assign(payload.location);
	}

	aaLoginCallback(payload: Object) {
		const { queryString, user } = payload;
		const queryParams = extractQueryParamsFromUrl(queryString);
		const sessionState = queryParams.session_state;

		SessionUtils.removeItem(SessionKeys.anonymousUser);
		!user.anonymous && this.saveUser(user);
		this.setState({
			user: !user.anonymous ? user : undefined,
			error: null,
			hasResults: true,
			hasInitialized: true,
			impersonatedIndividualId: null,
			sessionState,
			anonymousUser: user.anonymous ? true : undefined
		});

		if (isChannelCmsAdmin()) {
			new Cookies().set("session_state", sessionState, { path: "/" });
		}
	}

	doLogin({
		user,
		salesRepUser,
		location
	}: {
			user: any,
			salesRepUser: any,
			location: string
		}) {
		SessionUtils.removeItem(SessionKeys.anonymousUser);

		if (this.state.user && this.state.user.id === user.id) {
			user = this.state.user;
		}

		this.saveUser(user);
		this.saveSalesRepUser(salesRepUser);
		this.setState({
			user,
			error: null,
			hasResults: true,
			hasInitialized: true
		});

		if (user && salesRepUser && user.id !== salesRepUser.id) {
			this.setState({
				impersonatedIndividualId: user.id
			});
		} else {
			this.setState({
				impersonatedIndividualId: null
			});
		}

		if (location) {
			this.setLocation(location);
		}
	}

	loginError(err: Object) {
		this.setState({
			user: null,
			error: err,
			hasInitialized: true,
			hasResults: true
		});
	}

	@deprecated("Use Selectors.user.isLoggedIn()(state)")
	isLoggedIn() {
		return Selectors.user.isLoggedIn()({ user: this.state });
	}

	@deprecated("Use Selectors.user.userOrAnonymousSet()(state)")
	userOrAnonymousSet() {
		return Selectors.user.userOrAnonymousSet()({ user: this.state });
	}

	logout({ redirectUrl }: { redirectUrl: string }) {
		if (isClient && process.env.BROWSER) {
			if (isChannelCmsAdmin()) {
				new Cookies().remove("session_state", { path: "/" });
			}
			sessionStorage.clear();
			isClient && window.location.replace(redirectUrl);
		}
	}

	addPersonDataToUser(attrs: Object) {
		console.log("ADD PERSON DATA TO USER", attrs);

		const updatedUser = {
			...this.state.user,
			attributes: attrs
		};

		this.setState({
			user: updatedUser
		});

		this.saveUser(updatedUser);
	}

	saveUser(user: Object) {
		SessionUtils.setItem(SessionKeys.user, JSON.stringify(user));
	}

	changeLocale(locale: string) {
		const user = {
			...this.state.user,
			locale
		};

		this.setState({
			user
		});
		this.saveUser(user);
	}

	stopActingAsUser() {
		// TODO needs better implemenations
		this.alt.actions.CustomerActions.resetNewCustomer();
	}

	getIdentificationByBusinessIdentityCode(identifications: Array<any>) {
		this.setState({
			identificationExists: identifications.length > 0
		});
	}

	setAnonymousUser(payload: Object) {
		console.log("SET ANON PLAYLOAD", payload);
		this.setState({
			anonymousUser: payload.anonymousUser
		});
		if (payload.redirectUri) {
			// this.setLocation(payload.redirectUri, true);
		}
	}

	saveSalesRepUser(salesRepUser: Object) {
		if (!salesRepUser) {
			SessionUtils.removeItem(SessionKeys.salesRepUser);
		} else {
			SessionUtils.setItem(
				SessionKeys.salesRepUser,
				JSON.stringify(salesRepUser)
			);
		}
		this.setState({
			salesRepUser
		});
	}

	setLocation(location: string, replaceRoute?: boolean) {
		console.log(
			"SET LOCATION",
			location,
			"replace",
			replaceRoute,
			" current: ",
			window.location
		);
		if (location) {
			if (replaceRoute) {
				this.alt.history.replace(location);
			} else {
				this.alt.history.push(location);
			}
			const matches = location.match(/toolmode=true&individualId=(.*)$/i);
			const isToolmode = matches && matches.shift();
			const individualId = matches && matches.shift();

			if (isToolmode && individualId) {
				console.log("SET TOOLMODE", individualId);
				this.setState({
					toolmodeIndividualId: individualId
				});
			}
		}
	}

	// Saves individualId in toolmode to fix RUBT-86633
	setToolmodeId(individualId: string) {
		this.setState({
			toolmodeIndividualId: individualId
		});
	}

	setNewUser(user: Object) {
		this.setState({
			newUser: user
		});
	}

	registrationStatus(error: Object) {
		this.setState({
			registrationError: error
		});
	}

	updatingUser(isUpdating: boolean) {
		this.setState({ updatingUser: isUpdating });
	}

	updateUser(updatedUser: Object) {
		if (!updatedUser) {
			this.setState({
				updatingUser: true
			});
		} else {
			this.setState({
				user: {
					...this.state.user,
					...updatedUser
				},
				updatingUser: false
			});
		}
	}

	createUser(newUser: Object) {
		if (!newUser) {
			this.setState({
				updatingUser: true
			});
		} else {
			this.setState({
				newUser,
				updatingUser: false
			});
		}
	}

	onUpdateUserAddresses(updatedUser: Object) {
		if (this.state.user) {
			this.setState({ user: updatedUser });
		} else if (this.state.newUser) {
			this.setState({ newUser: updatedUser });
		}
	};

	onUpdateNewUser(updatedUser: Object) {
		this.setState({
			newUser: updatedUser
		});
	}

	@deprecated("use actions.user.getChargingBalances")
	getChargingBalances(chargingBalances: Array<any>) {
		// TODO Add correct type. FIX ME
		this.setState({
			chargingBalances
		});
	}

	changePassword(serverResponse: Object) {
		this.setState({ showPasswordChangeConfirmation: true });
	}

	closeChangePasswordModal() {
		this.setState({ showPasswordChangeConfirmation: false });
	}

	generateOneTimePassword(data) {
		this.setState({ oneTimePassword: data.value, resendSuccessful: data.resend });
	}
}

export default UserStore;
