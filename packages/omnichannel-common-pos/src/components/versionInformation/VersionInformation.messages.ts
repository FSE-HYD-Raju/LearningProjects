/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface VersionInformationMessagesType {
	branch: FormattedMessage.MessageDescriptor;
	buildInfo: FormattedMessage.MessageDescriptor;
	buildInformation: FormattedMessage.MessageDescriptor;
	commit: FormattedMessage.MessageDescriptor;
	mocks: FormattedMessage.MessageDescriptor;
	name: FormattedMessage.MessageDescriptor;
	version: FormattedMessage.MessageDescriptor;
}
const VersionInformationMessages: VersionInformationMessagesType = defineMessages({
	branch: {
		id: "version-information-branch",
		description: "Version information display, branch label",
		defaultMessage: "Branch"
	},
	buildInfo: {
		id: "version-information-build-info",
		description: "Version information display, build info label",
		defaultMessage: "Build info"
	},
	buildInformation: {
		id: "version-information-build-information",
		description: "Version information display, build information label",
		defaultMessage: "Build information"
	},
	commit: {
		id: "version-information-commit",
		description: "Version information display, commit label",
		defaultMessage: "Commit"
	},
	mocks: {
		id: "version-information-mocks",
		description: "Version information display, mocks label",
		defaultMessage: "Mocks"
	},
	name: {
		id: "version-information-name",
		description: "Version information display, name label",
		defaultMessage: "Name"
	},
	version: {
		id: "version-information-version",
		description: "Version information display, version label",
		defaultMessage: "Version"
	},
});

export default VersionInformationMessages;
export { VersionInformationMessages, VersionInformationMessagesType };
