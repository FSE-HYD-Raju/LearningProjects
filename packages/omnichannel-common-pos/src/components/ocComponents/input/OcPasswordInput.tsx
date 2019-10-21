import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import { Component, ReactNode, SyntheticEvent } from "react";
import { OcInputContainer } from "./OcInputContainer";
import { OcButton } from "../button/OcButton";

const { React } = cssns("OcPasswordInput");

interface OcPasswordInputProps {
	small?: boolean;
	className?: string;
	onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
	id?: string;
	buttonId: string;
	showPassword?: boolean;
	showToggleShowPasswordButton?: string;
}

interface OcPasswordInputState {
	showPassword: boolean;
}

class OcPasswordInput extends Component<OcPasswordInputProps, OcPasswordInputState> {

	static displayName: string = "OcPasswordInput";

	constructor(props: OcPasswordInputProps) {
		super(props);
		this.state = {showPassword: false};
	}

	componentWillMount(): void {
		this.setState({showPassword: !!this.props.showPassword});
	}

	toggleShowPassword = () => {
		this.setState({showPassword: !this.state.showPassword});
	};

	render(): ReactNode {

		const { className = "", small, id, showToggleShowPasswordButton, buttonId } = this.props;

		const inputClasses = classnames({
			"form-control": true,
			"password-input": true,
			"input-sm": small,
			[className]: Boolean(className)

		});

		return (
			<OcInputContainer id={id} className="container">
				<input
					className={inputClasses}
					type={this.state.showPassword ? "text" : "password"}
					onChange={this.props.onChange}
					id={id}
				/>
				{showToggleShowPasswordButton &&
					<OcButton onClick={this.toggleShowPassword} id={buttonId}><i className="fa fa-eye show-password-icon"/></OcButton>
				}
			</OcInputContainer>
		);
	}
}
OcPasswordInput.displayName = "OcPasswordInput";

export {
	OcPasswordInputProps,
	OcPasswordInputState,
	OcPasswordInput
};
