import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../../testUtils";
import { get, clone } from "lodash";
import {
	hugeStateTransitionPrice,
	mockService,
	serviceModificationInitialization,
	productModificationInitialization,
	stateTransitionPrice
} from "../services/testData/serviceModificationInitialization";
import {
	LifecycleChangeAction,
	ProductOffering,
	Reason,
	Service,
	TargetLifecycleStatus,
	ServiceModificationInitialization,
} from "../../../redux/types";
import { ReactWrapper } from "enzyme";
import { default as StateChangeModal, StateChangeModalProps } from "./StateChangeModal";

describe("StateChangeModal", () => {
	const addonMinProps: StateChangeModalProps = {
		actions: {
			acceptStateTransition: jest.fn(),
			initializeStateTransition: jest.fn(),
			cancelLifecycleStatusChange: jest.fn(),
			resetStateModificationResult: jest.fn(),
		},
		isAddon: true,
		reasons: [],
		currency: "EUR",
		resultTransition: undefined,
		modification: productModificationInitialization,
		transition: {id: ""} as LifecycleChangeAction,
		name: mockService.specification!.name,
		description: "",
		phoneNumber: "",
		requirePaymentMethodSelection: false,
		shouldInitializeStateTransition: false,
		requireReasonSelect: true,
	};

	const phoneNumber = "0123456789";

	const serviceMinProps: StateChangeModalProps = {
		isAddon: false,
		...addonMinProps,
		modification: {
			...serviceModificationInitialization,
			products: [],
			resource: {attributes: {serviceName: "Favorite numbers"}} as any as ServiceModificationInitialization,
		},
		transition: {id: ""} as LifecycleChangeAction,
	};

	const makeTransition = (id: string): LifecycleChangeAction => {
		return {
			id,
			name: id[0].toUpperCase() + id.substr(1),
			targetType: "product"
		};
	};

	const stateTransitions: Record<string, {value: LifecycleChangeAction, transitionNoun: string, resultingState: string}> = {
		deactivate: {
			value: makeTransition("deactivate"),
			transitionNoun: "Deactivation",
			resultingState: "Terminated"
		},
		disable: {
			value: makeTransition("disable"),
			transitionNoun: "Deactivation",
			resultingState: "Terminated"
		},
		suspend: {
			value: makeTransition("suspend"),
			transitionNoun: "Suspension",
			resultingState: "Terminated"
		},
		resume: {
			value: makeTransition("resume"),
			transitionNoun: "Resume",
			resultingState: "Active"
		},
		reactivate: {
			value: makeTransition("reactivate"),
			transitionNoun: "Reactivation",
			resultingState: "Activated"
		}
	};

	it("succeeds at shallow mount with minimum props for addon service state transition", () => {
		const wrapper = shallowWithContext(
			<StateChangeModal {...addonMinProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at shallow mount with minimum props for service state transition", () => {
		const wrapper = shallowWithContext(
			<StateChangeModal {...serviceMinProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props for addon service state transition", () => {
		mountWithContext(
			<StateChangeModal {...addonMinProps} />
		);
	});

	it("succeeds at deep mount with minimum props for service state transition", () => {
		mountWithContext(
			<StateChangeModal {...serviceMinProps} />
		);
	});

	const { getModalContents } = TestUtils;

	const reasons: Array<Reason> = [
		{
			id: "r1",
			attributes: {
				name: "r1Name"
			}
		},
		{
			id: "r2",
			attributes: {
				name: "r2Name"
			}
		}
	] as any as Array<Reason>;

	const selectedService: Service = {
		allowedTransitions: [stateTransitions.disable],
		id: "juanita-agreement1-data-ser",
		productOfferingId: "fav-num-po",
		name: "Five favorite numbers"
	} as any as Service;

	const currency = "EUR";

	it("renders consequences of deactivating", () => {
		const productStateChangeProps: StateChangeModalProps = {
			...addonMinProps,
			transition: stateTransitions.deactivate.value
		};

		const props: StateChangeModalProps = {
			...productStateChangeProps,
			reasons: reasons,
			name: selectedService.name!,
			currency
		};
		const wrapper = mountWithContext(
			<StateChangeModal {...props} />,
			{ attachTo: document.body }
		);

		let modalContents = getModalContents(wrapper);

		modalContents.find("select").simulate("change", { target: { value: reasons[0].id } });

		modalContents = getModalContents(wrapper);

		expect(modalContents.find(".StateChangeModal-consequences").hostNodes().instance()).toBeTruthy();
		expect(modalContents.find(".StateChangeModal-consequences").hostNodes().text()).toContain("Favorite numbers");
		expect(modalContents.find(".StateChangeModal-consequences").hostNodes().text()).toContain("Terminated");

		wrapper.detach();
	});

	it("handles accepting change", () => {
		const transition = stateTransitions.deactivate;

		const props: StateChangeModalProps = {
			...addonMinProps,
			reasons: reasons,
			transition: transition.value,
			name: selectedService.name!,
		};

		const wrapper = mountWithContext(
			<StateChangeModal {...props} />,
			{ attachTo: document.body }
		);

		let modalContents = getModalContents(wrapper);

		modalContents.find("select").simulate("change", { target: { value: reasons[0].id } });

		modalContents = getModalContents(wrapper);

		expect(modalContents.find("#buttonAcceptServiceStateTransition").hostNodes().prop("disabled")).toEqual(false);

		modalContents.find("#buttonAcceptServiceStateTransition").hostNodes().simulate("click");
	});

	it("handles canceling change", done => {
		const wrapper = mountWithContext(
			<StateChangeModal
				{...addonMinProps}
				modification={{basket: {id: "123"}} as any}
				actions={{
					...addonMinProps.actions,
					cancelLifecycleStatusChange: () => {done(); }
				}}
			/>,
			{ attachTo: document.body }
		);

		const modalContents = getModalContents(wrapper);
		modalContents
			.find("#oc-modal-cancel-button")
			.hostNodes()
			.simulate("click");
		wrapper.detach();
	});

	const serviceStateTransitionResponse = {
		data: {
			id: null,
			type: "services-modify",
			relationships: {
				basket: {
					data: {
						id: "8ce516c5-bba7-4fd0-bcf0-4dab4bd2709a",
						type: "baskets"
					}
				}
			}
		},
		included: [
			{
				id: "8ce516c5-bba7-4fd0-bcf0-4dab4bd2709a",
				type: "baskets",
				attributes: {
					createdAt: "2017-09-11T10:22:16.935Z",
					lastModifiedAt: null,
					lifecycleStatus: "SUBMITTED",
					referenceNumber: "cbb66789-472b-4a4c-af81-52160039665e",
					created: null,
					totalPrices: [],
					modified: null,
					billingAddress: null,
					expiresAt: null
				},
				relationships: {
					owner: {
						data: {
							id: "juanita",
							type: "persons"
						}
					},
					basketItems: {},
					payer: {
						data: {
							id: "juanita",
							type: "persons"
						}
					}
				}
			}
		]
	};

	const serviceProduct: ProductOffering = {
		categories: [],
		commercialEnrichments: [],
		featureCharacteristics: [],
		id: "fav-num-po",
		name: "Favorite numbers",
		inputCharacteristics: {
			number3: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: null,
				subType: null,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: null
			},
			number4: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: null,
				subType: null,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: null
			},
			number1: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: null,
				subType: null,
				mandatory: true,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: null
			},
			number2: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: null,
				subType: null,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: null
			},
			number5: {
				values: [],
				description:
					"The mobile number of a person close to your heart.",
				source: null,
				subType: null,
				mandatory: false,
				validation: "^\\+358 [1-9](\\d) (\\d){7}$",
				name: "Favorite number",
				priority: null
			}
		},
		instanceCharacteristics: {},
		prices: [
			{
				type: "ONE_TIME",
				name: null,
				chargedUnit: {
					amount: 1,
					currency: null,
					unitOfMeasure: "PIECES"
				},
				taxAmount: null,
				taxFreeAmount: 1,
				taxRate: 0,
				recurringChargePeriod: null,
				currency: "EUR",
				conditions: null,
				originalPrice: null
			},
			{
				type: "RECURRENT",
				name: null,
				chargedUnit: {
					amount: 1,
					currency: null,
					unitOfMeasure: "PIECES"
				},
				taxAmount: null,
				taxFreeAmount: 4.5,
				taxRate: 0,
				recurringChargePeriod: {
					count: 1,
					interval: "MONTH"
				},
				currency: "EUR",
				conditions: null,
				originalPrice: null
			}
		],
		priority: null,
		productOfferingGroups: [],
		productOfferings: [],
		specificationId: "fav-num",
		msisdns: null,
		bundlingProductOfferings: null
	} as any as ProductOffering;

	it("renders Service state transition Purchase summary", () => {
		const serviceModificationResult: ServiceModificationInitialization = {
			basket: serviceStateTransitionResponse.included.find(
				elem => get(elem, "type", "") === "baskets"
			),
			service: serviceProduct,
			stateTransition: "disable",
			transition: {
				id: "disable"
			}
		} as any as ServiceModificationInitialization;

		const selectedService: Service = {
			specification: {
				name: "Favorite numbers"
			}
		} as any as Service;

		const wrapper = mountWithContext(
			<StateChangeModal
				{...addonMinProps}
				resultTransition={serviceModificationResult.stateTransition}
				name={selectedService.specification!.name}
			/>,
			{ attachTo: document.body }
		);

		const modalContents = getModalContents(wrapper);
		expect(modalContents.text().toLowerCase()).toContain(selectedService.specification!.name.toLowerCase());
		expect(modalContents.text().toLowerCase()).toContain("Disabled".toLowerCase());
		wrapper.detach();
	});

	const findConfirmationButton = (modalContents: ReactWrapper) => modalContents.find("#buttonAcceptServiceStateTransition");

	describe("Confirm button", () => {
		it("is enabled for Disable after reason is selected AND there is no transition fee", () => {
			const transition: LifecycleChangeAction = stateTransitions.deactivate.value;

			const props: StateChangeModalProps = {
				...addonMinProps,
				modification: {...serviceModificationInitialization},
				reasons: reasons,
				transition,
				name: selectedService.name!,
				currency
			};
			const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

			let modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			modalContents.find("select").simulate("change", { target: { value: reasons[0].id } });

			modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(false);

			wrapper.detach();
		});

		it("is disabled when Disabling requires a fee AND selecting a reason UNTIL user chooses a payment method AND balance suffices", () => {
			const transition = stateTransitions.deactivate.value;

			const myProductModificationInitialization = clone(serviceModificationInitialization);
			myProductModificationInitialization.basketItems[0]!.attributes!.totalPrices[0] = stateTransitionPrice;

			const props: StateChangeModalProps = {
				...addonMinProps,
				modification: myProductModificationInitialization,
				reasons,
				transition,
				name: selectedService.name!,
				currency
			};
			const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

			let modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			modalContents.find("select").simulate("change", { target: { value: reasons[0].id } });
			modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			modalContents.find("#payment-method-balance").hostNodes().simulate("click");
			wrapper.update();

			modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(false);

			wrapper.detach();
		});

		it("is disabled when Disabling requires a fee AND selecting a reason AND choosing a payment method, FINALLY customer has to increase balance", () => {
			const transition = stateTransitions.deactivate.value;

			const myProductModificationInitialization = clone(serviceModificationInitialization);
			myProductModificationInitialization.basketItems[0]!.attributes!.totalPrices[0] = hugeStateTransitionPrice;

			const props: StateChangeModalProps = {
				...addonMinProps,
				modification: myProductModificationInitialization,
				reasons,
				transition,
				name: selectedService.name!,
				currency
			};

			const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

			let modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			modalContents.find("select").simulate("change", { target: { value: reasons[0].id } });

			modalContents = getModalContents(wrapper);

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			modalContents.find("#payment-method-balance").hostNodes().simulate("click");
			wrapper.update();

			expect(findConfirmationButton(modalContents).hostNodes().prop("disabled")).toEqual(true);

			wrapper.detach();
			});
		});

	describe("renders appropriate words for every state", () => {
			Object.keys(stateTransitions).forEach((key: string) => {
				it (stateTransitions[key].value.name, () => {
					const transition = stateTransitions[key].value;
					const myProductModificationInitialization = clone(serviceModificationInitialization);
					myProductModificationInitialization.basketItems[0]!.attributes!.totalPrices[0] = stateTransitionPrice;
					myProductModificationInitialization.basketItems[0]!.attributes!.targetLifecycleStatus =
						stateTransitions[key].resultingState.toUpperCase() as TargetLifecycleStatus;

					const selectedService = {
						allowedTransitions: [stateTransitions.disable],
						id: "juanita-agreement1-data-ser",
						productOfferingId: "fav-num-po",
						name: "Five favorite numbers"
					} as any as Service;

					const props: StateChangeModalProps = {
						...addonMinProps,
						modification: myProductModificationInitialization,
						reasons,
						transition,
						name: selectedService.name!,
						currency
					};

					const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

					let modalContents = getModalContents(wrapper);

					if (transition.id !== "disable") {
						expect(modalContents.find(".OcModal-header-container SubscriptionStateNoun")).toHaveLength(1);

						modalContents.find("select").simulate("change", {target: { value: reasons[0].id }});

						modalContents = getModalContents(wrapper);

						const feeLabel = modalContents.find("[data-test-name=\"fee-row\"] [data-test-name=\"fee-label-and-amount\"]").hostNodes();
						expect(feeLabel.instance()).toBeTruthy();
						expect(feeLabel.text().toLowerCase()).toContain(
							stateTransitions[key].transitionNoun.toLowerCase()
						);
						const resultingState = modalContents.find(".StateChangeModal-consequences [data-test-name=\"resulting-state\"]").hostNodes();
						expect(resultingState.find("span").at(0).text().toLowerCase()).toContain(stateTransitions[key].resultingState.toLowerCase());

						expect(findConfirmationButton(modalContents).hostNodes().text().toLowerCase()).toContain(stateTransitions[key].value.name.toLowerCase());
					}
					wrapper.detach();
				});
			});
		});

	describe("can charge a fee on all transitions", () => {
		Object.keys(stateTransitions).forEach((key: string) => {
			it (stateTransitions[key].value.name, () => {

				const transition = stateTransitions[key].value;
				const myProductModificationInitialization = clone(serviceModificationInitialization);
				myProductModificationInitialization.basketItems[0]!.attributes!.totalPrices[0] = stateTransitionPrice;
				myProductModificationInitialization.basketItems[0]!.attributes!.targetLifecycleStatus =
					stateTransitions[key].resultingState.toUpperCase() as TargetLifecycleStatus;

				const selectedService = {
					allowedTransitions: [stateTransitions.disable],
					id: "juanita-agreement1-data-ser",
					productOfferingId: "fav-num-po",
					name: "Five favorite numbers"
				} as any as Service;

				const props: StateChangeModalProps = {
					...addonMinProps,
					modification: myProductModificationInitialization,
					reasons,
					phoneNumber,
					transition,
					name: selectedService.name!,
					currency
				};

				const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

				let modalContents = getModalContents(wrapper);

				if (transition.id !== "disable") {
					expect(modalContents.find(".OcModal-header-container SubscriptionStateNoun")).toHaveLength(1);
					modalContents.find("select").simulate("change", {target: { value: reasons[0].id }});

					modalContents = getModalContents(wrapper);

					const feeRow = modalContents.find("[data-test-name=\"fee-row\"]").hostNodes();
					expect(feeRow.instance()).toBeTruthy();

					const feeLabel = modalContents.find("[data-test-name=\"fee-row\"] [data-test-name=\"fee-label-and-amount\"]").hostNodes();
					expect(feeLabel.instance()).toBeTruthy();
				}

				wrapper.detach();
			});
		});
	});

	describe("asks for a reason on all transitions", () => {
		Object.keys(stateTransitions).forEach((key: string) => {
			it (stateTransitions[key].value.name, () => {
				const transition = stateTransitions[key].value;
				const myProductModificationInitialization = clone(serviceModificationInitialization);
				myProductModificationInitialization.basketItems[0]!.attributes!.totalPrices[0] = stateTransitionPrice;
				myProductModificationInitialization.basketItems[0]!.attributes!.targetLifecycleStatus =
					stateTransitions[key].resultingState.toUpperCase() as TargetLifecycleStatus;

				const selectedService = {
					allowedTransitions: [stateTransitions.disable],
					id: "juanita-agreement1-data-ser",
					productOfferingId: "fav-num-po",
					name: "Five favorite numbers"
				} as any as Service;

				const props: StateChangeModalProps = {
					...addonMinProps,
					modification: myProductModificationInitialization,
					reasons,
					transition,
					name: selectedService.name!,
					currency
				};

				const wrapper = mountWithContext(<StateChangeModal {...props} />, { attachTo: document.body });

				const modalContents = getModalContents(wrapper);

				expect(modalContents.find("[data-test-name=\"state-change-reason\"]"));

				wrapper.detach();
			});
		});
	});
});
