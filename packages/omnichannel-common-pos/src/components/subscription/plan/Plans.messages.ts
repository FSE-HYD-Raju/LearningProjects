/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface PlansMessagesType {
	actions: FormattedMessage.MessageDescriptor;
	activation: FormattedMessage.MessageDescriptor;
	addNewPlan: FormattedMessage.MessageDescriptor;
	addPlan: FormattedMessage.MessageDescriptor;
	allowances: FormattedMessage.MessageDescriptor;
	amountPerMonth: FormattedMessage.MessageDescriptor;
	amountPerPeriod: FormattedMessage.MessageDescriptor;
	back: FormattedMessage.MessageDescriptor;
	balanceTooLow: FormattedMessage.MessageDescriptor;
	buyNow: FormattedMessage.MessageDescriptor;
	cancel: FormattedMessage.MessageDescriptor;
	changePlan: FormattedMessage.MessageDescriptor;
	changeResult: FormattedMessage.MessageDescriptor;
	compare: FormattedMessage.MessageDescriptor;
	compareToCurrent: FormattedMessage.MessageDescriptor;
	comparedProductType: FormattedMessage.MessageDescriptor;
	configuration: FormattedMessage.MessageDescriptor;
	configurePlan: FormattedMessage.MessageDescriptor;
	confirm: FormattedMessage.MessageDescriptor;
	confirmChange: FormattedMessage.MessageDescriptor;
	costsAndValidity: FormattedMessage.MessageDescriptor;
	currentBalance: FormattedMessage.MessageDescriptor;
	currentProductType: FormattedMessage.MessageDescriptor;
	description: FormattedMessage.MessageDescriptor;
	freeOneTime: FormattedMessage.MessageDescriptor;
	freeRecurring: FormattedMessage.MessageDescriptor;
	migrationCost: FormattedMessage.MessageDescriptor;
	month: FormattedMessage.MessageDescriptor;
	monthly: FormattedMessage.MessageDescriptor;
	myCurrentProductType: FormattedMessage.MessageDescriptor;
	newPlan: FormattedMessage.MessageDescriptor;
	newProduct: FormattedMessage.MessageDescriptor;
	noAllowanceData: FormattedMessage.MessageDescriptor;
	noAlternativeOffers: FormattedMessage.MessageDescriptor;
	noCostsAndValidityData: FormattedMessage.MessageDescriptor;
	noPlans: FormattedMessage.MessageDescriptor;
	noProductDescription: FormattedMessage.MessageDescriptor;
	offeringActionToOfferingName: FormattedMessage.MessageDescriptor;
	offeringTypeDowngrade: FormattedMessage.MessageDescriptor;
	offeringTypeUpgrade: FormattedMessage.MessageDescriptor;
	offersForCurrentSubscriptionTitle: FormattedMessage.MessageDescriptor;
	oneTimeFeeDeductionText: FormattedMessage.MessageDescriptor;
	oneTimeFees: FormattedMessage.MessageDescriptor;
	payWithMethod: FormattedMessage.MessageDescriptor;
	plan: FormattedMessage.MessageDescriptor;
	planComparisonCloseModal: FormattedMessage.MessageDescriptor;
	plansListingRecurringFee: FormattedMessage.MessageDescriptor;
	pleaseConfirmChange: FormattedMessage.MessageDescriptor;
	proceedToPayment: FormattedMessage.MessageDescriptor;
	productTypeAddon: FormattedMessage.MessageDescriptor;
	productTypePlan: FormattedMessage.MessageDescriptor;
	purchaseFailed: FormattedMessage.MessageDescriptor;
	purchaseSuccessful: FormattedMessage.MessageDescriptor;
	recurringCharge: FormattedMessage.MessageDescriptor;
	recurringFee: FormattedMessage.MessageDescriptor;
	recurringFeeColumn: FormattedMessage.MessageDescriptor;
	recurringFees: FormattedMessage.MessageDescriptor;
	region: FormattedMessage.MessageDescriptor;
	regionNotAvailable: FormattedMessage.MessageDescriptor;
	relatedServices: FormattedMessage.MessageDescriptor;
	select: FormattedMessage.MessageDescriptor;
	selectedProductType: FormattedMessage.MessageDescriptor;
	switchToThisProductType: FormattedMessage.MessageDescriptor;
	unableToContinueUnexpectedResponse: FormattedMessage.MessageDescriptor;
}
const PlansMessages: PlansMessagesType = defineMessages({
	actions: {
		id: "plans-listing-actions-header",
		description: "Plan listing, Actions column name",
		defaultMessage: "Actions"
	},
	activation: {
		id: "plan-list-price-tag-upfront",
		description: "Plan price, price activation",
		defaultMessage: "activation"
	},
	addNewPlan: {
		id: "ecare-plans-listing-add-new-plan",
		description: "Add new plan text in Plans listing",
		defaultMessage: "Add new plan"
	},
	addPlan: {
		id: "plan-configuration-modal-title-for-new-plan",
		description: "Label for Plan configuration confirmation button when adding new plan",
		defaultMessage: "Add plan"
	},
	allowances: {
		id: "service-desk-customer-details-plan-product-description-allowances-header",
		description: "Allowances header",
		defaultMessage: "Allowances"
	},
	amountPerMonth: {
		id: "confirm-plan-change-current-product-recurring-fee",
		description: "Plan change confirmation modal, current product recurring fee",
		defaultMessage: "{amount} / month"
	},
	amountPerPeriod: {
		id: "confirm-plan-change-selected-offering-recurring-fee-per-period",
		description: "Plan change confirmation modal, selected offering recurring fee per period",
		defaultMessage: "{amount} / {period}"
	},
	back: {
		id: "plan-change-result-modal-back-button-label",
		description: "Plan change result modal, back button label text",
		defaultMessage: "Back"
	},
	balanceTooLow: {
		id: "plan-change-confirmation-balance-limit-surpassed-error",
		description: "Warning shown when customer does not have enough balance to pay for the plan change",
		defaultMessage: "Your balance is too low to commit this change"
	},
	buyNow: {
		id: "buy-new-plan-button",
		description: "Buy new plan for agreement text",
		defaultMessage: "Buy now"
	},
	cancel: {
		id: "plan-configuration-modal-cancel-button-label",
		description: "Cancel button text in Plan configuration modal",
		defaultMessage: "Cancel"
	},
	changePlan: {
		id: "service-desk-customer-details-plans-listing-change-plan-button-text",
		description: "In Service Desk, Customer's Subscriptions, Plan listing, Change plan button text",
		defaultMessage: "Change plan"
	},
	changeResult: {
		id: "plan-change-result-modal-title",
		description: "Title for change result presentation",
		defaultMessage: "Change result"
	},
	compare: {
		id: "compare-plans-modal-title",
		description: "Service Desk, title for plan comparison modal",
		defaultMessage: "Compare {productType}s"
	},
	compareToCurrent: {
		id: "plan-list-compare-to-current-plan",
		description: "Compare to current productType",
		defaultMessage: "Compare to current {productType}"
	},
	comparedProductType: {
		id: "compare-plans-compared-plan-label",
		description: "Service Desk, Plan comparison modal, label for Compared plan",
		defaultMessage: "Compared {productType}"
	},
	configuration: {
		id: "plan-configuration-modal-configure-header-text",
		description: "Plan configuration modal, Configuration prompt header text",
		defaultMessage: "Configuration"
	},
	configurePlan: {
		id: "service-desk-customer-details-plans-listing-configure-plan-button-text",
		description: "In Service Desk, Customer's Subscriptions, Plan listing, Configure plan button text",
		defaultMessage: "Configure plan"
	},
	confirm: {
		id: "plan-change-confirmation-modal-no-payment-button-label",
		description: "Plan change confirmation, text for a no payment button",
		defaultMessage: "Confirm"
	},
	confirmChange: {
		id: "plan-configuration-modal-title",
		description: "Label for Plan configuration confirmation button",
		defaultMessage: "Confirm change"
	},
	costsAndValidity: {
		id: "service-desk-customer-details-plan-product-description-costs-and-validity-header",
		description: "Costs and Validity header",
		defaultMessage: "Costs and Validity"
	},
	currentBalance: {
		id: "plan-change-confirmation-modal-current-balance",
		description: "Plan configuration modal, current balance",
		defaultMessage: "The current balance is +{balanceAmount}"
	},
	currentProductType: {
		id: "plan-configuration-modal-current-product-label-current-plan",
		description: "Plan configuration modal, current product label",
		defaultMessage: "Current {productType}"
	},
	description: {
		id: "plan-configuration-modal-description",
		description: "Plan configuration modal, Description",
		defaultMessage: "Description"
	},
	freeOneTime: {
		id: "confirm-plan-change-selected-offering-one-time-fees-free",
		description: "Plan change confirmation modal, selected offering free one time fees",
		defaultMessage: "Free"
	},
	freeRecurring: {
		id: "confirm-plan-change-selected-offering-recurring-fee-free",
		description: "Plan change confirmation modal, selected offering free recurring fee",
		defaultMessage: "Free"
	},
	migrationCost: {
		id: "compare-plans-migration-cost-label",
		description: "Service Desk, Plan comparison modal, offering migration cost label",
		defaultMessage: "Migration cost"
	},
	month: {
		id: "compare-plans-recurring-period",
		description: "Service Desk, Plan comparison modal, offering recurring period label",
		defaultMessage: "month"
	},
	monthly: {
		id: "plan-list-price-tag-monthly",
		description: "Per month price shorthand",
		defaultMessage: "/ month"
	},
	myCurrentProductType: {
		id: "compare-plans-my-current-plan-label",
		description: "Service Desk, Plan comparison modal, label for My current plan",
		defaultMessage: "My current {productType}"
	},
	newPlan: {
		id: "plan-configuration-modal-current-product-label-for-new-plan",
		description: "Plan configuration modal, current product label, adding a new plan",
		defaultMessage: "New plan"
	},
	newProduct: {
		id: "plan-configuration-modal-current-product-label",
		description: "Plan configuration modal, current product label",
		defaultMessage: "New {productType}"
	},
	noAllowanceData: {
		id: "service-desk-customer-details-plan-product-description-no-allowances-text",
		description: "Text for the case when there is no Allowances data",
		defaultMessage: "No Allowance data"
	},
	noAlternativeOffers: {
		id: "plan-list-no-alternative-offers-for-selected-plan",
		description: "Text to show when there are no alternative offers for the selected plan",
		defaultMessage: "No alternative offers for this plan"
	},
	noCostsAndValidityData: {
		id: "service-desk-customer-details-plan-product-description-no-costs-and-validity-data-text",
		description: "Text for the case when there is no No Costs and Validity data",
		defaultMessage: "No Costs and Validity data"
	},
	noPlans: {
		id: "plans-listing-no-plans-title",
		description: "Message shown when there are no plans in the subscription",
		defaultMessage: "No plans"
	},
	noProductDescription: {
		id: "plan-list-no-product-description-available",
		description: "Plans list, no product description available message",
		defaultMessage: "No product description available"
	},
	offeringActionToOfferingName: {
		id: "plan-list-offering-type-text",
		description: "Change current plan offeringType",
		defaultMessage: "{offeringAction} to {offeringName}"
	},
	offeringTypeDowngrade: {
		id: "planListModal-offering-type-downgrade",
		description: "Word for offering downgrade type",
		defaultMessage: "Downgrade"
	},
	offeringTypeUpgrade: {
		id: "planListModal-offering-type-upgrade",
		description: "Word for offering upgrade type",
		defaultMessage: "Upgrade"
	},
	offersForCurrentSubscriptionTitle: {
		id: "service-desk-alternate-plan-list-modal-title",
		description: "Service Desk, alternate plan list modal title",
		defaultMessage: "Offers for {currentSubscriptionTitle}"
	},
	oneTimeFeeDeductionText: {
		id: "plan-change-confirmation-modal-one-time-fee-deduction",
		description: "Plan configuration modal, One-time fee deduction text",
		defaultMessage: "To complete the change, {oneTimeFeeSum} will be deducted from the balance"
	},
	oneTimeFees: {
		id: "plan-change-confirmation-modal-one-time-fees-label",
		description: "Plan configuration modal, One-time fees label",
		defaultMessage: "One-time fees"
	},
	payWithMethod: {
		id: "plan-change-confirmation-modal-pay-with-selected-method-button-label",
		description: "Plan change confirmation, text for a payment method button",
		defaultMessage: "Pay with {method}"
	},
	plan: {
		id: "plans-listing-plan-column-name",
		description: "Plan listing, Plan column name",
		defaultMessage: "Plan"
	},
	planComparisonCloseModal: {
		id: "plan-comparison-modal-close-btn-label",
		description: "Plan comparison modal, close button label",
		defaultMessage: "Close"
	},
	plansListingRecurringFee: {
		id: "plans-listing-plan-recurring-fee",
		description: "Plan listing, Recurring fee",
		defaultMessage: "{rate} / {period}"
	},
	pleaseConfirmChange: {
		id: "plan-change-confirmation-modal-payment-confirm",
		description: "Plan configuration modal, confirm change",
		defaultMessage: "Please confirm change"
	},
	proceedToPayment: {
		id: "plan-configuration-modal-proceed-to-payment-button-label",
		description: "Plan configuration modal, Proceed to payment button label text",
		defaultMessage: "Proceed to payment"
	},
	productTypeAddon: {
		id: "product-type-addon",
		description: "Word for product type add-on",
		defaultMessage: "add-on"
	},
	productTypePlan: {
		id: "product-type-plan",
		description: "Word for product type plan",
		defaultMessage: "plan"
	},
	purchaseFailed: {
		id: "plan-change-result-modal-failure-text",
		description: "Plan change result modal, failure text",
		defaultMessage: "Purchase failed"
	},
	purchaseSuccessful: {
		id: "plan-change-result-modal-success-text",
		description: "Plan change result modal, success text",
		defaultMessage: "Purchase successful"
	},
	recurringCharge: {
		id: "compare-plans-recurring-price-label",
		description: "Service Desk, Plan comparison modal, offering recurring price label",
		defaultMessage: "Recurring charge"
	},
	recurringFee: {
		id: "service-desk-customer-details-plan-product-description-recurring-fee-label",
		description: "Label for Recurring fee",
		defaultMessage: "Recurring fee"
	},
	recurringFeeColumn: {
		id: "plans-listing-recurring-fee-column-name",
		description: "Plan listing, Recurring fee column name",
		defaultMessage: "Recurring fee"
	},
	recurringFees: {
		id: "plan-change-confirmation-modal-selected-offering-recurring-fees-label",
		description: "Plan configuration modal, selected offering recurring fees label",
		defaultMessage: "Recurring fees"
	},
	region: {
		id: "service-desk-customer-details-plan-product-description-region-label",
		description: "Usage region label",
		defaultMessage: "Region"
	},
	regionNotAvailable: {
		id: "service-desk-customer-details-plan-product-description-region-not-available",
		description: "Text to display when usage region for plan is not available",
		defaultMessage: "N/A"
	},
	relatedServices: {
		id: "plan-configuration-modal-related-services",
		description: "Plan configuration modal, Related services",
		defaultMessage: "Related services"
	},
	select: {
		id: "select-new-plan-button",
		description: "Select new plan for existing subscription button text",
		defaultMessage: "Select"
	},
	selectedProductType: {
		id: "plan-change-confirmation-modal-selected-offering-label",
		description: "Plan configuration modal, selected offering label",
		defaultMessage: "Selected {productType}"
	},
	switchToThisProductType: {
		id: "pos-compare-plan-offerings-select-button-label",
		description: "Label for Select plan offering for configuration button",
		defaultMessage: "Switch to this {productType}"
	},
	unableToContinueUnexpectedResponse: {
		id: "plan-change-confirmation-modal-payment-methods-error-text",
		description: "Plan configuration modal, no available payment methods error text",
		defaultMessage: "Unable to continue due to unexpected payment method response"
	},
});

export default PlansMessages;
export { PlansMessages, PlansMessagesType };
