"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, actions, ProductOffering } from "../../../redux";
import {
	ComparisonFooterStateProps,
	ComparisonFooterActionProps,
	default as ComparisonFooter
} from "./ComparisonFooter";

const mapStateToProps = (state: AppState): ComparisonFooterStateProps => ({
	items: state.comparison.items
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ComparisonFooterActionProps => ({
	actions: {
		show: () => {
			dispatch(actions.comparison.show());
		},
		clear: () => {
			dispatch(actions.comparison.clear());
		},
		toggleItem: (item: ProductOffering) => {
			dispatch(actions.comparison.toggleItem(item));
		},
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonFooter);
