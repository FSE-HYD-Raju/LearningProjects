import * as React from "react";
import ActiveAgreementSelect, { ActiveAgreementSelectProps } from "./ActiveAgreementSelect";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import { Agreement } from "../../redux/types";

describe("ActiveAgreementSelect", () => {
	const minimumProps: ActiveAgreementSelectProps = {
		activeAgreementId: "id",
		isBasketRefreshing: false,
		actions: {
			changeActiveAgreement: jest.fn(),
			getAgreements: jest.fn(),
		}
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<ActiveAgreementSelect {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<ActiveAgreementSelect {...minimumProps} />);
	});

	it("renders with minimum props", () => {
		const wrapper = mountWithContext(
			<ActiveAgreementSelect {...minimumProps} />
		);

		expect(wrapper.children().length).toEqual(1);
	});

	it("renders with only valid agreements", () => {
		const agreements = [
			{
				id: "agreement1",
				attributes: {
					lifeCycleStatus: "ACTIVE",
					referenceNumber: "5333B5"
				}
			},
			{
				id: "agreement3",
				attributes: {
					lifeCycleStatus: "ACTIVE",
					referenceNumber: "5333B5"
				}
			},
			{
				id: "agreement2",
				attributes: {
					lifeCycleStatus: "CLOSED",
					referenceNumber: "5333B5"
				}
			}
		];
		const props = {
			...minimumProps,
			agreements: agreements as Array<Agreement>
		};
		const wrapper = mountWithContext(<ActiveAgreementSelect {...props} />);

		expect(wrapper.children().length).toEqual(1);

		const visibleAgreements = wrapper.find("#minibasket-agreement-select");

		expect(visibleAgreements.find("option").length).toEqual(agreements.length);
	});

	it("renders only agreement text if basket state !== OPEN", () => {
		const agreements = [
			{
				id: "agreement1",
				attributes: {
					lifeCycleStatus: "ACTIVE",
					referenceNumber: "5333B5"
				}
			},
			{
				id: "agreement3",
				attributes: {
					lifeCycleStatus: "ACTIVE",
					referenceNumber: "5333B5"
				}
			},
			{
				id: "agreement2",
				attributes: {
					lifeCycleStatus: "CLOSED",
					referenceNumber: "5333B5"
				}
			}
		];
		const props = {
			...minimumProps,
			agreements: agreements as Array<Agreement>,
			activeAgreementId: "agreement1",
			basketLifeCycleStatusOpen: false
		};
		const wrapper = mountWithContext(<ActiveAgreementSelect {...props} />);

		expect(wrapper.children().length).toEqual(1);

		const visibleAgreements = wrapper.find("#minibasket-agreement-select");

		expect(visibleAgreements.children().length).toEqual(0);
	});
});
