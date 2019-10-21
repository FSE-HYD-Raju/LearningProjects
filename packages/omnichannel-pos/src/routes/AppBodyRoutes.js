import * as React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { ServiceDeskRoute } from "omnichannel-service-desk";
import { POSComponentCustomizationPoints, CustomizationComponent, EmptyComponent } from "omnichannel-common-pos";
import PosCheckoutRoute from "./posCheckout/PosCheckoutRoute";
import PosColdContainer from "../components/posCold/PosColdContainer";
import PaymentOkRoute from "./payment/PaymentOkRoute";
import PaymentSuccessRoute from "./payment/PaymentSuccessRoute";
import PaymentCancelRoute from "./payment/PaymentCancelRoute";
import PackageInfoRoute from "./info/PackageInfoRoute";
import CmsContentPosRoute from "./cmsContent/CmsConentPosRoute";
import CashSuccessRoute from "./payment/CashSuccessRoute";

const AppBodyRoutes = (props) => {
	const { flux } = props;
	return (
		<div className="pos-page-body">
			<CustomizationComponent
				key="custom_route"
				customizationKey={POSComponentCustomizationPoints.APP_ROUTES_EXTENSION}
				defaultComponent={EmptyComponent}
			/>
			<Route
				key="index"
				path="/"
				exact={true}
				component={PosColdContainer}
			/>
			<ServiceDeskRoute flux={flux} posCheckoutRoute={PosCheckoutRoute} />
			<PaymentOkRoute flux={flux} />
			<CashSuccessRoute />
			<PaymentSuccessRoute />
			<PaymentCancelRoute flux={flux} />
			<PackageInfoRoute />
			<CmsContentPosRoute flux={flux} />
		</div>
	);
};

AppBodyRoutes.propTypes = {
	flux: PropTypes.func.isRequired
}

export default AppBodyRoutes;
