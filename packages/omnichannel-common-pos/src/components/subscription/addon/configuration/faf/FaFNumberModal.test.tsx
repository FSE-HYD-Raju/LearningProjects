import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../../../../testUtils";

import FaFNumberModal, { FaFNumberModalProps } from "./FaFNumberModal";
import { Product, EnhancedCharacteristic, Characteristic } from "../../../../../redux";

const productEnhancedCharacteristics: Record<string, Array<EnhancedCharacteristic>> = {
	nr1: [{ value: "099 938 1835" }],
	nr2: [{ value: "099 938 1836" }],
	nr3: [{ value: "099 938 1837" }]
};

const userProduct: Product = {
	id: "id",
	agreementId: "agr1",
	enhancedCharacteristics: productEnhancedCharacteristics
} as Product;

const fafInputCharacteristic: Characteristic = {
	cardinality: {
		max: 10
	}
} as Characteristic;

// noinspection TsLint
const basicProps: FaFNumberModalProps = {
	userProduct,
	fafInputCharacteristic,
	actions: {
		goBack: () => { }
	}
};

describe("FaFNumberModal", () => {
	it("succeeds at shallow mount with props", () => {
		const wrapper = shallowWithContext(<FaFNumberModal {...basicProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("shows confirm modal when number is removed", () => {
		const wrapper = mountWithContext(<FaFNumberModal {...basicProps} />);
		let modal = TestUtils.getModalContents(wrapper);
		expect(modal.find(".modal-title").text()).toBe("Configure Friends & Family");
		modal
			.find("#buttonRemoveFaFNumber0")
			.at(0)
			.simulate("click");
		modal = TestUtils.getModalContents(wrapper);
		expect(modal.find(".modal-title").text()).toBe("Remove number");
	});
});
