import { Dispatch, AnyAction } from "redux";
import * as React from "react";
import { AppState } from "../../redux/reducers";
import { connect } from "react-redux";
import NewSupportCaseModal, { NewSupportCaseModalActionProps, NewSupportCaseModalProps } from "./NewSupportCaseModal";
import actions from "../../redux/actions";
import { CreateCustomerCasePayload } from "../../redux/models/support/support.types";

export interface NewSupportCaseModalContainerProps {
	onCloseModal: () => void;
	showModal: boolean;
}

const mapStateToProps = (state: AppState, ownProps: NewSupportCaseModalContainerProps): NewSupportCaseModalProps => {
	return {
		supportCaseCategories: state.feature.supportCaseCategories,
		showModal: ownProps.showModal,
		user: state.user.user
	};
};

const mapDispatchToProps = (
	dispatch: Dispatch<AnyAction>,
	ownProps: NewSupportCaseModalContainerProps
): NewSupportCaseModalActionProps => {
	return {
		actions: {
			closeModal: ownProps.onCloseModal,
			postCustomerCase: (customerCase: CreateCustomerCasePayload) => {
				dispatch(actions.support.postCustomerCase(customerCase));
			}
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewSupportCaseModal);
