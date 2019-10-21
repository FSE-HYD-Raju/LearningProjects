import { Component } from "react";
import * as React from "react";

/**
 * Simple on/off toggle based on default HTML Checkbox.
 *
 * Source: https://1stwebdesigner.com/css-snippets-radio-toggles-switches/
 * Styles were changed and simplified compared to original solution.
 */
interface OcToggleSimpleProps {
	active?: boolean;
	handleClick?: () => void;
	enabledLabel?: React.ReactNode;
	disabledLabel?: React.ReactNode;
	id?: string;
}

interface OcToggleSimpleState {
	active: boolean;
}

class OcToggleSimple extends Component<OcToggleSimpleProps, OcToggleSimpleState> {
	constructor(props: OcToggleSimpleProps) {
		super(props);
		this.state = {
			active: !!props.active
		};
	}

	toggle = () => {
		this.setState({
			active: !this.state.active
		});

		if (this.props.handleClick) {
			this.props.handleClick();
		}
	};

	render() {
		const { id, enabledLabel, disabledLabel } = this.props;
		return (
			<div
				onClick={this.toggle}
				className="can-toggle simple-round-switch">
				<input className="padded" id={id} type="checkbox"/>
					<label className="padded" htmlFor={id}>
						<div className="can-toggle__switch" data-checked={enabledLabel || "I"} data-unchecked={disabledLabel || "O"}/>
					</label>
			</div>
	);
	}
}

export default OcToggleSimple;
export { OcToggleSimpleProps, OcToggleSimpleState };
