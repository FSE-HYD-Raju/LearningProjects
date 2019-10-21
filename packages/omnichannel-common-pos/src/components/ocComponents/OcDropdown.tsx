import { Component } from "react";
import Transition from "react-motion-ui-pack";
import { spring } from "react-motion";
import cssns from "../../utils/cssnsConfig";
import OnClickOut, { HandleClickOutside, InjectedOnClickOutProps } from "react-onclickoutside";
import * as classnames from "classnames";
const { React } = cssns("OcDropdown");

interface OcDropdownProps {
	children?: React.ReactNode;
	containerClasses?: string;
	triangleClasses?: string;
	contentClasses?: string;
	dropdownKey: string;
	marginTop?: string;
	triangleColor?: string;
	trianglePosition?: string;
	position?: string;
	style?: React.CSSProperties;
	handleClickOutside?: (event: any) => void;
}

class OcDropdown extends Component<OcDropdownProps & InjectedOnClickOutProps>
	implements HandleClickOutside<any> {

	static defaultProps = {
		trianglePosition: "left",
		position: "left"
	};

	handleClickOutside(event: any) {
		if (this.props.handleClickOutside) {
			this.props.handleClickOutside(event);
		}
	}

	render() {
		const containerClasses = this.props.containerClasses || "";
		const triangleClasses = this.props.triangleClasses || "";
		const contentClasses = this.props.contentClasses;

		const {
			triangleColor,
			marginTop,
			trianglePosition,
			position,
			style
		} = this.props;

		return (
			<Transition
				component={false}
				enter={{
					opacity: spring(1.0, {stiffness: 1250, damping: 40}),
					scaleX: spring(1.0, {stiffness: 1250, damping: 40}),
					scaleY: spring(1.0, {stiffness: 1250, damping: 40})
				}}
				leave={{
					opacity: 0,
					scaleX: spring(0, {stiffness: 550, damping: 40}),
					scaleY: spring(0, {stiffness: 550, damping: 40})
				}}
			>
				<div
					className={classnames("container", containerClasses, {
						"container-right": position === "right"
					})}
					style={style}
					key={"dropdown" + this.props.dropdownKey}
					id={this.props.dropdownKey}
				>
					<div
						className={classnames("inner-container", {
							"inner-container-left": trianglePosition === "left"
						})}
						style={{marginTop: marginTop ? marginTop : "12px"}}
					>
						{containerClasses !== "noTriangle" && (
							<div
								className={classnames(
									"triangle",
									triangleClasses,
									{
										"triangle-right": trianglePosition === "right",
										"triangle-top": trianglePosition === "top",
										"triangle-left": trianglePosition === "left"
									}
								)}
								style={{
									borderColor:
										triangleColor &&
										`transparent transparent ${triangleColor} transparent`
								}}
							/>
						)}
						<div
							className={classnames("content", contentClasses)}
							style={{
								borderTopColor: triangleColor && triangleColor
							}}
						>
							{this.props.children}
						</div>
					</div>
				</div>
			</Transition>
		);
	}
}

const OcDropdownWithClickOutside = OnClickOut<OcDropdownProps>(OcDropdown);
export default OcDropdownWithClickOutside;
export {OcDropdownProps};
