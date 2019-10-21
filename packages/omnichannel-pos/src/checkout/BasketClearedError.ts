/*This error is used to display error messages after clearing the basket in checkout process.
When error contains link object, a routing button is displayed instead of closing button.*/
import {
	ErrorContainer,
	commonMessages
} from "omnichannel-common-pos";

const BasketClearedError: any = {
	status: null,
	data: new ErrorContainer({ code: "403" } ),
	errors: [
		{
			detail: "Cannot proceed with checkout because basket was cleared."
		}
	],
	link: {
		route: "/servicedesk/shop",
		class: "oc-no-underline",
		id: "pos-order-completed-contunue-shopping-button",
		message: commonMessages.basketClearedErrorMessage
	}
};

export default BasketClearedError;
