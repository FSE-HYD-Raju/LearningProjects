import * as R from "react";
import cssns from "../../../../utils/cssnsConfig";
import { Product } from "../../../../redux/types";
import { ActiveProductLoan } from "../../../../redux/models/productLoan/productLoan.types";
const React = cssns("ProductLoanExpandedContent").React as typeof R;
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import ProductLoansListMessages from "../productLoansList.messages";
import { CreditInfoContent } from "../../overview/CreditInfoModal";

interface ProductLoanExpandedContentProps {
	activeLoan?: ActiveProductLoan | undefined;
	loan: Product;
	longDescription: string;
}

const ProductLoanExpandedContent: React.FC<ProductLoanExpandedContentProps> = props => {
	const { activeLoan, longDescription } = props;
	return (
		<div className="container">
			<div className="description">
				{longDescription}
			</div>
			{activeLoan && (
				<div className="credit-info-container">
					<div className="title">
						<FormattedMessage {...ProductLoansListMessages.serviceDetails} />
					</div>
					<CreditInfoContent
						blocks={{
							loanAmountToPayBack: activeLoan.loanAmountToPayBack,
							loanFeeToPayBack: activeLoan.loanFeeToPayBack,
							totalRemainingCredit: activeLoan.totalAmountToPayBack,
							remainingLoanAmount: activeLoan.remainingLoanAmount
						}}
						dueDate={activeLoan.dueDate}
						twoColumn={true}
					/>
				</div>
			)}
		</div>
	);
};
export { ProductLoanExpandedContentProps };
export default ProductLoanExpandedContent;
