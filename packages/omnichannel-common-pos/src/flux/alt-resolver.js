// @flow

const { BROWSER } = process.env;

class AltResolver {
	pendingActions: Array<() => Promise<*>> = [];
	firstRender: boolean = true;

	resolve(action: () => Promise<*>): Promise<*> {
		if ((BROWSER && !this.firstRender) || setImmediate) {
			return action();
		} else {
			this.pendingActions = [...this.pendingActions, action];
			return Promise.resolve();
		}
	}

	async dispatchPendingActions(): Promise<boolean> {
		for (const action of this.pendingActions) {
			// TODO: fix me
			/* eslint-disable no-await-in-loop */
			await action();
		}
		this.pendingActions = [];
		return Promise.resolve(true);
	}
}

export default AltResolver;
