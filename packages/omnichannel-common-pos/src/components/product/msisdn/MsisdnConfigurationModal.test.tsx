import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import { ProductOffering } from "../../../redux/types";
import MsisdnConfigurationModal from "./MsisdnConfigurationModal";

describe("MsisdnConfigurationModal", () => {
	const props = {
		actions: {
			addProduct: () => {},
			saveNumber: () => {},
			reserveMsisdn: () => {},
			handleClose: () => {},
			selectProductOffering: () => {},
		},
		priceAttribute: "taxFreeAmount",
		configurations: {},
		msisdnConfig: {},
		reservationAttributes: {
			msisdns: [
				1234567, 1232323, 2132132
			]
		},
		path: [],
		product: {
			id: "testi"
		} as ProductOffering
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<MsisdnConfigurationModal {...props} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
