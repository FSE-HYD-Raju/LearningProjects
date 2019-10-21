import { cssns, FormattedMessage, OcButton, OcButtonSize, OcButtonType } from "omnichannel-common-pos";
import { withRouter, RouteComponentProps } from "react-router";
import { Component } from "react";
import messages from "./ServiceDesk.messages";

const { React } = cssns("StartCustomerCase");

interface StartCustomerCaseStateProps {
	actions: {
		createNewCustomerCase: (customerId: string) => void;
	};
	salesRepId: string;
	toolmode: boolean;
}

interface StartCustomerCaseState {
	createCaseBtnDisabled: boolean;
}

type StartCustomerCaseProps = StartCustomerCaseStateProps & RouteComponentProps<any>;

class StartCustomerCase extends Component<StartCustomerCaseProps, StartCustomerCaseState> {

	constructor(props: StartCustomerCaseProps) {
		super(props);
		this.state = {
			createCaseBtnDisabled: false
		};
	}

	startNewCustomerCase = () => {
		this.setState({
			createCaseBtnDisabled: true
		});
		this.props.actions.createNewCustomerCase(this.props.salesRepId);
		this.props.history.push("/servicedesk/customer");
	};

	render() {
		return (
			<div className="this w-box">
				<OcButton
					buttonType={OcButtonType.SUCCESS}
					buttonSize={OcButtonSize.LARGE}
					id="buttonStartNewCustomerCase"
					onClick={this.startNewCustomerCase}
					disabled={this.state.createCaseBtnDisabled || this.props.toolmode}
				>
					<FormattedMessage {...messages.startNewCustomerCase}/>
				</OcButton>
			</div>
		);
	}
}

export default withRouter(StartCustomerCase);
export {
	StartCustomerCaseStateProps,
	StartCustomerCaseProps,
	StartCustomerCaseState,
	StartCustomerCase as StartCustomerCaseRaw,
};
