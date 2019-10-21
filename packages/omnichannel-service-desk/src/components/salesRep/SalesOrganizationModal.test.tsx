import * as React from "react";
import {
	mountWithContext,
	shallowWithContext,
	attachWithContext,
	TestUtils,
	SalesOrganizationRole,
} from "omnichannel-common-pos";
import SalesOrganizationModal from "./SalesOrganizationModal";

describe("SalesOrganizationModal", () => {
	const { getModalContents } = TestUtils;

	const minProps = {
		showSalesOrganizationModal: false,
		consulValuesLoaded: false,
		toolmode: false,
		actions: {
			setSelectedOrganization: jest.fn(),
			revertSalesOrganizationAndInventory: jest.fn(),
			getInventories: jest.fn(),
			getOrganizations: jest.fn(),
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<SalesOrganizationModal {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		const wrapper = mountWithContext(<SalesOrganizationModal {...minProps} />);
	});

	it("renders \"Select sales organization\" title and two inputs", () => {
		/* props received by ServiceDeskContainer that cause this title
			customers null
			searchActive false
			customerCreated false
			showNewCustomerInfo null
			showCustomerSearchForm true
			showDuplicateCustomerList null
		 */
		const props = {
			...minProps,
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};
		const wrapper = attachWithContext(
			<SalesOrganizationModal {...props} />
		);

		const modalContents = getModalContents(wrapper);

		expect(modalContents.find(".OcModal-header-container").text()).toEqual("Select sales organization");

		expect(modalContents.find("#servicedesk-container-organization-search").hostNodes()).toHaveLength(1);
		expect(modalContents.find("#servicedesk-container-inventory-search").hostNodes()).toHaveLength(1);

		wrapper.detach();
	});

	it("activate button should be disabled by default", () => {
		const props = {
			...minProps,
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};
		const wrapper = attachWithContext(
			<SalesOrganizationModal {...props} />
		);

		const modalContents = getModalContents(wrapper);
		const button = modalContents.find("#oc-modal-action-button").first();

		expect(!button.prop("disabled")).toEqual(false);

		wrapper.detach();
	});

	it("clicking inputs should render a dropdown list of all organizations and inventories", () => {
		const props = {
			...minProps,
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};
		const wrapper = attachWithContext(
			<SalesOrganizationModal {...props} />
		);

		let modalContents = getModalContents(wrapper);

		let OcDropdown = modalContents.find(".organization-list-dropdown").first();

		expect(OcDropdown.hasClass("show")).toEqual(false);

		const openDropDownButton = modalContents.find("#sales-organization-modal-search-organization").hostNodes();
		openDropDownButton.simulate("click");
		wrapper.update();
		modalContents = getModalContents(wrapper);
		OcDropdown = modalContents.find(".organization-list-dropdown").first();

		expect(OcDropdown.hasClass("show")).toEqual(true);

		wrapper.detach();
	});

	it("External id should be displayed as the organization name if it is present and not null", () => {
		const props = {
			...minProps,
			salesOrganizations: [
				{
					id: 1,
					attributes: {
						externalId: "super-duper-org-1",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 2,
					attributes: {
						externalId: "lame-o-org-2",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 3,
					attributes: {
						externalId: null,
						code: "code-me-org-3"
					}
				} as any as SalesOrganizationRole,
				{
					id: 4,
					attributes: {
						externalId: "me-4",
						code: "not-me-4"
					}
				} as any as SalesOrganizationRole,
			],
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};

		const wrapper = attachWithContext(
			<SalesOrganizationModal {...props} />
		);

		let modalContents = getModalContents(wrapper);

		let OcDropdown = modalContents.find(".organization-list-dropdown").first();
		expect(OcDropdown.hasClass("show")).toEqual(false);

		const openDropDownButton = modalContents.find("#sales-organization-modal-search-organization").hostNodes();
		openDropDownButton.simulate("click");
		wrapper.update();
		modalContents = getModalContents(wrapper);
		OcDropdown = modalContents.find(".organization-list-dropdown").first();
		expect(OcDropdown.hasClass("show")).toEqual(true);

		const dropDownContent = modalContents.find(".organization-list-dropdown");
		const dropDownItems = dropDownContent.find(".organization-list-item");

		expect(dropDownItems.length).toEqual(4);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");
		expect(dropDownItems.at(1).text()).toEqual("lame-o-org-2");
		expect(dropDownItems.at(2).text()).toEqual("code-me-org-3");
		expect(dropDownItems.at(3).text()).toEqual("me-4");

		wrapper.detach();
	});

	it("Search text should filter by externalId", () => {
		const props = {
			...minProps,
			salesOrganizations: [
				{
					id: 1,
					attributes: {
						externalId: "super-duper-org-1",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 2,
					attributes: {
						externalId: "lame-o-org-2",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 3,
					attributes: {
						externalId: null,
						code: "code-me-org-3"
					}
				} as any as SalesOrganizationRole,
				{
					id: 4,
					attributes: {
						externalId: "me-4",
						code: "not-me-4"
					}
				} as any as SalesOrganizationRole,
			],
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};

		const wrapper = attachWithContext(
			<SalesOrganizationModal {...props} />
		);

		let modalContents = getModalContents(wrapper);
		const searchInput = modalContents.find("#servicedesk-container-organization-search").hostNodes();
		searchInput.simulate("focus");
		wrapper.update();
		searchInput.simulate("change", { target: { value: "super" } });
		wrapper.update();

		modalContents = getModalContents(wrapper);
		let dropDownContent = modalContents.find(".organization-list-dropdown");
		let dropDownItems = dropDownContent.find(".organization-list-item");
		expect(dropDownItems.length).toEqual(1);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");

		searchInput.simulate("change", { target: { value: "org" } });
		wrapper.update();

		modalContents = getModalContents(wrapper);
		dropDownContent = modalContents.find(".organization-list-dropdown");
		dropDownItems = dropDownContent.find(".organization-list-item");
		expect(dropDownItems.length).toEqual(3);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");
		expect(dropDownItems.at(1).text()).toEqual("lame-o-org-2");
		expect(dropDownItems.at(2).text()).toEqual("code-me-org-3");

		wrapper.detach();
	});

	it("External id should be displayed as the organization name if it is present and not null 2", () => {
		const props = {
			...minProps,
			salesOrganizations: [
				{
					id: 1,
					attributes: {
						externalId: "super-duper-org-1",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 2,
					attributes: {
						externalId: "lame-o-org-2",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 3,
					attributes: {
						externalId: null,
						code: "code-me-org-3"
					}
				} as any as SalesOrganizationRole,
				{
					id: 4,
					attributes: {
						externalId: "me-4",
						code: "not-me-4"
					}
				} as any as SalesOrganizationRole,
			],
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};

		const wrapper = attachWithContext(<SalesOrganizationModal {...props} />);

		let modalContents = getModalContents(wrapper);

		let OcDropdown = modalContents.find(".organization-list-dropdown").first();
		expect(OcDropdown.hasClass("show")).toEqual(false);

		const openDropDownButton = modalContents
			.find("#sales-organization-modal-search-organization")
			.hostNodes();
		openDropDownButton.simulate("click");
		wrapper.update();

		modalContents = getModalContents(wrapper);
		OcDropdown = modalContents.find(".organization-list-dropdown").first();
		expect(OcDropdown.hasClass("show")).toEqual(true);

		const dropDownContent = modalContents.find(".organization-list-dropdown");
		const dropDownItems = dropDownContent.find(".organization-list-item");
		expect(dropDownItems.length).toEqual(4);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");
		expect(dropDownItems.at(1).text()).toEqual("lame-o-org-2");
		expect(dropDownItems.at(2).text()).toEqual("code-me-org-3");
		expect(dropDownItems.at(3).text()).toEqual("me-4");

		wrapper.detach();
	});

	it("Search text should filter by externalId 2", () => {
		const props = {
			...minProps,
			salesOrganizations: [
				{
					id: 1,
					statuses: [],
					attributes: {
						externalId: "super-duper-org-1",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 2,
					statuses: [],
					attributes: {

						externalId: "lame-o-org-2",
						code: null
					}
				} as any as SalesOrganizationRole,
				{
					id: 3,
					statuses: [],
					attributes: {
						externalId: null,
						code: "code-me-org-3"
					}
				} as any as SalesOrganizationRole,
				{
					id: 4,
					statuses: [],
					attributes: {
						externalId: "me-4",
						code: "not-me-4"
					}
				} as any as SalesOrganizationRole,
			],
			showSalesOrganizationModal: true,
			consulValuesLoaded: true
		};

		const wrapper = attachWithContext(<SalesOrganizationModal {...props} />);

		const searchInput = getModalContents(wrapper).find("#servicedesk-container-organization-search").hostNodes();
		searchInput.simulate("focus");
		wrapper.update();
		searchInput.simulate("change", { target: { value: "super" } });
		wrapper.update();

		let dropDownContent = getModalContents(wrapper).find(".organization-list-dropdown");
		let dropDownItems = dropDownContent.find(".organization-list-item");
		expect(dropDownItems.length).toEqual(1);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");

		searchInput.simulate("change", { target: { value: "org" } });
		wrapper.update();

		dropDownContent = getModalContents(wrapper).find(".organization-list-dropdown");
		dropDownItems = dropDownContent.find(".organization-list-item");
		expect(dropDownItems.length).toEqual(3);
		expect(dropDownItems.at(0).text()).toEqual("super-duper-org-1");
		expect(dropDownItems.at(1).text()).toEqual("lame-o-org-2");
		expect(dropDownItems.at(2).text()).toEqual("code-me-org-3");

		wrapper.detach();
	});
});
