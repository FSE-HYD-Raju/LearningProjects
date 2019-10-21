import { FormattedMessageDescriptor } from "../../../channelUtils";
import serviceMessages from "./Services.messages";
import { LifecycleChangeAction, Product, Service, ServiceItem } from "../../../redux/types";
import messages from "../../../commonMessages";

class ProductServicesUtils {

	static CF_ID = "callforwarding";

	static formatString(str: string): string {
		if (str.length > 1) {
			return str.charAt(0) + str.slice(1).toLowerCase();
		}
		return str;
	}

	static getLifecycleStatusMessage(lifecycle: string | undefined): string {
		if (lifecycle) {
			return ProductServicesUtils.formatString(lifecycle);
		} else {
			return "-";
		}
	}

	static getCallForwardingStaus(services: Array<Service>): string {
		const status = ProductServicesUtils.getCallforwardingOverallStatus(services);
		return ProductServicesUtils.getLifecycleStatusMessage(ProductServicesUtils.formatString(status));
	}

	static getLifecycleStatusMessageDescriptor(lifecycle: string): FormattedMessageDescriptor {
		const messageId = "lifeCycleStatus" + ProductServicesUtils.formatString(lifecycle);
		const msg = (messages as any)[messageId];
		if (msg) {
			return msg;
		} else {
			return serviceMessages.lifecycleStatusDefaultValue;
		}
	}

	static mapTransitions(action: LifecycleChangeAction, stateTransitionByActionName: Record<string, Array<string> | string>): LifecycleChangeAction {
		let mappedName: string | undefined;
		if (stateTransitionByActionName) {
			mappedName = Object.keys(stateTransitionByActionName).find((key: string): boolean => {
				if (Array.isArray(stateTransitionByActionName[key])) {
					return stateTransitionByActionName[key].includes(action.name);
				} else {
					return stateTransitionByActionName[key] === action.name;
				}
			});
		}
		return {
			...action,
			name: mappedName!
		};
	}

	static isCallforwardingService = (service: Service, callForwardingServices: ServiceItem | undefined) => {
		return (service.characteristics && callForwardingServices
			&& callForwardingServices.values.indexOf(service.characteristics[callForwardingServices.key]) >= 0
		);
	};

	static getCallforwardingOverallStatus = (services: Array<Service> | undefined): string => {
		let status = "DEACTIVATED";
		if (Array.isArray(services)) {
			services.forEach((service: Service) => {
				if (service.characteristics.CFSTATUS === "1") {
					status = "ACTIVE";
				}
			});
		}

		return status;
	};

	static findCallforwardingServices = (services: Array<Service>, callForwardingServices: ServiceItem | undefined): Array<Service> => {
		const cfServices: Array<Service> = [];
		if (callForwardingServices) {
			// find call forwarding services using the callforwardingMapping
			services.forEach((service: Service) => {
				if (ProductServicesUtils.isCallforwardingService(service, callForwardingServices)) {
					cfServices.push(service);
				}
			});
		} else {
			return cfServices;
		}
		return cfServices;
	};

	static getServicesFromProduct(product: Product): Array<Service> {
		let services: Array<Service> = [];
		if (product && product.realizingServices) {
			services = services.concat(product.realizingServices);
		}
		if (product.childProducts) {
			product.childProducts.forEach((product: Product) => {
				if (product.realizingServices) {
					services = services.concat(product.realizingServices);
				}
			});
		}
		return services;
	}
}

export default ProductServicesUtils;
