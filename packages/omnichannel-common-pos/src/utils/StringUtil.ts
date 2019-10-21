export default class StringUtil {
	static escapeSpecialCharacter(str: string | null): string | null {
		if (!str) {
			return null;
		}
		return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
	}
}
