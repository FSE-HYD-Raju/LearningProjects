import { get, isEqual } from "lodash";

export default class Utils {

	static getListItemById = <T = any>(list: Array<T>, idField: keyof T, id: string | number): any => {
		if (list) {
			return list.find((item: T) => {
				return (item as any)[idField] === id;
			});
		}
		return undefined;
	};

	static hasDataChanged = <T = any>(props: T, newProps: T, key: string): boolean => {
		return !isEqual(get(props, key), get(newProps, key));
	}
}
