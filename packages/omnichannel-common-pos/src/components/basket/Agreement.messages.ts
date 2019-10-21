/* tslint:disable:max-line-length */
import { defineMessages, FormattedMessage } from "react-intl";

// Interface has been generated automatically. Please do not edit manually.
// For changes run in console: npm run rebuild-messages-interfaces
interface AgreementMessagesType {
	agreementChangeConfirmation: FormattedMessage.MessageDescriptor;
	areYouSureToChange: FormattedMessage.MessageDescriptor;
	changeAgreement: FormattedMessage.MessageDescriptor;
	changingAgreementDiscards: FormattedMessage.MessageDescriptor;
	forAgreement: FormattedMessage.MessageDescriptor;
	minibasketForAgreement: FormattedMessage.MessageDescriptor;
	selectNewAgreement: FormattedMessage.MessageDescriptor;
	selectedAgreementNew: FormattedMessage.MessageDescriptor;
}
const AgreementMessages: AgreementMessagesType = defineMessages({
	agreementChangeConfirmation: {
		id: "confirm-active-agreement-change-and-basket-discard-modal-title",
		description: "Agreement change confirmation modal title text",
		defaultMessage: "Agreement change confirmation"
	},
	areYouSureToChange: {
		id: "confirm-active-agreement-change-and-basket-discard-continue",
		description: "Confirmation text that user want's to change agreement and discard basket",
		defaultMessage: "Are you sure you want to change the agreement?"
	},
	changeAgreement: {
		id: "shop-basket-agreement-change-confirmation-modal-ok-button",
		description: "Change agreement button in agreement change modal",
		defaultMessage: "Change agreement"
	},
	changingAgreementDiscards: {
		id: "confirm-active-agreement-change-and-basket-discard",
		description: "Changing agreement discards current basket and it's items.",
		defaultMessage: "Changing agreement discards current basket and it's items"
	},
	forAgreement: {
		id: "active-agreement-select-for-agreement-label",
		description: "Basket selected agreement label",
		defaultMessage: "For agreement"
	},
	minibasketForAgreement: {
		id: "minibasket-agreement-select-label",
		description: "Minibasket agreement select label",
		defaultMessage: "For agreement"
	},
	selectNewAgreement: {
		id: "minibasket-new-agreement-select",
		description: "Minibasket, agreement selection, Select new agreement",
		defaultMessage: "New agreement"
	},
	selectedAgreementNew: {
		id: "minibasket-selected-agreement-new",
		description: "Minibasket, selected agreement in new agreement",
		defaultMessage: "New agreement"
	},
});

export default AgreementMessages;
export { AgreementMessages, AgreementMessagesType };
