import { ProductPath, SimplePrice } from "./index";

interface MsisdnReservationAttributes {
	id?: string;
	type?: string;
	endTime?: string;
	limit?: number;
	numberType?: string;
	ownedBy?: string;
	reservedFor?: string;
	msisdns?: Array<string>;
	msisdn?: string;
	stock?: string;
	pattern?: string;
	price?: SimplePrice;
	poId?: string; // Related product-offering (numberClass/numberType)
	releaseId?: string;
}

interface MsisdnReservationCreateAttributes {
	pattern?: string;
	stock?: string;
	limit?: number;
	reservedFor?: string;
}

interface MsisdnReservation extends MsisdnReservationAttributes {
	attributes?: MsisdnReservationAttributes;
}

interface MsisdnReservationCreate extends MsisdnReservationCreateAttributes {
	attributes: MsisdnReservationCreateAttributes;
}

interface MsisdnSofReservationInfo {
	msisdn: string;
	reservedFor: string;
	limit: number;
	status: number;
}

interface MsisdnSofReservationResult {
	msisdnSoftReservation: MsisdnSofReservationInfo;
	inputtedCharacteristics: {
		path: ProductPath,
		key: string,
		value: string,
	};
}

interface MsisdnReserveAttributes {
	pattern?: string;
	stock?: string;
	limit?: number;
	reservedFor?: string;
	numberType?: number;
	endTime?: string;
}

interface MsisdnReserve extends MsisdnReserveAttributes {
	attributes: MsisdnReserveAttributes;
}

export {
	MsisdnReservation,
	MsisdnReservationAttributes,
	MsisdnReservationCreate,
	MsisdnReservationCreateAttributes,
	MsisdnSofReservationInfo,
	MsisdnSofReservationResult,
	MsisdnReserveAttributes,
	MsisdnReserve,
};
