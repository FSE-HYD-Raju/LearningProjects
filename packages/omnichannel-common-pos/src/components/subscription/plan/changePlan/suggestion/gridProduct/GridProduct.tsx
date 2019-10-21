import cssns from "../../../../../../utils/cssnsConfig";
import { Component } from "react";
import { ProductOffering, SimplePrice } from "../../../../../../redux/types";
import ShopProductImage from "../../../../../shop/product/ShopProductImage";
import FormattedMessage from "../../../../../../channelUtils/FormattedMessage";
import messages from "./GridProduct.messages";
import { AllowanceInfo } from "../../../../../../redux/types/Allowance";
import { AllowanceInfoRow } from "../../summary/AllowanceInfoRow";
import { LargePrice } from "./LargePrice";

const { React } = cssns("GridProduct");

interface GridProductOwnProps {
	product: ProductOffering;
}
interface GridProductStateProps {
	name: string;
	allowancesInfo: AllowanceInfo[];
	recurringPrice?: SimplePrice;
	activationPrice?: SimplePrice;
}
interface GridProductActionProps {
	actions: {
		selectProduct: () => void;
	};
}

interface GridProductProps extends GridProductOwnProps, GridProductStateProps, GridProductActionProps {}

class GridProduct extends Component<GridProductProps> {
	render() {
		const { actions, name, product, allowancesInfo, recurringPrice, activationPrice } = this.props;

		return (
			<div className="card">
				<div className="card-body cell">
					<div className="information-block">
						<div className="caption">{name}</div>
						{allowancesInfo.length > 0 && (
							<div className="plan-services">
								{allowancesInfo.map((allowance: AllowanceInfo, index: number) => (
									<AllowanceInfoRow
										key={allowance.name + allowance.value + index}
										name={allowance.name}
										isUnlimited={allowance.isUnlimited}
										value={allowance.value}
										unitOfMeasure={allowance.unitOfMeasure}
									/>
								))}
							</div>
						)}
						<div className="prices-block">
							{recurringPrice && <LargePrice price={recurringPrice} description={<FormattedMessage {...messages.recurrentPriceDescription} />} />}
							{activationPrice && (
								<LargePrice price={activationPrice} description={<FormattedMessage {...messages.activationPriceDescription} />} />
							)}
						</div>
						<div className="select-plan-or-details-block">
							<div className="select-plan">
								<button className="btn btn-primary select-plan-button" onClick={actions.selectProduct}>
									<FormattedMessage {...messages.selectPlanButton} />
								</button>
							</div>
							<div className="plan-details">
								<a className="btn-link plan-details-link" href="#" onClick={() => {}}>
									<FormattedMessage {...messages.viewDetails} />
								</a>
							</div>
						</div>
					</div>
					<div className="image">
						<ShopProductImage product={product} />
					</div>
				</div>
			</div>
		);
	}
}

export { GridProduct, GridProductProps, GridProductOwnProps, GridProductStateProps, GridProductActionProps };
