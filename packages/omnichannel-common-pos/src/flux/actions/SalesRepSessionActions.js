// @flow
import BaseActions from "./BaseActions";

import { ErrorContainer } from "../../redux";
import _ from "lodash";

export default class SalesRepSessionActions extends BaseActions {
	showModal(show: boolean) {
		return show;
	}

	setSelectedOrganization(organization: Object, inventory: any) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const response = await alt.apiCalls.postREST(
						`/json/sales-organization-roles/${organization.id}/setActive`,
					null,
					{}
				);
				if (response instanceof ErrorContainer) {
					return this.onError(response);
				} else {
					return Promise.resolve(
						dispatch({ organization, inventory })
					);
				}
			});
	}

	updateInfo(nameValue: string) {
		return nameValue;
	}

	getActiveSalesOrganizationData() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const organizationResponse = await alt.apiCalls.get(
					`/sales-organization-roles?filter[status]=Active`,
					false
				);

				if (organizationResponse instanceof ErrorContainer) {
					return this.onError(organizationResponse);
				} else {
					const activeSalesOrganization = _.get(
						organizationResponse,
						"data[0]"
					);
					return Promise.resolve(dispatch(activeSalesOrganization));
				}
			});
	}

	getOrganizations() {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/sales-organization-roles`,
					false
				);
				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				} else {
					const salesOrganizations = _.get(resp, "data");
					return Promise.resolve(dispatch(salesOrganizations));
				}
			});
	}

	getInventories(organizationId: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/sales-organization-roles/${organizationId}/inventories`,
					false
				);
				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				} else {
					const inventories = _.get(resp, "data");
					return Promise.resolve(dispatch(inventories));
				}
			});
	}

	getOrgsAndItsInventories(po: string) {
		return (dispatch: Function, alt: Object) =>
			alt.resolve(async () => {
				const resp = await alt.apiCalls.get(
					`/sales-organization-roles`,
					false
				);
				if (resp instanceof ErrorContainer) {
					return this.onError(resp);
				} else {
					const salesOrganizations = _.get(resp, "data");
					const orgIdToInventories = {}
					await Promise.all(salesOrganizations
						.filter(org => org.attributes.statuses && Array.isArray(org.attributes.statuses) && org.attributes.statuses.includes('Active'))
						.map(async salesOrg => {
						const organizationId = salesOrg.attributes.externalId || salesOrg.attributes.code;
						const inventoriesResp = await alt.apiCalls.get(
							`/sales-organization-roles/${organizationId}/inventories`,
							false
						);
						if (inventoriesResp instanceof ErrorContainer) {
							return this.onError(inventoriesResp);
						} else {
							const inventories = _.get(inventoriesResp, "data");
							const inventoriesWithCount = await Promise.all(inventories
								.filter(inv => inv.attributes.statuses && Array.isArray(inv.attributes.statuses) && inv.attributes.statuses.includes('Active'))
								.map(async inventory => {
									const stockLevelResp = await alt.apiCalls.get(
										`/stock-levels?filter[inventory]=${inventory.attributes['place-id']}&filter[po]=${po}`,
										false
									);
									if (stockLevelResp instanceof ErrorContainer) {
										return this.onError(stockLevelResp);
									} else {
										const stockLevels = _.get(stockLevelResp, "data");
										const { count } = stockLevels.attributes;
										return {
											placeName: inventory.attributes['place-name'],
											count
										};
									}
							}));
							orgIdToInventories[orgIdToInventories] = inventoriesWithCount;
							return null;
						}
					}));
					return Promise.resolve(dispatch({
						salesOrganizations,
						orgIdToInventories
					}));
				}
			});
	}

	clearSalesRepSession = () => null;

	inlineError(error: any) {
		return error;
	}

	clearSalesOrganizationAndInventory = () => null;
	revertSalesOrganizationAndInventory = () => null;
}
