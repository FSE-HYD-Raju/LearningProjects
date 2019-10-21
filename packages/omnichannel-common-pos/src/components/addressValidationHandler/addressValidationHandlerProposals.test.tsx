import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import AddressValidationHandlerProposals from "./AddressValidationHandlerProposals";

describe("AddressValidationHandlerProposals", () => {
	const mikonkatuHelsinki = {
		street: "Mikonkatu 1",
		postalCode: "10500",
		city: "Helsinki",
		country: "Finland"
	};
	const mikonkatuMikkeli = {
		street: "Mikonkatu 1",
		postalCode: "30500",
		city: "Mikkeli",
		country: "Finland"
	};
	const mikonkatuPori = {
		street: "Mikonkatu 1",
		postalCode: "60500",
		city: "Pori",
		country: "Finland"
	};

	const currentAddress = mikonkatuHelsinki;

	const proposalSelected = mikonkatuHelsinki;

	const proposals = [
		mikonkatuMikkeli,
		mikonkatuPori,
		mikonkatuHelsinki
	];

	const minimumProps = {
		currentAddress: {},
		proposals: null,
		validationIsMandatory: false,
		actions: {
			onChange: jest.fn()
		}
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(
			<AddressValidationHandlerProposals {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<AddressValidationHandlerProposals {...minimumProps} />);
	});

	it("renders proposals", () => {
		const props = {
			...minimumProps,
			currentAddress,
			proposals,
		};

		const wrapper = mountWithContext(
			<AddressValidationHandlerProposals {...props} />
		);

		const list = wrapper.find("#AddressValidationHandlerProposals-list");

		proposals.forEach(proposal => {
			expect(list.text()).toContain(proposal.street);
		});
	});

	it("renders selected proposal as checked", () => {
		const props = {
			...minimumProps,
			currentAddress,
			proposals,
			proposalSelected,
			validationIsMandatory: false,
			onChange: () => {}
		};

		const wrapper = mountWithContext(
			<AddressValidationHandlerProposals {...props} />
		);
		const lastItem = wrapper.find(
			"#AddressValidationHandlerProposals-list-item-2"
		);

		const checked = lastItem.find("input[checked]");
		expect(checked.length).toBeGreaterThan(0);
	});

	it("clicking proposal calls onChange callback with the selected address", () => {
		const props = {
			...minimumProps,
			currentAddress,
			proposals,
			proposalSelected,
			actions: {
				onChange: () => {}
			}
		};

		const onChangeSpy = jest.spyOn(props.actions, "onChange");

		const wrapper = mountWithContext(
			<AddressValidationHandlerProposals {...props} />
		);
		const firstItem = wrapper.find(
			"#AddressValidationHandlerProposals-list-item-0"
		);

		const radioButton = firstItem.find("input");
		radioButton.simulate("click");

		expect(onChangeSpy).toHaveBeenCalledWith(proposals[0]);
		onChangeSpy.mockRestore();
	});
});
