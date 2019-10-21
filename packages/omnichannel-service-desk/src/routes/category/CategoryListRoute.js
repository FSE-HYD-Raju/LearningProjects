// @flow
import React from "react";
import { Route } from "react-router-dom";
import pick from "lodash/pick";
import { AltContainer } from "omnichannel-common-pos";
import ServiceDeskProductTable from "../../components/ProductTable/ServiceDeskProductTable";

type Props = {
	flux: Object,
	addressValidation: Object,
};

// TODO: migrate to TS
const CategoryListRoute = (props: Props) => {
	const flux = props.flux;
	const addressValidation = props.addressValidation;
	return (
		<Route
			path="/servicedesk/shop/:category/:sku?"
			render={props => (
				<AltContainer
					stores={{
						CustomerCaseStore: flux.stores.CustomerCaseStore,
						SalesStore: flux.stores.SalesStore,
						SalesRepSessionStore: flux.stores.SalesRepSessionStore,
						ConsulStore: flux.stores.ConsulStore,
					}}
					actions={{
						BasketActions: flux.actions.BasketActions,
						SalesActions: flux.actions.SalesActions,
					}}
					transform={({
						BasketActions,
						CustomerCaseStore,
						SalesActions,
						SalesStore,
						SalesRepSessionStore,
						ConsulStore,
					}) => {
						return {
							BasketActions,
							selectedCategoryId: flux.reduxStore.getState().category.selectedCategoryId,
							mainCategories: flux.reduxStore.getState().category.mainCategories,
							selectedCurrency: flux.reduxStore.getState().currency.selectedCurrency,
							addressValidation,
							...pick(
								CustomerCaseStore,
								"activeCustomerCase",
								"agreements",
								"activeAgreementId"
							),
							...pick(
								SalesActions,
								"getProductsFromCategory",
								"getSubCategories",
								"handleSearch",
								"resetSearch",
								"switchPriceType",
								"resetFilters",
								"saveTargetAgreementId",
								"endShoppingForSubscription"
							),
							SalesStore,
							...pick(SalesStore, "targetAgreementId"),
							...pick(SalesRepSessionStore, "activeInventory"),
							...pick(
								ConsulStore,
								"locale",
								"categoriesBlacklist"
							),
						};
					}}
				>
					<ServiceDeskProductTable {...props} />
				</AltContainer>
			)}
		/>
	);
};

export default CategoryListRoute;
