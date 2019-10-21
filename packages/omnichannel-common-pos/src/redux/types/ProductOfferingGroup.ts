import { Cardinality } from "./Cardinality";
import { CommercialEnrichments } from "./CommercialEnrichments";
import { ProductOffering } from "./ProductOffering";
import { HasId } from "./HasId";

interface ProductOfferingGroupAttributes extends HasId {
	name: string;
	cardinality?: Cardinality;
	commercialEnrichments?: CommercialEnrichments | null;
	productOfferings: Array<ProductOffering>;
	msisdnGroup: boolean;
}

interface ProductOfferingGroup extends ProductOfferingGroupAttributes {
	attributes?: ProductOfferingGroupAttributes;
}

export {
	ProductOfferingGroupAttributes,
	ProductOfferingGroup
};
