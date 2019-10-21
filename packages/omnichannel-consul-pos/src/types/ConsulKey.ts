export default interface ConsulKey {
	service?: string | boolean;
	name: string;
	folder: boolean;
	requireBoot?: boolean;
	keys?: any;
}
