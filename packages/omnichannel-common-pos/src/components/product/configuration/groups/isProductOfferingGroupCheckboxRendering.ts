import { ProductOfferingGroup } from "../../../../redux";

const isCheckboxRendering = (pog: ProductOfferingGroup) =>
	pog && (!pog.cardinality || (!pog.cardinality.min && !pog.cardinality.max) || pog.cardinality.max === 100) && !pog.msisdnGroup;

export default isCheckboxRendering;
