/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface NavBarButtonsMessagesType {
	basket: FormattedMessage.MessageDescriptor;
	eCare: FormattedMessage.MessageDescriptor;
	eShop: FormattedMessage.MessageDescriptor;
	navigation: FormattedMessage.MessageDescriptor;
	register: FormattedMessage.MessageDescriptor;
	signIn: FormattedMessage.MessageDescriptor;
	stopShopping: FormattedMessage.MessageDescriptor;
	you: FormattedMessage.MessageDescriptor;
}
const NavBarButtonsMessages: NavBarButtonsMessagesType = defineMessages({
	basket: {
		id: "navbar-basket-button-label",
		description: "Navigation bar button label for basket menu",
		defaultMessage: "Basket"
	},
	eCare: {
		id: "navbar-channel-ecare",
		description: "navbar channels: eCare",
		defaultMessage: "eCare"
	},
	eShop: {
		id: "navbar-channel-eshop",
		description: "navbar channels: eShop",
		defaultMessage: "eShop"
	},
	navigation: {
		id: "navbar-mobile-nav-toggle",
		description: "navbar, link: toggle mobile navigation",
		defaultMessage: "Navigation"
	},
	register: {
		id: "navbar-init-register",
		description: "navbar, link: init registration",
		defaultMessage: "Register"
	},
	signIn: {
		id: "navbar-sign-in",
		description: "navbar, button:Sign in",
		defaultMessage: "Sign in"
	},
	stopShopping: {
		id: "navbar-stop-shopping-as-user",
		description: "navbar, button: stop shopping as impersonated user",
		defaultMessage: "Stop shopping as {firstName} {lastName}"
	},
	you: {
		id: "navbar-button-you",
		description: "used with navbar buttons",
		defaultMessage: "You"
	},
});

export default NavBarButtonsMessages;
export { NavBarButtonsMessages, NavBarButtonsMessagesType };
