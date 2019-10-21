export default interface ConsulStatus {
	leader: (opts: any, callback: (...args: any[]) => void) => void;
	peers: (opts: any, callback: (...args: any[]) => void) => void;
}
