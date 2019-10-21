// @flow
/**
 * Extracts query params from given window location
 *
 * For example ?key1=value1&key2=value2&key3=value3 generates following object:
 * {
 * 		key1: "value1",
 * 		key2: "value2",
 * 		key3: "value3"
 * }
 */
export default function extractQueryParamsFromUrl(windowLocationSearch: string): Record<string, string> {
	const pairStrings: Array<string> = windowLocationSearch.replace("?", "").split("&");

	return pairStrings.reduce((accObject: Record<string, string>, pair: string) => {
		const [key, value] = pair.split("=");
		accObject[key] = value;
		return accObject;
	}, {});
}
