export default interface ConsulAgent {
	checks: (...args: any[]) => void;
	services: (...args: any[]) => void;
	service: ConsulAgentService;
	members: (opts: any, callback: (...args: any[]) => void) => void;
	self: (opts: any, callback: (...args: any[]) => void) => void;
	maintenance: (opts: any, callback: (...args: any[]) => void) => void;
	join: (opts: any, callback: (...args: any[]) => void) => void;
	forceLeave: (opts: any, callback: (...args: any[]) => void) => void;
}

export interface ConsulAgentService {
	list: (callback: (...args: any[]) => void) => void;
}
