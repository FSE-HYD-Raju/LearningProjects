import { FormattedMessage } from "../../channelUtils";
import OcModal from "../ocComponents/OcModal";
import navigationMessages from "./NavigationConfirmModal.messages";
import { FC, ReactNode } from "react";
import cssns from "../../utils/cssnsConfig";

const { React } = cssns("NavigationConfirmModal");

interface NavigationConfirmModalProps {
	visible: boolean;
	onClose?: () => void;
	onConfirm?: () => void;
	title?: string;
	okButton?: ReactNode;
	cancelButtonLabel?: string;
	children?: ReactNode;
}

const NavigationConfirmModal: FC<NavigationConfirmModalProps> = props => {
	const {
		visible,
		title,
		onClose,
		onConfirm,
		children
	} = props;
	return (
		<OcModal
			showModal={visible}
			smallModal={true}
			title={title || (<FormattedMessage {...navigationMessages.confirmNavigation}/>)}
			onClose={onClose}
			keyboard={true}
			enforceFocus={false}
			onOk={onConfirm}
			okButtonLabel={<FormattedMessage {...navigationMessages.navigationOk}/>}
		>
			{children && (
				<div className="container">{children}</div>
			)}
		</OcModal>
	);
};

export {
	NavigationConfirmModalProps,
	NavigationConfirmModal
};
