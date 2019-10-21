enum PersonToPersonRelationshipRoleEnum {
	CONTACT = "CONTACT",
	EMPLOYEE = "EMPLOYEE",
	PROCUREMENT_PERSON = "PROCUREMENT_PERSON",
	POWER_OF_ATTORNEY = "POWER_OF_ATTORNEY",
	TRUSTEE = "TRUSTEE",
	PARENT = "PARENT",
	MEMBER = "MEMBER",
	PARTNER = "PARTNER",
	GUARDIAN = "GUARDIAN"
}
type PersonToPersonRelationshipRole = keyof typeof PersonToPersonRelationshipRoleEnum;

enum PersonToPersonRelationshipTypeEnum {
	ORGANIZATION = "ORGANIZATION",
	INDIVIDUAL = "INDIVIDUAL"
}
type PersonToPersonRelationshipType = keyof typeof PersonToPersonRelationshipTypeEnum;

enum PersonToPersonRelationshipDirectionEnum {
	SOURCE = "SOURCE",
	TARGET = "TARGET",
}
type PersonToPersonRelationshipDirection = keyof typeof PersonToPersonRelationshipDirectionEnum;

interface PersonToPersonRelationship {
	role?: PersonToPersonRelationshipRole;
	type?: PersonToPersonRelationshipType;
	direction?: PersonToPersonRelationshipDirection;
	relatedPersonId: string;
}

export {
	PersonToPersonRelationshipRoleEnum,
	PersonToPersonRelationshipDirection,
	PersonToPersonRelationshipTypeEnum,
	PersonToPersonRelationshipType,
	PersonToPersonRelationshipDirectionEnum,
	PersonToPersonRelationshipRole,
	PersonToPersonRelationship
};
