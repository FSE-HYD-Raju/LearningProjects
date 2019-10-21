import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { Product } from "../../../../redux/types";
import { AppState } from "../../../../redux/reducers";
import ManageAddonModal, { ManageAddonModalActionProps, ManageAddonModalStateProps } from "./ManageAddonModal";
import actions from "../../../../redux/actions";

interface ManageAddonModalContainerOwnProps {
	addon: Product;
	showModal: boolean;
	msisdn?: string;
	targetAgreementId: string;
	closeModal: () => void;
}

const mapStateToProps = (state: AppState, ownProps: ManageAddonModalContainerOwnProps): ManageAddonModalStateProps => {
	return {
		addon: ownProps.addon,
		showModal: ownProps.showModal,
		msisdn: ownProps.msisdn,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ManageAddonModalContainerOwnProps): ManageAddonModalActionProps => {
	return {
		actions: {
			closeModal: ownProps.closeModal,
			deactivateAddon: () => {
				dispatch(actions.basket.deactivateAddon(ownProps.addon.id, ownProps.targetAgreementId));
			},
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAddonModal);

export { ManageAddonModalContainerOwnProps };
