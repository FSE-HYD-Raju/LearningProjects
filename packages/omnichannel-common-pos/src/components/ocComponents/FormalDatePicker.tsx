import * as React from "react";
import withFormal, { FormalOcInputProps } from "./withFormal";
import { OcInputContainer } from "./input/OcInputContainer";

const  { DateTimePicker } = require("react-widgets");

interface FormalDatePickerProps {
	name: string;
	id: string;
	errorMessage?: string;
}

interface FormalDatePickerState {
	hideErrors: boolean;
}

class FormalDatePicker extends React.PureComponent<FormalDatePickerProps, FormalDatePickerState> {

	constructor(props: FormalDatePickerProps) {
		super(props);
		this.state = {
			hideErrors: false
		};
	}

	onToggle = () => {
		this.setState({
			hideErrors: !this.state.hideErrors
		});
	};

	render() {
		const { errorMessage, ...rest } = this.props;
		const { hideErrors } = this.state;

		return (
			<OcInputContainer
				errorMessage={hideErrors ? undefined : errorMessage} // is this correct?
				{...rest}
			>
				<DateTimePicker {...rest} onToggle={this.onToggle} />
			</OcInputContainer>
		);
	}
}

export default withFormal(FormalDatePicker);
export {
	FormalDatePickerProps,
	FormalDatePickerState
};
