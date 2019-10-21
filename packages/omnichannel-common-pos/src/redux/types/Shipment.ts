import { HasId } from "./index";

interface Shipment extends HasId {
	type: string;
	attributes: ShipmentAttributes;
}

interface ShipmentAttributes {
	deliveryLocation?: string;
	deliveryMethod?: string;
	paymentOnDelivery: boolean;
	trackingId?: string;
	deliveryProviderDetails: DeliveryProviderDetails | null;
	shipmentStatus?: string;
}

interface DeliveryProviderDetails {
	code?: string;
	name?: string;
	url?: string;
}

export {
	Shipment,
	ShipmentAttributes,
	DeliveryProviderDetails
};
