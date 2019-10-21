import { ErrorType, QueryStatus } from "../../types";

"use strict";

interface PortInForm {
	[key: string]: any;
	MSISDN?: string;
	iccid?: string;
	operatorId?: string;
	previousContractType?: string;
	transferCredit?: boolean;
}

interface PortInCharacteristics {
	[key: string]: any;
	CH_FlagPrepost?: string;
	CH_ICCID?: string;
	CH_NAME_CLI?: string;
	CH_OperatorID?: string;
	CH_PortInNumberResource?: string;
	CH_SURNAME_CLI?: string;
	CH_Tenant?: string;
	CH_CreditTransferFlag?: string;
	CH_TransferTime?: string;
	CH_CFPI?: string;
}

type PortInState = {
	portInOldNumber: boolean,
	portInFormModel: PortInForm,
	portInCHModel: PortInCharacteristics,
	portInFormIsValid?: boolean,
	portInDecisions: {
		[msisdn: string]: {
			queryActive: boolean;
			queryResult?: {
				attributes: {
					result: number
				}
			};
			error?: string;
		}
	},
	portInValidity: {
		[msisdn: string]: QueryStatus
	},
};

export {
	PortInState,
	PortInForm,
	PortInCharacteristics
};
