import * as React from "react";
import { AppState, AuthState, CmsAdminState, CmsState, ConsulState, UserState } from "../../redux";
import { connect } from "react-redux";
import CMSComponent from "./CMSComponent";

interface CmsContentSpotProps {
	fragmentId?: string;
	publishTarget: string;
	cms: CmsState;
	cmsAdmin: CmsAdminState;
	user: UserState;
	auth: AuthState;
	consul: ConsulState;
	selectedProductId?: string;
}

interface CmsContentSpotOwnProps {
	fragmentId?: string;
	publishTarget: string;
}

const CmsContentSpot: React.FC<CmsContentSpotProps> = (props) => {
	return (
		<CMSComponent
			CMSAdminStore={props.cmsAdmin}
			UserStore={props.user}
			ConsulStore={props.consul}
			fragment={props.fragmentId}
			publishTarget={props.publishTarget}
			selectedProductId={props.selectedProductId}
		/>
	);
};

CmsContentSpot.defaultProps = { fragmentId: "" };

const mapStateToProps = (state: AppState, ownProps: CmsContentSpotOwnProps): CmsContentSpotProps => ({
		...ownProps,
		cms: state.cms,
		cmsAdmin: state.cmsAdmin,
		user: state.user,
		auth: state.auth,
		consul: state.consul,
		selectedProductId: state.category.selectedProductId,
	});
export default connect(mapStateToProps)(CmsContentSpot);
export { CmsContentSpot, CmsContentSpotProps, CmsContentSpotOwnProps };
