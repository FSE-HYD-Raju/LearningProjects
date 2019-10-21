import { AppState, ProductOffering } from "../../redux";
import CheckoutThresholdTopUpForm, { CheckoutThresholdTopUpFormProps } from "./CheckoutThresholdTopUpForm";
import { connect } from "react-redux";

interface CheckoutThresholdTopUpFormContainerProps {
	productOffering: ProductOffering;
}

const mapStateToProps = (state: AppState, ownProps: CheckoutThresholdTopUpFormContainerProps): CheckoutThresholdTopUpFormProps => ({
	...ownProps,
	checkoutTopUpConfiguration: state.feature.checkoutTopUpConfiguration
});

export default connect(mapStateToProps)(CheckoutThresholdTopUpForm);
export { CheckoutThresholdTopUpFormContainerProps };
