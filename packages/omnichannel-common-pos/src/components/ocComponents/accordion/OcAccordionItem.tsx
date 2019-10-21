import * as React from "react";
import { OcAccordionItemActions, OcAccordionItemActionsProps } from "./OcAccordionItemActions";

import * as classnames from "classnames";

interface OcAccordionItemProps {
	expanded: boolean | undefined;
	headerClassName?: string;
	contentClassName?: string;
	headerComponent: React.ReactElement<any>;
	contentComponent: React.ReactElement<any>;
	actionsRenderer?: React.ComponentType<OcAccordionItemActionsProps>;
	onHeaderClick: () => void;
	expandOnHeaderClick?: boolean | undefined;
}

const OcAccordionItem: React.FC<OcAccordionItemProps> = (props: OcAccordionItemProps) => {

	const Actions = props.actionsRenderer || OcAccordionItemActions;

	const { headerClassName, contentClassName, expanded, expandOnHeaderClick } = props;

	return (
		<div className={classnames({ "OcAccordion-item": true, "OcAccordion-item-expanded": !!expanded })}>
			<div
				className={classnames({ "OcAccordion-header-item": true, [headerClassName || ""]: !!headerClassName })}
				onClick={() => {
					if (expandOnHeaderClick) { props.onHeaderClick(); }
				}}
			>
				{props.headerComponent}
				<Actions onHeaderClick={props.onHeaderClick} expanded={expanded}/>
			</div>
			<div className={classnames({ "OcAccordion-content-item": true, [contentClassName || ""]: !!contentClassName })}>
				{props.contentComponent}
			</div>
		</div>
	);
};
OcAccordionItem.defaultProps = {
	actionsRenderer: OcAccordionItemActions
};

export {
	OcAccordionItem,
	OcAccordionItemProps
};
