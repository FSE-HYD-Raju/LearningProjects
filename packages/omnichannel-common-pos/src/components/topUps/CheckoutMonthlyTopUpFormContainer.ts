import { AppState, ProductOffering } from "../../redux";
import { connect } from "react-redux";
import CheckoutMonthlyTopUpForm, { CheckoutMonthlyTopUpFormProps } from "./CheckoutMonthlyTopUpForm";

interface CheckoutMonthlyTopUpFormContainerProps {
	productOffering: ProductOffering;
}

const mapStateToProps = (state: AppState, ownProps: CheckoutMonthlyTopUpFormContainerProps): CheckoutMonthlyTopUpFormProps => ({
	...ownProps,
	topUpAmount: state.feature.checkoutTopUpConfiguration.topUpAmount
});

export default connect(mapStateToProps)(CheckoutMonthlyTopUpForm);
export { CheckoutMonthlyTopUpFormContainerProps };
