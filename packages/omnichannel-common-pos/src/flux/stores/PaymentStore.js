import BaseStore from "./BaseStore";
import ImmutableStore from "../seamless-alt";
import { get, omit } from "lodash";
import { deprecated } from "../../redux/decorators";
import { commonShopRoutes } from "../../routes/commonRoutesMap";

const initialState = {
	paymentInfo: null,
	paymentUseCases: null,
	contextualPaymentMethodId: null,
	customerPaymentMethodId: null,
	paymentMethodChanged: false,
	paymentStatus: null,
	paymentResponse: {},
	paymentCancel: false,
	errors: null,
	contextualPaymentMethods: [], // here resides an Array<ContextualPaymentMethod>
	customerPaymentMethods: [], // here resides an Array<CustomerPaymentMethods>
	topUpSuccessful: false,
	referenceNumber: null,
	storeCustomerPaymentMethod: false,
	failedCashPayment: false,
	customerPaymentMethod: null
};

@ImmutableStore
class PaymentStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.PaymentActions);
		this.bindAction(this.alt.actions.ConsulActions.getValues, this.getPaymentUseCaseValues);
		this.state = { ...initialState };
		this.exportPublicMethods({
			getPaymentUseCaseValueByKey: this.getPaymentUseCaseValueByKey
		});
	}

	getEligiblePaymentMethods(contextualPaymentMethods: Array<Object>) {
		this.setState({
			contextualPaymentMethods
		});
	}

	terminatePaymentMethod() {
		this.setState({
			paymentMethodChanged: true
		});
	}

	updatePaymentMethodName() {
		this.setState({
			paymentMethodChanged: true
		});
	}

	selectPaymentMethod(data: Object) {
		this.setState({
			paymentInfo: get(data, "paymentInfo"),
			contextualPaymentMethodId: get(data, "contextualPaymentMethodId"),
			customerPaymentMethodId: get(data, "customerPaymentMethodId"),
			paymentStatus: null
		});
	}

	selectContextualPaymentMethod(data: Object) {
		this.setState({
			paymentInfo: get(data, "attributes.paymentInfo"),
			contextualPaymentMethodId: get(data, "attributes.contextualPaymentMethodId"),
			customerPaymentMethodId: get(data, "attributes.customerPaymentMethodId"),
			paymentStatus: null
		});
	}

	fetchReferenceNumberForCashPayment(data: Object) {
		const { referenceNumber } = data;
		if (referenceNumber && this.alt.history) {
			this.alt.history.push(commonShopRoutes.PAYMENT_CASH_SUCCESS.createLink());
			this.setState({ referenceNumber });
		}
	}
	validatePayment(data: Object) {
		this.setState({
			paymentStatus: get(data, "paymentStatus"),
			contextualPaymentMethodId: get(data, "contextualPaymentMethodId"),
			customerPaymentMethodId: get(data, "customerPaymentMethodId"),
			customerPaymentMethod: get(data, "customerPaymentMethod"),
			paymentResponse: get(data, "paymentResponse"),
		});
	}
	handleErrors(errors: Array<any>) {
		this.setState({
			errors
		});
	}
	@deprecated("Covered by consul.saga and consul.getValues()")
	getPaymentUseCaseValues(payload: Object) {
		const paymentUseCaseConfiguration = get(payload, "payment_use_case_configuration");
		if (paymentUseCaseConfiguration) {
			const paymentUseCases = JSON.parse(paymentUseCaseConfiguration);
			this.setState({
				paymentUseCases
			});
		} else {
			console.warn("Unable to parse config 'payment_use_case_configuration'");
		}
	}
	getPaymentUseCaseValueByKey(key: string) {
		const paymentUseCases = this.state.paymentUseCases;
		if (paymentUseCases && key) {
			return get(paymentUseCases, key, "");
		}
		return "";
	}
	resetPaymentStore() {
		this.setState({
			...omit(initialState, "paymentUseCases")
		});
	}
	handlePaymentReject() {
		this.setState({
			...omit(
				initialState,
				"paymentUseCases",
				"paymentStatus",
				"contextualPaymentMethods",
				"customerPaymentMethods"
			)
		});
	}
	handlePaymentCancel() {
		this.setState({
			...omit(initialState, "paymentUseCases", "contextualPaymentMethods", "customerPaymentMethods"),
			paymentCancel: true
		});
	}

	handleFailedCashPayment(errors: Array<any>) {
		this.setState({
			failedCashPayment: true
		});
	}
	@deprecated("actions.payment.getCustomerPaymentMethods")
	getPaymentMethods(data: Object) {
		this.setState({
			customerPaymentMethods: data
		});
	}

	handleProductTopUp = (data: Object) => {
		this.setState({
			topUpSuccessful: true,
			topUpPending: false
		});
	};

	@deprecated("actions.payment.resetTopUp")
	resetTopUp = () => {
		this.setState({
			topUpSuccessful: false,
			topUpPending: false,
		});
	};

	clearPaymentForm = () => {
		this.setState({
			paymentInfo: { ...omit(this.state.paymentInfo, "paymentForm") }
		});
	};
}

export default PaymentStore;
