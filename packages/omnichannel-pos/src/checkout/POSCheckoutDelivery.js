//@flow

import {
	cssns,
	Flex,
	OcInput,
	OcTransition,
	withFormal,
	withSchema,
	FormattedMessage,
	Flux,
	OcButton,
	OcButtonType
} from "omnichannel-common-pos";
import PropTypes from "prop-types";
import { Component } from "react";
import R from "ramda";
import Form from "react-formal";
import { get, debounce, isEmpty } from "lodash";
import type {
	POSCheckoutActionsType,
	SchemaType,
	BasketStoreType
} from "omnichannel-flow-pos";
import messages from "../posMessages";
import OcStoreSearch from "./storeSearch/OcStoreSearch";

const { BasketActions } = Flux;
const { React } = cssns("CheckoutDelivery");
const KNOWN_ADDRESS_DELIVERY_TYPE = "known-address";
const NEW_ADDRESS_DELIVERY_TYPE = "new-address";
const STORE_PICKUP_DELIVERY_TYPE = "store-pickup";
const FormalOcInput = withFormal(OcInput);

const knownAddress = {
	attributes: {
		address: {
			street: "Test Street 1",
			coAddress: "",
			postalCode: "00000",
			city: "Test City",
			country: "Testland"
		}
	}
};

const deliveryMethods = [
	{
		id: "delivery-express",
		sku: null,
		productId: null,
		parentSku: null,
		name: "DHL Express",
		description: null,
		shortDescription: null,
		images: null,
		price1: 20.5,
		price2: null,
		type: null,
		family: null,
		selectableProductAttributes: null,
		htmlTitle: null,
		htmlDescription: null,
		options: null,
		productAttributes: {
			estimatedDeliveryDate: {
				code: "estimatedDeliveryDate",
				label: null,
				filterable: false,
				comparable: false,
				visible: false,
				value: "2016-10-15T13:03:19.627",
				options: null,
				group: null,
				groupLabel: null,
				groupIndex: null
			}
		},
		inputCharacteristics: null
	},
	{
		id: "delivery-standard",
		sku: null,
		productId: null,
		parentSku: null,
		name: "DHL Standard",
		description: null,
		shortDescription: null,
		images: null,
		price1: 9.9000000000000003552713678800500929355621337890625,
		price2: null,
		type: null,
		family: null,
		selectableProductAttributes: null,
		htmlTitle: null,
		htmlDescription: null,
		options: null,
		productAttributes: {
			estimatedDeliveryDate: {
				code: "estimatedDeliveryDate",
				label: null,
				filterable: false,
				comparable: false,
				visible: false,
				value: "2016-10-15T13:03:19.645",
				options: null,
				group: null,
				groupLabel: null,
				groupIndex: null
			}
		},
		inputCharacteristics: null
	}
];

type Props = {
	BasketActions: BasketActions,
	BasketStore: BasketStoreType,
	//TODO: define specified type for defaultStore
	defaultStore: Object,
	POSCheckoutStore: {
		POSDeliveryType: string,
		POSDeliveryMethodId: string
	},
	POSCheckoutActions: POSCheckoutActionsType,
	schema: SchemaType
};

type State = {
	//TODO: define specified type for people, owner, formData
	people: Array<Object>,
	owner: Object,
	saveButtonDisabled: boolean,
	formData: ?Object
};

class POSCheckoutDelivery extends Component<Props, State> {
	static displayName = "POSCheckoutDelivery";

	static propTypes = {
		BasketActions: PropTypes.object,
		BasketStore: PropTypes.object,
		defaultStore: PropTypes.object,
		POSCheckoutStore: PropTypes.object,
		POSCheckoutActions: PropTypes.object,
		schema: PropTypes.object
	};

	constructor(props: Props, context) {
		super(props, context);

		this.state = {
			people: [],
			owner: Object,
			saveButtonDisabled: true,
			formData: knownAddress
		};

		this.saveDeliveryChoice = debounce(this.saveDeliveryChoice, 2500);
	}

