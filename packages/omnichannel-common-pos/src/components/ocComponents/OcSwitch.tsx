import cssns from "../../utils/cssnsConfig";
import * as classnames from "classnames";
import { FC } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "./OcComponents.messages";
const { React } = cssns("OcSwitch");

interface OcSwitchProps {
	active: boolean;
	handleClick: () => void;
	enabledLabel: string;
	disabledLabel: string;
	id: string;
	className: string;
}

const OcSwitch: FC<OcSwitchProps> = props => {
	const {
		active,
		className,
		disabledLabel,
		enabledLabel,
		handleClick,
		id
	} = props;

	return (
		<div className={className}>
			<a
				id={id}
				className="OcSwitch"
				onClick={e => {
					e.preventDefault();
					handleClick();
				}}
			>
				<div
					className={classnames({
						toggler: true,
						"toggler-active": !active
					})}
				/>
				<div className={active ? "ocToggleActive" : "ocToggleInactive"}>
					{enabledLabel || (
						<FormattedMessage {...messages.on} />
					)}
				</div>
				<div
					className={!active ? "ocToggleActive" : "ocToggleInactive"}
				>
					{disabledLabel || (
						<FormattedMessage {...messages.off} />
					)}
				</div>
			</a>
		</div>
	);
};

export default OcSwitch;
export { OcSwitchProps };
