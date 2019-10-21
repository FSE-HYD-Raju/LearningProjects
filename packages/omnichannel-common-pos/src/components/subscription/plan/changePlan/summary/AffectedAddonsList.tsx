import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
const React = cssns("AffectedAddonsList").React as typeof R;
import { FormattedHTMLMessage } from "../../../../../channelUtils";
import { FormattedMessage as IntlFormattedMessage } from "react-intl";
import messages from "./ChangePlanSummary.messages";

interface AffectedAddonsListProps {
	titleMessage: IntlFormattedMessage.MessageDescriptor;
	addonsNames: string[];
	maxInitialCountToShow: number;
	iconClassName: string;
	className?: string;
}
interface AffectedAddonsListState {
	isExpanded: boolean;
}
class AffectedAddonsList extends React.Component<AffectedAddonsListProps, AffectedAddonsListState> {
	constructor(props: AffectedAddonsListProps) {
		super(props);
		this.state = { isExpanded: false };
	}
	expand = () => {
		this.setState({ isExpanded: true });
	};
	collapse = () => {
		this.setState({ isExpanded: false });
	};
	render() {
		const { addonsNames, titleMessage, maxInitialCountToShow, iconClassName, className } = this.props;
		const { isExpanded } = this.state;
		const isViewMoreVisible = !isExpanded && addonsNames.length > maxInitialCountToShow;
		const isShowLessVisible = isExpanded;
		const addonsToShow = isExpanded ? addonsNames : addonsNames.slice(0, maxInitialCountToShow);

		return addonsNames.length > 0 ? (
			<div className={`this ${className}`}>
				<div className="title-container">
					<i className={`fa ${iconClassName} addon-icon`} />
					<div className="title">
						<FormattedHTMLMessage {...titleMessage} values={{ count: addonsNames.length }} />
					</div>
				</div>
				<div className="addons-list">
					{addonsToShow.map((addonName: string, index: number) => (
						<span className="addons-list-item" key={index}>
							{addonName}
						</span>
					))}
					{isViewMoreVisible && (
						<a className="btn-link view-all-button" onClick={this.expand} data-test-name="view-all-button" href="javascript:">
							<FormattedMessage {...messages.viewAllAddonsButton} />
						</a>
					)}
					{isShowLessVisible && (
						<a className="btn-link show-less-button" onClick={this.collapse} data-test-name="show-less-button" href="javascript:">
							<FormattedMessage {...messages.showLessAddonsButton} />
						</a>
					)}
				</div>
			</div>
		) : null;
	}
}
export { AffectedAddonsList, AffectedAddonsListProps };
