export default interface ConsulSession {
	create: (opts: any, callback: (...args: any[]) => void) => void;
	destroy: (opts: any, callback: (...args: any[]) => void) => void;
	info: (opts: any, callback: (...args: any[]) => void) => void;
	get: (opts: any, callback: (...args: any[]) => void) => void;
	node: (opts: any, callback: (...args: any[]) => void) => void;
	list: (opts: any, callback: (...args: any[]) => void) => void;
	renew: (opts: any, callback: (...args: any[]) => void) => void;
}
