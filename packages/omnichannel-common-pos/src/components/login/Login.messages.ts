/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface LoginMessagesType {
	changePassword: FormattedMessage.MessageDescriptor;
	digitalLife: FormattedMessage.MessageDescriptor;
	editProfile: FormattedMessage.MessageDescriptor;
	newCustomer: FormattedMessage.MessageDescriptor;
	register: FormattedMessage.MessageDescriptor;
	signOut: FormattedMessage.MessageDescriptor;
}
const LoginMessages: LoginMessagesType = defineMessages({
	changePassword: {
		id: "change-password-link",
		description: "navbar, login dropdown: change password",
		defaultMessage: "Change Password"
	},
	digitalLife: {
		id: "navbar-go-to-digi-life",
		description: "navbar, login dropdown: Go to digital life",
		defaultMessage: "Go to digital life"
	},
	editProfile: {
		id: "edit-profile",
		description: "navbar, login dropdown: edit profile",
		defaultMessage: "Edit profile"
	},
	newCustomer: {
		id: "logindropdown-new-customer",
		description: "navbar, login dropdown: New customer prompt",
		defaultMessage: "New customer?"
	},
	register: {
		id: "logindropdown-register",
		description: "navbar, login dropdown: Link to registration form",
		defaultMessage: "Register"
	},
	signOut: {
		id: "navbar-sign-out-link",
		description: "navbar, login dropdown: Sign out",
		defaultMessage: "Sign out"
	},
});

export default LoginMessages;
export { LoginMessages, LoginMessagesType };
