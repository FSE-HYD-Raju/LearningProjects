import { cssns, Flex, FormattedMessage, OcButton } from "omnichannel-common-pos";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import messages from "../../../index.messages";

const { React } = cssns("CustomerDetailsOfferItem");

const CustomerDetailsOfferItem = props => {
	const offerItem = props.offerData;

	return (
		<div className="item">
			<div className="item-type">{offerItem.type}</div>
			<div className="item-content">
				<div className="item-header">{offerItem.header}</div>
				{offerItem.description && (
					<div className="item-description">
						<p>
							{`${offerItem.description.substr(0, 140)}...`}
							{offerItem.link && (
								<Link to={offerItem.link}>
									<FormattedMessage {...messages.readMoreLink} />
								</Link>
							)}
						</p>
					</div>
				)}
				<Flex direction="row">
					{offerItem.details &&
						offerItem.details.map((detail, index) => {
							return (
								<div
									key={`CustomerDetailsOfferItem-offerItem-${index}`}
									className="item-details"
								>
									{detail}
								</div>
							);
						})}
				</Flex>
				{offerItem.actions && (
					<Flex
						direction="row"
						wrap="wrap"
						justifyContent="space-between"
						className="item-actions"
					>
						{offerItem.actions.map((action, index) => {
							return (
								<OcButton
									key={`CustomerDetailsOfferItem-offerItem-action-${index}`}
									onClick={action.onClick}
								>
									{action.text}
								</OcButton>
							);
						})}
					</Flex>
				)}
			</div>
		</div>
	);
};

CustomerDetailsOfferItem.propTypes = {
	offerData: PropTypes.object
};

export default CustomerDetailsOfferItem;
