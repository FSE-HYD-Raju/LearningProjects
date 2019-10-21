import OcDropdown from "./OcDropdown";
import { createPortal } from "react-dom";
import cssns from "../../utils/cssnsConfig";
import { ContextType, contextTypesValidationMap } from "../../types";
import { Component } from "react";
import messages from "./OcComponents.messages";
import * as classnames from "classnames";
import { OcButton, OcButtonDropdownType, OcButtonType } from "./button/OcButton";

const { React } = cssns("OcButtonWithDropdown");

interface OcButtonWithDropdownProps {
	children: any;
	buttonLabel?: string;
	wideButton?: boolean;
	otherModalsOpen?: boolean;
	onClick?: (open: boolean) => void;
}

interface OcButtonWithDropdownState {
	actionMenuVisible: boolean;
	menuTop: number;
	menuLeft: number;
}

class OcButtonWithDropdown extends Component<OcButtonWithDropdownProps, OcButtonWithDropdownState> {
	static contextTypes = contextTypesValidationMap;
	static defaultProps: Partial<OcButtonWithDropdownProps> = {
		wideButton: false,
		otherModalsOpen: false
	};

	private button: React.RefObject<HTMLButtonElement>;

	constructor(props: OcButtonWithDropdownProps, context: ContextType) {
		super(props, context);
		this.button = React.createRef();
		this.state = {
			actionMenuVisible: false,
			menuLeft: 0,
			menuTop: 0
		};
	}

	componentWillReceiveProps(newProps: OcButtonWithDropdownProps): void {
		if (newProps.otherModalsOpen) {
			this.setState({
				actionMenuVisible: false
			});
		}
	}

	toggleActionMenu = (event: any) => {
		event.stopPropagation();
		const rect = this.button.current ? this.button.current.getBoundingClientRect() : null;
		this.setState(({ actionMenuVisible }) => ({
			actionMenuVisible: !actionMenuVisible,
			menuTop: !actionMenuVisible && rect ? rect.top + rect.height + window.scrollY : 0,
			menuLeft: !actionMenuVisible && rect ? rect.left : 0
		}), () => {
			if (this.props.onClick) {
				this.props.onClick(this.state.actionMenuVisible);
			}
		});
	};

	outsideClick = (event: any): void => {
		if (this.button.current && !(event.target === this.button.current || this.button.current.contains(event.target))) {
			this.setState({ actionMenuVisible: false });
		}
	};

	render() {
		const { buttonLabel, wideButton } = this.props;
		const buttonClasses = classnames({ "btn-link": true, wide: wideButton });
		const buttonMessage = buttonLabel || this.context.intl.formatMessage({ ...messages.manage });
		return (
			<div className="container">
				<OcButton
					ref={this.button}
					outline={true}
					buttonType={OcButtonType.PRIMARY}
					dropdownType={OcButtonDropdownType.REGULAR}
					className={buttonClasses}
					htmlBtnType="button"
					id="manage-addons-dropdown-button"
					onClick={this.toggleActionMenu}
				>
					{buttonMessage}
				</OcButton>
				{this.state.actionMenuVisible && (
					createPortal(<OcDropdown
						containerClasses="dropdown no-triangle OcButtonWithDropdown"
						dropdownKey="manage-subscription"
						handleClickOutside={this.outsideClick}
						style={{
							left: this.state.menuLeft + "px",
							top: this.state.menuTop + "px",
							position: "absolute"
						}}
					>
						{this.props.children}
					</OcDropdown>, document.body)
				)}
			</div>
		);
	}
}

export default OcButtonWithDropdown;
export {
	OcButtonWithDropdownProps,
	OcButtonWithDropdownState,
};
