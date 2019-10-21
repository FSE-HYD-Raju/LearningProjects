import cssns from "../../../utils/cssnsConfig";
import OcModal from "../../ocComponents/OcModal";
import ShopProductImage from "../product/ShopProductImage";
import ComparisonPrice from "./ComparisonPrice";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { get, isEmpty } from "lodash";
import { FormattedMessage } from "../../../channelUtils";
import messages from "./ShopComparison.messages";
import { FC } from "react";
import { BasketActionAddProductToBasket, ProductOffering, User, Configurations } from "../../../redux/types";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const { React } = cssns("CharacteristicsComparisonModal");

interface CharacteristicsComparisonModalStateProps {
	items: Array<ProductOffering>;
	open: boolean;
	comparisonCharacteristics: any;
	activeCustomer?: User;
	configurations: Configurations;
	category?: string;
	activeBasketId?: string;
}

interface CharacteristicsComparisonModalActionProps {
	actions: {
		addProductToBasket: BasketActionAddProductToBasket;
		hide: () => void;
		showConfigurationModalForProduct: (itemId: string) => void;
	};
}

type CharacteristicsComparisonModalProps = CharacteristicsComparisonModalStateProps & CharacteristicsComparisonModalActionProps;

const CharacteristicsComparisonModal: FC<CharacteristicsComparisonModalProps> = (props: CharacteristicsComparisonModalProps) => {
	const items = props.items || [];

	const show = props.open || false;
	const itemCount = items && items.length;

	const interestingCharacteristics = props.comparisonCharacteristics && props.category && props.comparisonCharacteristics[props.category];

	const handleClick = (item: any, isConfigurable: boolean) => {
		const basketId = props.activeBasketId;

		if (isConfigurable && item) {
			props.actions.showConfigurationModalForProduct(item.id);
			props.actions.hide();
		} else {
			props.actions.addProductToBasket(
				{
					product: item,
					configurations: props.configurations,
					basketId,
					hasCustomer: Boolean(props.activeCustomer)
				}
			);
		}
	};

	const renderProductNamesAndPrices = () => {
		const items = props.items || [];
		return items && items.map((item, idx) => {
			const prices = get(item.attributes || item, "prices", []);
			return (
				<div
					key={`CharacteristicsComparisonModal-tableheader-${item.id}-${idx}`}
					className="tableheader"
				>
					<div className="mugshot">
						<ShopProductImage idx={idx} product={item}/>
						{ProductOfferingUtil.getName(item)}
					</div>
					<div className="item-price">
						<ComparisonPrice
							prices={prices}
						/>
					</div>
				</div>
			);
		});
	};

	const renderConfigurables = () => {
		const items = props.items || [];
		return items && items.map((item, idx) => {
			const isConfigurable = ProductOfferingUtil.isConfigurable(item);
			const msg = isConfigurable ? messages.configure : messages.select;
			return (
				<div key={`buttons-below-item-${item.id}-${idx}`} className="item-to-basket">
					<OcButton
						buttonType={OcButtonType.SUCCESS}
						id={`pos-compare-devices-select-device-button-${item.id}`}
						onClick={() => handleClick(item, isConfigurable)}
					>
						<FormattedMessage {...msg}/>
					</OcButton>
				</div>
			);
		});
	};

	const renderCharacteristics = () => {
		const items = props.items || [];
		return (
			<div className="tablebody">
				{interestingCharacteristics && interestingCharacteristics.map((key: string, cIdx: number) => {
						const charInstances = items.map((item: any) => get(item.attributes || item, "instanceCharacteristics[" + key + "]"));
						return (
							<div className="instance-characteristics" key={`instanceCharacteristics-key-${name}-${cIdx}`}>
								<div className="character-name">
									{charInstances && charInstances.length > 0 && charInstances[0] ? (charInstances[0].name) : (key)}
								</div>
								{charInstances.map((ci: any, ciIdx: number) => {
										const value = ci && ci.values[0].value ? ci.values[0].value : " ";
										return (
											<div key={`instanceCharacteristics-value-${name}-${ciIdx}`} className="detail">
												{value}
											</div>
										);
									}
								)}
							</div>
						);
					}
				)}
			</div>
		);
	};

	return (
		<OcModal
			className="comparison"
			title={<FormattedMessage {...messages.compareProducts} />}
			showModal={show}
			largeModal={itemCount <= 3}
			extraLargeModal={itemCount > 3}
			onClose={() => { props.actions.hide(); }}
		>
			<div className="outer-container">
				<div className="container">
					<div className="inner-container">
						{renderProductNamesAndPrices()}
					</div>
					<div className="items-container">
						{renderConfigurables()}
					</div>
					{isEmpty(interestingCharacteristics) ? (
						<div className="no-characteristics">
							<FormattedMessage {...messages.detailedComparisonNotAvailable}/>
						</div>
					) : renderCharacteristics()}
				</div>
			</div>
		</OcModal>
	);
};

export default CharacteristicsComparisonModal;
export {
	CharacteristicsComparisonModalProps,
	CharacteristicsComparisonModalStateProps,
	CharacteristicsComparisonModalActionProps,
};
