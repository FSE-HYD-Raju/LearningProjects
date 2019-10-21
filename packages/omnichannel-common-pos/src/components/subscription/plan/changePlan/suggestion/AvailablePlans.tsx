import cssns from "../../../../../utils/cssnsConfig";
import { Component } from "react";
import { ProductOffering } from "../../../../../redux/types";
import { GridProductContainer } from "./gridProduct/GridProductContainer";

const { React } = cssns("AvailablePlans");

interface AvailablePlansProps {
	availablePlans: ProductOffering[];
}

class AvailablePlans extends Component<AvailablePlansProps> {
	renderAvailablePlan = (plan: ProductOffering) => {
		return <GridProductContainer product={plan} key={plan.id} />;
	};

	renderAvailablePlans = () => {
		const { availablePlans } = this.props;
		return availablePlans.map(this.renderAvailablePlan);
	};

	render() {
		const { availablePlans } = this.props;
		return <div className="available-plans-grid-view">{availablePlans.length > 0 && this.renderAvailablePlans()}</div>;
	}
}

export { AvailablePlans, AvailablePlansProps };
