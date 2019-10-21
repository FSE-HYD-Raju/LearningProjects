class ArrayUtil {
	static filterUndefined<T>(values: Array<T | undefined>): T[] {
		return values.filter((value: T | undefined): value is T => value !== undefined);
	}
}
export default ArrayUtil;
