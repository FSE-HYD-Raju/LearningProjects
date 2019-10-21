import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import NavBarSessionButton, { NavBarSessionButtonProps } from "./NavBarSessionButton";
import { User } from "../../../redux";

describe("NavBarSessionButton", () => {

	const userStore = {
		user: { firstName: "Keke", lastName: "Roseberg" }
	};

	const salesRepSessionStore = {
		active: false,
		showModal: false,
		sessionId: "",
		terminals: [],
		userRoleId: "",
		salesOrganizationRoleId: "",
		error: null,
		selectedTerminal: "",
		showSalesOrganizationModal: true,
		consulValuesLoaded: true
	};

	const basketStore = {
		activeBasket: undefined
	};

	const minimumProps: NavBarSessionButtonProps = {
		user: userStore.user as User,
		salesOrganizationRoleId: salesRepSessionStore.salesOrganizationRoleId,
		active: salesRepSessionStore.active,
		consulValuesLoaded: salesRepSessionStore.consulValuesLoaded,
		showSalesOrganizationModal: salesRepSessionStore.showSalesOrganizationModal,
		selectedTerminal: salesRepSessionStore.selectedTerminal,
		showModal: salesRepSessionStore.showModal,
		terminals: salesRepSessionStore.terminals,
		userRoleId: "",
		activeBasket: basketStore.activeBasket,
		actions: {
			clearSalesRepSession: () => {},
			showModal: () => {},
			updateInfo: () => {},
			clearSalesOrganizationAndInventory: () => {},
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<NavBarSessionButton {...minimumProps} />);
		expect(wrapper).toMatchSnapshot();
	});
});
