"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import {
	ChangeSimModalStateProps,
	ChangeSimModalActionProps,
	default as ChangeSimModal,
} from "./ChangeSimModal";
import { AppState } from "../../redux/reducers";
import actions from "../../redux/actions";
import { ChangeSimSelector } from "../../redux/models/eCare/changeSim/changeSim.selectors";
import { ChangeSimServiceSubmitData } from "../../redux/services/ChangeSimService";
import { Product } from "../../redux/types";

// TODO: these should be used?
interface ChangeSimModalContainerProps {
	agreementId: string;
	subscription: Product;
}

const mapStateToProps = (state: AppState, ownProps: ChangeSimModalContainerProps): ChangeSimModalStateProps => {
	const canProceed = ChangeSimSelector.canProceedToMakeOrder(state);
	const submitData: ChangeSimServiceSubmitData | undefined = canProceed
		? ChangeSimSelector.getChangeSimSubmitData(state, ownProps.subscription, ownProps.agreementId)
		: undefined;

	return {
		canProceed,
		submitData,
		basketId: state.changeSim.basketId,
		showPaymentSelection: ChangeSimSelector.isPaymentSelectionNeeded(state)
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): ChangeSimModalActionProps => ({
	actions: {
		onProceed: (submitData: ChangeSimServiceSubmitData) => dispatch(actions.changeSim.submit(submitData)),
		onClose: (basketId?: string) => dispatch(actions.changeSim.showChangeSimModal(false, basketId))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeSimModal);
export {
	ChangeSimModalContainerProps,
};
