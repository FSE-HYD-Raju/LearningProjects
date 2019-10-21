"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";
import { withCustomization } from "../../../customization";
import { POSComponentCustomizationPoints } from "../../../customization/points/POSCustomizationPoints";
import {
	AppState,
	ProductOffering,
	ProductOfferingGroup,
	ProductPath,
	MsisdnConfiguration,
	HasFlux,
	ResourceStocks,
	ResourceInventories,
	BasketActionAddProductToBasket,
	ReserveMsisdnConfig,
} from "../../../redux";
import actions from "../../../redux/actions";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import {
	PosMsisdnConfigurationModalActionProps,
	PosMsisdnConfigurationModalStateProps
} from "./PosMsisdnConfigurationModal";
import PosMsisdnConfigurationModal from "./PosMsisdnConfigurationModal";

const uuidv4 = require("uuid/v4");

interface PortInData {
	CH_PortInNumberResource?: string;
	CH_NIP: string;
	CH_StartDateTime?: Date;
	CH_Scheduled_Time: Date | string;
}

interface MsisdnConfigurationModalContainerProps extends HasFlux {
	product: ProductOffering;
	userOpened: boolean;
	addProduct: BasketActionAddProductToBasket;
	toggleMsisdnModal: (visibility: boolean, userOpened?: boolean) => void;
	msisdnPog: ProductOfferingGroup;
	path: ProductPath;
	selectedNumber?: string | number;
	msisdnConfig: MsisdnConfiguration;
}

interface StockIdExtendedProductOffering extends ProductOffering {
	msisdnsStockId: string;
}

const filteredMsisdnPog = (msisdnPog: ProductOfferingGroup, selectionStocks: Array<ResourceStocks>) => {
	if (!isEmpty(selectionStocks)) {
		const filteredProductOfferings: Array<StockIdExtendedProductOffering> = [];

		msisdnPog.productOfferings.forEach(offering => {
			const skuToMatch = get(offering, "instanceCharacteristics.CH_SKU.values['0'].value");
			selectionStocks.forEach(stock => {
				if (stock.attributes && stock.attributes.resourceSKU === skuToMatch) {
					filteredProductOfferings.push({ ...offering, msisdnsStockId: stock.id });
				}
			});
		});

		return { ...msisdnPog, productOfferings: filteredProductOfferings };
	} else {
		return msisdnPog;
	}
};

const mapStateToProps = (state: AppState, ownProps: MsisdnConfigurationModalContainerProps): PosMsisdnConfigurationModalStateProps => {
	const msisdnPog = state.feature.msisdnUseInventories
		? filteredMsisdnPog(ownProps.msisdnPog, state.msisdn.selectionStocks)
		: ownProps.msisdnPog;
	const sortedPos = ProductOfferingUtil.sortArrayOfProductOfferingsFromLowestOneTimeFeeToHighest(
		get(msisdnPog, "productOfferings", []));
	const preselectedCategory = ProductOfferingUtil.findSelectedPOFromPog(msisdnPog);
	const sortedPosFirstId: string = !isEmpty(sortedPos) ? sortedPos[0].id : "";
	const selectedCategory = preselectedCategory && preselectedCategory.id || sortedPosFirstId;
	return {
		product: ownProps.product,
		userOpened: ownProps.userOpened,
		handleClose: () => ownProps.toggleMsisdnModal(false),
		msisdnPog: ownProps.msisdnPog,
		path: ownProps.path,
		selectedNumber: ownProps.selectedNumber,
		msisdnConfig: ownProps.msisdnConfig,
		msisdns: state.basket.msisdns,
		msisdnUseInventories: state.feature.msisdnUseInventories,
		stocks: state.msisdn.stocks,
		inventories: state.msisdn.inventories,
		reservationAttributes: state.msisdn.reservationAttributes,
		activeReservationId: state.msisdn.activeReservationId,
		reservationError: state.msisdn.reservationError,
		selectedInventory: state.msisdn.selectedInventory,
		selectedCategory: state.msisdn.selectedCategory || selectedCategory,
		inputtedPattern: state.msisdn.inputtedPattern,
		sortedPos: sortedPos,
		patternNumberLength: state.feature.patternNumberLength,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: MsisdnConfigurationModalContainerProps): PosMsisdnConfigurationModalActionProps => {

	return {
		actions: {
			savePortIn: (path: ProductPath, portInData: PortInData) => {
				for (const key in portInData) {
					if (portInData.hasOwnProperty(key)) {
						dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, (portInData as any)[key]));
					}
				}
			},
			saveMsisdn: (key: string, msisdnNumber: string | number | undefined, path: ProductPath, activeReservationId?: string) => {
				// "soft" reservation (only valid for POS)
				if (activeReservationId) {
					dispatch(actions.productOfferingConfiguration.updateMsisdnSoftReservation(path, key, msisdnNumber, activeReservationId));
				} else {
					dispatch(actions.productOfferingConfiguration.makeMsisdnSoftReservation(path, key, msisdnNumber, uuidv4()));
				}
			},
			addProduct: ownProps.addProduct,
			performChangeCategory: actions.msisdn.performChangeCategory,
			getResourceInventories: () => {
				dispatch(actions.msisdn.getResourceInventories());
			},
			changeInventory: (selectedInventory: ResourceInventories, stocks: Array<ResourceStocks>) => {
				dispatch(actions.msisdn.changeInventory(selectedInventory, stocks));
			},
			reserveMsisdn: (config: ReserveMsisdnConfig) => {
				const { pattern, reservedFor, releaseId, stock, limit, product } = config;
				dispatch(actions.msisdn.reserveMsisdn(pattern,
					releaseId,
					reservedFor,
					stock,
					limit,
					product));
			},
			releaseMsisdn: (releaseId: string, reservedFor: string) => {
				dispatch(actions.msisdn.releaseMsisdn(releaseId, reservedFor));
			},
			selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => {
				dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
			},
			resetProductOfferingGroups: (productId: string) => {
				dispatch(actions.productOfferingConfiguration.resetProductOfferingGroups(productId));
			},
		}
	};
};

export default withCustomization(POSComponentCustomizationPoints.POS_MSISDN_CONFIGURATION_MODAL, connect(mapStateToProps, mapDispatchToProps)(PosMsisdnConfigurationModal));
export {
	MsisdnConfigurationModalContainerProps,
	StockIdExtendedProductOffering,
	PortInData,
};
