import * as React from "react";
import isClient from "../../utils/isClient";
import { connect } from "react-redux";
import { ContextType, contextTypesValidationMap } from "../../types";
import { AnyAction, Dispatch } from "redux";
import actions from "../../redux/actions";
import { AppState } from "../../redux/reducers";

interface PaymentFormContainerStateProps {
	paymentForm: any; // should be type here
}

interface PaymentFormContainerActionsProps {
	actions: {
		persistToStorage: () => void
	};
}

type PaymentFormContainerProps = PaymentFormContainerStateProps & PaymentFormContainerActionsProps;
// This class looks really suspicious
class PaymentFormContainer extends React.Component<PaymentFormContainerProps> {
	static contextTypes = contextTypesValidationMap;
	static displayName = "PaymentFormContainer";

	constructor(props: PaymentFormContainerProps, context: ContextType) {
		super(props, context);
	}

	componentDidMount() {
		if (isClient) {
			const forms: HTMLCollectionOf<any> = document.getElementsByClassName("PaymentForm");
			const paymentForm = forms && forms.length && forms[0];
			if (paymentForm) {
				this.props.actions.persistToStorage();
				setTimeout(() => {
					paymentForm.submit();
				}, 1000);
			}
		}
	}

	render() {
		if (!this.props.paymentForm) {
			return null;
		}
		return (
			<div
				style={{ visibility: "hidden", height: 0 }}
				dangerouslySetInnerHTML={{ __html: this.props.paymentForm }}
			/>
		);
	}
}

const mapStateToProps = (state: AppState, ownProps: PaymentFormContainerStateProps) => {
	return {
		paymentForm: ownProps.paymentForm
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		actions: {
			persistToStorage: () => dispatch(actions.session.persistToStorage()),
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentFormContainer);

export {
	PaymentFormContainerProps
};
