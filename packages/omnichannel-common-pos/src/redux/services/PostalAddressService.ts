import { PostalAddress } from "../types";
import { Rest } from "./Rest";
import { REST } from "../settings/core";
import BaseService from "./BaseService";
import ErrorContainer from "./ErrorContainer";

interface PostalAddressUpdateConfig {
	postalAddress: PostalAddress;
	forceAddressUpdate: boolean;
}
interface PostalAddressCreateConfig extends PostalAddressUpdateConfig {
	individualId: string;
}
class InvalidAddressError extends Error {
	readonly errorContainer: ErrorContainer;
	constructor(errorContainer: ErrorContainer) {
		super();
		this.errorContainer = errorContainer;
	}
}

class PostalAddressService extends BaseService {
	static getAddressValidationHeaders(forceAddressUpdate: boolean) {
		return { "X-Force-Address-Update": "" + Boolean(forceAddressUpdate) };
	}
	static async updateOrCreatePostalAddress(config: PostalAddressCreateConfig): Promise<PostalAddress> {
		if (config.postalAddress.id) {
			return PostalAddressService.updatePostalAddress(config);
		} else {
			return PostalAddressService.createPostalAddress(config);
		}
	}
	static async updatePostalAddress(config: PostalAddressUpdateConfig): Promise<PostalAddress> {
		const resp = await Rest.patch(
			`${REST.LOCATION.POSTAL_ADDRESS}`,
			config.postalAddress,
			PostalAddressService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static async createPostalAddress(config: PostalAddressCreateConfig): Promise<PostalAddress> {
		const resp = await Rest.post(
			`${REST.LOCATION.POSTAL_ADDRESS}?individualId=${config.individualId}`,
			config.postalAddress,
			PostalAddressService.getAddressValidationHeaders(config.forceAddressUpdate)
		);
		this.validateInvalidAddressResponse(resp);
		return resp;
	}
	static validateInvalidAddressResponse(resp: any) {
		if (resp instanceof ErrorContainer) {
			const invalidPostalAddressError =
				resp.errors &&
				resp.errors.find(error => {
					return error.code === "invalid-postal-address";
				});
			throw new InvalidAddressError(resp);
		}
		PostalAddressService.validateResp(resp);
	}
}
export default PostalAddressService;
export { InvalidAddressError, PostalAddressUpdateConfig, PostalAddressCreateConfig };
