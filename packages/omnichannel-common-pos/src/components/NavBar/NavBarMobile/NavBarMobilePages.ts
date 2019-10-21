import { commonDigitalLifeRoutes } from "../../../routes/commonRoutesMap";
import { NavBarMobileMessages } from "./NavBarMobile.messages";
import { FormattedMessageDescriptor } from "../../../channelUtils";

interface NavBarMobilePage {
	title: string;
	url: string;
	id: string;
	primary?: boolean;
	messages: FormattedMessageDescriptor;
}

const digitalLifePages: Array<NavBarMobilePage> = [{
		title: "eCare",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink(),
		id: "overview",
		primary: true,
		messages: NavBarMobileMessages.navBarMobileEcare,
	}, {
		title: "People",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_PERSON.createLink(),
		id: "people",
		messages: NavBarMobileMessages.navBarMobilePeople,
	}, {
		title: "Things",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_THINGS.createLink(),
		id: "things",
		messages: NavBarMobileMessages.navBarMobileThings,
	}, {
		title: "Financials",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_RECURRENT_TOP_UPS.createLink(),
		id: "financials",
		messages: NavBarMobileMessages.navBarMobileFinancials,
	}, {
		title: "Orders",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_ORDERS.createLink(),
		id: "orders",
		messages: NavBarMobileMessages.navBarMobileOrders,
	}, {
		title: "Support",
		url: commonDigitalLifeRoutes.DIGITAL_LIFE_SUPPORT.createLink(),
		id: "support",
		messages: NavBarMobileMessages.navBarMobileSupport,
	}
];

export {
	NavBarMobilePage,
	digitalLifePages,
};
