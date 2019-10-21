import { HasId } from "./HasId";
import { ProductOffering } from "./ProductOffering";

/**
 * This type corresponds to BE SubCategory.java type
 */

interface SubCategoryAttributes {
	title?: string;
	regex?: string;
	category?: Array<string>;
	productOfferings?: Array<ProductOffering>;
}

interface SubCategory extends HasId, SubCategoryAttributes {
	attributes?: SubCategoryAttributes;
}

export {
	SubCategory,
	SubCategoryAttributes,
};
