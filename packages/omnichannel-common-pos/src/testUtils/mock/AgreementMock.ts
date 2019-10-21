import { Agreement, AgreementAttributes, AgreementLifecycleStatusEnum, Product } from "../../redux/types";
import { ProductMock } from "./ProductMock";

interface MakeAgreementConfig {
	id?: string;
	products?: Product[];
}

class AgreementMock {
	static DEFAULT_AGREEMENT_CONFIG: MakeAgreementConfig = {
		id: "agreement-id",
		products: []
	};
	static BASE_AGREEMENT: Agreement = ({
		id: "base-agreement-mock",
		attributes: ({
			validFor: {
				startDate: null,
				endDate: null,
				expired: false
			},
			referenceNumber: "mock-agreement-ref-num",
			lifeCycleStatus: AgreementLifecycleStatusEnum.ACTIVE,
			products: [],
			chargingBalances: []
		} as Partial<AgreementAttributes>) as AgreementAttributes
	} as Partial<Agreement>) as Agreement;

	static ACTIVE_AGREEMENT: Agreement = ({
		id: ProductMock.ACTIVE_AGREEMENT_ID,
		attributes: ({
			...AgreementMock.BASE_AGREEMENT.attributes,
			products: [ProductMock.ACTIVE_SUBSCRIPTION]
		} as Partial<AgreementAttributes>) as AgreementAttributes
	} as Partial<Agreement>) as Agreement;

	static ACTIVE_AGREEMENT_WITH_ADDONS_AND_PLAN: Agreement = ({
		id: ProductMock.ACTIVE_AGREEMENT_ID,
		attributes: ({
			...AgreementMock.BASE_AGREEMENT.attributes,
			products: [ProductMock.ACTIVE_SUBSCRIPTION_WITH_ADDONS_AND_PLAN]
		} as Partial<AgreementAttributes>) as AgreementAttributes
	} as Partial<Agreement>) as Agreement;

	static make(config: MakeAgreementConfig = {}): Agreement {
		const configWithDefaults = { ...AgreementMock.DEFAULT_AGREEMENT_CONFIG, ...config };
		return ({
			id: configWithDefaults.id!,
			attributes: ({
				...AgreementMock.BASE_AGREEMENT.attributes,
				products: configWithDefaults.products || []
			} as Partial<AgreementAttributes>) as AgreementAttributes
		} as Partial<Agreement>) as Agreement;
	}
}
export { AgreementMock };
