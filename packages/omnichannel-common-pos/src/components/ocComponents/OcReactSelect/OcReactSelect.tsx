import { ReactNode, Component, ReactChild } from "react";
import cssns from "../../../utils/cssnsConfig";
import { OcInputContainer, OcInputContainerProps } from "../../ocComponents/input/OcInputContainer";
const { default: Select } = require("react-select");
const { React } = cssns("OcReactSelect");

interface OcReactSelectProps {
	onChange: (selection: string) => void;
	name: string;
	id: string;
	options: Array<any>;
	required: boolean;
	onBlur?: (e: any) => void;
	inputType?: string;
	errorMessage?: string;
	valueKey: string;
	labelKey: string;
	labelPosition: OcInputContainerProps["labelPosition"];
	addonRight: ReactChild;
	label: ReactNode;
}

interface OcReactSelectState {
	hideErrors?: boolean;
}

class OcReactSelect extends Component<OcReactSelectProps, OcReactSelectState> {

	constructor(props: OcReactSelectProps) {
		super(props);
		this.state = {};
	}

	onChange = (selection: string) => {
		this.props.onChange(selection);
		this.showErrors();
	};

	onBlur = (event: any) => {
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}

		this.showErrors();
	};

	hideErrors = () => {
		this.setState({
			hideErrors: true
		});
	};

	showErrors = () => {
		this.setState({
			hideErrors: false
		});
	};

	render() {
		const { id, errorMessage, ...rest } = this.props;
		const { hideErrors } = this.state;

		return (
			<div className="oc-react-select-container">
				<OcInputContainer
					errorMessage={hideErrors ? undefined : errorMessage}
					{...rest}
				>
					<Select
						className="oc-react-select-container"
						{...rest}
						onChange={this.onChange}
						onOpen={this.hideErrors}
						onBlur={this.onBlur}
						inputProps={{ id }}
						menuContainerStyle={{ zIndex: 1080 }}
					/>
				</OcInputContainer>
			</div>
		);
	}
}

export default OcReactSelect;
export {
	OcReactSelectProps,
};
