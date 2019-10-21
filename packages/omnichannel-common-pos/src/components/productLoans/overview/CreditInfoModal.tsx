import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import FormattedDate from "../../../channelUtils/FormattedDate";
import messages from "./overviewProductLoan.messages";
import { SimplePrice } from "../../../redux";
import OcCurrency from "../../ocComponents/OcCurrency";
import classnames from "classnames";
import OcModal from "../../ocComponents/OcModal";
const React: typeof R = cssns("CreditInfoModal").React;

interface CreditInfoContentBlocks {
	originalLoanAmount?: SimplePrice;
	originalLoanFee?: SimplePrice;
	remainingLoanAmount: SimplePrice;
	loanAmountToPayBack: SimplePrice;
	loanFeeToPayBack: SimplePrice;
	totalRemainingCredit: SimplePrice;
}
type CreditInfoContentBlocksKeys = keyof CreditInfoContentBlocks;
const negativeNumberBlocks: CreditInfoContentBlocksKeys[] = [
	"loanAmountToPayBack",
	"loanFeeToPayBack",
	"totalRemainingCredit"
];
interface CreditInfoModalProps extends CreditInfoContentBlocks {
	loanDescription?: string;
	showModal: boolean;
	onClose: () => void;
	onPayBack: () => void;
	dueDate: Date | undefined;
}

interface CreditInfoContentProps {
	blocks: Partial<Record<CreditInfoContentBlocksKeys, SimplePrice |undefined>>;
	dueDate: Date | undefined;
	twoColumn: boolean;
}

interface CreditInfoContentBlockProps {
	name: CreditInfoContentBlocksKeys;
	block: SimplePrice;
	twoColumn: boolean;
}

const CreditInfoContentBlock: R.FC<CreditInfoContentBlockProps> = (props: CreditInfoContentBlockProps) => {
	const sign = negativeNumberBlocks.includes(props.name) ? -1 : 1;
	const cost = (props.block.taxFreeAmount || 0) * sign;

	return (
		<div className="line">
			<div className="label">
				<FormattedMessage {...messages[props.name]} />
			</div>
			<div className="data">
				<OcCurrency cost={cost} currency={props.block.currency} />
			</div>
		</div>
	);
};

const CreditInfoContent: R.FC<CreditInfoContentProps> = (props: CreditInfoContentProps) => {
	const classes = classnames({container: true, twoColumn: props.twoColumn});
	return (
		<div className={classes}>
			{Object.keys(props.blocks).map(name => {
				const block = props.blocks[name as CreditInfoContentBlocksKeys];
				if (!block) { return null; }
				return (
					props.blocks[name as CreditInfoContentBlocksKeys] && <CreditInfoContentBlock
						key={name}
						block={block}
						name={name as CreditInfoContentBlocksKeys}
						twoColumn={props.twoColumn}
					/>);
				}
			)}
			<div className="line">
				<div className="label">
					<FormattedMessage {...messages.dueDate} />
				</div>
				{props.dueDate && (
					<div className="data">
						<FormattedDate value={props.dueDate} />
					</div>
				)}
			</div>
		</div>
	);
};

const CreditInfoModal: R.FC<CreditInfoModalProps> = (props: CreditInfoModalProps) => {
	return (
		<OcModal
			className="CreditInfoModal"
			showModal={props.showModal}
			largeModal={true}
			title={<FormattedMessage {...messages.creditInfo} />}
			onClose={props.onClose}
			okButtonLabel={<FormattedMessage {...messages.creditInfoModalPayBackBtn} />}
			onOk={props.onPayBack}
		>
			<CreditInfoContent
				blocks={{
					originalLoanAmount: props.originalLoanAmount,
					originalLoanFee: props.originalLoanFee,
					remainingLoanAmount: props.remainingLoanAmount,
					loanAmountToPayBack: props.loanAmountToPayBack,
					loanFeeToPayBack: props.loanFeeToPayBack,
					totalRemainingCredit: props.totalRemainingCredit
				}}
				dueDate={props.dueDate}
				twoColumn={false}
			/>
			<div className="description-block">
				{props.loanDescription}
			</div>
		</OcModal>
	);
};

export default CreditInfoModal;
export { CreditInfoModalProps,
	CreditInfoContent,
	CreditInfoContentProps,
	CreditInfoContentBlocksKeys,
	CreditInfoContentBlocks };
