import { cssns, MockWrapper } from "omnichannel-common-pos";
import CustomerDetailsSidebarItem from "./CustomerDetailsSidebarItem";
import PropTypes from "prop-types";

const { React } = cssns("CustomerDetailsSidebarView");

const CustomerDetailsSidebarView = props => {
	const sideBarItems = props.getSidebarNotifications();

	return (
		<div>
			{sideBarItems &&
				sideBarItems.map((item, index) => (
					<MockWrapper key={index}>
						<CustomerDetailsSidebarItem itemData={item} />
					</MockWrapper>
				))}
		</div>
	);
};
CustomerDetailsSidebarView.propTypes = {
	getSidebarNotifications: PropTypes.func
};

export default CustomerDetailsSidebarView;
