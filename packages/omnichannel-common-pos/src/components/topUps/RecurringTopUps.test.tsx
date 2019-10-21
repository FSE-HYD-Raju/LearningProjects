import * as React from "react";

import { default as RecurringTopUps, RecurringTopUpsProps } from "./RecurringTopUps";
import { Agreement, User } from "../../redux/types";
import { SimpleDataMock, shallowWithContext, mountWithContext, mockRouterProps, default as TestUtils } from "../../testUtils";

describe("RecurringTopUps", () => {
	let minProps: RecurringTopUpsProps;
	let agreements: Array<Agreement>;
	let context: any;

	beforeAll(() => {
		minProps = {
			...mockRouterProps,
			currentRecurringTopUps: [
				{
					subscription: "1234567890",
					agreementId: "1",
					productId: "product-id",
					productOfferingId: "po-id",
					characteristicsValue: {
						thresholdValue: "10",
						amount: "13",
						monthlyLimit: "50",
						type: "Threshold",
						customerPaymentMethod: "1"
					},
				},
			],
			showAlertMessage: false,
			activePaymentMethods: [],
			modelForAdd: {},
			selectedCurrency: "EUR",
			user: ({
				customerAccountId: "dummy-id",
			} as any) as User,
			actions: {
				getPaymentMethods: jest.fn(),
				historyPush: jest.fn(),
			},
		};
		agreements = ([
			{
				attributes: {
					products: [
						{
							realizingResources: [
								{
									type: "MSISDN",
									lifeCycleStatus: "ACTIVE",
									primaryId: "+1234567890",
								},
							],
							childProducts: [
								{
									lifeCycleStatus: "TERMINATED",
									characteristics: {
										CH_TopUp_Type: "Threshold",
										CH_Threshold_Value: "10",
										CH_TopUp_Amount: "13",
										CH_Monthly_TopUp_Limit: "50",
									},
								},
								{
									lifeCycleStatus: "ACTIVE",
									characteristics: {
										CH_TopUp_Type: "Threshold",
										CH_Threshold_Value: "25",
										CH_TopUp_Amount: "25",
										CH_Monthly_TopUp_Limit: "100",
									},
								},
								{
									lifeCycleStatus: "TERMINATED",
									characteristics: {
										CH_TopUp_Type: "Threshold",
										CH_Threshold_Value: "5",
										CH_TopUp_Amount: "6",
										CH_Monthly_TopUp_Limit: "25",
									},
								},
							],
						},
					],
				},
			},
		] as any) as Array<Agreement>;
		context = SimpleDataMock.getConsulContextMock();
		context.flux.actions = {
			SalesActions: {
				initializeProductReplace: jest.fn(),
			},
			BasketActions: {
				addProductToBasket: jest.fn(),
			},
		};
	});

	const expectInputEquals = (modalContent: any, fieldId: string, shouldBe: any, inputType = "input") => {
		const value = modalContent
			.find(fieldId)
			.at(0)
			.find(inputType)
			.props().value;
		expect(value).toBe(shouldBe);
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<RecurringTopUps {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<RecurringTopUps {...minProps} />, { context });
	});

	it("should render empty table if there are no agreements", () => {
		const props = {
			...minProps,
			currentRecurringTopUps: [],
		};
		const wrapper = mountWithContext(<RecurringTopUps {...props} />, { context });
		expect(wrapper.find("tbody").find("tr").length).toBe(0);
	});

	it("should render table rows for agreements with top-ups", () => {
		const props = {
			...minProps,
			agreements,
		};
		const wrapper = mountWithContext(<RecurringTopUps {...props} />, { context });
		expect(wrapper.find("tbody").find("tr").length).toBe(1);
	});

	it("should show modal after click on edit (threshold top-up)", () => {
		const props = {
			...minProps,
			agreements,
			paymentMethods: [
				{
					id: "dummy-payment",
					attributes: {
						name: "Credit Card",
					},
				},
			],
		};

		const wrapper = shallowWithContext(<RecurringTopUps {...props} />, { context });
		wrapper
			.find("#RecurringTopUps-edit-button-0")
			.at(0)
			.simulate("click");
		const modal = wrapper.find("RecurringTopUpEditModal");
		expect(modal).not.toBeUndefined();
	});

	// same test as before. Should be another test for modal
	xit("should show modal after click on edit (monthly top-up)", () => {
		const agr = ([
			{
				attributes: {
					products: [
						{
							realizingResources: [
								{
									type: "MSISDN",
									lifeCycleStatus: "ACTIVE",
									primaryId: "+1234567890",
								},
							],
							childProducts: [
								{
									lifeCycleStatus: "TERMINATED",
									characteristics: {
										CH_TopUp_Type: "Threshold",
										CH_Threshold_Value: "10",
										CH_TopUp_Amount: "13",
										CH_Monthly_TopUp_Limit: "50",
									},
								},
								{
									lifeCycleStatus: "ACTIVE",
									characteristics: {
										CH_TopUp_Type: "Time",
										CH_TopUp_Amount: "10",
										CH_Time_Interval: "month",
										CH_Time_Interval_Count: "1",
									},
								},
								{
									lifeCycleStatus: "TERMINATED",
									characteristics: {
										CH_TopUp_Type: "Threshold",
										CH_Threshold_Value: "5",
										CH_TopUp_Amount: "6",
										CH_Monthly_TopUp_Limit: "25",
									},
								},
							],
						},
					],
				},
			},
		] as any) as Array<Agreement>;
		const props = {
			...minProps,
			agreements: agr,
			paymentMethods: [
				{
					id: "dummy-payment",
					attributes: {
						name: "Credit Card",
					},
				},
			],
		};

		const wrapper = shallowWithContext(<RecurringTopUps {...props} />, { context });
		wrapper
			.find("#RecurringTopUps-edit-button-0")
			.at(0)
			.simulate("click");

		const modal = wrapper.find("RecurringTopUpEditModal");
		const modalContent = TestUtils.getModalContents(modal, context);

		expect(
			modalContent
				.find("select")
				.at(0)
				.props().value
		).toBe("+1234567890");

		expect(
			modalContent
				.find("input[name='recurringTopUp']")
				.at(2)
				.props().checked
		).toBeTruthy();

		expectInputEquals(modalContent, "#RecurringTopUpEditForm-monthly-top-up-amount-field", 10);
	});
});
