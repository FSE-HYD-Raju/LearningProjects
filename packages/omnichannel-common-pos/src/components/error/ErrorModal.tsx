import * as R from "react";
import { noop } from "lodash";
import ErrorModalContents, { ErrorModalContentsProps } from "./ErrorModalContents";
import errorMessages from "./Error.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcModal from "../ocComponents/OcModal";
import cssns from "../../utils/cssnsConfig";

const React = cssns("ErrorModal").React as typeof R;

const ErrorModal: R.FC<ErrorModalContentsProps> = (props: ErrorModalContentsProps) => {
	return props.error ? (
		<OcModal
			showModal={true}
			id="signInModal"
			className="ErrorModal"
			smallModal={true}
			keyboard={true}
			title={
				<FormattedMessage {...errorMessages.errorModalTitle} />}
			onClose={props.onClose || noop}
			noFooter={true}
		>
			<ErrorModalContents {...props} />
		</OcModal>
	) : null;
};

export default ErrorModal;

export {
	ErrorModal,
	ErrorModalContentsProps,
};
