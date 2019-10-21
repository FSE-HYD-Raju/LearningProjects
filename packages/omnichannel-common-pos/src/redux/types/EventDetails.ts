import { TrafficCase } from "./UsageEvent";

interface EventDetails {
	roaming: boolean;
	originNumber: string;
	targetNumber: string;
	originDestination: string;
	targetDestination: string;
	trafficCase: TrafficCase;
	info: string;
	eventType: EventTypeDetails;
	externalChargeType: string;
	agreementId: string;
}

enum EventTypeDetails {
	SMS = "sms",
	MMS = "mms",
	VOICE = "voice",
	VIDEO = "video"
}

export { EventDetails, EventTypeDetails };
