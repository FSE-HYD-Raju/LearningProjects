import { get } from "lodash";

import { LocationInfo, LocationItem } from "../redux/types";

export default class LocationUtil {
	static getLocationLabel(location?: LocationInfo): string {
		if (location) {
			return get(location, "attributes.label") || get(location, "label");
		}
		return "";
	}

	static getChildren(location?: LocationInfo): LocationInfo[] {
		return get(location, "children") || get(location, "attributes.children");
	}
}
