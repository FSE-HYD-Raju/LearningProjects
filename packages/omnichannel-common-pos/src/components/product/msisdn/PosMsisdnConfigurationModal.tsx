import { get, isEmpty } from "lodash";
import { Component } from "react";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import {
	MsisdnConfiguration,
	PriceTypeEnum,
	ProductOffering,
	ProductOfferingGroup,
	ProductPath,
	ReserveMsisdnConfig,
	ResourceInventories,
	ResourceStocks,
	SimplePrice
} from "../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../types";
import cssns from "../../../utils/cssnsConfig";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { OcAlert, OcAlertType, OcButton, OcButtonType, OcTab, OcTabGroup } from "../../ocComponents";
import OcInput from "../../ocComponents/OcInput";
import OcLoadingSpinner from "../../ocComponents/OcLoadingSpinner";
import MsisdnPicker from "./MsisdnPicker";
import MsisdnPortInSelectorContainer from "./MsisdnPortInSelectorContainer";
import messages from "./PosMsisdnConfigurationModal.messages";
import { PortInData } from "./PosMsisdnConfigurationModalContainer";
import { SyntheticEvent } from "react";

const uuidv4 = require("uuid/v4");

const { React } = cssns("PosMsisdnConfigurationModal");

interface PosMsisdnConfigurationModalStateProps {
	product: ProductOffering;
	msisdnPog: ProductOfferingGroup;
	path: ProductPath;
	selectedNumber?: string | number;
	msisdns: any;
	msisdnConfig: MsisdnConfiguration;
	userOpened: boolean;
	msisdnUseInventories: boolean;
	inventories: Array<ResourceInventories>;
	stocks: Array<ResourceStocks>;
	reservationAttributes: any;
	activeReservationId?: string;
	reservationError: boolean;
	selectedInventory: any;
	selectedCategory: string;
	inputtedPattern?: string;
	handleClose: () => void;
	sortedPos: Array<ProductOffering>;
	patternNumberLength: number;
}

interface PosMsisdnConfigurationModalActionProps {
	actions: {
		savePortIn: (path: ProductPath, portInData: PortInData) => void;
		performChangeCategory: (categoryId: string) => void;
		releaseMsisdn: (releaseId: string, reservedFor: string) => void;
		resetProductOfferingGroups: (productId: string) => void;
		reserveMsisdn: (config: ReserveMsisdnConfig) => void;
		getResourceInventories: () => void;
		changeInventory: (selectedInventory: ResourceInventories, stocks: Array<ResourceStocks>) => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		saveMsisdn: (key: string, msisdnNumber: string | number | undefined, path: ProductPath, activeReservationId?: string) => void;
		addProduct: Function;
	};
}

interface PosMsisdnConfigurationModalState {
	selectedNumber?: string | number;
	selectedNumberClass: string;
	numberPreselected: boolean;
	mssisdnSelection: string;
	pattern?: string;
	CH_Scheduled_Time: Date | string;
	CH_NIP: any;
	isPortInNumber: boolean;
	previousSelectedNumberClass: string;
	isPatternValid: boolean;
}

const PO_NUMBER_PORTIN = "PO_NumberPortIn";

type PosMsisdnConfigurationModalProps = PosMsisdnConfigurationModalStateProps & PosMsisdnConfigurationModalActionProps;

class PosMsisdnConfigurationModal<T extends PosMsisdnConfigurationModalProps, S extends PosMsisdnConfigurationModalState> extends Component<T, S> {
	static contextTypes = contextTypesValidationMap;
	displayName = "MsisdnConfigurationModal";

	constructor(props: T, context: ContextType) {
		super(props, context);

		const {
			msisdnUseInventories,
			inventories,
			stocks,
			inputtedPattern
		} = this.props;


		if (msisdnUseInventories) {
			if (isEmpty(inventories) && isEmpty(stocks)) {
				this.props.actions.getResourceInventories();
			}
		}

		// Find out preselected numberClass and set it to state.
		// If none are preselected for some weird reason, use the first one.
		const preSelectedNumberClass: any =
			ProductOfferingUtil.findSelectedPOFromPog(props.msisdnPog) ||
			(props.msisdnPog &&
				Array.isArray(props.msisdnPog.productOfferings) &&
				props.msisdnPog.productOfferings.length > 0 &&
				props.msisdnPog.productOfferings[0]);

		this.state = {
			selectedNumber: "",
			numberPreselected: false,
			selectedNumberClass: preSelectedNumberClass ? preSelectedNumberClass.id : "",
			mssisdnSelection: "no-msisdn-port-in",
			pattern: inputtedPattern,
			CH_Scheduled_Time: "",
			CH_NIP: undefined,
			isPortInNumber: false,
			isPatternValid: true,
		} as S;
	}

