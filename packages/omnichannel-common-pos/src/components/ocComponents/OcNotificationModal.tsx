import * as React from "react";
import classnames from "classnames";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "./OcComponents.messages";
import { OcButton, OcButtonType } from "./button/OcButton";

interface OcNotificationModalProps {
	status: string;
	onClose: () => void;
	show: boolean;
}

const OcNotificationModal: React.FC<OcNotificationModalProps> = props => {
	const {status, onClose, show} = props;
	const classes = classnames({
		modal: true,
		fade: show,
		show
	});
	return (
		<div className={classes} tabIndex={-1} role="dialog">
			<div className="fade modal-backdrop in"/>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">
							<FormattedMessage {...messages.notificationModalTitle}/>
						</h5>
					</div>
					<div className="modal-body">
						<FormattedMessage
							{...(status
								? messages.notificationModalTextStatusSuccess
								: messages.notificationModalTextStatusFailed
							)}
						/>
					</div>
					<div className="modal-footer">
						<OcButton buttonType={OcButtonType.PRIMARY} onClick={onClose}>
							<FormattedMessage {...messages.notificationModalOkLabel}/>
						</OcButton>
					</div>
				</div>
			</div>
		</div>
	);
};

OcNotificationModal.defaultProps = {
	show: false
};

export default OcNotificationModal;
export { OcNotificationModalProps };
