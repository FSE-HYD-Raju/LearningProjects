import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import {
	CmsPopover,
	CmsPopoverAdditionalOwnProps,
	CmsPopoverOwnProps,
} from "./CmsPopover";
import { AppState } from "../../../redux/reducers";
import { CmsUtils } from "../../../redux/models/cms/cms.utils";
import { CmsState } from "../../../redux/models/cms/cms.reducers";
import { CmsMetaData, HasFlux } from "../../../redux/types";
import {
	CmsPopoverPreLoadingOwnProps,
	CmsPopoverPreLoadingStateProps
} from "./CmsPopoverPreLoadingBase";
import { actions } from "../../../redux";

type CmsPopoverContainerOwnProps = CmsPopoverAdditionalOwnProps & CmsPopoverPreLoadingOwnProps;

const mapStateToProps = (state: AppState, ownProps: CmsPopoverContainerOwnProps & HasFlux): CmsPopoverPreLoadingStateProps & { cmsMetaData: CmsMetaData } => {
	const {fragmentId, publishTarget} = ownProps;
	const key = CmsUtils.buildContentSpotKey(publishTarget, fragmentId);

	const cms: CmsState = state.cms;
	const isMobile = state.navBar.viewportSize !== "desktop";

	const cmsMetaData: CmsMetaData = {
		userId: (state.user.user) ? state.user.user.id : "",
		userBirthDay: (state.user && state.user.user && state.user.user.attributes) ?  state.user.user.attributes.birthDay : "",
		selectedProductId: state.category.selectedProductId || "",
	};

	if (fragmentId && publishTarget && key) {
		return { hasContent: Boolean(cms[key]), isMobile, cmsMetaData };
	}

	return {
		hasContent: true,
		isMobile,
		cmsMetaData
	};
};

// dirty hack to get dispatch in mergeProps
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): { dispatch: Dispatch } => {
	return { dispatch }
};

const mergeProps = (stateProps: CmsPopoverPreLoadingStateProps & { cmsMetaData: CmsMetaData },
                    dispatchProps: { dispatch: Dispatch },
					ownProps: CmsPopoverContainerOwnProps & HasFlux): CmsPopoverOwnProps => {

	const { flux, ...restOwnProps } = ownProps;
	const { cmsMetaData, ...restStateProps } = stateProps;
	const { dispatch } = dispatchProps;

	return {
		...restOwnProps,
		...restStateProps,
		actions: {
			getCurrentContent: () => {
				dispatch(actions.cms.getCurrentContent(ownProps.publishTarget, ownProps.fragmentId, null, cmsMetaData));
			}
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CmsPopover);
