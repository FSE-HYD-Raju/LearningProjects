import { isEqual } from "lodash";
class ReactUtil {
	static isPropChanged<T>(prevProps: T, nextProps: T, propName: keyof T): boolean {
		return isEqual(prevProps[propName], nextProps[propName]);
	}
}
export { ReactUtil };
