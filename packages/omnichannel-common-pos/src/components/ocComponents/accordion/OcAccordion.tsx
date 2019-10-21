import * as React from "react";
import { OcAccordionItem } from "./OcAccordionItem";
import { HasId } from "../../../redux/types";
import { OcAccordionBaseClass, OcAccordionBaseClassProps } from "./OcAccordionBaseClass";
import { OcAccordionItemActionsProps } from "./OcAccordionItemActions";

interface OcAccordionProps<T extends HasId> extends OcAccordionBaseClassProps<T> {
	headerRendererFunction: (item: T, isExpanded?: boolean) => { header: React.ReactElement<any>, headerClassName?: string, expandOnHeaderClick?: boolean };
	contentRendererFunction: (item: T) => { content: React.ReactElement<any>, contentClassName?: string };
	actionsRenderer?: React.ComponentType<OcAccordionItemActionsProps>;
}

class OcAccordion<T extends HasId> extends OcAccordionBaseClass<T, OcAccordionProps<T>> {

	renderContent(item: T, isExpanded: boolean): React.ReactNode {
		return null;
	}

	renderHeaderContent(item: T, isExpanded: boolean): React.ReactNode {
		return null;
	}

	renderItem(item: T, isExpanded: boolean): React.ReactNode {
		const { header, headerClassName, expandOnHeaderClick } = this.props.headerRendererFunction(item, isExpanded);
		const { content, contentClassName } = this.props.contentRendererFunction(item);
		return (
			<OcAccordionItem
				key={`accordion-item-${item.id}`}
				actionsRenderer={this.props.actionsRenderer}
				headerComponent={header}
				headerClassName={headerClassName}
				contentComponent={content}
				contentClassName={contentClassName}
				expanded={isExpanded}
				onHeaderClick={() => { this.handleHeaderClick(item); }}
				expandOnHeaderClick={expandOnHeaderClick}
			/>);
	}

	render() {
		return (
			<div className="OcAccordion">
				{this.renderItems()}
			</div>
		);
	}
}

export {
	OcAccordion,
	OcAccordionProps,
};
