/* global describe, it, expect */

import alt from "../flux";
import R from "ramda";
import _ from "lodash";

describe("UserStore", () => {
	const flux = alt();

	it("'s isLoggedIn() returns false when user is not logged in, and true when is logged in; empty user object should not be considered as logged-in", () => {
		const data = {
			payload: {
				user: {
					created: null,
					customerAccountId: null,
					email: "anders.a@qvantel.com",
					firstName: "Anders",
					id: "anders.a",
					individualId: "anders.a",
					lastName: "A",
					locale: null,
					modified: null,
					password: "salakala",
					profiles: null,
					roles: [
						{ name: "telesales_user" },
						{ name: "pos_user" },
						{ name: "user" }
					],
					sessionId: null,
					timeStamp: null
				}
			}
		};

		const initialUser = R.clone(flux.stores.UserStore.state.user);
		expect(!_.isEmpty(initialUser)).toEqual(
			false,
			"UserStore.state.user should be empty initially"
		);
		expect(flux.stores.UserStore.isLoggedIn()).toEqual(
			false,
			"isLoggedIn() returned true before even logging in"
		);

		flux.stores.UserStore.state = { user: {} };

		expect(!flux.stores.UserStore.isLoggedIn()).toEqual(
			true,
			"isLoggedIn() should return false after setting empty user object to UserStore.state"
		);

		flux.stores.UserStore.state.user = data.payload.user;
		expect(!flux.stores.UserStore.isLoggedIn()).toEqual(
			false,
			"isLoggedIn() should return true after setting a non-empty user object to UserStore.state"
		);

		/* set it back to the initial */
		// flux.stores.UserStore.state.user = initialUser;
	});
});
