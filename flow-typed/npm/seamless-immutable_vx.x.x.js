// @flow
// copied from: https://gist.github.com/mizchi/3054bca701dff4b5e28efd9133c66818
declare module "seamless-immutable" {
	declare type Immutable<T> = T & $Shape<{
		set(key: $Keys<T>, value: any): Immutable<T>,
		setIn(keys: Array<$Keys<T>>, value: any): T,
		merge<U>(u: U, opts?: { deep: boolean }): Immutable<T & U>,
		replace<U: $Subtype<T>>(u: U, opts?: { deep: boolean }): Immutable<T>,
		update<U>(
			key: $Keys<T>,
			fn: (U, ...args: any) => U,
			...args: any
		): Immutable<T>,
		updateIn<U>(
			keys: Array<$Keys<T>>,
			fn: (U, ...args: any) => U,
			...args: any
		): Immutable<T>,
		getIn(path: string[], defaultValue?: any): any,
		without<U>(key: string | string[]): U,
		without<U>(keys: string[]): U,
		without<U>(...args: string[]): U,
		without<U>(keyFunction: (value: any, key: string) => boolean): U,
		asMutable(): T
	}>;

	declare type ImmutableWithoutFunctions<T> = T;

	declare type ImmStoreStateType<StateType> = ImmutableWithoutFunctions<$Shape<StateType>>;

	declare type ImmStateType<StateType> = {
		data: Immutable<$Shape<StateType>>
	};

	declare module.exports:
		(<T>(t: T) => Immutable<T>) &
		(<T>(t: T) => ImmStateType<T>) &
		(<T>(t: T) => ImmStoreStateType<T>);
}
