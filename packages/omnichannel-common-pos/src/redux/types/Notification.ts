import { HasId } from "./index";

interface Notification extends HasId {
	attributes: {
		message: string
	};
}

export {
	Notification
};
