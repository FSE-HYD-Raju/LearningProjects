/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface InstallationTimeConfigurationMessagesType {
	configureFixedLine: FormattedMessage.MessageDescriptor;
	selectInstallationTime: FormattedMessage.MessageDescriptor;
	selectPreferredInstallation: FormattedMessage.MessageDescriptor;
}
const InstallationTimeConfigurationMessages: InstallationTimeConfigurationMessagesType = defineMessages({
	configureFixedLine: {
		id: "InstallationTimeConfigurationModal-header-text",
		description: "InstallationTimeConfigurationModal, header text",
		defaultMessage: "Configure Fixed Line"
	},
	selectInstallationTime: {
		id: "InstallationTimeConfigurationModal-select-time",
		description: "InstallationTimeConfigurationModal, select installation time text",
		defaultMessage: "Select installation time"
	},
	selectPreferredInstallation: {
		id: "InstallationTimeConfigurationModal-info-text",
		description: "InstallationTimeConfigurationModal, info text",
		defaultMessage: "Select the preferred installation time for broadband connection"
	},
});

export default InstallationTimeConfigurationMessages;
export { InstallationTimeConfigurationMessages, InstallationTimeConfigurationMessagesType };
