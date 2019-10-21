export default interface ConsulWatch {
	(opts: any): any;
	isRunning: () => boolean;
	updateTime: () => Date;
	end: () => void;
	_wait: () => number;
	_err: (err: any, res: any) => void;
	_run: () => void;
}
