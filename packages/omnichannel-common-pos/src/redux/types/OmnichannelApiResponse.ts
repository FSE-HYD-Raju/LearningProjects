interface OmnichannelApiEntityRelationshipData {
	id: string;
	["type"]: string;
}
interface OmnichannelApiEntityRelationship {
	data: OmnichannelApiEntityRelationshipData;
}
interface OmnichannelApiEntity {
	id: string;
	["type"]: string;
	attributes: Record<string, any>;
	relationships: Record<string, OmnichannelApiEntityRelationship>;
}
interface OmnichannelApiResponse {
	data: OmnichannelApiEntity | OmnichannelApiEntity[];
	included?: OmnichannelApiEntity[];
}
export { OmnichannelApiResponse, OmnichannelApiEntityRelationshipData, OmnichannelApiEntityRelationship, OmnichannelApiEntity };
