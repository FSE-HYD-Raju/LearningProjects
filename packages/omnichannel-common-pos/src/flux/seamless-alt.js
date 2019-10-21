function immutable(StoreModel, overrides) {
	StoreModel.config = Object.assign(
		{
			setState(currentState, nextState) {
				Object.assign(this.state, {
					...currentState,
					...nextState
				});
				return this.state;
			},

			getState(currentState) {
				return currentState;
			},

			onSerialize(state) {
				return state;
			},

			onDeserialize(data) {
				return data;
			}
		},
		overrides
	);

	return StoreModel;
}

export default immutable;
