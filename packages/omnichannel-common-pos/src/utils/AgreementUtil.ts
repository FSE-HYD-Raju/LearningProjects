import { Agreement } from "../redux/types/Agreement";
import ProductUtil from "./product/ProductUtil";

class AgreementUtil {
	static getPhoneNumber(agreement: Agreement): string | undefined {
		const subscription = ProductUtil.getSubscriptionFromAgreement(agreement);
		return ProductUtil.getPhoneNumber(subscription);
	}
}
export default AgreementUtil;
