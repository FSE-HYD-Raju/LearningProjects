import * as React from "react";
import { CustomerPaymentMethod } from "../../../redux/types";
import OcInput from "../../ocComponents/OcInput";
import { get, isEmpty } from "lodash";

export interface CreditCardStorageSelectionOwnProps {
	onChangeCreditCard: (selectedCreditCard: CustomerPaymentMethod) => void;
	selectedMethodId?: string;
}

export interface CreditCardStorageSelectionStateProps {
	customerPaymentMethods?: Array<CustomerPaymentMethod>; // now only credit cards available as customer payment methods
}

export interface CreditCardStorageSelectionProps
	extends CreditCardStorageSelectionOwnProps,
		CreditCardStorageSelectionStateProps {}

const CreditCardSelectionList: React.FC<CreditCardStorageSelectionProps> = (props: CreditCardStorageSelectionProps) => {
	const changeCreditCard = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedMethodId = get(event, "target.id", "");
		const customerPaymentMethods = isEmpty(props.customerPaymentMethods)
			? []
			: (props.customerPaymentMethods as Array<CustomerPaymentMethod>);

		const selectedMethod = customerPaymentMethods.find(pm => {
			return pm.id === selectedMethodId;
		});
		if (selectedMethod) {
			props.onChangeCreditCard(selectedMethod);
		}
	};

	return (
		<div>
			{props.customerPaymentMethods && props.customerPaymentMethods
					.filter(paymentMethod => {
						const { attributes } = paymentMethod;
						const { validFor } = attributes!;

						const now = new Date();
						const endDate = new Date(validFor!.endDate!);
						return endDate.getTime() > now.getTime();
					})
					.map((method: CustomerPaymentMethod) => {
						const label = method && method.creditCard && method.creditCard.maskedCardNumber + ", valid thru " +
								method.creditCard.expiryMonth + " / " + method.creditCard.expiryYear;
						return (
							<OcInput // FIXME: probably not all these props are necessary
								type="radio"
								name={method.name}
								onChange={changeCreditCard}
								checked={method.id === props.selectedMethodId}
								value={label}
								label={label}
								key={`${method.id}`}
								id={`${method.id}`}
								standalone={true}
							/>
						);
					})}
		</div>
	);
};

export { CreditCardSelectionList };
