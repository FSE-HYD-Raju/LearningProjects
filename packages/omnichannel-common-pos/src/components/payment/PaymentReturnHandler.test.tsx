import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../testUtils";

import PaymentReturnHandler, { PaymentReturnHandlerStateProps, PaymentReturnHandlerActionProps } from "./PaymentReturnHandler";

describe("PaymentReturnHandler", () => {
	const creditCard = {
		type: "credit-card",
		id: "masas-credit-card",
		name: "Masa's Credit Card",
		cardHolder: "Masa Meikäläinen",
		cardType: "digital-mint",
		expiryMonth: "3",
		expiryYear: "2022",
		maskedCardNumber: "1234",
		token: "all-your-monneh-are-belong-to-masa",
	};

	const customerPaymentMethod = {
		id: "payment-with-credit-card",
		name: "Best Payment with Credit",
		type: "Credit payment",
		creditCard,
		validFor: {
			startDate: new Date(2019, 2, 12, 0, 0, 0, 0),
			endDate: new Date(2022, 2, 12, 0, 0, 0, 0)
		},
		role: "PRIMARY"
	};

	const topUpProduct = {
		product: {},
		hasCustomer: true
	};

	const paymentMethodRelationId = "payment-method-relation-id";

	let minimumProps: any;
	beforeEach(() => {
		minimumProps = {
			errors: [],
			contextualPaymentMethodId: "brilliant-contextual-payment-method-id",
			successRoute: "great-payment-success",
			rejectRoute: "cruel-rejection-page",
			receiptCreateFailedRoute: "receipt-creation-failed",
			disableBasketSubmit: false,
			storedTopupProduct: undefined,
			selectedPaymentUseCase: "selected-payment-use-case",
			returnBaseLocation: {} as any,
			customerPaymentMethod: {} as any,
			actions: {
				submitBasket: (() => {}) as any,
				addProductToBasket: (() => {}) as any,
				handlePaymentReject: () => {},
				validatePayment: () => {},
				validatePaymentWithoutBasket: () => {},
				historyPush: () => {},
			}
		} as PaymentReturnHandlerStateProps & PaymentReturnHandlerActionProps;
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PaymentReturnHandler {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(
			<PaymentReturnHandler {...minimumProps} />
		);
	});

	it("submits basket at mount, no top-up product stored", (done) => {
		const props = {
			...minimumProps,
			actions: {
				...minimumProps.actions,
				submitBasket: (basket: any) => {
					return new Promise(() => {
						done();
					});
				}
			},
			paymentStatus: "SUCCESS",
			committedBasket: {
				id: "foobar-committed-basket-id"
			}
		};

		mountWithContext(<PaymentReturnHandler {...props} />);
	});

	it("submits basket for a top-up product", (done) => {
		const initialProps = {
			...minimumProps,
			actions: {
				...minimumProps.actions,
				addProductToBasket: (product: any) => {
					return new Promise((resolve, reject) => {
						resolve();
					});
				},
				submitBasket: (basket: any) => {
					return new Promise(() => {
						done();
					});
				}
			},
			storedTopupProduct: topUpProduct,
			paymentStatus: "SUCCESS",
			committedBasket: {
				id: "foobar-committed-basket-id"
			}
		};

		let wrapper = mountWithContext(
			<PaymentReturnHandler {...initialProps} />
		);

		const nextProps = {
			...initialProps,
			foo: "bar"
		};

		wrapper = wrapper.setProps(nextProps);
	});

	it("adds payment information on top-up product", (done) => {
		const props = {
			...minimumProps,
			actions: {
				...minimumProps.actions,
				addProductToBasket: (product: any) => {
					expect(product).toEqual(
						{
							...topUpProduct,
							product: {
								inputtedCharacteristics: {
									[paymentMethodRelationId]: props.customerPaymentMethod.id
								}
							}
						}
					);

					return new Promise(() => {
						done();
					});
				}
			},
			disableBasketSubmit: true,
			storedTopupProduct: topUpProduct,
			paymentMethodRelationId,
			customerPaymentMethod,
			paymentStatus: "SUCCESS",
			committedBasket: {
				id: "foobar-committed-basket-id"
			}
		};

		mountWithContext(<PaymentReturnHandler {...props} />);
	});

	/* RUBT-143856
	 *
	 * 1. basket is submitted at mount
	 * 2. prop submittedBasket and submitting:true in state block sequential calls to actions.submitBasket().
	 */
	describe("basket submit during component lifetime", () => {
		let defaultProps: any;
		beforeEach(() => {
			defaultProps = {
				errors: [],
				contextualPaymentMethodId: "brilliant-contextual-payment-method-id",
				successRoute: "great-payment-success",
				rejectRoute: "cruel-rejection-page",
				receiptCreateFailedRoute: "receipt-creation-failed",
				disableBasketSubmit: false,
				selectedPaymentUseCase: "selected-payment-use-case",
				returnBaseLocation: {} as any,
				customerPaymentMethod: {} as any,
				storedTopupProduct: undefined,
				paymentStatus: "SUCCESS",
				committedBasket: {
					id: "foobar-committed-basket-id"
				} as any,
				actions: {
					submitBasket: (() => {}) as any,
					addProductToBasket: (() => {}) as any,
					handlePaymentReject: () => {},
					validatePayment: () => {},
					validatePaymentWithoutBasket: () => {},
					historyPush: () => {},
				}
			} as PaymentReturnHandlerStateProps & PaymentReturnHandlerActionProps;
		});

		it("submits basket at mount", (done) => {
			let callCounter = 0;

			const initialProps = {
				...defaultProps,
				actions: {
					...defaultProps.actions,
					submitBasket: (basket: any) => {
						++ callCounter;
						return new Promise(() => {});
					}
				}
			};

			let wrapper = mountWithContext(
				<PaymentReturnHandler {...initialProps} />
			);

			const nextProps = {
				...initialProps,
				foo: "bar"
			};

			wrapper = wrapper.setProps(nextProps);
			setTimeout(() => {
				expect(callCounter).toEqual(1);
				done();
			}, 500);
		});

		it("submits basket at mount, and second attempt with new props is blocked by state flag", (done) => {
			let callCounter = 0;
			const { sleep } = TestUtils;

			const secondProps = {
				...defaultProps
			};

			const initialProps = {
				...defaultProps,
				actions: {
					...defaultProps.actions,
					submitBasket: (basket: any) => {
						expect(basket).toBeTruthy();
						expect(basket).toEqual(defaultProps.committedBasket.id);

						return new Promise(async (resolve, reject) => {
							++ callCounter;

							await sleep(1000);
							resolve();

							wrapper = wrapper.setProps(secondProps);

							setTimeout(() => {
								expect(callCounter).toEqual(1);
								done();
							}, 500);
						});
					}
				},
			};

			secondProps.actions = initialProps.actions;
			secondProps.submittedBasket = {
				id: "foobar-submitted-basket-id"
			};

			let wrapper = mountWithContext(
				<PaymentReturnHandler {...initialProps} />
			);
		});
	});
});
