import { HasId } from "./HasId";
import { ProductOffering } from "./ProductOffering";

/**
 * This type corresponds to BE Category type
 */

interface CategoryAttributes {
	displayInstallationAddress?: boolean;
	friendlyUrl?: string;
	name?: string;
	subCategories?: boolean;
	useLocationEligibility?: boolean;
	products?: Array<ProductOffering>;
	ids?: Array<string>;
}

interface Category extends HasId, CategoryAttributes {
	attributes?: CategoryAttributes;
}

export {
	Category,
	CategoryAttributes,
};
