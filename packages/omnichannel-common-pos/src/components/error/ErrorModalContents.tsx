import * as React from "react";
import { Link } from "react-router-dom";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import { default as baselineErrorMessages } from "./Error.messages";
import { ErrorsType, ErrorType } from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import { withFunctionCustomization } from "../../customization";
import { CommonCustomizationPoints } from "../../customization/points/CommonCustomizationPoints";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";
import actions from "../../redux/actions";

const getMessageBundle = withFunctionCustomization(
	CommonCustomizationPoints.ERROR_MODAL_CONTENTS_MESSAGE_INJECTOR,
	() => {
		return baselineErrorMessages;
	}
);

interface ErrorMessageProps {
	error: ErrorType;
}

interface ErrorModalContentsProps {
	error?: ErrorsType;
	onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props: ErrorMessageProps, context: ContextType) => {
	const { error } = props;
	const { code } = error;
	const errorMessages = getMessageBundle(baselineErrorMessages);
	const errorMessageObject = (errorMessages as any)[code || ""];

	if (errorMessageObject) {
		return <>{context.intl.formatMessage(errorMessageObject)}</>;
	} else if (error.detail) {
		return <span>{error.detail}</span>;
	} else {
		return (
			<FormattedMessage {...errorMessages.apiUndefinedError}/>
		);
	}
};
ErrorMessage.contextTypes = contextTypesValidationMap;

const ErrorModalContents: React.FC<ErrorModalContentsProps> = (props: ErrorModalContentsProps, context: ContextType) => {

	if (!props.error) {
		return null;
	}

	const errorMessages = getMessageBundle(baselineErrorMessages);

	const { error } = props;

	const errorType = error.status || error.title || "";
	const errors = error.errors || [];
	const defaultOnClose = () => {
		context.flux.reduxStore.dispatch(actions.error.clearError());
	};
	const onClose = props.onClose || defaultOnClose;
	return (
		<>
			<div className="modal-body-content">
				{props.error.link && props.error.link.message ? (
					<FormattedMessage {...props.error.link.message} />
				) : (
					errors.map((error, index) => {
						return (
							<p key={index} className="error-row" data-test-name="error-message">
								<ErrorMessage error={error}/>
							</p>
						);
					})
				)}
				{errorType && (
					<p>
						<FormattedMessage
							{...errorMessages.errorCodeOrTitle}
							values={{title: String(errorType)}}
						/>
					</p>
				)}
			</div>
			<div className="modal-footer">
				<div />
				{error.link && (
					<Link to={error.link.route} className={error.link.class} id={error.link.id}>
						<OcButton
							id="error-modal-container-return"
							outline={true}
							buttonType={OcButtonType.PRIMARY}
							onClick={defaultOnClose}
						>
							<FormattedMessage {...errorMessages.goBack}/>
						</OcButton>
					</Link>
				)}
				{!props.error.link && (
					<OcButton
						id="error-modal-container-close"
						buttonType={OcButtonType.PRIMARY}
						onClick={onClose}
					>
						<FormattedMessage {...errorMessages.close}/>
					</OcButton>
				)}
			</div>
		</>
	);
};

ErrorModalContents.contextTypes = contextTypesValidationMap;

export default ErrorModalContents;

export {
	ErrorModalContents,
	ErrorModalContentsProps,
	ErrorMessage,
	ErrorMessageProps,
};