	componentWillMount() {
		if (this.props.selectedNumber) {
			this.setState({
				selectedNumber: this.props.selectedNumber,
				numberPreselected: true
			});
		}
	}

	componentWillReceiveProps(newprops: PosMsisdnConfigurationModalProps) {
		const { userOpened, msisdnConfig, handleClose } = newprops;
		/* Product does not need MSISDN configuration and modal was not manually invoked by user. Close modal. */
		const productDoesNotNeedConfigurationByUser = Boolean(msisdnConfig && msisdnConfig.msisdn && !userOpened);

		/* CLose modal after saving the number from manually opened modal */
		const numberWasManuallySaved = Boolean(!this.state.numberPreselected && this.state.selectedNumber !== "" && userOpened);

		if (!this.props.msisdnUseInventories && (productDoesNotNeedConfigurationByUser || numberWasManuallySaved)) {
			handleClose();
		}
	}

	selectNumber = (number: string) => {
		this.setState({
			selectedNumber: number,
			numberPreselected: false
		});
	};

	saveNumber = () => {
		const numberPath = this.props.path;

		if (this.state.selectedNumberClass) {
			this.props.actions.selectProductOffering(
				this.props.path.concat({ pog: this.props.msisdnPog.id }),
				this.state.selectedNumberClass,
				get(this.props.msisdnPog, "productOfferings")
			);
		}
		this.props.actions.saveMsisdn("CH_NumberResource", this.state.selectedNumber, numberPath, this.props.activeReservationId);
	};
	// customization
	public triggerActionSavePortIn = (portInNumberPath: ProductPath) => {
		const { selectedNumber, CH_NIP, CH_Scheduled_Time } = this.state;
		if (selectedNumber && CH_NIP) {
			this.props.actions.savePortIn(portInNumberPath, {
				CH_PortInNumberResource: selectedNumber + "",
				CH_NIP,
				CH_Scheduled_Time
			});
		}
	};

	savePortIn = () => {
		const portInNumberPath = this.props.msisdnPog
			? this.props.path.concat({ pog: this.props.msisdnPog.id }).concat({ po: PO_NUMBER_PORTIN })
			: this.props.path;

		this.props.actions.selectProductOffering(
			this.props.path.concat({ pog: this.props.msisdnPog.id }),
			PO_NUMBER_PORTIN,
			get(this.props.msisdnPog, "productOfferings")
		);

		if (this.state.isPortInNumber) {
			this.triggerActionSavePortIn(portInNumberPath);
		}
	};

	findMsisdnsByNumberType = (id: string, selectedPo: ProductOffering) => {
		const msisdnsId = get(selectedPo, "id", id);
		return get(this.props.msisdns, [msisdnsId]);
	};

	// for whatever reason it shows cities in inventories dropdown
	changeInventory = (inventoryId: string) => {
		const { inventories, stocks } = this.props;

		if (inventoryId && !isEmpty(inventories) && !isEmpty(stocks)) {
			const selectedInventory = inventories.find(inventory => {
				return inventory.id === inventoryId;
			});
			if (selectedInventory) {
				this.props.actions.changeInventory(selectedInventory, stocks);
			}
		}
	};

	reserveMsisdnViaInventoryId = (event: any) => {
		const selectElement = document.getElementById(event.target.id) as HTMLSelectElement; // should be a select element anyway
		const stock = event.target.value;
		const categoryId = selectElement && selectElement.options[selectElement.selectedIndex].id;

		if (stock) {
			this.props.actions.reserveMsisdn({
				pattern: this.state.pattern,
				releaseId: this.props.activeReservationId,
				reservedFor: uuidv4(),
				stock,
				limit: 9,
				product: this.props.product
			});
		}
		if (categoryId) {
			if (this.state.selectedNumberClass !== categoryId) {
				this.setState({
					selectedNumberClass: categoryId,
					selectedNumber: ""
				});
			}
		}
	};

	reserveMsisdnAndChangeCategoryIdState = (event: any) => {
		const stock = event.target.value;

		if (stock) {
			this.props.actions.reserveMsisdn({
				pattern: this.state.pattern,
				releaseId: this.props.activeReservationId,
				reservedFor: uuidv4(),
				stock,
				limit: 9,
				product: this.props.product
			});
		}
		this.props.actions.performChangeCategory(stock);
		this.setState({
			selectedNumber: ""
		});
	};

