import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import {
	default as FilterControls, FilterControlsProps,
} from "./FilterControls";
import { AppState } from "../../../redux/reducers";
import {
	HasFlux,
	ProductFilterRangeType,
	ProductOffering,
	UpdatePriceRangeFunc,
	ProductFilter
} from "../../../redux/types";
import { ProductPriceEnum } from "../ProductPriceType";
import { GetBoundariesForPriceRangeFunc } from "../../../redux";

interface FilterControlsStateProps {
	products: Array<ProductOffering>;
	activeFilters: Array<ProductFilter>;
	filters: Array<ProductFilter>;
	searchTerm?: string;
	priceType?: ProductPriceEnum;
	priceRange?: {
		upfront: ProductFilterRangeType,
		recurring: ProductFilterRangeType,
	};
	showFilterControls: boolean;
	minutesRange?: ProductFilterRangeType;
	minutesFilterValues?: ProductFilterRangeType;
	applyIncludedMinutesFilter: boolean;
	combinedFilters: Record<string, ProductFilter>;
	onlyFilterUpdated: boolean;
}

interface FilterControlsActionProps {
	actions: {
		getBoundariesForPriceRange: GetBoundariesForPriceRangeFunc,
		updatePriceRange: UpdatePriceRangeFunc;
		switchPriceType: (priceType: ProductPriceEnum) => void;
		handlePriceRangeSlider: (value: ProductFilterRangeType) => void;
		updateMinutesFilterValues: (minutesFilterValues: ProductFilterRangeType) => void;
		toggleFilter: (params: { id: string, filterKey: string }) => void;
		toggleCombinedFilter: (filter: ProductFilter) => void;
		toggleApplyIncludedMinutesFilter: () => void;
	};
}

const mapStateToProps = (state: AppState): FilterControlsStateProps => {
	return {
		products: state.sales.products,
		activeFilters: state.sales.activeFilters,
		filters: state.sales.filters,
		searchTerm: state.sales.searchTerm,
		priceType: state.sales.priceType,
		priceRange: state.sales.priceRange,
		showFilterControls: state.sales.showFilterControls,
		minutesRange: state.sales.minutesRange,
		minutesFilterValues: state.sales.minutesFilterValues,
		applyIncludedMinutesFilter: state.sales.applyIncludedMinutesFilter,
		combinedFilters: state.sales.combinedFilters,
		onlyFilterUpdated: state.sales.onlyFilterUpdated,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: HasFlux): FilterControlsActionProps => {
	return {
		actions: {
			toggleFilter: ownProps.flux.actions.SalesActions.toggleFilter,
			toggleCombinedFilter: ownProps.flux.actions.SalesActions.toggleCombinedFilter,
			switchPriceType: ownProps.flux.actions.SalesActions.switchPriceType,
			handlePriceRangeSlider: ownProps.flux.actions.SalesActions.handlePriceRangeSlider,
			updateMinutesFilterValues: ownProps.flux.actions.SalesActions.updateMinutesFilterValues,
			toggleApplyIncludedMinutesFilter: ownProps.flux.actions.SalesActions.toggleApplyIncludedMinutesFilter,
			// the next two will be taken from Sales store, not actions!
			getBoundariesForPriceRange: ownProps.flux.stores.SalesStore.getBoundariesForPriceRange,
			updatePriceRange: ownProps.flux.stores.SalesStore.updatePriceRange,
		}
	};
};

const mergeProps = (stateProps: FilterControlsStateProps,
					dispatchProps: FilterControlsActionProps,
					ownProps: HasFlux): FilterControlsProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
		...dispatchProps
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FilterControls);
export {
	FilterControlsStateProps,
	FilterControlsActionProps,
};
