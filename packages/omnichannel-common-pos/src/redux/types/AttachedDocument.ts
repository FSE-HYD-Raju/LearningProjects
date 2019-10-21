import { HasId } from "./HasId";

interface AttachedDocument extends HasId {
	name?: string;
	size?: string;
	type?: string;
	downloadUrl?: string;
}
export { AttachedDocument };
