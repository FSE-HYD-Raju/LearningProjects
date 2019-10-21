export default interface ConsulCatalog {
	nodes: (...args: any[]) => void;
	services: (...args: any[]) => void;
	datacenters: (opts: any, callback: () => void) => void;
}
