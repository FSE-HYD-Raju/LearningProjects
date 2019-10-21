// @flow

export default class BaseImmStore<State> {
	state: State = {};
	alt: any;
	bindActions: any;
	exportPublicMethods: any;
	setState: ($Shape<State>) => void;
}
