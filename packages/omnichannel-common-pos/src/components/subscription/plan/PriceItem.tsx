import * as R from "react";
import OcCurrency from "../../ocComponents/OcCurrency";
import FormattedMessage, { FormattedMessageDescriptor } from "../../../channelUtils/FormattedMessage";
import { SimplePrice } from "../../../redux/types";
import messages from "./Plans.messages";
import { FC } from "react";
import cssns from "../../../utils/cssnsConfig";

const React = cssns("PriceItem").React as typeof R;

interface PriceItemProps {
	price: SimplePrice;
	type?: string;
}

const PriceItem: FC<PriceItemProps> = (props: PriceItemProps) => {
	const { price, type } = props;
	const visibility = price.taxFreeAmount ? "visible" : "hidden";
	let message: FormattedMessageDescriptor;

	if (type && (messages as any)[type]) {
		message = (messages as any)[type];
	} else {
		message = messages.activation;
	}

	return (
		<div className="price">
			<OcCurrency
				cost={price.taxFreeAmount}
				currency={price.currency || "EUR"}
				style={{ visibility }}
			/>
			<span className="price-type" style={{ visibility }}>
				<FormattedMessage {...message} />
			</span>
		</div>
	);
};

export default PriceItem;
export {
	PriceItemProps
};
