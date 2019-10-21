import ApplicationRoute from "../redux/types/routes/ApplicationRoute";
import { HasId } from "../redux/types";

const INDEX = "/";
const DIGITAL_LIFE = "/digilife";
const SERVICE_DESK = "/servicedesk";

interface HasCategoryId {
	categoryId: string;
}

interface HasAgreementId {
	agreementId: string;
}

interface HasProductId {
	productId: string;
}

interface HasOrderId {
	orderId: string;
}

type SubscriptionAddonsRouteParams = HasAgreementId & HasProductId;
type TopUpPaymentRouteParams = HasAgreementId;
type ProductServicePlanConfigureRouteParams = SubscriptionAddonsRouteParams & {
	serviceId: string,
	productOfferingId: string
};

type ServiceDeakProductServicePlanConfigureRouteParams = HasAgreementId & {
	subscriptionId: string;
	serviceId: string;
	productOfferingId: string;
};

const commonDigitalLifeRoutes = {
	DIGITAL_LIFE_INDEX: new ApplicationRoute(DIGITAL_LIFE),
	DIGITAL_LIFE_PRODUCT_SERVICE_PLAN_CONFIGURE: new ApplicationRoute<ProductServicePlanConfigureRouteParams>
	(`${DIGITAL_LIFE}/things/:agreementId/:productId/service-plan/configure/:serviceId/:productOfferingId`),
	DIGITAL_LIFE_PERSON: new ApplicationRoute<Partial<HasId>>(`${DIGITAL_LIFE}/person/:id?`),
	DIGITAL_LIFE_THINGS: new ApplicationRoute(`${DIGITAL_LIFE}/things`),
	DIGITAL_LIFE_RECURRENT_TOP_UPS: new ApplicationRoute(`${DIGITAL_LIFE}/financials/recurring-top-ups`),
	DIGITAL_LIFE_ORDERS: new ApplicationRoute<Partial<HasOrderId>>(`${DIGITAL_LIFE}/orders/:orderId?`),
	DIGITAL_LIFE_SUPPORT: new ApplicationRoute(`${DIGITAL_LIFE}/support`),
	DIGITAL_LIFE_TOP_UP_PAYMENT: new ApplicationRoute<TopUpPaymentRouteParams>(`${DIGITAL_LIFE}/:agreementId/top-up-payment`),
	DIGITAL_LIFE_PAYMENT_METHODS: new ApplicationRoute<TopUpPaymentRouteParams>(`${DIGITAL_LIFE}/financials/payment-methods`),
	DIGITAL_LIFE_PAYMENT_METHODS_RETURN: new ApplicationRoute<TopUpPaymentRouteParams>(`${DIGITAL_LIFE}/financials/payment-methods/registered`),
};

const commonShopRoutes = {
	INDEX: new ApplicationRoute(INDEX),
	BASKET: new ApplicationRoute("/basket"),
	CHECKOUT: new ApplicationRoute("/checkout"),
	CHECKOUT_LOGIN_MODAL: new ApplicationRoute("/checkoutLoginModal"),
	SHOP_CATEGORY: new ApplicationRoute<HasCategoryId>("/shop/categories/:categoryId?"),
	REGISTRATION_REGISTER: new ApplicationRoute("/registration/register"),
	PAYMENT_CASH_SUCCESS: new ApplicationRoute("/payment/cash_success"),
};

const commonServiceDeskRoutes = {
	SERVICE_DESK_INDEX: new ApplicationRoute(SERVICE_DESK),
	SERVICE_DESK_CHECKOUT: new ApplicationRoute("/servicedesk/checkout"),
	SERVICE_DESK_CHECKOUT_SETUP: new ApplicationRoute("/servicedesk/checkout/setup"),
	SERVICE_DESK_SHOP: new ApplicationRoute("/servicedesk/shop"),
	SERVICE_DESK_CUSTOMER: new ApplicationRoute("/servicedesk/customer"),
	SERVICE_DESK_COLD: new ApplicationRoute("/cold"),
	SERVICE_DESK_PRODUCT_SERVICE_PLAN_CONFIGURE: new ApplicationRoute<ServiceDeakProductServicePlanConfigureRouteParams>
	("/servicedesk/customer/agreements/:agreementId/:subscriptionId/service-plan/configure/:serviceId/:productOfferingId"),
};

export {
	HasProductId,
	HasAgreementId,
	HasOrderId,
	HasCategoryId,
	TopUpPaymentRouteParams,
	ProductServicePlanConfigureRouteParams,
	ServiceDeakProductServicePlanConfigureRouteParams,
	SubscriptionAddonsRouteParams,
	commonDigitalLifeRoutes,
	commonShopRoutes,
	commonServiceDeskRoutes,
	INDEX,
	DIGITAL_LIFE,
	SERVICE_DESK,
};
