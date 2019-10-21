import cssns from "../../../utils/cssnsConfig";
import { Product, ProductAttributes, ProductOffering } from "../../../redux/types";
import { ProductLoansListProps } from "./ProductLoansListProps";
import { PureComponent } from "react";
import { ProductLoansAccordion } from "./accordion/ProductLoandAccordion";
import ActivateProductLoanModalContainer from "../purchase/ActivateProductLoanModalContainer";
import ProductUtil from "../../../utils/product/ProductUtil";
import { AddonsSection } from "../../subscription/AddonsSection";
import ProductLoansListMessages from "./productLoansList.messages";
import { AddonsTabLifecycleFilter } from "../../../components/subscription/AddonsTabLifecycleFilter";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
const { React } = cssns("ProductLoansList");

class ProductLoansList extends PureComponent<ProductLoansListProps> {

	componentDidMount() {
		const { agreementId } = this.props;

		// load available product loans
		this.props.actions.getAvailableProductLoans(agreementId);
	}

	getProductLoansToDisplay = (): Array<ProductOffering | Product> => {
		switch (this.props.lifecycleFilter) {
			case AddonsTabLifecycleFilter.ACTIVE:
				return this.props.activeLoans;
			case AddonsTabLifecycleFilter.AVAILABLE:
				return this.props.availableLoans;
			default:
				return [...this.props.availableLoans, ...this.props.activeLoans];
		}
	}

	openTopUpModal = () => {
		const { selectedSubscriptionProduct, actions } = this.props;
		actions.openTopUpModal(selectedSubscriptionProduct.agreementId);
	};

	isItemActive = (item: ProductOffering | Product): boolean => {
		return this.props.activeLoans.includes(item as Product);
	}

	getMsisdnPhoneNumber = () => {
		return ProductUtil.getPhoneNumber(this.props.selectedSubscriptionProduct as ProductAttributes);
	};

	render() {
		const loans: Array<ProductOffering | Product> = this.getProductLoansToDisplay();

		if (!loans.length) {
			return null;
		}

		return (
			<>
				{this.props.showActivateModal && (
					<ActivateProductLoanModalContainer
						msisdn={this.getMsisdnPhoneNumber() || ""}
						agreementId={this.props.agreementId}
					/>
				)}
				<AddonsSection
					id="product-loans"
					activeHeader={ProductLoansListMessages.listTitle}
					inactiveHeader={ProductLoansListMessages.noListTitle}
					hasData={loans.length > 0}
				>
					<ProductLoansAccordion
						loans={loans}
						isItemActive={this.isItemActive}
						activateLoan={this.props.actions.activateLoan}
						openTopUpModal={this.openTopUpModal}
					/>
				</AddonsSection>

			</>
		);
	}
}

export default withCustomization<ProductLoansListProps>(CommonCustomizationPoints.PRODUCT_LOANS_LIST_CONTENT, ProductLoansList);
export {
	ProductLoansList as ProductLoansListBaseline
};
