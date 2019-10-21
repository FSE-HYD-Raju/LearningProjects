import cssns from "../../../utils/cssnsConfig";
import OcTransition from "../../ocComponents/OcTransition";
import { FormattedMessage } from "../../../channelUtils";
import { ProductOffering } from "../../../redux";
import { ContextType, contextTypesValidationMap } from "../../../types";
import messages from "./ShopComparison.messages";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";

const { React } = cssns("ComparisonFooter");

interface ComparisonFooterStateProps {
	items: ProductOffering[];
}

interface ComparisonFooterActionProps {
	actions: {
		show: () => void;
		clear: () => void;
		toggleItem: (item: ProductOffering) => void;
	};
}

interface ComparisonFooterProps extends ComparisonFooterStateProps, ComparisonFooterActionProps {}

const ComparisonFooter: React.FC<ComparisonFooterProps> = (props: ComparisonFooterProps, context: ContextType) => {
	const { items } = props;

	if (!items || items.length === 0) {
		return null;
	}

	const clearAll = () => {
		props.actions.clear();
	};

	const openComparisonModal = () => {
		props.actions.show();
	};

	return (
		<div className="container position-fixed">
			<OcTransition expanded={items && items.length > 0}>
				<div className="items">
					<OcButton
						className="control compare-button"
						disabled={items.length <= 1}
						id="buttonOpenComparisonModalFromFooter"
						buttonType={OcButtonType.PRIMARY}
						onClick={openComparisonModal}
						title={items.length <= 1 ? context.intl.formatMessage(messages.addAtleastTwo) : ""}
					>
						<FormattedMessage {...messages.compare} />
					</OcButton>
					{items &&
						items.map((item: ProductOffering, idx: number) => {
							return (
								<div key={`ComparisonFooter-item-${idx}`} className="item btn">
									<span className="item-name">{ProductOfferingUtil.getName(item)}</span>
									<a
										id={`buttonRemoveItem-${item.id}`}
										className="item-remove"
										href="javascript:;"
										onClick={() => {
											props.actions.toggleItem(item);
										}}
									>
										<i className="item-remove fa fa-times" />
									</a>
								</div>
							);
						})}
					<OcButton
						id="linkClearAllItemsInComparisonFooter"
						className="control clear-button"
						buttonType={OcButtonType.LINK}
						onClick={clearAll}
					>
						<FormattedMessage {...messages.clearAll} />
					</OcButton>
				</div>
			</OcTransition>
		</div>
	);
};

ComparisonFooter.contextTypes = contextTypesValidationMap;

export default ComparisonFooter;
export {
	ComparisonFooterProps,
	ComparisonFooterStateProps,
	ComparisonFooterActionProps,
};
