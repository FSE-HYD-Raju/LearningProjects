export default interface ConsulHealth {
	node: (opts: any, callback: () => void) => void;
	checks: (opts: any, callback: () => void) => void;
	service: (opts: any, callback: () => void) => void;
	state: (opts: any, callback: () => void) => void;
}
