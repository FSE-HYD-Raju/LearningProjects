import React from "react";
import _ from "lodash";
import {
	ProductOfferingUtil,
	withMsisdnConfiguration,
	mountWithContext,
	shallowWithContext,
	TestUtils,
} from "omnichannel-common-pos";
import ProductTableDetails from "./ProductTableDetails";
import plan from "../data/hybridPlan";
import configuredPlan from "../data/configuredHybridPlan";
import messages from "./ProductTable.messages";

const { makeStore } = TestUtils;

const context = {
	flux: {
		stores: {
			ConsulStore: makeStore("flux.stores.ConsulStore"),
		}
	},
	store: TestUtils.mockReduxStore({
		feature: {},
		workforce: {},
	})
};

describe("ProductTableDetails", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<ProductTableDetails
				product={{
					id: "product-12345"
				}}
				match={{
					params: {
						category: "device"
					}
				}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(
			<ProductTableDetails
				product={{
					id: "product-12345"
				}}
				match={{
					params: {
						category: "device"
					}
				}}
				activeBasket={{
					id: 4
				}}
			/>
		);
	});

	it("Renders provided product name", () => {
		const props = {
			product: {
				id: "product-12345",
				attributes: {
					name: "Coolio"
				}
			},
			match: {
				params: {
					category: "device",
					sku: "product-12345"
				}
			},
			activeBasket: {
				id: 4
			},
			actions: {
				clearErrorOnProductTable: jest.fn(),
				addProductToBasket: jest.fn(),
			},
		};

		const wrapper = mountWithContext(<ProductTableDetails {...props} />, {
			context
		});

		const productNameElement = wrapper.find(
			"#ProductTableDetails-" +
				props.product.id +
				"-product-name"
		);
		expect(productNameElement.text()).toEqual(
			props.product.attributes.name
		);
	});

	it("Renders provided product short name", () => {
		const props = {
			actions: {
				clearErrorOnProductTable: jest.fn(),
				addProductToBasket: jest.fn(),
			},
			product: {
				id: "product-12345",
				attributes: {
					name: "Coolio",
					/* NOTE to have the short-name rendered, DO NOT add key 'conditions' to commercialEnrichments. */
					commercialEnrichments: [
						{
							names: {
								"name": "Coo"
							}
						}
					]
				}
			},
			match: {
				params: {
					category: "device",
					sku: "product-12345"
				}
			},
			activeBasket: {
				id: 4
			}
		};

		const wrapper = mountWithContext(<ProductTableDetails {...props} />, {
			context
		});

		const productNameElement = wrapper.find(
			"#ProductTableDetails-" +
				props.product.id +
				"-product-name"
		);
		expect(productNameElement.text()).toEqual(
			props.product.attributes.commercialEnrichments[0].names[
				"name"
			]
		);
	});

	it("disabling add to cart button after adding  product other than add-ons and prevents duplicate  ", () => {
		const props = {
			product: {
				id: "product-12345",
				attributes: {
					name: "Coolio"
				}
			},
			match: {
				params: {
					category: "device",
					sku: "product-12345"
				}
			},
			activeBasket: {
				id: 4
			},
			actions: {
				clearErrorOnProductTable: jest.fn(),
				addProductToBasket: jest.fn(),
			},
			nonAddonProductPresentInBasket: true,
		};

		const wrapper = mountWithContext(<ProductTableDetails {...props} />, {
			context
		});

		const productNameElement = wrapper.find(
			".disabled"
		);
		expect(productNameElement.text()).toEqual(
			 messages.productSelectProduct.defaultMessage
		);
	});

	describe("RUBT-70231", () => {
		const { makeActions, makeStore, getModalContents } = TestUtils;

		const msisdnBundle = {
			data: [
				{
					id: "0123006285",
					type: "msisdn",
					attributes: {
						number: "0123006285",
						numberType: "voice",
						id: "0123006285"
					}
				},
				{
					id: "0123005512",
					type: "msisdn",
					attributes: {
						number: "0123005512",
						numberType: "voice",
						id: "0123005512"
					}
				},
				{
					id: "0123006114",
					type: "msisdn",
					attributes: {
						number: "0123006114",
						numberType: "voice",
						id: "0123006114"
					}
				},
				{
					id: "0123006021",
					type: "msisdn",
					attributes: {
						number: "0123006021",
						numberType: "voice",
						id: "0123006021"
					}
				},
				{
					id: "0123005951",
					type: "msisdn",
					attributes: {
						number: "0123005951",
						numberType: "voice",
						id: "0123005951"
					}
				},
				{
					id: "0123005923",
					type: "msisdn",
					attributes: {
						number: "0123005923",
						numberType: "voice",
						id: "0123005923"
					}
				},
				{
					id: "0123005824",
					type: "msisdn",
					attributes: {
						number: "0123005824",
						numberType: "voice",
						id: "0123005824"
					}
				},
				{
					id: "0123006176",
					type: "msisdn",
					attributes: {
						number: "0123006176",
						numberType: "voice",
						id: "0123006176"
					}
				},
				{
					id: "0123006153",
					type: "msisdn",
					attributes: {
						number: "0123006153",
						numberType: "voice",
						id: "0123006153"
					}
				},
				{
					id: "0123006096",
					type: "msisdn",
					attributes: {
						number: "0123006096",
						numberType: "voice",
						id: "0123006096"
					}
				}
			]
		};

		const context = {
			flux: {
				actions: {
					/* BasketActions: */
				},
				stores: {
					/* BasketStore: */
				}
			}
		};

		const BasketActions = makeActions(
			"context.flux.actions.BasketActions",
			{
				getMsisdnBundle: () => {
					return {
						then: fn => {
							return fn(msisdnBundle);
						}
					};
				},
				addProductToBasket: () => {
					throw new Error(
						"customize this function and write assertions"
					);
				}
			}
		);

		const BasketStore = makeStore("context.flux.stores.BasketStore", {
			msisdns: {
				"regular-numbers-po": msisdnBundle.data.map(
					msisdnEntry => msisdnEntry.id
				)
			},
			activeBasket: {},
			basketItems: []
		});

		/* TODO: Refactor to work with current hybrid basic plan */
		it.skip(
			"allows ICC, MSISDN be configured for a plan before Adding to cart",
			() => {
				const Enhanced = withMsisdnConfiguration(ProductTableDetails);

				const wrapper = mountWithContext(
					<Enhanced
						product={plan}
						activeBasket={{
							id: "my-basket"
						}}
						match={{
							params: {
								category: "cat-b2c-mobile-plan-prepaid"
							}
						}}
						setInputtedCharacteristic={jest.fn()}
					/>,
					{ context }
				);

				const buttonOpenPlanConfigurationModal = wrapper
					.find("OcButton")
					.filterWhere(n =>
						_.get(n.props(), "id").startsWith(
							"buttonOpenPlanConfigurationModal"
						)
					);
				const iccConfBlock = wrapper
					.find("ProductOfferingConfiguration")
					.filterWhere(
						n => _.get(n.props(), "product.id", "") === "sim-po"
					);
				const iccInput = iccConfBlock.find("input");

				iccInput.simulate("change", { target: { value: "9000" } });

				buttonOpenPlanConfigurationModal.simulate("click");
			}
		);

		/* from BasketActions */
		const getChildBasketItems = product => {
			const items = ProductOfferingUtil.getProductOfferingItemsForBasket(
				product
			);

			return _.map(items, item => {
				const { id, specificationId, inputtedCharacteristics } = item;
				return {
					product: {
						id,
						specificationId
					},
					quantity: 1,
					inputtedCharacteristics,
					childBasketItems: getChildBasketItems(item)
				};
			});
		};

		/* from BasketActions */
		const productToBasketItem = (product, basketId) => {
			return {
				type: "basketItems",
				attributes: {
					product: {
						id: _.get(product, "id")
					},
					quantity: 1,
					inputtedCharacteristics:
						_.get(product, "attributes.inputtedCharacteristics") ||
						_.get(product, "inputtedCharacteristics"),
					childBasketItems: getChildBasketItems(product)
				},
				relationships: {
					basket: {
						data: {
							id: basketId,
							type: "baskets"
						}
					}
				}
			};
		};

		beforeEach(() => {
			context.flux.actions.MsisdnActions = _.clone(BasketActions);
			context.flux.stores.BasketStore = _.clone(BasketStore);
		});

		const customer = {
			id: "timo",
			attributes: {}
		};

		/* TODO: Refactor to work with current hybrid basic plan */
		it.skip(
			"has plan product configured correctly when MSISDN, ICC are set",
			() => {
				BasketStore.activeBasket.id = "my-nice-little-pink-basket";

				const Enhanced = withMsisdnConfiguration(
					ProductTableDetails
				);

				const wrapper = mountWithContext(
					<Enhanced
						product={plan}
						customer={customer}
						columns={[]}
						activeBasket={BasketStore.activeBasket}
						match={{
							params: {
								category: "foo",
								sku: "bar"
							}
						}}
					/>,
					{ context }
				);

				const buttonOpenPlanConfigurationModal = wrapper
					.find("OcButton")
					.filterWhere(n =>
						_.get(n.props(), "id").startsWith(
							"buttonOpenPlanConfigurationModal"
						)
					);

				const iccConfBlock = wrapper
					.find("ProductOfferingConfiguration")
					.filterWhere(
						n => _.get(n.props(), "product.id", "") === "sim-po"
					);
				const iccInput = iccConfBlock.find("input");

				const iccValue = "9000";
				iccInput.simulate("change", { target: { value: iccValue } });

				buttonOpenPlanConfigurationModal.simulate("click");

				const modalContents = getModalContents(wrapper);

				const firstNumber = modalContents
					.find("MsisdnPicker OcInput")
					.at(0);
				const numberValue = firstNumber.text();
				firstNumber.find("input").simulate("click");
				modalContents
					.find("#plan-config-modal-select-number-button")
					.simulate("click");

				const configuredPlan = ProductOfferingUtil.mergeConfigurations(
					plan,
					{}
				);

				const configuredProductOfferings = _.head(
					configuredPlan.attributes.productOfferings.filter(
						po => po.id === "msisdn-sim-po"
					)
				).productOfferings;

				const configuredProductOfferingGroups = _.head(
					configuredPlan.attributes.productOfferings.filter(
						po => po.id === "msisdn-sim-po"
					)
				).productOfferingGroups;

				const iccInputtedCharacteristics = configuredProductOfferings.reduce(
					(stack, value) => {
						if ("icc" in value.inputtedCharacteristics) {
							stack.icc = value.inputtedCharacteristics.icc;
						}
						return stack;
					},
					{}
				);

				const msisdnInputtedCharacteristics = configuredProductOfferingGroups
					.find(g => g.id === "msisdn-pog")
					.productOfferings.find(o => o.selected === true)
					.inputtedCharacteristics;

				expect(iccInputtedCharacteristics.icc).toEqual(iccValue);

				expect(msisdnInputtedCharacteristics.number).toEqual(
					numberValue
				);
			}
		);

		/* TODO: Refactor to work with current hybrid basic plan */
		it.skip(
			"allows MSISDN to be chosen after clicking Add to cart button",
			() => {
				BasketStore.activeBasket.id = "my-nice-little-pink-basket";

				const wrapper = mountWithContext(
					<ProductTableDetails
						product={plan}
						match={{
							params: {
								category: "foo",
								sku: "bar"
							}
						}}
						activeBasket={{
							id: "my-nice-little-pink-basket"
						}}
						addProductToBasket={() => {}}
						sharedMsisdnConfig={{
							msisdn: "",
							configuredIn: ""
						}}
						productNeedsMsisdnConfiguration={() => true}
					/>,
					{ context }
				);

				const iccConfBlock = wrapper
					.find("ProductOfferingConfiguration")
					.filterWhere(
						n => _.get(n.props(), "product.id", "") === "sim-po"
					);
				const iccInput = iccConfBlock.find("input");

				const iccValue = "9000";
				iccInput.simulate("change", { target: { value: iccValue } });
				wrapper.find("form").simulate("submit");

				const modalContents = getModalContents(wrapper);

				const firstNumber = modalContents
					.find("MsisdnPicker OcInput")
					.at(0);
				const numberValue = firstNumber.text();
				firstNumber.find("input").simulate("click");
				modalContents
					.find("#plan-config-modal-select-number-button")
					.simulate("click");

				const configuredPlan = ProductOfferingUtil.mergeConfigurations(
					plan,
					{}
				);
				const configuredProductOfferings = _.head(
					configuredPlan.attributes.productOfferings.filter(
						po => po.id === "msisdn-sim-po"
					)
				).productOfferings;

				const configuredProductOfferingGroups = _.head(
					configuredPlan.attributes.productOfferings.filter(
						po => po.id === "msisdn-sim-po"
					)
				).productOfferingGroups;

				const iccInputtedCharacteristics = configuredProductOfferings.reduce(
					(stack, value) => {
						if ("icc" in value.inputtedCharacteristics) {
							stack.icc = value.inputtedCharacteristics.icc;
						}
						return stack;
					},
					{}
				);

				const msisdnInputtedCharacteristics = configuredProductOfferingGroups
					.find(g => g.id === "msisdn-pog")
					.productOfferings.find(o => o.selected === true)
					.inputtedCharacteristics;

				expect(iccInputtedCharacteristics.icc).toEqual(iccValue);
				expect(msisdnInputtedCharacteristics.number).toEqual(
					numberValue
				);
			}
		);

		/* TODO: Refactor to work with current hybrid basic plan */
		it.skip("adds configured plan to basket", () => {
			BasketStore.activeBasket.id = "my-nice-little-pink-basket";

			const numberValue = "0123006285";
			const iccValue = "9000";

			BasketActions.addProductToBasket = data => {
				const { product, configurations, hasCustomer } = data;

				const configuredProduct = ProductOfferingUtil.mergeConfigurations(
					product,
					configurations
				);

				if (!hasCustomer) {
					throw new Error("this test is broken");
				}

				const productAsBasketItem = productToBasketItem(
					configuredProduct
				);
				expect(productAsBasketItem.attributes.product.id).toEqual(
					configuredPlan.id
				);

				const msisdnSimPo = _.find(
					productAsBasketItem.attributes.childBasketItems,
					{ product: { id: "msisdn-sim-po" } }
				);
				expect(msisdnSimPo).toBeTruthy();

				const msisdnPo = _.find(msisdnSimPo.childBasketItems, {
					product: { id: "msisdn-po" }
				});
				expect(msisdnPo).toBeTruthy();

				const simPo = _.find(msisdnSimPo.childBasketItems, {
					product: { id: "sim-po" }
				});
				expect(simPo).toBeTruthy();

				expect(msisdnPo.inputtedCharacteristics.number).toEqual(
					numberValue
				);
				expect(simPo.inputtedCharacteristics.icc).toEqual(iccValue);
			};

			const wrapper = mountWithContext(
				<ProductTableDetails
					product={configuredPlan}
					customer={customer}
					columns={[]}
					activeBasket={BasketStore.activeBasket}
					match={{
						params: {
							category: "foo",
							sku: "bar"
						}
					}}
					addProductToBasket={data => {
						BasketActions.addProductToBasket(data);
					}}
				/>,
				{ context }
			);

			wrapper.find("form").simulate("submit");
		});
	});
});