	componentWillReceiveProps(props) {
		if (props.BasketStore && props.BasketStore.checkoutConfiguration) {
			this.setState({
				saveButtonDisabled: !this.checkIfEveryRowHasDeliveryChosen(
					props.BasketStore.checkoutConfiguration
						.deliveryConfiguration
				)
			});
		}
	}

	componentWillMount() {
		if (
			this.props.POSCheckoutStore &&
			!this.props.POSCheckoutStore.POSDeliveryType
		) {
			this.setDeliveryType(STORE_PICKUP_DELIVERY_TYPE);
		}
	}

	saveDeliveryChoice = (info: {
		deliveryType: string,
		deliveryMethodId?: string,
		deliveryAddress: ?Object
	}) => {
		const rows = get(
			this.props.BasketStore,
			"activeBasket.attributes.rows"
		);

		// FIXTHIS : method saveDeliveryConfiguration doesn't exists
		// $FlowFixMe RND-23112
		if (this.props.BasketActions.saveDeliveryConfiguration) {
			rows &&
				rows.length > 0 &&
				rows.forEach(row => {
					// $FlowFixMe RND-23112
					this.props.BasketActions.saveDeliveryConfiguration(
						row.id,
						info
					);
				});
		}
	};

	checkIfEveryRowHasDeliveryChosen = (configuration: Object) => {
		let check = true;
		if (this.props.BasketStore.activeBasket) {
			const rows = get(
				this.props.BasketStore.activeBasket,
				"attributes.rows"
			);
			rows &&
				rows.forEach(row => {
					//check only rows that have products that need to be set up
					if (
						isEmpty(
							get(configuration[row.id], "deliveryMethodId", null)
						) ||
						isEmpty(
							get(configuration[row.id], "deliveryAddress", null)
						)
					) {
						check = false;
					}
				});
		} else {
			check = false;
		}
		return check;
	};

	setDeliveryType = type => {
		if (this.props.POSCheckoutStore.POSDeliveryType === type) {
			return;
		}

		if (type === KNOWN_ADDRESS_DELIVERY_TYPE) {
			this.setState({
				formData: knownAddress
			});

			this.props.POSCheckoutActions.setPOSDeliveryAddress({
				formData: knownAddress,
				type
			});
		}

		if (type === NEW_ADDRESS_DELIVERY_TYPE) {
			const data = R.path(
				[NEW_ADDRESS_DELIVERY_TYPE],
				this.props.POSCheckoutStore
			);
			this.setState({
				formData: data
			});
		}

		if (type === STORE_PICKUP_DELIVERY_TYPE) {
			const data = R.path(
				[STORE_PICKUP_DELIVERY_TYPE],
				this.props.POSCheckoutStore
			);
			this.setState({
				formData: data || this.props.defaultStore
			});
		}

		this.props.POSCheckoutActions.setPOSDeliveryType(type);
	};

	setSelectedStore = store => {
		this.setState({
			formData: store
		});

		this.props.POSCheckoutActions.setPOSDeliveryAddress({
			formData: store,
			type: STORE_PICKUP_DELIVERY_TYPE
		});
	};

	handleDeliverySubmit = () => {
		this.saveDeliveryChoice({
			deliveryType: this.props.POSCheckoutStore.POSDeliveryType,
			deliveryAddress: this.props.POSCheckoutStore[
				this.props.POSCheckoutStore.POSDeliveryType
			].attributes.address
		});

		this.props.POSCheckoutActions.setPOSDeliveryType(
			this.props.POSCheckoutStore.POSDeliveryType
		);
		this.props.POSCheckoutActions.setPOSDeliveryMethodId(
			this.props.POSCheckoutStore.POSDeliveryMethodId
		);
		this.props.POSCheckoutActions.showPOSDeliveryModal(false);
	};

	handleInput = model => {
		this.setState({
			formData: model
		});
		this.props.POSCheckoutActions.setPOSDeliveryAddress({
			formData: model,
			type: this.props.POSCheckoutStore.POSDeliveryType
		});
	};

