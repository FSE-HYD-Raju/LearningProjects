export default interface ConsulQuery {
	list: (opts: any, callback: (...args: any[]) => void) => void;
	create: (opts: any, callback: (...args: any[]) => void) => void;
	get: (opts: any, callback: (...args: any[]) => void) => void;
	update: (opts: any, callback: (...args: any[]) => void) => void;
	destroy: (opts: any, callback: (...args: any[]) => void) => void;
	execute: (opts: any, callback: (...args: any[]) => void) => void;
	explain: (opts: any, callback: (...args: any[]) => void) => void;
	_params: (req: any, ops: any) => void;
}
