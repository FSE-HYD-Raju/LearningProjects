import * as React from "react";
import { Location } from "history";
import { CommonCustomizationPoints, withCustomization } from "../../customization";

interface CMSComponentProps {
	CMSAdminStore: any;
	UserStore: any;
	fragment: string | undefined;
	publishTarget: string;
	isDirectUrl?: boolean;
	location?: Location;
	route?: any;
	ConsulStore: any;
	selectedProductId?: string;
}

const CMSComponentMock: React.FC<CMSComponentProps> = props => {
	return (
		<div
			className="cms_content_placeholder"
			data-fragment={props.fragment}
			data-publish-target={props.publishTarget}
		/>);
};
CMSComponentMock.displayName = "CMSComponent";

export default withCustomization<CMSComponentProps>(CommonCustomizationPoints.CMS_COMPONENT, CMSComponentMock);
export {
	CMSComponentProps
};