	handlePatternInput = (e: SyntheticEvent<any>) => {
		const { value } = e.target as any;
		const { patternNumberLength } = this.props;
		// 10 digit number validation
		const isPatternValid = new RegExp(`^\\d{${patternNumberLength}}$`).test(value);
		this.setState({
			isPatternValid
		});
	};

	setPattern = (pattern: string) => {
		this.setState({ pattern });
	};

	onGetNewSet = () => {
		const { pattern } = this.state;
		const { selectedCategory } = this.props;

		this.props.actions.reserveMsisdn({
			pattern,
			releaseId: this.props.activeReservationId,
			reservedFor: uuidv4(),
			stock: selectedCategory,
			limit: 9,
			product: this.props.product
		});
	};
	// customization
	public handleMsisdnDisabled = (): boolean => {
		const { CH_NIP, selectedNumber, isPortInNumber } = this.state;
		if (isPortInNumber) {
			return !CH_NIP || !selectedNumber;
		}
		return !selectedNumber;
	};
	// customization
	public setPortInNumber = (): void => {
		this.setState({
			previousSelectedNumberClass: this.state.selectedNumberClass,
			isPortInNumber: !this.state.isPortInNumber,
			selectedNumberClass: this.state.isPortInNumber ? PO_NUMBER_PORTIN : this.state.previousSelectedNumberClass,
		});
	};
	// customization
	public renderMsisdnPortInSelectorContainer = () => {
		return <MsisdnPortInSelectorContainer
			setModalState={(objToSet: object) => this.setState(objToSet)}
			flux={this.context.flux}
			modalState={this.state}
		/>
	};
	// customization
	public getTransferOldNumberOcInputType = (): "checkbox" | "radio" => {
		return "checkbox"
	};
	// customization
	public renderDivMsisdnSelection = (selectedPO: ProductOffering | undefined) => {
		return <>
			{this.state.mssisdnSelection === "no-msisdn-port-in" &&
				this.renderNewMsisdnSelector(this.props.msisdnPog, selectedPO)}
		</>
	};

	render() {
		const selectedPO = ProductOfferingUtil.findProductOfferingByIdFromPog(
			this.props.msisdnPog,
			this.props.msisdnUseInventories ? this.state.selectedNumberClass : this.props.selectedCategory
		);

		return (
			<div className="this">
				<div className="row">
					<div className="col-8">
						<div>
							<OcTabGroup>
								<OcTab active={this.state.mssisdnSelection === "no-msisdn-port-in"}>
									<a className="nav-link">
										<FormattedMessage {...messages.msisdn} />
									</a>
								</OcTab>
							</OcTabGroup>

							<div className="tab-content">
								<div className="port-in-msisdn-selection">
									<h6>
										<FormattedMessage {...messages.portInMsisdn} />
									</h6>
									<div
										onClick={this.setPortInNumber}>
										<OcInput
											className="msisdn-radio"
											type={this.getTransferOldNumberOcInputType()}
											checked={this.state.isPortInNumber}
											label={<FormattedMessage {...messages.transferOldNumber} />}
										/>
									</div>
									<div className={this.state.isPortInNumber ? "" : "hide-div"}>
										{this.renderMsisdnPortInSelectorContainer()}
									</div>
								</div>
								{this.renderDivMsisdnSelection(selectedPO)}
							</div>
						</div>
					</div>
					<div className="col">
						{this.renderProductDetails(selectedPO)}
					</div>
				</div>

				{this.renderFooter()}
			</div>
		);
	}

