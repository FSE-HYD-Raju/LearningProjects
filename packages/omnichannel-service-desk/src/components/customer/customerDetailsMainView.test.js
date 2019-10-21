import React from "react";
import CustomerDetailsMainView from "../../../src/components/customer/CustomerDetailsMainView";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";

describe("CustomerDetailsMainView", () => {
	const addresses = [
		{
			id: "address-id-1",
			street: "Vaasankatu 1",
			postalCode: "00150",
			city: "Helsinki",
			country: "Finland",
			role: "PRIMARY"
		},
		{
			id: "address-id-2",
			street: "Bulevardi 12",
			postalCode: "00150",
			city: "Helsinki",
			country: "Finland",
			role: "HIDE_OUT"
		}
	];

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<CustomerDetailsMainView />);
		expect(wrapper).toMatchSnapshot();
	});

	const minimumProps = {
		getCustomerOffers: () => {},
		getSidebarNotifications: () => {},
		posShowSummaryData: true
	};

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<CustomerDetailsMainView {...minimumProps} />);
	});

	const customer = {
		postalAddresses: addresses
	};

	it("sets the first address as default address from postalAddresses", () => {
		const wrapper = mountWithContext(
			<CustomerDetailsMainView {...minimumProps} customer={customer} />
		);
		const state = wrapper.state();
		expect(state.selected).toEqual(addresses[0]);
	});

	it("#selectAddress method call with parameter 1 sets addresses[1] as selected address", done => {
		jest
			.spyOn(CustomerDetailsMainView.prototype, "setState")
			.mockImplementation(data => {
				CustomerDetailsMainView.prototype.setState.mockRestore();
				expect(data.selected).toEqual(selected);
				done();
			});

		const wrapper = mountWithContext(
			<CustomerDetailsMainView {...minimumProps} customer={customer} />
		);
		const event = {
			target: { value: "address-id-2" },
			preventDefault: () => {}
		};

		const selected = addresses[1];
		wrapper.instance().selectAddress(event);
	});

	it("#handleAddressUpdate method calls UserActions#updateUserAddresses with customer, model (updates the selected address) and updateCustomerCase parameters", () => {
		const updateUserAddressesSpy = jest.fn();

		const wrapper = mountWithContext(
			<CustomerDetailsMainView
				{...minimumProps}
				customer={customer}
				updateUserAddresses={updateUserAddressesSpy}
			/>
		);

		const updateCustomerCase = true;

		const model = {
			id: "address-id-2",
			street: "Mechelininkatu 51",
			postalCode: "00150",
			city: "Helsinki",
			country: "Finland",
			role: "HIDE_OUT"
		};

		const newAddresses = [addresses[0], model];

		wrapper.instance().handleAddressUpdate(model);
		expect(updateUserAddressesSpy).toHaveBeenCalledWith(
			customer,
			newAddresses,
			updateCustomerCase,
			undefined
		);
	});

	describe("RUBT-66438", () => {
		const countries = [
			{
				code: "FI",
				name: "Finland",
				locale: "fi"
			},
			{
				code: "SE",
				name: "Sweden",
				locale: "se"
			}
		];

		it('option "Not defined" provided for field Nationality', () => {
			const wrapper = mountWithContext(
				<CustomerDetailsMainView
					{...minimumProps}
					customer={{
						firstName: "John",
						lastName: "Smith",
						nationality: "United Kingdom",
						gender: "male",
						birthDay: null
					}}
					enableChangeCustomerData={true}
					countries={countries}
				/>
			);

			const customerDetailsView = wrapper
				.find("CustomerDetailsView")
				.filterWhere(n => n.props().header === "demographic");

			customerDetailsView
				.find("#CustomerDetailsView-edit-button-demographic")
				.simulate("click");

			const options = wrapper
				.find("#CustomerDetailsForm-select-nationality")
				.hostNodes();

			const optionValues = options.map(n =>
				n.props().value.toLowerCase()
			);
			expect(optionValues).toContain("Not defined".toLowerCase());
		});

		it("Demographic information can be saved when Nationality and Date of birth are empty", done => {
			const wrapper = mountWithContext(
				<CustomerDetailsMainView
					{...minimumProps}
					customer={{
						firstName: "John",
						lastName: "Smith"
					}}
					updateUserDemoGraphicInfo={(customer, model) => {
						// console.log(
						// 	"MOCKED updateUserDemoGraphicInfo()",
						// 	customer,
						// 	model
						// );
						expect(model.nationality).toEqual(null);
						expect(model.birthDay).toEqual(null);
						done();
					}}
					enableChangeCustomerData={true}
				/>
			);

			wrapper
				.find("#CustomerDetailsView-edit-button-demographic")
				.simulate("click");

			wrapper.find("form").simulate("submit");
		});

		it("Demographic information can be saved when Nationality and Date of birth are empty -- snapshot", () => {
			const wrapper = shallowWithContext(
				<CustomerDetailsMainView
					updateUserDemoGraphicInfo={(customer, model) => {
						console.log(
							"MOCKED UserActions.updateUserDemoGraphicInfo()",
							customer,
							model
						);
					}}
				/>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});

	/* RUBT-66852 */
	it("#handleDemographicInfoUpdate method calls UserActions#updateUserDemoGraphicInfo with userdata wherein time of day of birthDay is all zero in UTC", done => {
		const wrapper = mountWithContext(
			<CustomerDetailsMainView
				{...minimumProps}
				customer={{
					firstName: "John",
					lastName: "Smith",
					nationality: "United Kingdom",
					gender: "male",
					birthDay: null
				}}
				updateUserDemoGraphicInfo={(customer, model) => {
					const date =
						typeof model.birthDay === "string"
							? new Date(model.birthDay)
							: model.birthDay;

					expect(date.getUTCFullYear()).toEqual(
						niceDate.getUTCFullYear()
					);
					expect(date.getUTCMonth()).toEqual(niceDate.getUTCMonth());
					expect(date.getUTCDate()).toEqual(niceDate.getUTCDate());
					expect(date.getUTCHours()).toEqual(0);
					expect(date.getUTCMinutes()).toEqual(0);
					expect(date.getUTCSeconds()).toEqual(0);
					expect(date.getUTCMilliseconds()).toEqual(0);

					done();
				}}
			/>
		);

		const niceDate = new Date();
		niceDate.setUTCHours(1);

		wrapper.instance().handleDemographicInfoUpdate({
			birthDay: niceDate
		});
	});
});
