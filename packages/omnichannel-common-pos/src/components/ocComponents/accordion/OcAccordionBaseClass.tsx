import * as React from "react";
import { HasId } from "../../../redux/types";
import { OcAccordionItemActions } from "./OcAccordionItemActions";

interface ExpandStrategy {
	toggleItem: (id: string, currentState: OcAccordionBaseClassState) => OcAccordionBaseClassState;
	isItemExpanded: (id: string, currentState: OcAccordionBaseClassState) => boolean;
}

/**
 * By default all items are collapsed, when user clicks on some item it expands, other items are not affected
 * All items collapsed and all items expanded states are allowed
 * If current state is undefined - initial state should be returned
 */
const OPEN_ANY_STRATEGY: () => ExpandStrategy = () => {
	return {
		toggleItem: (id: string, currentState: OcAccordionBaseClassState): OcAccordionBaseClassState => {
			const newState: Record<string, boolean | undefined> = { ...currentState };

			if (currentState[id]) {
				newState[id] = undefined;
			} else {
				newState[id] = true;
			}

			return newState;
		},
		isItemExpanded: (id: string, currentState: OcAccordionBaseClassState): boolean => {
			return !!currentState[id];
		}
	};
};

/**
 * Rules: By default first item is expanded, when another item is expanded previous should be collapsed
 * It is allowed to have all items collapsed
 */
const OPEN_FIRST_ONLY_ONE_STRATEGY: () => ExpandStrategy = () => {
	let openFirstRequired = true;
	let state: Record<string, boolean> = {};

	return {
		toggleItem: (id: string, currentState: OcAccordionBaseClassState): OcAccordionBaseClassState => {
			const itemPrevStateIsExpanded = !!state[id];

			state = {};
			if (!itemPrevStateIsExpanded) {
				state = {[id]: true};
			}

			return state;
		},
		isItemExpanded: (id: string, currentState: OcAccordionBaseClassState): boolean => {
			// handle first item. Only once
			if (openFirstRequired) {
				openFirstRequired = false;
				state[id] = true;

				return true;
			}
			return !!state[id];
		}
	};
};

/**
 * Rules: By default all items are collapsed, when some item is expanded other should be collapsed
 * It is allowed to have all items collapsed
 */
const ONLY_ONE_STRATEGY: () => ExpandStrategy = () => {
	let state: Record<string, boolean> = {};

	return {
		toggleItem: (id: string, currentState: OcAccordionBaseClassState): OcAccordionBaseClassState => {
			const itemPrevStateIsExpanded = !!state[id];

			state = {};
			if (!itemPrevStateIsExpanded) {
				state = {[id]: true};
			}

			return state;
		},
		isItemExpanded: (id: string, currentState: OcAccordionBaseClassState): boolean => {
			return !!state[id];
		}
	};
};

/**
 * Rules: By default all items are expanded
 * It is allowed to have all items collapsed/expanded
 */
const ALL_EXPANDED_STRATEGY: () => ExpandStrategy = () => {
	return {
		toggleItem: (id: string, currentState: OcAccordionBaseClassState): OcAccordionBaseClassState => {
			const newState: Record<string, boolean | undefined> = { ...currentState };

			if (currentState[id]) {
				newState[id] = undefined;
			} else {
				newState[id] = true;
			}

			return newState;
		},
		isItemExpanded: (id: string, currentState: OcAccordionBaseClassState): boolean => {
			// all items are expanded by default
			if (!currentState[id]) {
				return true;
			}
			return !!currentState[id];
		}
	};
};

interface OcAccordionBaseClassProps<T extends HasId> {
	expandStrategy?: ExpandStrategy;
	items: Array<T>;
}

interface OcAccordionBaseClassState extends Record<string, boolean | undefined> {}

abstract class OcAccordionBaseClass<
	T extends HasId = HasId,
	P extends OcAccordionBaseClassProps<T> = OcAccordionBaseClassProps<T>,
	S extends OcAccordionBaseClassState = OcAccordionBaseClassState> extends React.Component<P, S> {

	static defaultExpandStrategy: ExpandStrategy = OPEN_ANY_STRATEGY();
	static getExpandedStrategy<T extends HasId>(props: OcAccordionBaseClassProps<T>): ExpandStrategy {
		return props.expandStrategy || OcAccordionBaseClass.defaultExpandStrategy;
	}

	static getDerivedStateFromProps<
		T extends HasId = HasId,
		P extends OcAccordionBaseClassProps<T> = OcAccordionBaseClassProps<T>,
		S extends OcAccordionBaseClassState = OcAccordionBaseClassState>(
		nextProps: P, prevState: S): S {

		if (nextProps.items && nextProps.items.length > 0) {
			const newState = {...prevState as any};
			nextProps.items.forEach((item: HasId) => {
				if (!newState[item.id]) {
					newState[item.id] = OcAccordionBaseClass.getExpandedStrategy(nextProps).isItemExpanded(item.id, prevState || {});
				}
			});
		}
		return {} as S;
	}

	constructor(props: P, context?: any) {
		super(props, context);

		this.handleHeaderClick = this.handleHeaderClick.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.renderActions = this.renderActions.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.renderItems = this.renderItems.bind(this);

		this.state = {} as any;
	}

	public handleHeaderClick(item: T) {
		this.setState(OcAccordionBaseClass.getExpandedStrategy<T>(this.props).toggleItem(item.id, this.state));
	}

	abstract renderHeaderContent(item: T, isExpanded: boolean): React.ReactNode;
	abstract renderContent(item: T, isExpanded: boolean): React.ReactNode;

	public renderHeader(item: T, isExpanded: boolean): React.ReactNode {
		return <>
			{this.renderHeaderContent(item, isExpanded)}
			{this.renderActions(item, isExpanded)}
		</>;
	}

	public renderActions(item: T, isExpanded: boolean): React.ReactNode {
		return (
			<OcAccordionItemActions
				onHeaderClick={() => this.handleHeaderClick(item)}
				expanded={isExpanded}
				key="actions"
			/>
		);
	}

	public renderItem(item: T, isExpanded: boolean): React.ReactNode {
		return <>
			{this.renderHeader(item, isExpanded)}
			{this.renderContent(item, isExpanded)}
		</>;
	}

	renderItems(): React.ReactNode {
		if (!this.props.items) {
			return null;
		}

		return this.props.items.map((item: T): React.ReactNode => {
			const isExpanded: boolean = OcAccordionBaseClass.getExpandedStrategy(this.props).isItemExpanded(item.id, this.state);
			return this.renderItem(item, isExpanded);
		});
	}
}

export {
	ExpandStrategy,
	OPEN_ANY_STRATEGY,
	OPEN_FIRST_ONLY_ONE_STRATEGY,
	ONLY_ONE_STRATEGY,
	ALL_EXPANDED_STRATEGY,
	OcAccordionBaseClassProps,
	OcAccordionBaseClassState,
	OcAccordionBaseClass
};
