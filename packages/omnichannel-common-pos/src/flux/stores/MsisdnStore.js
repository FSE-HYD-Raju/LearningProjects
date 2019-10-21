// Flow

import BaseStore from "./BaseStore";
import ImmStore from "../seamless-alt";
import get from "lodash/get";
import { deprecated } from "../../redux";

@ImmStore
class MsisdnStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.MsisdnActions);
		this.state = {
			inventories: [],
			stocks: [],
			selectionStocks: [],
			reservationAttributes: {},
			activeReservationId: null,
			reservationError: false,
			selectedInventory: null,
			selectedCategory: null,
			inputtedPattern: null,
			eligibleMsisdn: true,
			customChangePO: null
		};
	}
	@deprecated("msisdn.reducers:getResourceInventories")
	getResourceInventories({ inventories, stocks }) {
		if (inventories && stocks) {
			this.setState({
				inventories,
				stocks
			});
		}
	}
	@deprecated("msisdn.reducers:changeInventory")
	changeInventory({ selectedInventory, stocks }) {
		this.setState({
			selectionStocks: this.getResourceSkusForSelection(
				selectedInventory,
				stocks
			),
			selectedInventory
		});
	}
	@deprecated("msisdn.reducers:changeInventory")
	getResourceSkusForSelection(selectedInventory: Object, stocks: Array) {
		const selectedInventories: Array =
			selectedInventory.relationships.stocks.data;

		const filteredStocks = stocks.filter(stock => {
			return selectedInventories.some(inventory => {
				return inventory.id === stock.id;
			});
		});

		return filteredStocks;
	}

	reserveMsisdn({ data, reservedFor, stock, pattern }) {
		this.setState({
			reservationAttributes: get(data, "attributes"),
			activeReservationId: reservedFor,
			reservationError: false,
			selectedCategory: stock,
			inputtedPattern: pattern
		});
	}

	releaseMsisdn({ releaseId }) {
		if (releaseId === this.state.activeReservationId) {
			this.setState({
				reservationAttributes: {},
				activeReservationId: null,
				selectedCategory: null,
				inputtedPattern: null
			});
		}
	}

	onReserveMsisdnError({ errorMessage, selectedCategory }) {
		this.setState({
			reservationError: true,
			selectedCategory
		});
	}

	checkEligibility(eligibleMsisdn) {
		this.setState({
			eligibleMsisdn
		});
	}

	fetchCustomChangePO(customChangePO) {
		this.setState({
			customChangePO
		});
	}
}

export default MsisdnStore;
