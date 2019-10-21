import { AttachedDocument } from "./AttachedDocument";

interface SupportCase {
	id: string;
	attributes: {
		lastModifiedAt: string;
		lifecycleStatus: string;
		description: string;
		resolutions: Array<CaseResolution>;
		assigneeIndividual: {
			actorId: string;
			formattedName: string;
		};
		createdAt: Date;
		referenceNumber: string;
		closedAt?: Date;
		summary: string;
		resolvedAt?: Date;

		lastModifiedBy: {
			actorId: string;
			formattedName: string;
		};
		nextActionDeadline: string;
		categoryChangeForbidden: boolean;
		defaultAssignee: {
			actorId: string;
			formattedName: string;
		};
		priorities?: string;
		defaultDescription?: string;
		documents?: Array<AttachedDocument>;
		priority: string;
		expiresAt: string;
		creationChannel: string;
		createdBy: {
			actorId: string;
			formattedName: string;
		};
		restrictedInChannels?: string;
		globalCase?: string;
		slaDueAt?: string;
		assigneeTeam: {
			actorId: string;
			formattedName: string;
		};
		escalatedAt?: string;
		caseCategories: {
			id: string;
			name: string;
			globalCase: boolean;
			defaultSummary?: string;
			defaultPriority: string;
			categoryChangeForbidden: boolean;
			defaultAssignee: {
				actorId: string;
				formattedName: string;
			};
			priorities?: string;
			defaultDescription?: string;
			workflow: {
				name: string;
				states: Array<WorkflowState>;
			};
		};
	};
}

interface WorkflowState {
	customizedStatusLocalizedName: string;
	customizedStatusValue: string;
	logicalStatus: string;
}
interface CaseResolution {
	name: string;
	value: string;
}

export { SupportCase, CaseResolution, WorkflowState };
