import { HasId, UnitOfMeasureEnum } from "./index";
import { UsagePrice } from "./UsagePrice";
import { EventDetails } from "./EventDetails";
import { ServiceUnit } from "./ServiceUnit";
import { NonMonetaryAmount } from "./NonMonetaryAmount";

interface UsageEventAttributes extends HasId {
	createdAt: string;
	eventType: EventType;
	primaryServiceId: string;
	startedAt: string;
	amount?: UsagePrice;
	eventDetailsType: EventDetailsType;
	eventDetails: EventDetails;
	totalChargedNonMonetaryAmounts: Array<NonMonetaryAmount>;
	usedServiceUnits: Array<ServiceUnit>;
}

interface UsageEvent extends UsageEventAttributes {
	attributes?: UsageEventAttributes;
}

interface UsageEventCounterAttributes {
	eventType: UsageCounterEventType;
	usedServiceUnits: Array<ServiceUnit>;
}

interface UsageEventCounter extends UsageEventCounterAttributes {
	attributes?: UsageEventAttributes;
}

enum TrafficCase {
	ORIGINATING = "originating",
	TERMINATING = "terminating",
	FORWARDED = "forwarded",
}

enum EventType {
	VOICE = "voice",
	DATA = "data",
	MESSAGE = "message",
	CONTENT = "content",
	ONE_TIME = "one-time"
}

type EventTypeKey = keyof typeof EventType;

enum UsageCounterEventType {
	VOICE = "voice",
	DATA = "data",
	MESSAGE = "message",
	ADDITIONAL = "additional",
}

type UsageCounterEventTypeKey = keyof typeof UsageCounterEventType;

enum EventDetailsType {
	CALL = "call",
	DATA = "data",
	CONTENT = "content",
}

export {
	UsageEvent,
	UsageEventAttributes,
	UsageEventCounter,
	UsageEventCounterAttributes,
	TrafficCase,
	EventType,
	EventTypeKey,
	EventDetailsType,
	UsageCounterEventType,
	UsageCounterEventTypeKey,
};
