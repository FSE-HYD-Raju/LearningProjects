import * as React from "react";
import customizationPointsResolver from "./CustomizationPointsResolver";

export interface CustomizationComponentProps<P> {
	customizationKey: string;
	defaultComponent: React.ComponentType<P>;
}

function customizationComponent<P>(props: CustomizationComponentProps<P> & P) {
	const { customizationKey, defaultComponent, ...otherProps } = props as any;
	const CustomComponent: React.ComponentType<P> = customizationPointsResolver.getComponent<P>(customizationKey, defaultComponent);
	return <CustomComponent {...otherProps}/>;
}

export default customizationComponent;
