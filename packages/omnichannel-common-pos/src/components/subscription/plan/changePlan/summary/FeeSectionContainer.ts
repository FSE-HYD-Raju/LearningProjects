"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { FeeSectionProps, FeeSection } from "./FeeSection";
import { AppState } from "../../../../../redux/reducers/index";
import { Selectors } from "../../../../../redux";

interface FeeSectionContainerProps {}

const mapStateToProps = (state: AppState, ownProps: FeeSectionContainerProps): FeeSectionProps => ({
	fee: Selectors.changePlan.getChangePlanFee(state),
});

const FeeSectionContainer = connect(mapStateToProps)(FeeSection);
export { FeeSectionContainer, FeeSectionContainerProps };
