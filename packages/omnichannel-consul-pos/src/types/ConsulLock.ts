export default interface ConsulLock {
	acquire: () => void;
	release: () => void;
	_err: (err: any, res: any) => void;
	_run: (ctx: any) => void;
	_session: (ctx: any) => void;
	_wait: (ctx: any) => void;
	_acquire: (ctx: any) => void;
	_monitor: (ctx: any) => void;
	_end: (ctx: any, err: any, res: any) => void;
	_release: (ctx: any) => void;
}
