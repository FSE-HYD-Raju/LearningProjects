/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import TemplatedAnchor, { TemplatedAnchorProps } from "./TemplatedAnchor";

import { mountWithContext, shallowWithContext } from "../../testUtils";

describe("TemplatedAnchor", () => {

	const minimumProps: TemplatedAnchorProps = {
		id: "templated-href",
		href: "https://example.org",
		urlLocator: serviceName => serviceName,
		children: (<div/>)
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<TemplatedAnchor {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<TemplatedAnchor {...minimumProps} />);
	});

	it("should render anchor with simple url", () => {
		const props = {
			id: "templated-href",
			href: "https://example.org",
			urlLocator: (serviceName: string) => serviceName
		};
		const wrapper = mountWithContext(
			<TemplatedAnchor {...props}>
				<span id="inner">Hello</span>
			</TemplatedAnchor>
		);
		const anchor = wrapper.find("#templated-href").hostNodes();
		expect(anchor.exists()).toBe(true);
		expect(anchor.props().href).toEqual(props.href);
		expect(anchor.find("#inner").text()).toEqual("Hello");
	});

	it("should render nothing if url is undefined", () => {
		const props = {
			id: "templated-href",
			urlLocator: (serviceName: string) => serviceName
		};
		const wrapper = mountWithContext(
			<TemplatedAnchor {...props}>
				<span id="inner">Hello</span>
			</TemplatedAnchor>
		);
		const anchor = wrapper.find("#templated-href").hostNodes();
		expect(anchor.exists()).toBe(false);
		expect(wrapper.find("#inner").hostNodes().exists()).toBe(false);
	});

	it("should render child if url is undefined but 'showChildrenOnly' is set to true", () => {
		const props = {
			id: "templated-href",
			urlLocator: (serviceName: string) => serviceName,
			showChildrenOnly: true
		};
		const wrapper = mountWithContext(
			<TemplatedAnchor {...props}>
				<span id="inner">Hello</span>
			</TemplatedAnchor>
		);
		const anchor = wrapper.find("#templated-href").hostNodes();
		expect(anchor.exists()).toBe(false);
		expect(wrapper.find("#inner").hostNodes().text()).toEqual("Hello");
	});

	describe("Mapped URLs", () => {
		const mappingServices: { [key: string]: string; } = {
			"example-org": "example.org:888",
			example_org: "example.org:888",
			"example.org": "example.org:888"
		};

		const mappingProps = {
			id: "templated-href",
			urlLocator: (serviceName: string) => mappingServices[serviceName]
		};

		const validate = (testName: string, initialHref: string, expectedHref: string) => {
			it("should render anchor with mapped " + testName, () => {
				const wrapper = mountWithContext(
					<TemplatedAnchor {...mappingProps} href={initialHref}>
						<span id="inner">Hello</span>
					</TemplatedAnchor>
				);
				const anchor = wrapper.find("#templated-href").hostNodes();
				expect(anchor.exists()).toBe(true);
				expect(anchor.props().href).toEqual(expectedHref);
				expect(anchor.find("#inner").text()).toEqual("Hello");
			});
		};

		validate("http url",
			"http-service://example-org",
			"http://example.org:888");

		validate("http url with additional path",
			"http-service://example-org/some-path",
			"http://example.org:888/some-path");

		validate("https url",
			"https-service://example.org/",
			"https://example.org:888/");

		validate("https url with additional path",
			"https-service://example_org/some-path/seconda_ry",
			"https://example.org:888/some-path/seconda_ry");
	});
});
