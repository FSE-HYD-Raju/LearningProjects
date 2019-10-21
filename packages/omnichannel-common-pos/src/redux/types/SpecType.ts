enum SpecTypeEnum {
	RESOURCE = "RESOURCE",
	SERVICE = "SERVICE",
	PRODUCT = "PRODUCT"
}
type SpecType = keyof typeof SpecTypeEnum;

export { SpecTypeEnum, SpecType };
