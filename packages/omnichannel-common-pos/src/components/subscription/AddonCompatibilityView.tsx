"use strict";
import { Product } from "../../redux/types/";
import * as classnames from "classnames";
import messages from "./AddonRowsLayout.messages";
import * as React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "../../channelUtils";

interface CompatibilityItemsProps {
	products: Array<Product>;
}

interface CompabitilityItemsState {
	displayItems: boolean;
}

class CompatibilityItems extends React.PureComponent<CompatibilityItemsProps, CompabitilityItemsState> {
	constructor(props: CompatibilityItemsProps) {
		super(props);
		this.state = {
			displayItems: false
		};
	}

	render() {
		const { products } = this.props;
		const { displayItems } = this.state;
		const displayViewAll = !displayItems && products.length > 3;
		const onClick = () => {
			this.setState({ displayItems: true });
		};
		return (
			<div className="compatibility-items">
				{products.map((product, idx) => {
					const name = product.name;
					const productId = product.id;
					const classNames = classnames({ "compatibility-item": true, hide: !displayItems && idx > 2 });
					return (
						<div className={classNames} key={`compatibility-item-${productId}-idx-${idx}`}>
							{name}
						</div>
					);
				})}
				{displayViewAll && (
					<div onClick={onClick} className="show-all-items btn-link">
						<FormattedMessage {...messages.showAll} />
					</div>
				)}
			</div>
		);
	}
}

export interface AddonCompatibilityViewProps {
	addons: {
		compatible: Array<Product>;
		incompatible: Array<Product>;
	};
}

const IncompatibleAddons = ({ incompatible }: { incompatible: Product[] }) => {
	if (incompatible.length === 0) {
		return null;
	}
	return (
		<div className="incompatible">
			<div className="compatibility-heading">
				<i className="fa fa-exclamation-triangle text-danger" />
				<FormattedHTMLMessage
					{...messages.addonServicesIncompatible}
					values={{
						addonCount: incompatible.length
					}}
				/>
			</div>
			<CompatibilityItems products={incompatible} />
		</div>
	);
};

const CompatibleAddons = ({ compatible }: { compatible: Product[] }) => {
	if (compatible.length === 0) {
		return null;
	}

	return (
		<div className="compatible">
			<div className="compatibility-heading">
				<i className="fa fa-check text-success" />
				<FormattedHTMLMessage
					{...messages.addonServicesCompatible}
					values={{
						addonCount: compatible.length
					}}
				/>
			</div>
			<CompatibilityItems products={compatible} />
		</div>
	);
};

const AddonCompatibilityView: React.FC<AddonCompatibilityViewProps> = props => {
	const { addons: { compatible = [], incompatible = [] } } = props;
	const shouldRender = compatible.length > 0 || incompatible.length > 0;
	if (!shouldRender) {
		return (
			<div className="AddonCompatibilityView">
				<FormattedMessage {...messages.noCompatibility} />
			</div>
		);
	}

	return (
		<div className="AddonCompatibilityView">
			<IncompatibleAddons incompatible={incompatible} />
			<CompatibleAddons compatible={compatible} />
		</div>
	);
};

export default AddonCompatibilityView;
