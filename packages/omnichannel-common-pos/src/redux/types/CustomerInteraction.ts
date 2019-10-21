// from customer-interaction.attributes.interaction-details.contact-type
// https://intra.qvantel.com/display/OEE/.User+Story%3A+Show+Interactions+in+eCare+vWorkVersion
import { Initiator, InteractionDetails, AttachedDocument, HasId } from "./index";

interface CustomerInteractionAttributes extends HasId {
	createdBy?: Initiator;
	createdAt: Date;
	interactionDetails?: InteractionDetails;
	document?: AttachedDocument;
}

interface CustomerInteraction extends CustomerInteractionAttributes {
	attributes: CustomerInteractionAttributes;
}
export { CustomerInteraction, CustomerInteractionAttributes };
