import { EmailAddress } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import ErrorContainer from "./ErrorContainer";

interface ContactEmailUpdateConfig {
	contactEmail: EmailAddress;
	forceAddressUpdate: boolean;
}
interface ContactEmailCreateConfig extends ContactEmailUpdateConfig {
	individualId: string;
}
class InvalidEmailAddressError extends Error {
	readonly errorContainer: ErrorContainer;
	constructor(errorContainer: ErrorContainer) {
		super();
		this.errorContainer = errorContainer;
	}
}

class ContactEmailService extends BaseService {
	static getAddressValidationHeaders(forceAddressUpdate: boolean) {
		return { "X-Force-Contact-Email-Update": "" + Boolean(forceAddressUpdate) };
	}
	static async updateOrCreateContactEmail(config: ContactEmailCreateConfig): Promise<EmailAddress> {
		if (config.contactEmail.id) {
			return ContactEmailService.updateContactEmail(config);
		} else {
			return ContactEmailService.createContactEmail(config);
		}
	}
	static async updateContactEmail(config: ContactEmailUpdateConfig): Promise<EmailAddress> {
		const resp = await Rest.patch(
			`${REST.PERSONAL_INFO.CONTACT_EMAIL_ADDRESS}`,
			config.contactEmail,
			ContactEmailService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static async createContactEmail(config: ContactEmailCreateConfig): Promise<EmailAddress> {
		const resp = await Rest.post(
			`${REST.PERSONAL_INFO.CONTACT_EMAIL_ADDRESS}?individualId=${config.individualId}`,
			config.contactEmail,
			ContactEmailService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static validateInvalidAddressResponse(resp: any) {
		if (resp instanceof ErrorContainer) {
			const invalidPostalAddressError =
				resp.errors &&
				resp.errors.find(error => {
					return error.code === "invalid-contact-email";
				});
			throw new InvalidEmailAddressError(resp);
		}
		ContactEmailService.validateResp(resp);
	}
}
export default ContactEmailService;
export { InvalidEmailAddressError, ContactEmailUpdateConfig, ContactEmailCreateConfig };
