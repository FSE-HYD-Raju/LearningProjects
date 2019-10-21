import Transition from "react-motion-ui-pack";
import { spring } from "react-motion";
import { Component } from "react";
import messages from "./OcComponents.messages";
import cssns from "../../utils/cssnsConfig";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const { React } = cssns("OcToggle");

interface OcToggleProps {
	active?: boolean;
	handleClick?: () => void;
	width?: number;
	enabledLabel?: React.ReactNode;
	disabledLabel?: React.ReactNode;
	id?: string;
}

interface OcToggleState {
	active: boolean;
}

class OcToggle extends Component<OcToggleProps, OcToggleState> {
	constructor(props: OcToggleProps) {
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
		const { id, enabledLabel, disabledLabel, width } = this.props;
		return (
			<div
				className="wrapper"
				id={id}
				style={(width ? {width} : undefined)}
				onClick={this.toggle}
			>
				<div className="label enabled-label">
					{enabledLabel || (
						<FormattedMessage {...messages.toggleOn} />
					)}
				</div>

				<div className="label disabled-label">
					{disabledLabel || (
						<FormattedMessage {...messages.toggleOff} />
					)}
				</div>

				<Transition
					component={false}
					enter={{
						left: 0,
						translateX: this.state.active
							? spring(width ? width / 2 : 50, {
									stiffness: 145,
									damping: 18
								})
							: spring(0, { stiffness: 145, damping: 18 }),
						borderTopLeftRadius: !this.state.active
							? spring(4, { stiffness: 100, damping: 10 })
							: spring(0, { stiffness: 100, damping: 10 }),
						borderBottomLeftRadius: !this.state.active
							? spring(4, { stiffness: 100, damping: 10 })
							: spring(0, { stiffness: 100, damping: 10 }),
						borderTopRightRadius: this.state.active
							? spring(4, { stiffness: 100, damping: 10 })
							: spring(0, { stiffness: 100, damping: 10 }),
						borderBottomRightRadius: this.state.active
							? spring(4, { stiffness: 100, damping: 10 })
							: spring(0, { stiffness: 100, damping: 10 })
					}}
					leave={{
						left: 0,
						translateX: 0,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						borderBottomLeftRadius: 0
					}}
				>
					<div className="toggler" key="toggler" />
				</Transition>
			</div>
		);
	}
}

export default OcToggle;
export { OcToggleProps, OcToggleState };
