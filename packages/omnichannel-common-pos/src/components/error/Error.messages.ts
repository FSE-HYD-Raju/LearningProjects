/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface ErrorMessagesType {
	apiErrorCancelOrderFailed: FormattedMessage.MessageDescriptor;
	apiErrorCustomerCaseNotFound: FormattedMessage.MessageDescriptor;
	apiErrorCustomerCaseUpdateFailed: FormattedMessage.MessageDescriptor;
	apiErrorForbidden: FormattedMessage.MessageDescriptor;
	apiErrorInternalServerError: FormattedMessage.MessageDescriptor;
	apiErrorMsisdnBundleNotCreated: FormattedMessage.MessageDescriptor;
	apiErrorNotFound: FormattedMessage.MessageDescriptor;
	apiErrorOrderNotFound: FormattedMessage.MessageDescriptor;
	apiErrorPaymentMethodsNotFound: FormattedMessage.MessageDescriptor;
	apiErrorPaymentMethodsSelectionFailed: FormattedMessage.MessageDescriptor;
	apiErrorPaymentMethodsUnavailable: FormattedMessage.MessageDescriptor;
	apiErrorPersonUpdateFailed: FormattedMessage.MessageDescriptor;
	apiErrorProductNotFound: FormattedMessage.MessageDescriptor;
	apiErrorUnableToDeleteSaveBasketItem: FormattedMessage.MessageDescriptor;
	apiErrorUnableToSaveBasket: FormattedMessage.MessageDescriptor;
	apiErrorUnableToSaveBasketItem: FormattedMessage.MessageDescriptor;
	apiErrorUnauthorized: FormattedMessage.MessageDescriptor;
	apiUndefinedError: FormattedMessage.MessageDescriptor;
	close: FormattedMessage.MessageDescriptor;
	errorCodeOrTitle: FormattedMessage.MessageDescriptor;
	errorModalTitle: FormattedMessage.MessageDescriptor;
	goBack: FormattedMessage.MessageDescriptor;
}
const ErrorMessages: ErrorMessagesType = defineMessages({
	apiErrorCancelOrderFailed: {
		id: "api-error-cancel-order-failed",
		description: "Api error cancel order failed",
		defaultMessage: "Unable to cancel order."
	},
	apiErrorCustomerCaseNotFound: {
		id: "api-error-customer-case-not-found",
		description: "Api error customer case not found",
		defaultMessage: "Requested customer case could not be found."
	},
	apiErrorCustomerCaseUpdateFailed: {
		id: "api-error-customer-case-update-failed",
		description: "Api error customer case update failed",
		defaultMessage: "Unable to update customer case"
	},
	apiErrorForbidden: {
		id: "api-error-forbidden",
		description: "Api error forbidden, user might not have the necessary permissions for a resource",
		defaultMessage: "Access denied."
	},
	apiErrorInternalServerError: {
		id: "api-error-internal-server-error",
		description: "Internal server error, a generic error message",
		defaultMessage: "Unexpected error occurred."
	},
	apiErrorMsisdnBundleNotCreated: {
		id: "api-error-unable-to-create-msisdn-bundle",
		description: "Api error unable to create msisdn bundle",
		defaultMessage: "Unable to create msisdn bundle"
	},
	apiErrorNotFound: {
		id: "api-error-not-found",
		description: "Api error not found, common 404 error message",
		defaultMessage: "The requested resource could not be found."
	},
	apiErrorOrderNotFound: {
		id: "api-error-order-not-found",
		description: "Api error order not found",
		defaultMessage: "Requested order could not be found."
	},
	apiErrorPaymentMethodsNotFound: {
		id: "api-error-payment-method-not-found",
		description: "Api error payment method not found",
		defaultMessage: "Requested payment method could not be found."
	},
	apiErrorPaymentMethodsSelectionFailed: {
		id: "api-error-payment-method-selection-failed",
		description: "Api error payment method selection failed",
		defaultMessage: "Payment method selection failed."
	},
	apiErrorPaymentMethodsUnavailable: {
		id: "api-error-payment-methods-unavailable",
		description: "Api error payment methods not available",
		defaultMessage: "There are no payment methods available"
	},
	apiErrorPersonUpdateFailed: {
		id: "api-error-person-update-failed",
		description: "Api error person update failed",
		defaultMessage: "Unable to update person"
	},
	apiErrorProductNotFound: {
		id: "api-error-product-not-found",
		description: "Api error product not found",
		defaultMessage: "The requested product could not be found."
	},
	apiErrorUnableToDeleteSaveBasketItem: {
		id: "api-error-unable-to-delete-basket-item",
		description: "Api error unable to delete basket item",
		defaultMessage: "Unable to delete the basket item."
	},
	apiErrorUnableToSaveBasket: {
		id: "api-error-unable-to-save-basket",
		description: "Api error unable to save basket",
		defaultMessage: "Unable to save the basket."
	},
	apiErrorUnableToSaveBasketItem: {
		id: "api-error-unable-to-save-basket-item",
		description: "Api error unable to save basket item",
		defaultMessage: "Unable to save the basket item."
	},
	apiErrorUnauthorized: {
		id: "api-error-unauthorized",
		description: "Api error unauthorized, use when authentication is required and has failed or has not yet been provided",
		defaultMessage: "Authentication is required."
	},
	apiUndefinedError: {
		id: "undefined-api-error",
		description: "Undefined api error, used when no specific translation has been created from api errors.",
		defaultMessage: "Unexpected error occurred."
	},
	close: {
		id: "error-modal-container-close-button-text",
		description: "Text for the ErrorModalContents close button",
		defaultMessage: "Close"
	},
	errorCodeOrTitle: {
		id: "error-code-or-title",
		description: "Code or title of the error",
		defaultMessage: "Error {title}"
	},
	errorModalTitle: {
		id: "error-modal-title",
		description: "Title for error modal",
		defaultMessage: "Error"
	},
	goBack: {
		id: "return-to-previous-page",
		description: "Link back to previous page",
		defaultMessage: "Go back"
	},
});

export default ErrorMessages;
export { ErrorMessages, ErrorMessagesType };
