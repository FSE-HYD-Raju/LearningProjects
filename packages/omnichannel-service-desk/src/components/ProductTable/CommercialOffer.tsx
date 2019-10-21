import { cssns, OcCurrency, OcTabLink, FormattedMessage } from "omnichannel-common-pos";
import { FC } from "react";
import commercialOfferMessages from "./CommercialOffer.messages";
import { Component } from "react";
import { ProductOffering } from "../../../../omnichannel-common-pos/src/redux/types";
import { RouteComponentProps, withRouter } from "react-router";

const { React } = cssns("CommercialOffer");

interface CommercialOfferProps {
	productOffering?: any;
	match?: Object;
}


class CommercialOffer extends Component<CommercialOfferProps & RouteComponentProps<any>> {

	render() {
		const { match: { params }, productOffering } = this.props;
		const { name, commercialEnrichments, totalUpfrontPrice, prices } = productOffering;
		return (
			<div className="tile-container w-tile">
				<div className="w-tile-body">
					<div className="w-tile-header">
						<h6 className="w-tile-title">
							{name}
						</h6>
					</div>
					<div className="description-ellipsis">{commercialEnrichments[0].descriptions["short-description"]}</div>
					<div className="price-details">
						<OcCurrency
							cost={totalUpfrontPrice}
							currency={prices[0].currency}
							style={{
								color: "#89ba17",
								fontWeight: 500,
								fontSize: "1.5rem"
							}}
						/>
					</div>
					<div className="w-tile-actions">
						<OcTabLink
							to={`/servicedesk/shop/${params.category}/${params.sku}/commercial`}
							id={`ProductDetails-tab-${params.category}-${params.sku}-basic`}
							onlyActiveOnIndex={true}
							className="plan-details-link"
						>
							<FormattedMessage {...commercialOfferMessages.viewPlanDetails} />
						</OcTabLink>
					</div>
				</div>
			</div>
		);
	};
}

export default withRouter(CommercialOffer);
export {
	CommercialOfferProps
};
