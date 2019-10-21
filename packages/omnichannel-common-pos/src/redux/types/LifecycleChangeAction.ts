import { HasId } from "./HasId";

interface LifecycleChangeActionAttributes extends HasId {
	name: string;
	targetType: string;
}

interface LifecycleChangeAction extends LifecycleChangeActionAttributes {
	attributes?: LifecycleChangeActionAttributes;
}

export {
	LifecycleChangeAction,
	LifecycleChangeActionAttributes
};
