import cssns from "../../utils/cssnsConfig";
import messages from "./RecurringTopUp.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const { React } = cssns("RecurringTopUps");

interface PaymentMethodsEmptyListProps {
	addProductToBasket: () => void;
}

const RecurringTopUpsEmptyList: React.FC<PaymentMethodsEmptyListProps> = props => (
	<div className="empty-list">
		<div className="empty-list-spacer"/>
		<div className="empty-list-content">
			<i className="fa fa-ban empty-list-title-icon"/>
			<h3 className="empty-list-title">
				<FormattedMessage {...messages.noRecurringTopUps} />
			</h3>
			<span className="empty-list-description">
				<FormattedMessage {...messages.noRecurringTopUpsDescription} />
			</span>
			{props.addProductToBasket()}
		</div>
		<div className="empty-list-spacer"/>
	</div>
);

export { PaymentMethodsEmptyListProps };
export default RecurringTopUpsEmptyList;
