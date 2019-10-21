import { cssns, Flex, FormattedMessage } from "omnichannel-common-pos";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import messages from "../Customer.messages";
const { React } = cssns("SidebarItem");
const momentLocalizer = require("react-widgets/lib/localizers/moment");
momentLocalizer(moment);

const CustomerDetailsSidebarItem = props => {
	const itemData = props.itemData;

	return (
		<div className="content">
			<Flex direction="row" wrap="nowrap">
				<div className="header">
					<i
						className={`fa fa-${itemData.font_awesome} btn-icon-left`}
					/>
					{itemData.itemType}
				</div>
				<div className="link">
					<Link to={itemData.link}>
						<FormattedMessage {...messages.sidebarShowallLink} />
						<i className="fa fa-arrow-right" />
					</Link>
				</div>
			</Flex>
			<div className="body">
				<div className="timestamp">
					{moment(itemData.time).format("DD.MM.YYYY HH:mm:ss")}
				</div>
				<div className="body-header">{itemData.header}</div>
				<div className="body-content">{itemData.content}</div>
			</div>
		</div>
	);
};

CustomerDetailsSidebarItem.propTypes = {
	itemData: PropTypes.object
};

export default CustomerDetailsSidebarItem;
