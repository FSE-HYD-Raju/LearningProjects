import * as React from "react";
import SliderConfigurationView from "./SliderConfigurationView";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import FormattedMessage, { FormattedMessageDescriptor } from "../../../../channelUtils/FormattedMessage";

interface SliderConfigurationSingleGroupProps {
	values: number[];
	selectedValue?: number;
	unit: FormattedMessageDescriptor;
	iconClassNames: string;
	message: FormattedMessageDescriptor;
}

interface SliderConfigurationGroupProps {
	configurations: Record<string, SliderConfigurationSingleGroupProps>;
	handleChange: (key: string, value: number) => void;
	unlimitedMessage: FormattedMessageDescriptor;
}

const SliderConfigurationGroup: React.FC<SliderConfigurationGroupProps> = (props: SliderConfigurationGroupProps, context: ContextType) => {
	// creates handler for single slider and calls props handler with appropriate key
	const getChangeHandler = (key: string): ((index: number) => void) => {
		const handler = (index: number): void => {
			const { configurations, handleChange } = props;
			const configurationsForKey = configurations[key];
			if (configurationsForKey.values) {
				const value = configurationsForKey.values[index];
				handleChange(key, value);
			}
		};
		return handler;
	};
	const { formatMessage } = context.intl;
	const { configurations, unlimitedMessage } = props;
	return (
		<div className="SliderConfigurationGroup">
			{Object.keys(configurations).map((key: string) => {
				const configuration = configurations[key];

				return (
					<SliderConfigurationView
						key={key}
						values={configuration.values}
						selectedValue={configuration.selectedValue}
						unit={formatMessage(configuration.unit)}
						onChange={getChangeHandler(key)}
						selectionMessage={
							<FormattedMessage {...configuration.message} />}
						unlimitedMessage={
							<FormattedMessage {...unlimitedMessage} />}
						iconClassName={configuration.iconClassNames}
					/>
				);
			})}
		</div>
	);
};

SliderConfigurationGroup.contextTypes = contextTypesValidationMap;
export {
	SliderConfigurationGroupProps,
	SliderConfigurationGroup,
	SliderConfigurationSingleGroupProps,
};
