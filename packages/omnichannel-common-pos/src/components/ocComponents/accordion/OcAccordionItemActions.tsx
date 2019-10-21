import * as React from "react";
import { FormattedMessage } from "../../../channelUtils";
import messages from "./OcAccordionItemActions.messages";
import * as classnames from "classnames";

interface OcAccordionItemActionsProps {
	onHeaderClick: () => void;
	expanded: boolean | undefined;
}

const OcAccordionItemActions: React.FC<OcAccordionItemActionsProps> = (props: OcAccordionItemActionsProps) => {
	const onClickHandler = (e: any) => {
		e.stopPropagation();
		props.onHeaderClick();
	};
	return (
		<a href="javascript:;" onClick={onClickHandler} className="OcAccordion-actions">
			{props.expanded ? <FormattedMessage {...messages.hide} /> : <FormattedMessage {...messages.showMore} />}
			<i
				className={classnames({
					fa: true,
					"fa-chevron-down": !props.expanded,
					"fa-chevron-up": props.expanded,
				})}
			/>
		</a>
	);
};

export { OcAccordionItemActions, OcAccordionItemActionsProps };
