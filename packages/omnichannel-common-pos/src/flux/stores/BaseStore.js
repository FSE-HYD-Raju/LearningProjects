export default class BaseStore {
	constructor() {
		this.state = {};
	}

	onError() {
		// error handling actually done in ErrorActions / store
	}
}
