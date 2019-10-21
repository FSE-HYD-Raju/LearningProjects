import classnames from "classnames";
import cssns from "../../utils/cssnsConfig";
import { ColumnLayout } from "../subscription/AddonRowsLayout";
import OcAccordionList from "./OcAccordionList";
import { get, isEmpty, omit } from "lodash";
import { ReactNode, CSSProperties } from "react";
import messages from "./OcComponents.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const { React } = cssns("OcListWidget");

/**
 * List widget component for general use, uses OcAccordionList internally for fancy toggling visuals. Inspired
 * by ProductTable.
 *
 * It renders flexible table like structure, with provided headers, rows and row columns. Content can be basically
 * anything for columns to provide maximal developer experience.
 *
 * See ocListWidget-test.js for usage examples
 *
 */
interface OcListWidgetProps {
	rows: Array<{columns: Array<ReactNode>}>;
	headers: Array<ReactNode>;
	expanded: boolean;
	toggleExpanded: (expanded: boolean) => void;
	id: string;

	titleText?: ReactNode;
	expansionDisabled?: boolean;
	noResultsText?: ReactNode;
	accordionListStyle?: CSSProperties;
	layout?: ColumnLayout[];
	ignoreMaxHeight?: boolean;
	hideTitle?: boolean;
}
const OcListWidget = (props: OcListWidgetProps) => {
	const {
		headers,
		rows,
		titleText,
		id,
		expansionDisabled,
		noResultsText,
		accordionListStyle,
		layout,
		ignoreMaxHeight,
		hideTitle
	} = props;

	let { expanded } = props;

	if (expansionDisabled) {
		expanded = false;
	}

	const OcListWidgetTitleBuilder = (hasData: boolean, expanded: boolean, titleText: ReactNode) => {
		const classes = classnames({
			expansionDisabled,
			widgetTitle: true,
			highlight: hasData
		});
		return (
			!hideTitle && (
				<div className={classes}>
					<h3 id={id}>
						{expanded ? (
							<i className="fa fa-caret-down" />
						) : (
							<i className="fa fa-caret-right" />
						)}
						{!isEmpty(titleText) && titleText}
					</h3>
				</div>
			)
		);
	};

	const OcListWidgetTableHeaderBuilder = (data: {headers: Array<ReactNode>}) => {
		const { headers } = data;
		return (
			<div className="header">
				{headers &&
					headers.map((header: ReactNode, idx: number) => {
						const layoutItem = get(layout, [idx]);
						const style = omit(layoutItem, "className") as CSSProperties;
						const layoutName = layoutItem ? layoutItem.className : "";
						return (
							<div
								key={`${idx}`}
								className={classnames({
									"header-cell": true,
									[`${layoutName}`]: !!layoutName
								})}
								style={style}
							>
								{header}
							</div>
						);
					})}
			</div>
		);
	};

	const OcListWidgetTableRow = (data: {columns: Array<ReactNode>}) => {
		const { columns } = data;
		const classes = classnames({
			"table-row": true,
			"ignore-max-height": ignoreMaxHeight
		});
		return (
			<div className={classes}>
				{columns &&
					columns.map((col, idx) => {
						const layoutItem = get(layout, [idx]);
						const style = omit(layoutItem, "className") as CSSProperties;
						const layoutName = layoutItem ? layoutItem.className : "";
						return (
							<div
								className={classnames({
									column: true,
									[`${layoutName}`]: !!layoutName
								})}
								key={`col-${idx}`}
								style={style}
							>
								{col}
							</div>
						);
					})}
			</div>
		);
	};

	const expandedContent = () => {
		if (expansionDisabled) {
			return null;
		}

		const classes = classnames({
			this: true,
			withMargin: !hideTitle
		});

		return (
			<div className={classes}>
				<OcListWidgetTableHeaderBuilder headers={headers} />
				{!isEmpty(rows) &&
					rows.map((row, idx) => {
						return (
							<div key={`row-${idx}`}>
								<OcListWidgetTableRow columns={row.columns} />
							</div>
						);
					})}
				{isEmpty(rows) && (
					<div
						className="rows"
					>
						<h3 className="no-content">
							{noResultsText ? (noResultsText) : (<FormattedMessage {...messages.listWidgetNothingFound}/>)}
						</h3>
					</div>
				)}
			</div>
		);
	};

	const handleClick = () => {
		if (!expansionDisabled) {
			props.toggleExpanded(!expanded);
		}
	};

	return (
		<OcAccordionList
			id={id}
			handleClick={handleClick}
			expandedContent={expandedContent()}
			rowContent={OcListWidgetTitleBuilder(
				!isEmpty(rows),
				expanded,
				titleText
			)}
			active={expanded}
			style={accordionListStyle}
		/>
	);
};

export default OcListWidget;
export { OcListWidgetProps };
