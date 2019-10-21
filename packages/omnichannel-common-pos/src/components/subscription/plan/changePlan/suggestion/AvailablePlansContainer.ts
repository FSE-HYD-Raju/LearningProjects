"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../../../redux/reducers";
import { AvailablePlans, AvailablePlansProps } from "./AvailablePlans";
import { Selectors } from "../../../../../redux";

const mapStateToProps = (state: AppState): AvailablePlansProps => {
	return {
		availablePlans: Selectors.changePlan.getAvailablePlans(state),
	};
};

const AvailablePlansContainer = connect(mapStateToProps)(AvailablePlans);
export { AvailablePlansContainer };
