"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { ChangeSimFeeProps, default as ChangeSimFee } from "./ChangeSimFee";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { AppState } from "../../redux/reducers";
import { ChangeSimSelector } from "../../redux/models/eCare/changeSim/changeSim.selectors";

const mapStateToProps = (state: AppState): ChangeSimFeeProps => {
	const { selectedReason } = state.changeSim;
	return {
		feeAmount: selectedReason && ChangeSimSelector.getFeeAmount(state),
		feeTitle: selectedReason && ProductOfferingUtil.getPOName(selectedReason)
	};
};

export default connect(mapStateToProps)(ChangeSimFee);
