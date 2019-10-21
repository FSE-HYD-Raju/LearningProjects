import cssns from "../../utils/cssnsConfig";
import { Modal, Sizes } from "react-bootstrap";
import classnames from "classnames";
import { FC, SyntheticEvent } from "react";
import { OcModalFooter } from "./OcModalFooter";

const { React } = cssns("OcModal");

interface OcModalProps {
	id: string;
	backdropClose: boolean;
	backdropStyle: React.CSSProperties;
	bsSize: Sizes;
	children: React.ReactNode;
	className: string;
	reverseFooter: boolean;
	enforceFocus: boolean;
	extraLargeModal: boolean;
	fitScreen: boolean;
	onBack?: (...args: any[]) => void;
	onOk: (e: SyntheticEvent<HTMLButtonElement>) => void;
	headerActionButton: React.ReactNode;
	hideCloseButton: boolean;
	keyboard: boolean;
	largeModal: boolean;
	noFooter: boolean;
	noHeader: boolean;
	okButton: React.ReactNode;
	okButtonLabel?: React.ReactNode;
	okDisabled: boolean;
	onClose: (...args: any[]) => void;
	showModal: boolean;
	smallModal: boolean;
	style: React.CSSProperties;
	title: React.ReactNode;
	customFooter?: React.ReactNode;
}
const OcModal: FC<Partial<OcModalProps>> = (props: Partial<OcModalProps>) => {
	const className = classnames({
		this: true,
		"modal-fit-screen": props.fitScreen,
		"modal-small ": props.smallModal,
		"modal-large": props.largeModal,
		"modal-x-large ": props.extraLargeModal,
		[`${props.className}`]: props.className
	});

	const showCloseButton = props.onClose && !props.hideCloseButton;

	const footerClassName = classnames({
		"flex-row-reverse": props.reverseFooter
	});

	const headerClassName = classnames({
		"reverse-header": !props.hideCloseButton
	});

	const handleClose = () => {
		if (props.onClose) {
			props.onClose();
		}
	};

	return (
		<Modal
			backdrop={props.backdropClose ? true : "static"}
			backdropStyle={props.backdropStyle}
			bsSize={props.bsSize}
			className={className}
			enforceFocus={props.enforceFocus !== false}
			keyboard={props.keyboard === false ? props.keyboard : true}
			onHide={handleClose}
			show={props.showModal}
			style={props.style}
		>
			{!props.noHeader && (<Modal.Header
				className={headerClassName}
				closeButton={showCloseButton}
			>
				<div className="header-container">
					<h3 className="modal-title">{props.title}</h3>
					{props.headerActionButton}
				</div>
			</Modal.Header>)}

			<Modal.Body>{props.children}</Modal.Body>

			{!props.noFooter && !props.customFooter && (
				<OcModalFooter
					footerClassName={footerClassName}
					actionHandler={props.onOk}
					actionMessage={props.okButtonLabel}
					actionDisabled={props.okDisabled}
					cancelButtonHandler={props.onBack}
					onClose={props.onClose}
				/>
			)}
			{props.customFooter && props.customFooter}
		</Modal>
	);
};

OcModal.defaultProps = {
	hideCloseButton: false
};

export default OcModal;
export { OcModalProps };
