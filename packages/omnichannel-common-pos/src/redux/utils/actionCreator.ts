import { Action } from "redux";

type ActionPayload<T> = Pick<T, Exclude<keyof T, "type">>;
interface SingleArgumentAction<T, V> extends Action<T> {
	value: V;
}
type ExtractActionType<T> = T extends Action<infer K> ? K : never;
interface ObjectArgumentAction<T = any> extends Action<T> {
	value?: never;
}
function argumentlessActionCreator<T extends Action>(type: ExtractActionType<T>): () => T {
	return () =>
		({
			type,
		} as T);
}

function actionCreator<T extends ObjectArgumentAction>(type: ExtractActionType<T>): (args: ActionPayload<T>) => T {
	return (args: ActionPayload<T>) =>
		({
			type,
			...(args as object),
		} as T);
}

function singleArgumentActionCreator<V, T extends SingleArgumentAction<ExtractActionType<T>, V>>(type: ExtractActionType<T>): (value: V) => T {
	return (value: V) =>
		({
			type,
			value,
		} as T);
}

export { ActionPayload, actionCreator, singleArgumentActionCreator, argumentlessActionCreator, ObjectArgumentAction, SingleArgumentAction };