import * as React from "react";
import serviceMessages from "./Services.messages";
import { FormattedMessage } from "../../../channelUtils";

enum ServiceTransitionsMessageStateEnum {
	enable = "enable",
	disable = "disable",
}

type ServiceTransitionsMessageState = keyof typeof ServiceTransitionsMessageStateEnum;

interface ServiceTransitionsMessageProps {
	state: ServiceTransitionsMessageState;
}

const ServiceTransitionsMessage: React.FC<ServiceTransitionsMessageProps> = props => {
	const state = props.state ? props.state.toLowerCase() : "";
	switch (state) {
		case ServiceTransitionsMessageStateEnum.enable:
			return (
				<FormattedMessage {...serviceMessages.enableService}/>
			);
		case ServiceTransitionsMessageStateEnum.disable:
			return (
				<FormattedMessage {...serviceMessages.disableService}/>
			);
		default:
			console.error("Unidentified service state: " + state);
			return null;
	}
};

export default ServiceTransitionsMessage;

export {
	ServiceTransitionsMessageStateEnum,
	ServiceTransitionsMessageProps,
	ServiceTransitionsMessageState
};
