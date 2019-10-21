import isClient from "../../../utils/isClient";

export class UserUtils {
    static getUiLocalesParam = () => {
		if (isClient && window.navigator) {
			const languages = window.navigator.languages || [];
			return languages.join(" ");
		}
		return "uk";
	};
}