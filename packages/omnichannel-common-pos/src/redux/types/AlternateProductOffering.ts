import { ProductOffering } from "./ProductOffering";

/**
 * This type corresponds to BE type AlternateProductOffering.java which extends regular ProductOffering
 * TODO: check the action involved in fetching these items from BE
 */
interface AlternateProductOffering extends ProductOffering {
	// TODO: include bundled products?
	offeringType: OfferingType;
}

enum OfferingType {
	REPLACE = "REPLACE",
	UPGRADE = "UPGRADE",
	DOWNGRADE = "DOWNGRADE"
}

export default AlternateProductOffering;
export {
	OfferingType
};
