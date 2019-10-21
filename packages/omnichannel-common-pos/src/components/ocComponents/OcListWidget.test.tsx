import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcListWidget, { OcListWidgetProps } from "./OcListWidget";
import OcCurrency from "./OcCurrency";
import FormattedMessage from "../../channelUtils/FormattedMessage";

describe("OcListWidget", () => {
	const minProps: OcListWidgetProps = {
		rows: [],
		headers: [],
		expanded: false,
		toggleExpanded: () => {},
		id: "id",
		layout: undefined
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<OcListWidget {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<OcListWidget {...minProps} />);
	});

	it("renders provided title and empty message when expanded content is empty", () => {
		const rows: Array<{columns: Array<React.ReactNode>}> = [];
		const headers: Array<React.ReactNode> = [];
		const expanded = true;
		const toggleExpanded = () => {};
		const titleText = (
			<FormattedMessage
				id="derp"
				description="derpier"
				defaultMessage="List widget title"
			/>
		);
		const id = "herp";
		const noResultsText = (
			<FormattedMessage
				id="derpy"
				description="derpyer"
				defaultMessage="No content for you"
			/>
		);

		const props: OcListWidgetProps = {
			rows,
			headers,
			titleText,
			expanded,
			toggleExpanded,
			id,
			noResultsText
		};

		const wrapper = mountWithContext(<OcListWidget {...props} />);

		const accordionListHolder = wrapper.find("#OcAccordionList-herp");
		expect(accordionListHolder.find("h3").text()).toEqual(
			"List widget title"
		);

		const noResultsContentHolder = wrapper.find(".OcListWidget-no-content");
		expect(noResultsContentHolder.find("h3").text()).toEqual(
			"No content for you"
		);
	});

	it("renders title, headers and rows", () => {
		// eslint-disable-line

		// lets add some column names
		const headers = [];
		headers.push(
			<FormattedMessage
				id="column1"
				description="column1"
				defaultMessage="Text column"
			/>
		);
		headers.push(
			<FormattedMessage
				id="column2"
				description="column2"
				defaultMessage="Price column"
			/>
		);

		// lets add some row content, content can be basically _anything_ your heart desires
		const rows = [];
		rows.push({
			columns: [
				(
					<FormattedMessage
						id="just-some-text-awesome-text-content"
						description="Just some awesome text content"
						defaultMessage="Awesome text content"
					/>
				),
				(<OcCurrency cost={99} currency="EUR" />)
			]
		});
		rows.push({
			columns: [
				(
					<FormattedMessage
						id="just-some-text-awesome-text-content2"
						description="Just some awesome text content2"
						defaultMessage="Awesome text content 2"
					/>
				),
				(<OcCurrency cost={299} currency="USD" />)
			]
		});

		const expanded = true;
		const toggleExpanded = () => {};
		const titleText = (
			<FormattedMessage
				id="derpiest"
				description="derpiest"
				defaultMessage="Awesome list widget"
			/>
		);
		const id = "awesome-list-widget";

		const props = {
			rows,
			headers,
			titleText,
			expanded,
			toggleExpanded,
			id
		};

		const wrapper = mountWithContext(<OcListWidget {...props} />);

		const accordionListHolder = wrapper.find(
			"#OcAccordionList-awesome-list-widget"
		);

		const title = accordionListHolder.find("h3");
		expect(title.text()).toEqual("Awesome list widget");
		expect(
			!wrapper.contains(<i className="fa fa-caret-down" />)
		).toBeFalsy();

		const expextedRows = wrapper.find(".OcListWidget-table-row");
		expect(expextedRows.length).toEqual(2);
		const expectedCols = wrapper.find(".OcListWidget-column").hostNodes();
		expect(expectedCols).toHaveLength(4);
		expect(
			expectedCols
				.at(0)
				.first()
				.text()
		).toEqual("Awesome text content");
		expect(
			expectedCols
				.at(1)
				.first()
				.text()
		).toEqual("€99.00");
		expect(
			expectedCols
				.at(2)
				.first()
				.text()
		).toEqual("Awesome text content 2");
		expect(
			expectedCols
				.at(3)
				.first()
				.text()
		).toEqual("$299.00");
	});
});
