import React from "react";
import { AltContainer } from "omnichannel-common-pos";
import { Route } from "react-router-dom";
import type { PropsWithFlux } from "omnichannel-flow-pos";
import SampleCmsContentSpots from "../../SampleCmsContentSpots";

const CmsContentPosRoute = (props: PropsWithFlux) => {
	const flux = props.flux;
	return (
		<Route
			key="cmscontentpos"
			path="/cmscontentpos"
			render={props => {
				return (
					<AltContainer
						stores={{
							CMSAdminStore: flux.actions.CMSAdminStore,
							UserStore: flux.actions.UserStore,
							ConsulStore: flux.actions.ConsulStore
						}}
					>
						<SampleCmsContentSpots {...props} />
					</AltContainer>
				);
			}}
		/>
	);
};

export default CmsContentPosRoute;
