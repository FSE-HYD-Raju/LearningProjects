/* eslint no-undef: 0 */
declare type SchemaType = {
	isValid: (model: Object) => Promise<*>,
	validate: Object => Promise<*>
};

export {
	SchemaType
};
