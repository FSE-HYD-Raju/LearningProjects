import * as React from "react";
import { ContextType, contextTypesValidationMap } from "../../types";
import { FormattedMessageDescriptor } from "../../channelUtils";

interface TranslatedComponentProps {
	value: string;
	id: string;
	wrapper?: React.ReactType<{value: string, id: string}> | string;
	translation?: string;
	formattedMessage?: FormattedMessageDescriptor;
}

const TranslatedComponent: React.FC<TranslatedComponentProps> = (props: TranslatedComponentProps, context: ContextType) => {
	const { value, id, translation, formattedMessage, wrapper } = props;

	const message: string = translation || (formattedMessage ? context.intl.formatMessage(formattedMessage) : value);

	if (wrapper) {
		const Wrapper = wrapper;
		return (
			<Wrapper value={value} id={id}>
				{message}
			</Wrapper>
		);
	} else {
		return (
			<span id={id}>
				{message}
			</span>
		);
	}
};
TranslatedComponent.contextTypes = contextTypesValidationMap;
export default TranslatedComponent;
export {
	TranslatedComponentProps
};
