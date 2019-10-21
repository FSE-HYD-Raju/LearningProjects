import { head } from "lodash";

import {
	ProductOfferingsConfigObject,
	ProductPath,
	ProductPathElement,
} from "../redux/types";

export default class ConfigurationsUtil {
	static getConfigurationAtPath(path: ProductPath, configurations: ProductOfferingsConfigObject): ProductOfferingsConfigObject | undefined {
		if (!path || !path.length) {
			return undefined;
		}

		const currentPathPoint: ProductPathElement | undefined = head(path);
		if (!currentPathPoint) {
			return undefined;
		}

		const currentPathPointId = currentPathPoint.po || currentPathPoint.pog || currentPathPoint.optionalPo;
		if (!currentPathPointId) {
			return undefined;
		}

		if (path.length === 1) {
			return currentPathPointId === configurations.id ? configurations : undefined;
		}

		const pathTail = path.slice(1);
		const nextPathPoint = head(pathTail) || {};

		if (nextPathPoint.po) {
			const id = nextPathPoint.po;

			if (!configurations.productOfferings) {
				return undefined;
			}

			const poConfiguration = configurations.productOfferings.find(po => po.id === id);
			if (poConfiguration) {
				return this.getConfigurationAtPath(pathTail, poConfiguration as ProductOfferingsConfigObject);
			}

		} else if (nextPathPoint.pog) {
			const id = nextPathPoint.pog;

			if (!configurations.productOfferingGroups) {
				return undefined;
			}

			const pogConfiguration = configurations.productOfferingGroups.find(pog => pog.id === id);
			if (pogConfiguration) {
				return this.getConfigurationAtPath(pathTail, pogConfiguration as ProductOfferingsConfigObject);
			}
		} else if (nextPathPoint.optionalPo) {
			const id = nextPathPoint.optionalPo;

			if (!configurations.optionalProductOfferings) {
				return undefined;
			}

			const poConfiguration = configurations.optionalProductOfferings.find(po => po.id === id);
			if (poConfiguration) {
				return this.getConfigurationAtPath(pathTail, poConfiguration as ProductOfferingsConfigObject);
			}

		}

		return undefined;
	}
}
