import { PhoneNumber } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import ErrorContainer from "./ErrorContainer";

interface PhoneNumberUpdateConfig {
	contactPhone: PhoneNumber;
	forceAddressUpdate: boolean;
}
interface PhoneNumberCreateConfig extends PhoneNumberUpdateConfig {
	individualId: string;
}
class InvalidAddressError extends Error {
	readonly errorContainer: ErrorContainer;
	constructor(errorContainer: ErrorContainer) {
		super();
		this.errorContainer = errorContainer;
	}
}

class PhoneNumberService extends BaseService {
	static getAddressValidationHeaders(forceAddressUpdate: boolean) {
		return { "X-Force-Phone-Number-Update": "" + Boolean(forceAddressUpdate) };
	}
	static async updateOrCreatePhoneNumber(config: PhoneNumberCreateConfig): Promise<PhoneNumber> {
		if (config.contactPhone.id) {
			return PhoneNumberService.updatePhoneNumber(config);
		} else {
			return PhoneNumberService.createPhoneNumber(config);
		}
	}
	static async updatePhoneNumber(config: PhoneNumberUpdateConfig): Promise<PhoneNumber> {
		const resp = await Rest.patch(
			`${REST.PERSONAL_INFO.PHONE_NUMBER_MOBILE}`,
			config.contactPhone,
			PhoneNumberService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static async createPhoneNumber(config: PhoneNumberCreateConfig): Promise<PhoneNumber> {
		const resp = await Rest.post(
			`${REST.PERSONAL_INFO.PHONE_NUMBER_MOBILE}?individualId=${config.individualId}`,
			config.contactPhone,
			PhoneNumberService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static validateInvalidAddressResponse(resp: any) {
		if (resp instanceof ErrorContainer) {
			const invalidPostalAddressError =
				resp.errors &&
				resp.errors.find(error => {
					return error.code === "invalid-phone-number";
				});
			throw new InvalidAddressError(resp);
		}
		PhoneNumberService.validateResp(resp);
	}
}
export default PhoneNumberService;
export { InvalidAddressError, PhoneNumberUpdateConfig, PhoneNumberCreateConfig };
