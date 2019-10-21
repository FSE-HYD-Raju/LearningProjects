export type PortInDecision = PortInDecisionAttributes & {
	type?: string;
	attributes?: PortInDecisionAttributes;
};

export interface PortInDecisionAttributes {
	result: string;
	description: string;
}
