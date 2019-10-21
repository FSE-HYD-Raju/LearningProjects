"use strict";

import { connect } from "react-redux";
import { AppState, HasFlux, ProductOffering, ProductPath } from "../../../../../redux";
import { SliderConfigurationGroupProps } from "../../sliderConfiguration/SliderConfigurationGroup";
import SliderMessages from "../../sliderConfiguration/slider.messages";
import SliderConfigurationGroupLifeCycle from "../../sliderConfiguration/SliderConfigurationGroupLifeCycle";
import ConfigurableSubscriptionUtils from "./ConfigurableSubscription.utils";

export interface ProductOfferingGroupSliderContainerProps extends HasFlux {
	product: ProductOffering;
	path: ProductPath;
}

const mapStateToProps = (state: AppState, ownProps: ProductOfferingGroupSliderContainerProps): SliderConfigurationGroupProps => ({
	configurations: ConfigurableSubscriptionUtils.getSliderConfiguration(
		ownProps.product,
		state.productOfferingConfiguration.configurations[ownProps.product.id]
	),
	handleChange: ConfigurableSubscriptionUtils.handleSelectAllowance(ownProps.flux, ownProps.product, ownProps.path),
	unlimitedMessage: SliderMessages.unlimited
});

const mergeProps = (stateProps: SliderConfigurationGroupProps, dispatchProps: undefined,
					ownProps: ProductOfferingGroupSliderContainerProps): SliderConfigurationGroupProps => {

	const { flux, ...restOwnProps } = ownProps;

	return {
		...restOwnProps,
		...stateProps,
	};

};

export default connect(mapStateToProps, undefined, mergeProps)(SliderConfigurationGroupLifeCycle);