	setDeliveryMethod = (methodId: string, type: string) => {
		const deliveryAddress = R.path(
			[type, "attributes", "address"],
			this.props.POSCheckoutStore
		);
		this.props.POSCheckoutActions.setPOSDeliveryMethodId(methodId);
		this.saveDeliveryChoice({
			deliveryType: type,
			deliveryMethodId: methodId,
			deliveryAddress
		});
	};

	render() {
		if (!this.props.POSCheckoutStore) {
			return <span />;
		}

		const activeBasket = get(this.props.BasketStore, "activeBasket");
		const phase = get(
			this.props.BasketStore,
			"activeBasket.attributes.phase"
		);

		if (!activeBasket || !phase) {
			return null;
		}

		const { defaultStore } = this.props;
		const { POSDeliveryMethodId } = this.props.POSCheckoutStore;

		let { POSDeliveryType } = this.props.POSCheckoutStore;
		if (!POSDeliveryType) {
			POSDeliveryType = STORE_PICKUP_DELIVERY_TYPE;
		}

		const storedNewAddress = R.path(
			[NEW_ADDRESS_DELIVERY_TYPE],
			this.props.POSCheckoutStore
		);
		const storedPickupStore = R.path(
			[STORE_PICKUP_DELIVERY_TYPE],
			this.props.POSCheckoutStore
		);
		const value = this.state.formData;

		return (
			<Flex
				flex={1}
				style={{ width: "100%", padding: "20px" }}
				direction="column"
				className="this"
			>
				<Form
					schema={this.props.schema}
					onSubmit={model => this.handleDeliverySubmit()}
					onChange={model => this.handleInput(model)}
					value={value || storedNewAddress}
				>
					<Flex flex={1} style={{ width: "100%" }} direction="column">
						<OcTransition expanded={knownAddress}>
							<Flex direction="column">
								<div style={{ maxWidth: "40px" }}>
									<OcInput
										type="radio"
										name="delivery-type"
										onChange={() =>
											this.setDeliveryType(
												KNOWN_ADDRESS_DELIVERY_TYPE
											)}
										defaultValue="known-address"
										checked={
											POSDeliveryType ===
											KNOWN_ADDRESS_DELIVERY_TYPE
										}
										style={{
											flex: "initial",
											minHeight: "100px"
										}}
										label={
											<Flex flex={1}>
												<div style={{ width: "100%" }}>
													{
														knownAddress.attributes
															.address.street
													}
												</div>
												<div style={{ width: "100%" }}>
													{
														knownAddress.attributes
															.address.postalCode
													}
												</div>
												<div style={{ width: "100%" }}>
													{
														knownAddress.attributes
															.address.city
													}
												</div>
												<div style={{ width: "100%" }}>
													{
														knownAddress.attributes
															.address.country
													}
												</div>
											</Flex>
										}
									/>
								</div>

								<OcTransition
									expanded={
										POSDeliveryType ===
										KNOWN_ADDRESS_DELIVERY_TYPE
									}
								>
									<div style={{ margin: "0 0 12px 12px" }}>
										{deliveryMethods &&
											deliveryMethods.map(method => (
												<OcInput
													type="radio"
													name="new-address-delivery-method"
													onChange={() =>
														this.setDeliveryMethod(
															method.id,
															KNOWN_ADDRESS_DELIVERY_TYPE
														)}
													defaultValue={method.id}
													label={method.name}
													key={method.id}
													checked={
														POSDeliveryMethodId ===
														method.id
													}
												/>
											))}
									</div>
								</OcTransition>
							</Flex>
						</OcTransition>
					</Flex>

					<Flex direction="column">
						<OcInput
							type="radio"
							name="delivery-type"
							onChange={() =>
								this.setDeliveryType(NEW_ADDRESS_DELIVERY_TYPE)}
							defaultValue="new-address"
							checked={
								POSDeliveryType === NEW_ADDRESS_DELIVERY_TYPE
							}
							label={
								<FormattedMessage {...messages.checkoutDeliveryNewAddress} />
							}
						/>

						<OcTransition
							expanded={
								POSDeliveryType === NEW_ADDRESS_DELIVERY_TYPE
							}
						>
							<Flex
								direction="column"
								style={{
									maxWidth: "280px",
									marginLeft: "20px"
								}}
							>
								<div
									className="new-address-field"
									style={{ padding: "8px", width: "100%" }}
								>
									<Form.Field
										type={FormalOcInput}
										name="street"
										placeholder={
											<FormattedMessage {...messages.checkoutNewStreetAddress} />
										}
									/>
								</div>
								<div
									className="new-address-field"
									style={{ padding: "8px", width: "100%" }}
								>
									<Form.Field
										type={FormalOcInput}
										name="coAddress"
										placeholder={
											<FormattedMessage {...messages.checkoutNewCoAddress} />
										}
									/>
								</div>
								<div
									className="new-address-field"
									style={{ padding: "8px", width: "100%" }}
								>
									<Form.Field
										type={FormalOcInput}
										name="postalCode"
										placeholder={
											<FormattedMessage {...messages.checkoutNewAddressPostCode} />
										}
									/>
								</div>
								<div
									className="new-address-field"
									style={{ padding: "8px", width: "100%" }}
								>
									<Form.Field
										type={FormalOcInput}
										name="city"
										placeholder={
											<FormattedMessage {...messages.checkoutNewAddressCity} />
										}
									/>
								</div>
								<div
									className="new-address-field"
									style={{ padding: "8px", width: "100%" }}
								>
									<Form.Field
										type={FormalOcInput}
										name="country"
										placeholder={
											<FormattedMessage {...messages.checkoutNewAddressCountry} />
										}
									/>
								</div>

								<div style={{ margin: "0 0 12px 12px" }}>
									{deliveryMethods &&
										deliveryMethods.map(method => (
											<OcInput
												type="radio"
												name="new-address-delivery-method"
												onChange={() =>
													this.setDeliveryMethod(
														method.id,
														NEW_ADDRESS_DELIVERY_TYPE
													)}
												defaultValue={method.id}
												label={method.name}
												key={method.id}
												checked={
													POSDeliveryMethodId ===
													method.id
												}
											/>
										))}
								</div>
							</Flex>
						</OcTransition>

						<Flex direction="column">
							<OcInput
								type="radio"
								name="delivery-type"
								onChange={() =>
									this.setDeliveryType(
										STORE_PICKUP_DELIVERY_TYPE
									)}
								defaultValue="store-pickup"
								value={POSDeliveryType}
								checked={
									POSDeliveryType ===
									STORE_PICKUP_DELIVERY_TYPE
								}
								label={
									<FormattedMessage {...messages.checkoutPickUpStore} />
								}
								style={{ maxWidth: "260px" }}
							/>

							<OcTransition
								expanded={
									POSDeliveryType ===
									STORE_PICKUP_DELIVERY_TYPE
								}
							>
								<div
									className="delivery-methods-wrapper delivery-store-search"
									style={{ minHeight: "80px", width: "100%" }}
								>
									<OcStoreSearch
										handleSelectItem={this.setSelectedStore}
										selectedStore={
											POSDeliveryType ===
												STORE_PICKUP_DELIVERY_TYPE &&
											(value ||
												storedPickupStore ||
												defaultStore)
										}
									/>
								</div>
							</OcTransition>
						</Flex>
					</Flex>

					<Flex
						justifyContent="between"
						alignItems="center"
						style={{
							padding: "10px",
							width: "100%",
							borderTop: "1px solid #ddd"
						}}
					>
						<OcButton
							buttonType={OcButtonType.LINK}
							onClick={e => {
								e.preventDefault();
								this.props.POSCheckoutActions.showPOSDeliveryModal(false);
							}}
						>
							<FormattedMessage {...messages.checkoutCancelLabel} />
						</OcButton>

						<OcButton buttonType={OcButtonType.SUCCESS}>
							<Form.Button type="submit" component="div">
								<FormattedMessage {...messages.checkoutSaveAndCloseLabel} />
							</Form.Button>
						</OcButton>
					</Flex>
				</Form>
			</Flex>
		);
	}
}

export default withSchema(["posCheckoutDelivery"])(POSCheckoutDelivery);
