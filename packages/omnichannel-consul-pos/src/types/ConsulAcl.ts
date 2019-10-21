export default interface ConsulAcl {
	create: (opts: any, callback: (...args: any[]) => void) => void;
	update: (opts: any, callback: (...args: any[]) => void) => void;
	destroy: (opts: any, callback: (...args: any[]) => void) => void;
	info: (opts: any, callback: (...args: any[]) => void) => void;
	get: (opts: any, callback: (...args: any[]) => void) => void;
	clone: (opts: any, callback: (...args: any[]) => void) => void;
	list: (opts: any, callback: (...args: any[]) => void) => void;
}
