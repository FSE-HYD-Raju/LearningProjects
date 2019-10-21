import { Component } from "react";
import cssns from "../../../utils/cssnsConfig";
import messages from "./Characteristics.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";

const { React } = cssns("CharacteristicsNotifications");

interface CharacteristicsNotificationsProps {
	mappedProductOfferingErrors?: Array<any>;
	targetCharacteristic: string;
	clearProductOfferingErrors: () => void;
}

class CharacteristicsNotifications extends Component<CharacteristicsNotificationsProps> {

	componentWillUnmount() {
		if (this.props.clearProductOfferingErrors) {
			this.props.clearProductOfferingErrors();
		}
	}

	render() {

		if (this.props.mappedProductOfferingErrors && this.props.mappedProductOfferingErrors.length > 0) {
			const showErrors = this.props.mappedProductOfferingErrors.map((matchingError: any) => {
					const msg = (messages as any)[matchingError.messageId];
					if ((matchingError && matchingError.characteristic === this.props.targetCharacteristic)
						|| (matchingError && matchingError.characteristic === "default")) {
						return (
							<div
								className="characteristic-error-notification"
								key={"error-key-" + matchingError.errCode}
								id={"error-id-" + matchingError.errCode}
							>
								{msg && <FormattedMessage {...msg}/>}
							</div>
						);
					} else {
						return null;
					}
				}
			);
			return <div>{showErrors}</div>;
		} else {
			return null;
		}
	}
}

export default CharacteristicsNotifications;
export {
	CharacteristicsNotificationsProps,
};
