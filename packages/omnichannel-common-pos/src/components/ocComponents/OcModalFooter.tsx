import cssns from "../../utils/cssnsConfig";
import classnames from "classnames";
import { FC, SyntheticEvent } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "./OcComponents.messages";
import {OcButton, OcButtonType} from "./button/OcButton";

const { React } = cssns("OcModal");

interface OcModalFooterProps {
	footerClassName?: string;
	actionHandler?: (e: SyntheticEvent<HTMLButtonElement>) => void;
	onClose?: (...args: any[]) => void;
	actionMessage: React.ReactNode;
	actionDisabled?: boolean;
	cancelButtonHandler?: (...args: any[]) => void;
}

const OcModalFooter: FC<OcModalFooterProps> = (props: Partial<OcModalFooterProps>) => {

	const getClassName = (parentClassName: string | undefined) => {
		return classnames({
			"modal-footer": true,
			"justify-content-between": props.actionMessage,
			"justify-content-end": !props.actionMessage,
		}) + " " + parentClassName;
	};

	return (
		<div className={getClassName(props.footerClassName)}>
			{props.actionMessage ? (
				<>
					<OcButton
						id="oc-modal-cancel-button"
						buttonType={OcButtonType.PRIMARY}
						outline={true}
						onClick={props.cancelButtonHandler || props.onClose}
					>
						<FormattedMessage {...messages.modalCancelButton} />
					</OcButton>
					<OcButton
						id={"oc-modal-action-button"}
						buttonType={OcButtonType.PRIMARY}
						disabled={props.actionDisabled}
						onClick={props.actionHandler}
					>
						{props.actionMessage}
					</OcButton>
				</>
			) :
				<OcButton
					id="oc-modal-close-button"
					buttonType={OcButtonType.PRIMARY}
					onClick={props.onClose}
				>
					<FormattedMessage {...messages.close} />
				</OcButton>
			}
		</div>
	);
};

export { OcModalFooter, OcModalFooterProps }
