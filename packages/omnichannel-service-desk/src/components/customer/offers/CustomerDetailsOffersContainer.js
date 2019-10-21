import { cssns, Flex } from "omnichannel-common-pos";
import CustomerDetailsOfferItem from "./CustomerDetailsOfferItem";
import PropTypes from "prop-types";

const { React } = cssns("CustomerDetailsOffersContainer");

const CustomerDetailsOffersContainer = props => {
	const offerItems = props.getCustomerOffers();

	return (
		<Flex direction="row" wrap="wrap" className="offers">
			{offerItems &&
				offerItems.map((offer, index) => {
					return (
						<CustomerDetailsOfferItem
							key={`CustomerDetailsOfferItem-${index}`}
							offerData={offer}
						/>
					);
				})}
		</Flex>
	);
};

CustomerDetailsOffersContainer.propTypes = {
	getCustomerOffers: PropTypes.func
};

export default CustomerDetailsOffersContainer;
