import { SupportCase } from "../../types/SupportCases";

type SupportState = {
	showTroubleshootingTab: boolean;
	cases: Array<SupportCase>;
};
interface CreateCustomerCasePayload {
	actorId: string;
	description?: string;
	categoryId?: string;
	formattedName?: string;
	attachments: File[];
}
export { SupportState, CreateCustomerCasePayload };
