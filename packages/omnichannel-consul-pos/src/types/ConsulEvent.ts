export default interface ConsulEvent {
	fire: (opts: any, callback: () => void) => void;
	list: (opts: any, callback: () => void) => void;
}
