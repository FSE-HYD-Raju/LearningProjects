"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { AffectedServicesSectionProps, AffectedServicesSection } from "./AffectedServicesSection";
import { AppState } from "../../../../../redux/reducers/index";
import { Selectors } from "../../../../../redux";
import ProductOfferingUtil from "../../../../../utils/ProductOfferingUtil";
import ArrayUtil from "../../../../../utils/ArrayUtil";

interface AffectedServicesSectionContainerProps {}

const mapStateToProps = (state: AppState, ownProps: AffectedServicesSectionContainerProps): AffectedServicesSectionProps => ({
	compatibleAddonsNames: ArrayUtil.filterUndefined(Selectors.changePlan.getActivatedAddons(state).map(po => ProductOfferingUtil.getPOName(po))),
	incompatibleAddonsNames: ArrayUtil.filterUndefined(Selectors.changePlan.getTerminatedAddons(state).map(po => ProductOfferingUtil.getPOName(po))),
	maxInitialCountToShow: 3,
});

const AffectedServicesSectionContainer = connect(mapStateToProps)(AffectedServicesSection);
export { AffectedServicesSectionContainer, AffectedServicesSectionContainerProps };