	renderNewMsisdnSelector = (msisdnPog: any, selectedPO?: ProductOffering | null) => {
		const {
			inventories,
			reservationAttributes,
			inputtedPattern,
			msisdnUseInventories,
			patternNumberLength,			
		} = this.props;
		const regularNumberMsg = this.context.intl.formatMessage(messages.regularNumberName);
		const inventoryLoading = isEmpty(inventories);
		return (
			<div className="select-new-msisdn-container">
				<h6><FormattedMessage {...messages.selectNewMsisdn} /></h6>
				<div className="msisdn-inner-container">
					{msisdnUseInventories ? (
						<div>
							{inventoryLoading ? (
								<div className="msisdn-input">
									<OcLoadingSpinner
										loading={inventoryLoading}
									/>
								</div>
							) : (
									<div className="city-select-container">
										<FormattedMessage {...messages.selectInventory} /> {/*not sure about this message*/}
										<select
											id="inventorySelect"
											className="msisdn-input custom-select"
											onChange={event => this.changeInventory(event.target.value)}
											required={true}
										>
											<option value="default">
												{this.context.intl.formatMessage(messages.selectCity)}
											</option>

											{inventories.map((inventory: ResourceInventories) => {
												return (
													<option key={inventory.id} value={inventory.id}>
														{inventory.attributes && inventory.attributes.name}
													</option>
												);
											})}
										</select>
									</div>
								)}
							<FormattedMessage {...messages.selectTheNumberCategory} />
							<div>
								<select
									id="categorySelect"
									className="msisdn-input custom-select"
									key={msisdnPog.id}
									onChange={this.reserveMsisdnViaInventoryId}
									required={true}
								>
									<option value="default">
										{this.context.intl.formatMessage(messages.selectCategory)}
									</option>

									{this.props.sortedPos && this.props.sortedPos.map((po: ProductOffering) => {
										return (
											<option
												key={po.id}
												id={po.id}
												value={get(po, "msisdnsStockId")}
											>
												{ProductOfferingUtil.getPOName(po) || regularNumberMsg}
											</option>
										);
									})}
								</select>
							</div>

							<h6><FormattedMessage {...messages.specifyPattern} /></h6>

							<input
								className="form-control msisdn-input"
								onBlur={event => this.setPattern(event.target.value)}
								defaultValue={inputtedPattern}
								onChange={this.handlePatternInput}
							/>
							{!this.state.isPatternValid && (
								<div className="invalid-feedback"><FormattedMessage {...messages.numberLimitPattern} values={{value: patternNumberLength}}  /></div>
							)}

							{this.props.reservationError && (
								<OcAlert alertType={OcAlertType.WARNING}>
									<FormattedMessage {...messages.reservationError} />
								</OcAlert>
							)}

							{get(reservationAttributes, "msisdns") && (
								<div>
									<h6><FormattedMessage {...messages.availableNumbers} /></h6>
									<div className="msisdn-picker">
										<MsisdnPicker
											msisdns={reservationAttributes.msisdns}
											selectedNumber={this.state.selectedNumber}
											selectNumber={this.selectNumber}
										/>
									</div>
								</div>
							)}
							<OcButton
								outline={true}
								buttonType={OcButtonType.PRIMARY}
								id="msisdn-new-set-id"
								className="msisdn-input"
								onClick={this.onGetNewSet}
							>
								<i className="fas fa-sync-alt" />
								<FormattedMessage {...messages.modalNewBundle} />
							</OcButton>
						</div>
					) : msisdnPog ? (
						<div>
							<select
								className="msisdn-input custom-select"
								id={`msisdn_type_select_${msisdnPog.id}`}
								key={msisdnPog.id}
								value={this.props.selectedCategory || ""}
								onChange={this.reserveMsisdnAndChangeCategoryIdState}
								required={true}
							>
								{this.props.sortedPos.map((po: ProductOffering) => {
									return (
										<option
											key={po.id}
											value={po.id}
											id={`pog_select_${msisdnPog.id}_option-${po.id}`}
										>
											{ProductOfferingUtil.getPOName(po) || regularNumberMsg}{" "}
										</option>
									);
								})}
							</select>
							<OcButton
								outline={true}
								buttonType={OcButtonType.PRIMARY}
								id="msisdn-new-set-id"
								className="msisdn-input"
								onClick={this.onGetNewSet}
							>
								<i className="fas fa-sync-alt" />
								<FormattedMessage {...messages.modalNewBundle} />
							</OcButton>
							<div>
								<h6>
									<FormattedMessage {...messages.specifyPattern} />
								</h6>

								<input
									className="form-control msisdn-input"
									onBlur={event => this.setPattern(event.target.value)}
									defaultValue={inputtedPattern}
									onChange={this.handlePatternInput}
								/>
								{!this.state.isPatternValid && (
									<div className="invalid-feedback"><FormattedMessage {...messages.numberLimitPattern} values={{value: patternNumberLength}} /></div>
								)}

								{this.props.reservationError && (
									<OcAlert alertType={OcAlertType.WARNING}>
										<FormattedMessage {...messages.reservationError} />
									</OcAlert>
								)}

								{get(reservationAttributes, "msisdns") && (
									<div>
										<h6>
											<FormattedMessage {...messages.availableNumbers} />
										</h6>

										<div className="msisdn-picker">
											<MsisdnPicker
												msisdns={reservationAttributes.msisdns}
												selectedNumber={this.state.selectedNumber}
												selectNumber={this.selectNumber}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					) : (selectedPO && ProductOfferingUtil.getPOName(selectedPO))}
				</div>
			</div>
		);
	};

	renderProductDetails = (selectedPO?: ProductOffering) => {
		return (
			<div className="renderProductDetails">
				<h4>
					<FormattedMessage {...messages.msisdnProductDetails} />
				</h4>
				<p>
					{get(selectedPO, "commercialEnrichments.descriptions.detailed")}
				</p>

				<h6>
					<FormattedMessage {...messages.msisdnAllowances} />
				</h6>
				{selectedPO && this.renderAllowances(selectedPO)}
				<h6>
					<FormattedMessage {...messages.msisdnTotalCosts} />
				</h6>
				{selectedPO && this.renderTotalCost(selectedPO)}
			</div>
		);
	};

	renderAllowances = (productOffering: ProductOffering) => {
		const productOfferings = get(productOffering, "productOfferings");

		return (
			<div>
				{productOfferings ? (
					productOfferings.map((productOffer, idx) => {
						return (
							<p>
								<div className="allowances-title" key={`productOffer_${idx}`}>
									{get(productOffering, "commercialEnrichments.names['short-name']")}
								</div>
								<div key={`productOffer${idx}`}>
									{get(productOffering, "commercialEnrichments.names['short-description']")}
								</div>
							</p>
						);
					})
				) : null}
			</div>
		);
	};

	renderTotalCost = (productOffering: ProductOffering) => {
		const oneTimePrice: SimplePrice | null = !isEmpty(ProductOfferingUtil.getPrice(productOffering, PriceTypeEnum.ONE_TIME))
			? ProductOfferingUtil.getPrice(productOffering, PriceTypeEnum.ONE_TIME)
			: null,
			recurringPrice: any = !isEmpty(ProductOfferingUtil.getPrice(productOffering, PriceTypeEnum.RECURRENT))
				? ProductOfferingUtil.getPrice(productOffering, PriceTypeEnum.RECURRENT)
				: null;

		if (oneTimePrice || recurringPrice) {
			return (
				<div className="renderTotalCost">
					{oneTimePrice ? (
						<div>
							<div>
								<FormattedMessage {...messages.oneTimeCharge} />
							</div>
							<span className="price">
								{`${oneTimePrice.taxFreeAmount} ${oneTimePrice.currency}`}
							</span>
						</div>
					) : null}
					{recurringPrice ? (
						<div>
							<div>
								<FormattedMessage {...messages.recurringFee} />
							</div>
							<span className="price">
								{`${recurringPrice.taxFreeAmount} ${recurringPrice.currency}`}
							</span>
							<FormattedMessage {...messages.offeringMsisdnConfigPrice} />
						</div>
					) : null}
				</div>
			);
		} else {
			return null;
		}
	};
	// customization
	public handleCloseButton = () => {
		this.props.handleClose();
		this.props.actions.releaseMsisdn(this.props.activeReservationId as string, "");
	};

	renderFooter = () => {
		const { activeReservationId } = this.props;
		return (
			<div className="row justify-content-between msisdn-footer">
				<OcButton
					className="col-4"
					buttonType={OcButtonType.DEFAULT}
					onClick={this.handleCloseButton}
				>
					<FormattedMessage {...messages.posPlanConfigCancel} />
				</OcButton>
				<OcButton
					className="col-4"
					id="plan-config-modal-select-number-button"
					buttonType={OcButtonType.PRIMARY}
					onClick={() => {
						if (this.state.isPortInNumber) {
							this.savePortIn();
						} else {
							this.saveNumber();
						}
						this.props.handleClose();
						this.props.actions.releaseMsisdn(activeReservationId as string, activeReservationId as string);
					}}
					disabled={this.handleMsisdnDisabled()}
				>
					<FormattedMessage {...messages.msisdnModalDone} />
				</OcButton>
			</div>
		);
	};
}

export default PosMsisdnConfigurationModal;
export {
	PosMsisdnConfigurationModalProps,
	PosMsisdnConfigurationModalState,
	PosMsisdnConfigurationModalStateProps,
	PosMsisdnConfigurationModalActionProps,
};
