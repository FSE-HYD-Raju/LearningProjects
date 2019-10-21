import { ProductOffering, MsisdnReservation } from "../../types";

enum MsisdnSelectionUseCase {
	PATTERN_SEARCH = "pattern search",
	RANDOM = "random",
	SELECT = "select",
	PORT_IN = "port-in"
}

interface MsisdnCost {
	amount?: number;
	currency?: string;
}
interface MsisdnWithCost {
	msisdn?: string;
	cost: MsisdnCost;
	reservedFor: string;
	productOffering?: ProductOffering;
}

interface MsisdnWithPriceProps {
	msisdn: MsisdnWithCost;
}

interface MsisdnGroup {
	msisdns?: Array<string>;
	cost: MsisdnCost;
	reservedFor?: string;
	productOffering?: ProductOffering;
}

type MsisdnSelectionState = {
	po?: ProductOffering;
	productOfferings: Array<ProductOffering>;
	queryActive?: boolean;
	msisdnsReservationsByUseCase?: Record<MsisdnSelectionUseCase, Array<MsisdnReservation>>;
	selectedMsisdn?: MsisdnWithCost;
	selectedMsisdnPoId?: string;
};

export {
	MsisdnSelectionUseCase,
	MsisdnWithCost,
	MsisdnSelectionState,
	MsisdnCost,
	MsisdnGroup,
	MsisdnWithPriceProps
};
