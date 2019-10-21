import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import DeliveryAddressSelection, {
	DeliveryAddressSelectionOwnProps,
	DeliveryAddressSelectionActionProps,
	DeliveryAddressSelectionStateProps,
} from "./DeliveryAddressSelection";
import { AppState } from "../../redux/reducers";
import { actions, Selectors, ContactMediaType } from "../../redux";

import { B2CComponentCustomizationPoints, withCustomization } from "../../customization";

const mapStateToProps = (state: AppState, ownProps: DeliveryAddressSelectionOwnProps): DeliveryAddressSelectionStateProps => {
	return {
		user: Selectors.user.getUser(state),
		storedCustomer: Selectors.user.getStoredCustomerModel(state),
		storedDeliveryAddress: state.b2cCheckout.storedDeliveryAddress,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: any): DeliveryAddressSelectionActionProps => ({
	actions: {
		setDeliveryAddressRole: (role: ContactMediaType) => dispatch(actions.b2cCheckout.setDeliveryAddressRole(role)),
	}
});

export default withCustomization(
	B2CComponentCustomizationPoints.DELIVERY_ADDRESS_SELECTION_CONTAINER,
	connect(mapStateToProps, mapDispatchToProps)(DeliveryAddressSelection)
);
