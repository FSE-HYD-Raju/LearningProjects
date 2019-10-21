import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { Configurations, ConsulState, HasFlux, ProductOffering, ProductPath } from "../../../../redux/types";
import { AppState } from "../../../../redux/reducers";
import ProductOfferingConfigurationContainer, { ProductOfferingConfigurationContainerOwnProps, } from "../../../product/ProductOfferingConfigurationContainer";
import { withMsisdnConfiguration } from "../../../product/msisdn/withMsisdnConfiguration";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import actions from "../../../../redux/actions";

interface ProductOfferingConfigurationOwnProps {
	product: ProductOffering;
}

interface ProductOfferingConfigurationStateProps {
	icc_subtype_display: ConsulState["icc_subtype_display"];
	configurations: Configurations;
	msisdnReservationRequired: boolean;
}

interface ProductOfferingConfigurationActionProps {
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
	toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => void;
}

type ProductOfferingConfigurationProps = ProductOfferingConfigurationStateProps & ProductOfferingConfigurationActionProps;

const mapStateToProps = (state: AppState): ProductOfferingConfigurationStateProps  => {
	return {
		icc_subtype_display: state.consul.icc_subtype_display,
		configurations: state.productOfferingConfiguration.configurations,
		msisdnReservationRequired: state.consul.msisdnReservationRequired,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ProductOfferingConfigurationOwnProps): ProductOfferingConfigurationActionProps => {
	return {
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
			dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
		},
		toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => {
			dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
		},
	};
};

const ProductOfferingConfigurationWithMsisdn = withMsisdnConfiguration<ProductOfferingConfigurationContainerOwnProps>(ProductOfferingConfigurationContainer);

const AddonPOConfiguration: React.FC<ProductOfferingConfigurationOwnProps & ProductOfferingConfigurationProps> =
	(props: ProductOfferingConfigurationOwnProps & ProductOfferingConfigurationProps, context: ContextType) => {
	return (
		<ProductOfferingConfigurationWithMsisdn
			product={props.product}
			flux={context.flux}
		/>
	);
};
AddonPOConfiguration.contextTypes = contextTypesValidationMap;

export default connect(mapStateToProps, mapDispatchToProps)(AddonPOConfiguration);
export {
	ProductOfferingConfigurationProps,
	ProductOfferingConfigurationOwnProps,
	AddonPOConfiguration
};
