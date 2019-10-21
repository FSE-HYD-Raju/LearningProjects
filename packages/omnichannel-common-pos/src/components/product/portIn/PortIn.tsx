import * as React from "react";
import messages from "../Product.messages";
import RadioButton from "./RadioButton";
import FormattedMessage from "../../../channelUtils/FormattedMessage";

interface PortInProps {
	onChange: () => void;
	selected: any;
}

class PortIn extends React.PureComponent<PortInProps> {

	componentWillMount(): void {
		if (this.props.selected === "") {
			this.props.onChange();
		}
	}

	handleChange = (e: any) => {
		if (this.props.selected === (e.target.value === "true")) {
			return;
		}
		this.props.onChange();
	};

	render() {
		return (
			<div>
				<RadioButton
					id="change"
					name="portin"
					value="false"
					checked={!this.props.selected}
					onChange={this.handleChange}
					label={<FormattedMessage {...messages.getNewNumber}/>}
				/>
				<RadioButton
					id="keep"
					name="portin"
					value="true"
					checked={this.props.selected}
					onChange={this.handleChange}
					label={<FormattedMessage {...messages.transferOldNumber} />}
				/>
			</div>
		);
	}
}

export default PortIn;
export {
	PortInProps
};
