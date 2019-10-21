"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, HasFlux, actions } from "omnichannel-common-pos";
import CategoryList, { CategoryListActionProps, CategoryListProps, CategoryListStateProps } from "./CategoryList";
import { RouteComponentProps, withRouter } from "react-router";

interface CategoryListContainerOwnProps extends HasFlux, RouteComponentProps<{category: string}> {}

const mapStateToProps = (state: AppState): CategoryListStateProps => ({
	mainCategories: state.category.mainCategories,
	fetchingProducts: state.sales.fetchingProducts,
	locale: state.consul.locale,
	addressValidation: state.location.addressValidation,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: CategoryListContainerOwnProps): CategoryListActionProps => ({
	actions: {
		updateMainCategories: () => dispatch(actions.category.updateMainCategories()),
		selectCategoryById: (id: string) => {
			dispatch(actions.category.selectCategoryById(id));
		},
		endShoppingForSubscription: ownProps.flux.actions.SalesActions.endShoppingForSubscription,
	}
});

const mergeProps = (stateProps: CategoryListStateProps, dispatchProps: CategoryListActionProps, ownProps: CategoryListContainerOwnProps):
	CategoryListProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, mergeProps)(CategoryList));
export {
	CategoryListContainerOwnProps,
};
