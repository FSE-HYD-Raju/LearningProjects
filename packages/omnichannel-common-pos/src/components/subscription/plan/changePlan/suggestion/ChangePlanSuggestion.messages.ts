/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ChangePlanSuggestionMessagesType {
	availablePlans: FormattedMessage.MessageDescriptor;
	changePlanSuggestionHeader: FormattedMessage.MessageDescriptor;
	currentPlan: FormattedMessage.MessageDescriptor;
	currentPlanCalls: FormattedMessage.MessageDescriptor;
	currentPlanData: FormattedMessage.MessageDescriptor;
	currentPlanMessages: FormattedMessage.MessageDescriptor;
	currentPlanRecurrency: FormattedMessage.MessageDescriptor;
}
const ChangePlanSuggestionMessages: ChangePlanSuggestionMessagesType = defineMessages({
	availablePlans: {
		id: "change-plan-available-plans",
		description: "digital-life, change plan available plans",
		defaultMessage: "Available plans"
	},
	changePlanSuggestionHeader: {
		id: "change-plan-header",
		description: "digital-life, change plan headline",
		defaultMessage: "Change plan"
	},
	currentPlan: {
		id: "change-plan-current-plan",
		description: "digital-life, change plan current plan",
		defaultMessage: "Current plan"
	},
	currentPlanCalls: {
		id: "change-plan-current-plan-calls",
		description: "digital-life, change plan, current plan calls label",
		defaultMessage: "Calls"
	},
	currentPlanData: {
		id: "change-plan-current-plan-data",
		description: "digital-life, change plan, current plan data label",
		defaultMessage: "Data"
	},
	currentPlanMessages: {
		id: "change-plan-current-plan-messages",
		description: "digital-life, change plan, current plan messages label",
		defaultMessage: "Messages"
	},
	currentPlanRecurrency: {
		id: "change-plan-current-plan-recurrency",
		description: "digital-life, change plan, current plan recurrency",
		defaultMessage: "{currency} / mo."
	},
});

export default ChangePlanSuggestionMessages;
export { ChangePlanSuggestionMessages, ChangePlanSuggestionMessagesType };
