import PostalAddressUtil from "../../../utils/user/PostalAddressUtil";
import { AppState } from "../../reducers";
import { OrderItem, PostalAddress, ProductOffering } from "../../types";
import { ContactMediaTypeEnum } from "../../index";

class DeliverySelector {
	static getDeliveryPostalAddress(state: AppState): PostalAddress | undefined {
		if (!state.user.user) {
			return undefined;
		}
		return PostalAddressUtil.getAddressByRole(state.user.user, ContactMediaTypeEnum.DELIVERY);
	}
}
export { DeliverySelector };
