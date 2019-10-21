import React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import CustomerDetailsLegalDocumentsView from "../../../src/components/customer/CustomerDetailsLegalDocumentsView";

describe("CustomerDetailsLegalDocuments", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<CustomerDetailsLegalDocumentsView />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<CustomerDetailsLegalDocumentsView />);
	});
});
