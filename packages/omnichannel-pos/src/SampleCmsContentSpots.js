import React from "react";
import PropTypes from "prop-types";
import { Cms } from "omnichannel-common-pos";
const { CMSComponent } = Cms;

const SampleCmsContentSpots = props => {
	return (
		<div className="oc-max-width">
			<CMSComponent {...props} fragment="spot1" publishTarget="pos" />
			<div style={{ paddingBottom: "20px" }} />
			<CMSComponent {...props} fragment="spot2" publishTarget="pos" />
			<div style={{ paddingBottom: "20px" }} />
			<CMSComponent {...props} fragment="spot3" publishTarget="pos" />
		</div>
	);
};

SampleCmsContentSpots.propTypes = {
	UserStore: PropTypes.object,
	CmsAdminStore: PropTypes.object,
};

export default SampleCmsContentSpots;
