import { HasId } from "../index";

interface DeviceReservationAttributes extends HasId {
	balanceType?: string;
	reservedFor?: string;
	endDatetime: string;
	limit?: number;
	sku: string;
}

interface DeviceReservation extends DeviceReservationAttributes {
	attributes?: DeviceReservationAttributes;
}

export {
	DeviceReservationAttributes,
	DeviceReservation
};
