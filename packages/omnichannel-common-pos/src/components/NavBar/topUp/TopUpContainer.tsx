import * as React from "react";
import { B2CComponentCustomizationPoints, withCustomization } from "../../../customization";

const EmptyComponent: React.FC<{}> = () => {
	return null;
};

const TopUpContainer: React.ComponentClass<any> = withCustomization<any>(
	B2CComponentCustomizationPoints.TOP_UP_CONTAINER,
	EmptyComponent
) as React.ComponentClass<any>;

export default TopUpContainer;
