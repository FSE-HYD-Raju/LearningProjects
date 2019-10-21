import { get } from "lodash";

const getICCSubTypeDisplayMode = (iccSubtypeDisplay: any, subType: any) => {
	if (get(iccSubtypeDisplay, "radio", []).includes(subType)) {
		return "radio";
	} else if (get(iccSubtypeDisplay, "dropdown", []).includes(subType)) {
		return "dropdown";
	}
	return "dropdown";
};
export default getICCSubTypeDisplayMode;
