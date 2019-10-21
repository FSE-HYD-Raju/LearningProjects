export default interface ConsulKv {
	get: (opts: any, callback: () => void) => void;
	keys: (opts: any, callback: () => void) => void;
	set: (opts: any, callback: () => void) => void;
	del: (opts: any, callback: () => void) => void;
	delete: (opts: any, callback: () => void) => void;
}
