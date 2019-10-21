import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import ActivateSimCard, { ActivateSimCardStateProps, ActivateSimCardActionProps } from "./ActivateSimCard";
import { AppState } from "../../redux/reducers";
import { activateSim } from "../../redux/models/eCare/activateSim/activateSim.actions";
import { SimIccVerificationAttributes } from "../../redux/models/eCare/activateSim/activateSim.types";

const mapStateToProps = (state: AppState): ActivateSimCardStateProps => {
	return {
		user: state.user.user,
		configuration: state.feature.activateSimConfiguration,
		activateSimOrderData: state.activateSim.activateSimOrderData,
		verificationResponse: state.activateSim.verificationResponse,
		verificationError: state.activateSim.verificationError
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ActivateSimCardActionProps => ({
	actions: {
		getInProgressOrders: (personId: string) => dispatch(activateSim.getInProgressOrders(personId)),
		simIccVerification: (verificationPayload: SimIccVerificationAttributes) =>
			dispatch(activateSim.simIccVerification(verificationPayload)),
		onClose: () => dispatch(activateSim.onClose())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateSimCard);
