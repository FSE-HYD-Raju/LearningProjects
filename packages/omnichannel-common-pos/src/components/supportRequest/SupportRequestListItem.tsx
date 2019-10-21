import cssns from "../../utils/cssnsConfig";
import * as classnames from "classnames";
const { React } = cssns("SupportRequestListItem");

export interface SupportRequestListItemProps {
	customerCaseId: string;
	active: boolean;
	summary: string;
	date: string;
	status: string;
	handleClick: (customerCaseId: string) => void;
	logicalStatus: string;
	isOrderOpen: boolean;
}

const SupportRequestListItem: React.FC<SupportRequestListItemProps> = (props: SupportRequestListItemProps) => {
	const { active, logicalStatus, customerCaseId, handleClick, isOrderOpen } = props;
	return (
		<tr className="oc-tile-table-summary-row this" onClick={() => handleClick(customerCaseId)}>
			<td className="resolution-icon">
				<i
					className={classnames({
						"fa fa-check-circle fa-lg": !isOrderOpen,
						"fa fa-question-circle fa-lg": isOrderOpen
					})}
				/>
			</td>
			<td className="text-and-carret-color category ">{props.summary}</td>
			<td className="SupportRequestListItem-date-cell">{props.date}</td>
			<td
				className={`SupportRequestListItem-date-cell lifeCycleStatus lifeCycleStatus-${
					isOrderOpen ? "warning" : "success"
				}`}
			>
				<span>{!isOrderOpen ? logicalStatus : "In Progress"}</span>
			</td>
			<td className="carret-width text-and-carret-color">
				{active && <i className="fa fa-chevron-up" />}
				{!active && <i className="fa fa-chevron-down" />}
			</td>
		</tr>
	);
};

export default SupportRequestListItem;
