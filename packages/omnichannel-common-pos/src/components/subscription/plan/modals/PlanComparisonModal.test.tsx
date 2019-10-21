import * as React from "react";
import { head } from "lodash";

import {
	attachWithContext,
	shallowWithContext,
	TestUtils
} from "../../../../testUtils";
import PlanComparisonModal, { PlanComparisonModalProps } from "./PlanComparisonModal";
import { Product, ProductOffering } from "../../../../redux/types";
import { ReactWrapper } from "enzyme";

describe("PlanComparisonModal", () => {
	const minimumProps: PlanComparisonModalProps  = {
		actions: {
			switchToPlan: jest.fn(),
			close: jest.fn(),
		},
		productOfferings: [] as any as Array<ProductOffering>,
		currentPlan: {} as any as Product,
		selectedOffering: {
			attributes: {
				specSubType: ""
			}
		} as any as ProductOffering
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<PlanComparisonModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		const wrapper = attachWithContext(<PlanComparisonModal {...minimumProps} />);
		wrapper.detach();
	});

	const alternateOfferings = [
		{
			id: "data21-po",
			type: "productOfferings",
			attributes: {
				specificationId: "data21",
				specType: "PRODUCT",
				instanceCharacteristics: {
					data: {
						values: [
							{
								value: "21Mbps",
								name: "21Mbps"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: null,
						priority: null
					}
				},
				priority: null,
				productOfferingGroups: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				specSubType: "DATA",
				productOfferings: [],
				name: "Data 21Mb/s",
				categories: [],
				inputCharacteristics: {},
				prices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {
							amount: 1,
							currency: null,
							unitOfMeasure: "PIECES"
						},
						taxAmount: null,
						taxFreeAmount: 14.45,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				]
			}
		},
		{
			id: "data50-po",
			type: "alternateProductOfferings",
			attributes: {
				specificationId: "data50",
				specType: "PRODUCT",
				instanceCharacteristics: {
					data: {
						values: [
							{
								value: "50Mbps",
								name: "50Mbps"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: null,
						priority: null
					}
				},
				offeringType: "UPGRADE",
				priority: null,
				productOfferingGroups: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				specSubType: "DATA",
				productOfferings: [],
				name: "Data 50Mb/s",
				categories: [],
				inputCharacteristics: {},
				prices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {
							amount: 1,
							currency: null,
							unitOfMeasure: "PIECES"
						},
						taxAmount: null,
						taxFreeAmount: 19.95,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				]
			}
		},
		{
			id: "data2-po",
			type: "alternateProductOfferings",
			attributes: {
				specificationId: "data2",
				specType: "PRODUCT",
				instanceCharacteristics: {
					data: {
						values: [
							{
								value: "2Mbps",
								name: "2Mbps"
							}
						],
						description: null,
						source: null,
						subType: null,
						mandatory: false,
						validation: null,
						name: null,
						priority: null
					}
				},
				offeringType: "DOWNGRADE",
				priority: null,
				productOfferingGroups: [],
				commercialEnrichments: [],
				featureCharacteristics: [],
				specSubType: "DATA",
				productOfferings: [],
				name: "Data 2Mb/s",
				categories: [],
				inputCharacteristics: {},
				prices: [
					{
						type: "RECURRENT",
						name: null,
						chargedUnit: {
							amount: 1,
							currency: null,
							unitOfMeasure: "PIECES"
						},
						taxAmount: null,
						taxFreeAmount: 9.95,
						taxRate: 0,
						recurringChargePeriod: {
							count: 1,
							interval: "MONTH"
						},
						currency: "EUR",
						conditions: null,
						originalPrice: null
					}
				]
			}
		}
	] as any as Array<ProductOffering>;

	const currentPlan = {
		id: "juanita-agreement4-sub-data",
		name: "Data 21Mb/s",
		agreementId: "juanita-agreement4",
		isPlan: true,
		productOfferingId: "data21-po",
		specSubType: "DATA",
		specType: "PRODUCT"
	} as any as Product;

	const offeringsExceptThatOfCurrentPlan = alternateOfferings.filter(
		(po: ProductOffering) => po.id !== currentPlan.productOfferingId
	);

	it("renders given selected alternate offering and the offering of current plan", () => {
		const { getModalContents } = TestUtils;

		const wrapper = attachWithContext(
			<PlanComparisonModal
				{...minimumProps}
				selectedOffering={head(offeringsExceptThatOfCurrentPlan)}
				productOfferings={alternateOfferings}
				currentPlan={currentPlan}
			/>
		);

		const modalContents = getModalContents(wrapper);

		const currentPlanOffering = alternateOfferings.find(
			po => po.id === currentPlan.productOfferingId
		);

		const planNames = modalContents
			.find(".PlanComparisonModal-tableheader h4")
			.map((n: ReactWrapper) => n.text());
		expect(planNames.sort()).toEqual(
			[
				currentPlanOffering!.attributes!.name,
				head(offeringsExceptThatOfCurrentPlan.map(p => p.name || p.attributes!.name)
				)
			].sort()
		);

		wrapper.detach();
	});

	it("passes on the selected plan and the id of current plan", () => {
		const { getModalContents } = TestUtils;
		const switchToPlanSpy = jest.fn();

		const wrapper = attachWithContext(
			<PlanComparisonModal
				{...minimumProps}
				selectedOffering={head(offeringsExceptThatOfCurrentPlan)}
				productOfferings={alternateOfferings}
				currentPlan={currentPlan}
				actions={{
					...minimumProps.actions,
					switchToPlan: switchToPlanSpy,
				}}
			/>
		);

		const modalContents = getModalContents(wrapper);

		modalContents.find(".PlanComparisonModal-select-offering").find("button").filterWhere((n: ReactWrapper) => (n.prop("id") as string).indexOf("buttonSelectOffering") === 0).at(0)
			.simulate("click");

		expect(switchToPlanSpy).toHaveBeenCalledWith(head(offeringsExceptThatOfCurrentPlan), currentPlan);
		wrapper.detach();
	});
});
