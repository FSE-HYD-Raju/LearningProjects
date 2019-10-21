import cssns from "../../utils/cssnsConfig";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import messages from "../../commonMessages";
import { ReactNode, FC } from "react";
import { ErrorsType } from "../../redux/types";
import { ErrorType } from "../../redux/types/ErrorType";
const { React } = cssns("ErrorLabel");

interface ErrorLabelProps {
	error?: ErrorsType;
	message?: ReactNode;
}

const ErrorLabel: FC<ErrorLabelProps> = (props: ErrorLabelProps) => {
	return (
		<div className="text-center container">
			{props.error && props.error.errors && props.error.errors.length > 0 &&
				props.error.errors.map((error: ErrorType, index: number) => {
				const errorCode = error.code && (messages as any)[error.code] ? (
					<FormattedMessage {...(messages as any)[error.code]} />
				) : (
					error.code
				);
				return (
					<span key={`errorLabel${index}`} className="label label-danger message">
							{errorCode}
						</span>
				);
			})}
			{!props.error && (
				<div className="label label-danger message">
					{props.message}
				</div>
			)}
		</div>
	);
};

export default ErrorLabel;

export {
	ErrorLabel,
	ErrorLabelProps
};
