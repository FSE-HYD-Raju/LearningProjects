import BaseStore from "./BaseStore";
import ImmStore from "../seamless-alt";
import _ from "lodash";
import { deprecated } from "../../redux/decorators";

@ImmStore
export default class SalesRepSessionStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.SalesRepSessionActions);
		this.bindActions(this.alt.actions.ConsulActions);
		this.bindAction(this.alt.actions.UserActions.aaLoginCallback, () => {
			this.waitFor(this.alt.stores.UserStore);
			const app = process && process.env && process.env.omnichannel;

			if (app === "pos") {
				this.clearSalesOrganizationAndInventory();

				//Just to make sure that showSalesOrganizationModal state is already set
				let counter = 0;
				const i = setInterval(() => {
					if (this.state.consulValuesLoaded) {
						if (this.state.showSalesOrganizationModal) {
							this.alt.actions.SalesRepSessionActions.getActiveSalesOrganizationData();
						}
						clearInterval(i);
					}
					counter++;
					if (counter === 30) {
						// Sales organizations are not fetched by default, so no more waiting..
						clearInterval(i);
					}
				}, 200);
			}
		});

		this.state = {
			showModal: false,
			active: false,
			sessionId: "",
			terminals: [],
			userRoleId: "",
			salesOrganizationRoleId: "",
			selectedTerminal: "",
			error: null,
			activeInventory: null,
			activeSalesOrganization: null,
			previousInventory: null,
			previousSalesOrganization: null,
			showSalesOrganizationModal: true,
			consulValuesLoaded: false,
			defaultStockLevel: 0
		};
		this.exportPublicMethods({
			setSelectedOrganization: this.setSelectedOrganization
		});
	}

	updateInfo(nameValue) {
		this.setState({
			[nameValue.name]: nameValue.value
		});
	}

	showModal(showModal) {
		this.setState({
			showModal
		});
	}

	setSelectedOrganization(data) {
		this.setState({
			activeSalesOrganization: data.organization,
			activeInventory: data.inventory
		});
	}

	inlineError(error) {
		this.setState({
			error
		});
	}

	clearSalesRepSession() {
		this.setState({
			active: false,
			showModal: false,
			sessionId: "",
			terminals: [],
			userRoleId: "",
			salesOrganizationRoleId: "",
			error: null,
			selectedTerminal: ""
		});
	}

	clearSalesOrganizationAndInventory() {
		this.setState({
			previousSalesOrganization: this.state.activeSalesOrganization,
			previousInventory: this.state.activeInventory,
			activeSalesOrganization: null,
			activeInventory: null
		});
	}

	revertSalesOrganizationAndInventory() {
		this.setState({
			previousSalesOrganization: null,
			previousInventory: null,
			activeSalesOrganization: this.state.previousSalesOrganization,
			activeInventory: this.state.previousInventory
		});
	}

	getActiveSalesOrganizationData(salesOrganization) {
		this.setState({
			activeSalesOrganization: salesOrganization
		});
	}

	getInventories(inventories) {
		this.setState({
			inventories
		});
	}

	getOrganizations(organizations) {
		this.setState({
			salesOrganizations: organizations
		});
	}

	getOrgsAndItsInventories(payload) {
		const { salesOrganizations, orgIdToInventories } = payload;
		this.setState({
			salesOrganizations,
			orgIdToInventories
		});
	}

	@deprecated("Covered by consul.saga and consul.getValues()")
	getValues(payload: Object) {
		const showSalesOrganizationModal =
			payload["show_sales_organization_modal"];

		const defaultStockLevel =
			parseInt(_.get(payload, "default_stock_level", "0"), 10) || 0;

		this.setState({
			showSalesOrganizationModal: showSalesOrganizationModal === "true",
			consulValuesLoaded: true,
			defaultStockLevel
		});
	}
}
