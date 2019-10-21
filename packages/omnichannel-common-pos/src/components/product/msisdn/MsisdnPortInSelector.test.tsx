import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import MsisdnPortInSelector  from "./MsisdnPortInSelector";

describe("MsisdnPortInSelector", () => {
	const minimalProps = {
		modalState: {
			CH_PortInNumberResource: "0441212234",

		},
		actions: {
			validatePortIn: jest.fn(),
			requestNip: jest.fn(),
		},
		loadingEligibilityCheck: true,
		eligibilityError: "error",
		identification: undefined,
		disableNipCheck: true,
		disableNipField: true,
		errorMakingNipRequest: {},
		errorPleaseTryAgain: true,
		errorNipNotSendToCustomer: false,
		msisdnConfiguration: {
			countryCode: 59
		},
		portInPhoneNumberLength: 12,
		nipNumberLength: 5,
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<MsisdnPortInSelector {...minimalProps} />);
		// cannot compare to snapshot because we are using date that changes all the time
		// expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<MsisdnPortInSelector {...minimalProps} />);
	});

	it("displays error message on user not authenticated", () => {
		const wrapper = mountWithContext(<MsisdnPortInSelector {...minimalProps} />);
		const errorMessageElement = wrapper.find("#port-in-identification-error");
		expect(errorMessageElement).toHaveLength(2);
	});

	it("NIP request error general, (front did not get a answer from backend)", () => {
		const props = {
			...minimalProps,
		};

		const wrapper = mountWithContext(<MsisdnPortInSelector {...props} />);
		const errorMessageElement = wrapper.find("#port-in-request-nip-error");
		expect(errorMessageElement).toHaveLength(2);
	});

	it("NIP request error code 2, (error on the service call to 3PP service)", () => {
		const props = {
			...minimalProps,
			errorPleaseTryAgain: true
		};

		const wrapper = mountWithContext(<MsisdnPortInSelector {...props} />);
		const errorMessageElement = wrapper.find("#port-in-request-error-try-again");
		expect(errorMessageElement).toHaveLength(2);
	});

	it("NIP request error code 0, (NIP request not send to customer)", () => {
		const props = {
			...minimalProps,
			errorNipNotSendToCustomer: true
		};

		const wrapper = mountWithContext(<MsisdnPortInSelector {...props} />);
		const errorMessageElement = wrapper.find("#port-in-request-nip-error-try-again");
		expect(errorMessageElement).toHaveLength(2);
	});

	// type error did not get this working
	it("eligibility error, ERR_MSISDN_NOT_PORTABLE", () => {
		const props = {
			...minimalProps,
			eligibilityError: "ERR_MSISDN_NOT_PORTABLE"
		};

		const wrapper = mountWithContext(<MsisdnPortInSelector {...props} />);
		const errorMessageElement = wrapper.find("#port-in-msisdn_not_portable");
		expect(errorMessageElement).toHaveLength(2);
	});

	// type error did not get this working
	it("eligibility error, ERR_CUSTOMER_BLACKLISTED", () => {
		const props = {
			...minimalProps,
			eligibilityError: "ERR_CUSTOMER_BLACKLISTED"
		};

		const wrapper = mountWithContext(<MsisdnPortInSelector {...props} />);
		const errorMessageElement = wrapper.find("#port-in-customer-blaclisted");
		expect(errorMessageElement).toHaveLength(2);
	});
});
