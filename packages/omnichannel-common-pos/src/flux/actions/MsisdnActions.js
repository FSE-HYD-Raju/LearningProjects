import { ErrorContainer, deprecated } from "../../redux";
import actions from "../../redux/actions";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import BaseActions from "./BaseActions";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };

class MsisdnActions extends BaseActions {

	@deprecated("msisdn.actions:getResourceInventories")
	getResourceInventories() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					"/resource-inventories?include=stocks",
					false,
					commonHeaders
				);
				if (resp instanceof ErrorContainer) {
					this.onError(resp);
				} else {
					const inventories = get(resp, "data");
					const stocks = get(resp, "included");
					dispatch({ inventories, stocks });
				}
			});
	}

	@deprecated("msisdn.actions:changeInventory")
	changeInventory = (selectedInventory, stocks) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(() => {
				if (!isEmpty(selectedInventory) && !isEmpty(stocks)) {
					dispatch({ selectedInventory, stocks });
				}
			});
	};

	reserveMsisdn({
		              pattern,
		              releaseId,
		              reservedFor,
		              stock,
		              limit,
		              endTime,
		              numberType,
		              product
	              }) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				let consulEndTime;
				const { feature } = alt.reduxStore.getState();
				// reservation time configurable via consul
				if (feature.msisdnReservationMinutes) {
					consulEndTime = new Date();
					consulEndTime.setMinutes(
						consulEndTime.getMinutes() +
						feature.msisdnReservationMinutes
					);
				}

				const resp = await alt.apiCalls.post(
					"/msisdn-reservations",
					{
						type: "msisdn-reservations",
						attributes: {
							pattern,
							reservedFor,
							stock,
							limit,
							numberType,
							endTime: endTime ? endTime : consulEndTime
						}
					},
					commonHeaders
				);
				if (resp instanceof ErrorContainer) {
					this.onReserveMsisdnError(resp, stock);
				} else {
					const data = get(resp, "data.data");
					dispatch({ data, reservedFor, stock, pattern });
					// populate CH_ReservedFor field with reservation uuid.
					const productId = get(product, "attributes.id");
					if (productId) {
						const path = [{ po: productId }];
						alt.reduxStore.dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, "CH_ReservedFor", reservedFor));
					}
					// if new numbers found release old ones
					if (releaseId) {
						this.releaseMsisdn({ releaseId });
					}
				}
			});
	}

	releaseMsisdn({ releaseId, resetModal }) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.delete(
					`/msisdn-reservations/${releaseId}`,
					{
						type: "msisdn-reservations"
					},
					commonHeaders
				);
				if (resp instanceof ErrorContainer) {
					// release error
					this.onError(resp);
				} else {
					dispatch({ releaseId });
				}
			});
	}

	checkEligibility({ msisdn }) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const payload = {
					type: "eligibility-decisions",
					attributes: {
						parameters: {
							msisdn
						},
						recipeId: "msisdn-change"
					},
					meta: {}
				};
				const resp = await alt.apiCalls.post(
					"/eligibility-decisions",
					payload,
					commonHeaders
				);
				dispatch(!(resp instanceof ErrorContainer));
			});
	}

	fetchCustomChangePO(id) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const url = `/productOfferings/${id}`;
				const results = id && await alt.apiCalls.get(url, false);
				const product = results && results.data;

				dispatch(product);
			});
	}

	// RUBT-143808 - fix
	// setting new category (stock) to store EVEN if there was an error when reserving MSISDN
	onReserveMsisdnError = (error, selectedCategory) => {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(() => {
				dispatch({ error, selectedCategory });
			});
	};
}

export default MsisdnActions;
