"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";
import { CategoryTiles, CategoryTilesActionProps, CategoryTilesStateProps } from "./CategoryTiles";

const mapStateToProps = (state: AppState): CategoryTilesStateProps => ({
	mainCategories: state.category.mainCategories,
	locale: state.consul.locale
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CategoryTilesActionProps => ({
		actions: {
			updateMainCategories: () => {
				dispatch(actions.category.updateMainCategories());
			}
		}
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTiles);
