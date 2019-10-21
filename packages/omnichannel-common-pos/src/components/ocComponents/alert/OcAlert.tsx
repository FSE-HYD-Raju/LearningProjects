import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import { FC, ReactNode, SyntheticEvent } from "react";

const { React } = cssns("OcAlert");

enum OcAlertType {
	WARNING = "WARNING",
	DANGER = "DANGER",
	SUCCESS = "SUCCESS",
	INFO = "INFO"
}

interface OcAlertProps {
	alertType: keyof typeof OcAlertType;
	className?: string;
	children?: ReactNode;
	handleClose?: (event: SyntheticEvent<any>) => void;
	dismissable?: boolean;
	style?: Record<string, number | string>;
	closeButtonId?: string;
	id?: string;
}

const CROSS_SIGN: string = "×";

const OcAlert: FC<OcAlertProps> = props => {
	const { alertType = OcAlertType.INFO, className = "", children, handleClose, dismissable, style, closeButtonId, id } = props;
	return (
		<div
			id={id}
			style={style}
			className={classnames({
				alert: true,
				"alert-dismissible": dismissable,
				"alert-warning": alertType === OcAlertType.WARNING,
				"alert-danger": alertType === OcAlertType.DANGER,
				"alert-success": alertType === OcAlertType.SUCCESS,
				"alert-info": alertType === OcAlertType.INFO,
				[className]: Boolean(className)
			})}
		>
			<div className="container">
				<div className="content">
					{children}
				</div>

				{dismissable &&
				<button className="dismissbtn" onClick={handleClose} id={closeButtonId}>
					{CROSS_SIGN}
				</button>}
			</div>
		</div>
	);
};

OcAlert.displayName = "OcAlert";

export {
	OcAlertProps,
	OcAlert,
	OcAlertType
};
