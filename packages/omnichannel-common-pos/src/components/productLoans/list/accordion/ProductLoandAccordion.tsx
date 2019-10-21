import { CommercialEnrichmentNameEnum, Product, ProductOffering } from "../../../../redux/types";
import { ProductLoansRow } from "./ProductLoansRow";
import ProductLoanExpandedContentContainer from "./ProductLoanExpandedContentContainer";
import ProductLoanExpandedContent from "./ProductLoanExpandedContent";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { PureComponent, ReactElement } from "react";
import cssns from "../../../../utils/cssnsConfig";
import { OcAccordion, ONLY_ONE_STRATEGY } from "../../../ocComponents/accordion";
import AddonsTabTableHeaders from "../../../subscription/AddonsTabTableHeaders";

const { React } = cssns("AddonsTabView");

interface ProductLoansAccordionProps {
	loans: Array<ProductOffering | Product>;
	activateLoan: (loan: ProductOffering) => void;
	openTopUpModal: () => void;
	isItemActive: (item: ProductOffering | Product) => boolean;
}

const NEW_LINES_REGEXP = /[\r\n]+/g;

class ProductLoansAccordion extends PureComponent<ProductLoansAccordionProps> {
	headerRendererFunction = (item: ProductOffering | Product): { header: ReactElement<any> } => {
		const header = (
			<ProductLoansRow
				loan={item}
				isActive={this.props.isItemActive(item)}
				activateLoan={this.props.activateLoan}
				openTopUpModal={this.props.openTopUpModal}
			/>
		);

		return { header: header };
	};

	contentRendererFunction = (item: ProductOffering | Product): { content: ReactElement<any> } => {
		const longDescription =
			(ProductOfferingUtil.getCommercialEnrichmentValueFromPO(item, CommercialEnrichmentNameEnum.descriptions,
				"detailed") || "").replace(NEW_LINES_REGEXP, "\n") || "";
		const expandedContent = this.props.isItemActive(item) ? (
			<ProductLoanExpandedContentContainer loan={item as Product} longDescription={longDescription} />
		) : (
			<ProductLoanExpandedContent loan={item as Product} longDescription={longDescription} />
		);
		return { content: expandedContent };
	};

	render() {
		return (
			<>
				<AddonsTabTableHeaders />
				<OcAccordion
					expandStrategy={ONLY_ONE_STRATEGY()}
					items={this.props.loans}
					headerRendererFunction={this.headerRendererFunction}
					contentRendererFunction={this.contentRendererFunction}
				/>
			</>
		);
	}
}

export {
	ProductLoansAccordion,
	ProductLoansAccordionProps
};
