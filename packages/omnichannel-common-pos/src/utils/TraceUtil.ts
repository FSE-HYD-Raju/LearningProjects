import { once } from "lodash";

const log = (message: string): void => {
	window.console.warn(message);
};

class TraceUtil {
	static logOnce = once(log);
}
export default TraceUtil;
