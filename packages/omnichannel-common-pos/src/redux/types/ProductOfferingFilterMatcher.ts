export interface ProductOfferingFilterMatcher {
	characteristic: string;
	type: "instanceCharacteristic" | "inputCharacteristic";
	operator: "contains"; // always "contains"?
}
