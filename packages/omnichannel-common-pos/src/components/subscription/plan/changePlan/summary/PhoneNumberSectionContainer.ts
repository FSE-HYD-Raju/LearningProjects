"use strict";

import { connect } from "react-redux";

import { AppState } from "../../../../../redux/reducers/index";
import { Selectors } from "../../../../../redux/index";
import { PhoneNumberSection, PhoneNumberSectionProps } from "./PhoneNumberSection";

const mapStateToProps = (state: AppState): PhoneNumberSectionProps => {
	return {
		phoneNumber: Selectors.changePlan.getCurrentPlanPhoneNumber(state),
	};
};

const PhoneNumberSectionContainer = connect(mapStateToProps)(PhoneNumberSection);
export { PhoneNumberSectionContainer };
