import * as React from "react";
import { get, debounce } from "lodash";
import {
	User,
	Basket,
	CustomerCase,
	contextTypesValidationMap,
	ContextType
} from "omnichannel-common-pos";
import { Component } from "react";
import message from "./Sales.messages"


interface BarcodeInputStateProps {
	barcode: string;
	activeCustomerCase?: CustomerCase;
	activeBasket?: Basket;
	productNotFound: boolean;
}

interface BarcodeInputActionProps {
	actions: {
		findProduct: (barcode: string, customer: User, basketId: string) => void,
		saveBarcode: (id: string) => void;
	};
}

type BarcodeInputProps = BarcodeInputStateProps & BarcodeInputActionProps;

class BarcodeInput extends Component<BarcodeInputProps> {
	static displayName = "BarcodeInput";
	static contextTypes = contextTypesValidationMap;

	constructor(props: BarcodeInputProps, context: ContextType) {
		super(props, context);
		this.findProduct = debounce(this.findProduct.bind(this), 1000);
	}

	findProduct = (barcode = this.props.barcode, activeBasket = this.props.activeBasket,
				   activeCustomer = get(this.props.activeCustomerCase, "activeCustomerCase.attributes.activeCustomer")) => {
		if (barcode) {
			const basketId = activeBasket && activeBasket.id;
			if (basketId) {
				this.props.actions.findProduct(this.props.barcode, activeCustomer, basketId);
			}
		} else {
			this.clearBarcode();
		}
	};

	saveBarcode = (e: any) => {
		const { value } = e.target;
		this.props.actions.saveBarcode(value);
		this.findProduct();
	};

	checkEnter = (e: any) => {
		if (e.key === "Enter") {
			this.findProduct();
		}
	};

	clearBarcode = () => {
		this.props.actions.saveBarcode("");
	};

	render() {
		const { formatMessage } = this.context.intl;
		const notFound = this.props.productNotFound;

		return (
			<div className="BarcodeInput input-group">
				<div className="input-group-prepend">
					<div className="input-group-text">
						<i className="fas fa-barcode" />
					</div>
				</div>
				<input
					id="BarcodeInput"
					type="text"
					className={`form-control${notFound ? " is-invalid" : ""}`}
					value={this.props.barcode}
					onChange={this.saveBarcode}
					onKeyPress={this.checkEnter}
					onClick={this.clearBarcode}
					placeholder={formatMessage(message.barcodeInput)}
				/>
			</div>
		);
	}
}

export default BarcodeInput;
export {
	BarcodeInputProps,
	BarcodeInputStateProps,
	BarcodeInputActionProps
};
