import * as React from "react";
import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { get } from "lodash";
import { Configurations, HocResult, ProductOffering, ProductOfferingType } from "../../redux/types";

interface ProductConfigurationInputProps {
	product?: ProductOffering;
	configurations?: Configurations;
}

function withProductConfigurations<T extends ProductConfigurationInputProps>(WrappedComponent: React.ComponentType<T>):
	React.ComponentType<T & ProductConfigurationInputProps> {
	return class extends React.Component<T & ProductConfigurationInputProps> {

		static displayName: string = `withProductConfigurations.${get(WrappedComponent, "displayName", "")}`;

		render() {
			const { product, configurations} = this.props;
			const configuredProduct: ProductOfferingType | undefined = ProductOfferingUtil.mergeConfigurations(product, configurations);

			const wrapperComponentProps: T & ProductConfigurationInputProps = {
				...(this.props as object),
				product: configuredProduct
			} as T & ProductConfigurationInputProps;

			return (
				<WrappedComponent {...wrapperComponentProps}/>
			);
		}
	};
}

export {
	withProductConfigurations,
	ProductConfigurationInputProps
};
