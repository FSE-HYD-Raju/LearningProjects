type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type OmitUnsafe<T, K> = Pick<T, Exclude<keyof T, K>>;

export {
	Omit,
	OmitUnsafe,
};
