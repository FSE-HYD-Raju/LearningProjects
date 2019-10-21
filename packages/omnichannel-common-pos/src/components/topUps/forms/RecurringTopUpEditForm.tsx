import * as R from "react";
import { RecurringTopUpBaseForm, RecurringTopUpBaseFormProps } from "./RecurringTopUpBaseForm";
import cssns from "../../../utils/cssnsConfig";
import OcSelect from "../../ocComponents/OcSelect";
import withFormal from "../../ocComponents/withFormal";
import { Characteristic, CustomerPaymentMethod, HasSchema, RecurringTopUpType } from "../../../redux/types";
import withSchemaTS from "../../../schemas/withSchemaTS";
import { RecurringTopUpModelType } from "../../../redux/types/RecurringTopUpModelType";
import { ReactUtil } from "../../../utils/product/ReactUtil";
import MsisdnUtil from "../../../utils/MsisdnUtil";
import { RecurringTopUpUtil } from "../RecurringTopUpUtil";

const React = cssns("RecurringTopUpBaseForm").React as typeof R;
const Form = require("react-formal");
const FormalOcSelect = withFormal(OcSelect);

interface RecurringTopUpEditFormStateProps {
	agreementId: string | undefined;
	isBasketSubmitted: boolean;
	editMode: boolean;
	recurringTopUpTypes: RecurringTopUpType[];
	customerPaymentMethods: CustomerPaymentMethod[];
}

interface RecurringTopUpEditFormActionProps {
	actions: {
		initialize: () => void;
		getNewTopUpProductOfferings: (agreementId: string) => void;
		submitTopUp: (model: RecurringTopUpModelType) => void;
		removeTopUp: (productId: string) => void;
		getProductOffering: (productId: string) => void;
	};
}
interface RecurringTopUpEditFormProps extends RecurringTopUpBaseFormProps, HasSchema, RecurringTopUpEditFormStateProps, RecurringTopUpEditFormActionProps {}
class RecurringTopUpEditForm extends RecurringTopUpBaseForm<RecurringTopUpEditFormProps> {
	componentDidMount() {
		const { agreementId, initialModel } = this.props;
		this.props.actions.initialize();
		if (agreementId) {
			this.props.actions.getNewTopUpProductOfferings(agreementId);
		}

		if (initialModel.productOfferingId) {
			this.props.actions.getProductOffering(initialModel.productOfferingId);
		}

		this.ensureCustomerPaymentMethod();
	}

	isValidTopUpModel(model: RecurringTopUpModelType): boolean {
		return (
			RecurringTopUpUtil.isValidTopUpModel(model) && (model.recurringTopUp === RecurringTopUpType.REMOVE || this.props.customerPaymentMethods.length > 0)
		);
	}

	ensureCustomerPaymentMethod() {
		const { paymentMethod } = this.state.model;
		const { customerPaymentMethods } = this.props;
		const isValidStoredInModelCustomerPaymentMethod = Boolean(
			customerPaymentMethods.find(customerPaymentMethod => customerPaymentMethod.id === paymentMethod)
		);
		if (!isValidStoredInModelCustomerPaymentMethod) {
			this.setState({
				model: { ...this.state.model, paymentMethod: customerPaymentMethods[0] && customerPaymentMethods[0].id },
			});
		}
	}

	handleSubmit = (model: RecurringTopUpModelType) => {
		if (model.recurringTopUp === RecurringTopUpType.REMOVE) {
			if (this.props.initialModel.productId) {
				this.props.actions.removeTopUp(this.props.initialModel.productId);
			} else {
				console.error("Recurring top-up don't have productId, cannot remove");
			}
		} else {
			this.props.actions.submitTopUp(model);
		}
	};

	onModelChange(prevModel: RecurringTopUpModelType, nextModel: RecurringTopUpModelType) {
		this.setState({
			editMode: this.props.initialModel.recurringTopUp === nextModel.recurringTopUp
		});
	}

	componentWillReceiveProps(nextProps: RecurringTopUpEditFormProps) {
		if (ReactUtil.isPropChanged<RecurringTopUpEditFormProps>(this.props, nextProps, "recurringTopUpTypes")) {
			this.ensureModelRecurringTopUpType(this.getRecurringTopUpTypes(nextProps));
		}
		if (ReactUtil.isPropChanged<RecurringTopUpEditFormProps>(this.props, nextProps, "customerPaymentMethods")) {
			this.setState({
				isValidForm:
					RecurringTopUpUtil.isValidTopUpModel(this.state.model) &&
					(this.state.model.recurringTopUp === RecurringTopUpType.REMOVE || nextProps.customerPaymentMethods.length > 0),
			});
		}
		if (ReactUtil.isPropChanged<RecurringTopUpEditFormProps>(this.props, nextProps, "isBasketSubmitted") && nextProps.isBasketSubmitted) {
			this.props.onClose();
		}
	}

	getRecurringTopUpTypes(props?: RecurringTopUpEditFormProps): RecurringTopUpType[] {
		const currentProps = props || this.props;
		let enchancedRecurringTopUpTypes = [...currentProps.recurringTopUpTypes, RecurringTopUpType.REMOVE];
		const { recurringTopUp } = this.props.initialModel;
		if (recurringTopUp && enchancedRecurringTopUpTypes.indexOf(recurringTopUp) === -1) {
			enchancedRecurringTopUpTypes = [recurringTopUp, ...enchancedRecurringTopUpTypes];
		}
		return enchancedRecurringTopUpTypes;
	}

	renderPhoneNumberForm() {
		const { model } = this.state;
		return <span>{MsisdnUtil.getMsisdnWithSeparatedAreaCode(model.subscription || "")}</span>;
	}
}

export { RecurringTopUpEditFormProps, RecurringTopUpEditFormActionProps, RecurringTopUpEditFormStateProps };
export default withSchemaTS<RecurringTopUpEditFormProps>(["recurringTopUpForm"])(RecurringTopUpEditForm);
