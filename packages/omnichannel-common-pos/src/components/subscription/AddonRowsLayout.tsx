import * as React from "react";
import messages from "./AddonRowsLayout.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const LAYOUT_MAP = {
	name: "name",
	fees: "fees",
	expiration: "expiration",
	status: "status",
	actions: "actions",
	expand: "expand"
};
type ColumnToIndexMap = Record<string, number>;
type ColumnLayout = {
	className?: string;
	display?: string;
	overflow?: string;
	whiteSpace?: string;
	textOverflow?: string;
	flex?: number;
	justifyContent?: string;
	maxWidth?: string;
	minWidth?: string;
};

const DEFAULT_COLUMNS_ORDER: string[] = Object.keys(LAYOUT_MAP);
const DEFAULT_COLUMNS_MAP: ColumnToIndexMap = DEFAULT_COLUMNS_ORDER.reduce(
	(res: Record<string, number>, name: string, idx: number) => {
		res[name] = idx;
		return res;
	},
	{}
);

const DEFAULT_LAYOUT: ColumnLayout[] = [
	{
		className: LAYOUT_MAP.name,
		display: "flex",
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		flex: 5.5
	},
	{
		className: LAYOUT_MAP.fees,
		display: "flex",
		overflow: "hidden",
		justifyContent: "flex-start",
		flex: 2,
		maxWidth: "13.375rem",
		minWidth: "20.5%"
	},
	{
		className: LAYOUT_MAP.expiration,
		display: "flex",
		overflow: "hidden",
		justifyContent: "flex-start",
		flex: 1.5,
		maxWidth: "6.75rem",
		minWidth: "10.84%"
	},
	{
		className: LAYOUT_MAP.status,
		display: "flex",
		overflow: "hidden",
		justifyContent: "flex-start",
		flex: 1.5,
		maxWidth: "6.75rem",
		minWidth: "10.84%"
	},
	{
		className: LAYOUT_MAP.actions,
		display: "flex",
		overflow: "hidden",
		justifyContent: "flex-start",
		flex: 1.5,
		maxWidth: "7.375rem",
		minWidth: "11.84%"
	},
	{
		className: LAYOUT_MAP.expand,
		display: "flex",
		overflow: "hidden",
		justifyContent: "flex-start",
		flex: 0.5,
		maxWidth: "0.875rem",
		minWidth: "3%"
	}
];

const sortColumnsByOrder = (columns: React.ReactNode[], order: string[]): React.ReactNode[] => {
	return order.reduce((res: React.ReactNode[], name: string) => {
		res.push(columns[DEFAULT_COLUMNS_MAP[name]]);
		return res;
	}, []);
};

const getLayout = (layout: ColumnLayout[], order: string[]): ColumnLayout[] => {
	return order.reduce((res: ColumnLayout[], name: string) => {
		const item = layout.find(({ className }) => className === name);
		if (item) {
			res.push(item);
		}
		return res;
	}, []);
};

const getHeaders = (columnsOrder: string[] = DEFAULT_COLUMNS_ORDER): React.ReactNode[] => {
	const columnName = (
		<div className={LAYOUT_MAP.name} key={LAYOUT_MAP.name}>
			<FormattedMessage {...messages.name} />
		</div>
	);
	const columnFees = (
		<div className={LAYOUT_MAP.fees} key={LAYOUT_MAP.fees}>
			<FormattedMessage {...messages.fees} />
		</div>
	);
	const columnExpireDate = (
		<div className={LAYOUT_MAP.expiration} key={LAYOUT_MAP.expiration}>
			<FormattedMessage {...messages.expiryDate} />
		</div>
	);
	const columnStatus = (
		<div className={LAYOUT_MAP.status} key={LAYOUT_MAP.status}>
			<FormattedMessage {...messages.status} />
		</div>
	);
	const headers = [
		columnName,
		columnFees,
		columnExpireDate,
		columnStatus,
		<span className={LAYOUT_MAP.actions} key={LAYOUT_MAP.actions} />,
		<span className={LAYOUT_MAP.expand} key={LAYOUT_MAP.expand} />
	];

	return sortColumnsByOrder(headers, columnsOrder);
};
export { DEFAULT_LAYOUT, LAYOUT_MAP, DEFAULT_COLUMNS_ORDER, getLayout, getHeaders, sortColumnsByOrder, ColumnLayout };
