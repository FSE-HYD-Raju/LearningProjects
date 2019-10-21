const historyWithForceRefresh = require("../utils/historyWithForceRefresh");

export default function clearSession() {
	if (sessionStorage) {
		sessionStorage.clear();
	}
}
