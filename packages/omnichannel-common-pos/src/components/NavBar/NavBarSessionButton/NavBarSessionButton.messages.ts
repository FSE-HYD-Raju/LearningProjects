/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface NavBarSessionButtonMessagesType {
	changesSalesOrganization: FormattedMessage.MessageDescriptor;
	continue: FormattedMessage.MessageDescriptor;
	endSession: FormattedMessage.MessageDescriptor;
	salesOrganizationRoleId: FormattedMessage.MessageDescriptor;
	selectTerminal: FormattedMessage.MessageDescriptor;
	startSession: FormattedMessage.MessageDescriptor;
	startSessionSalesrep: FormattedMessage.MessageDescriptor;
}
const NavBarSessionButtonMessages: NavBarSessionButtonMessagesType = defineMessages({
	changesSalesOrganization: {
		id: "pos-header-change-sales-org-inventory",
		description: "Link to change sales organization and/or inventory in the POS navigation bar on top of the screen",
		defaultMessage: "Change Sales Organization / Inventory"
	},
	continue: {
		id: "salesrep-session-continue",
		description: "salesrep session, continue-button",
		defaultMessage: "Continue"
	},
	endSession: {
		id: "navbar-end-session",
		description: "navbar end session button text",
		defaultMessage: "End session"
	},
	salesOrganizationRoleId: {
		id: "salesrep-session-salesOrganizationRoleId",
		description: "salesrep session salesOrganizationRoleId",
		defaultMessage: "salesOrganizationRoleId"
	},
	selectTerminal: {
		id: "salesrep-session-select-terminal",
		description: "salesrep session, select terminal dropdown",
		defaultMessage: "Select terminal"
	},
	startSession: {
		id: "navbar-start-session",
		description: "navbar start session button text",
		defaultMessage: "Start session"
	},
	startSessionSalesrep: {
		id: "salesrep-start-session-title",
		description: "salesrep-start-session-title",
		defaultMessage: "Start session"
	},
});

export default NavBarSessionButtonMessages;
export { NavBarSessionButtonMessages, NavBarSessionButtonMessagesType };
