import * as React from "react";
import toJson from "enzyme-to-json";
import { mount, shallow } from "enzyme";

import OcDocumentReviewer from "./OcDocumentReviewer";

describe("OcDocumentReviewer", () => {
	it("succeeds at shallow mount without props", () => {
		const props = {
			document: {}
		};
		const wrapper = shallow(<OcDocumentReviewer {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		const props = {
			document: {}
		};
		const wrapper = mount(<OcDocumentReviewer {...props} />);
		expect(wrapper.find(".OcDocumentReviewer-wrapper").length).toEqual(1);
	});

	it("should be empty without props", () => {
		const props = {
			document: {}
		};
		const wrapper = mount(<OcDocumentReviewer {...props} />);
		expect(wrapper.find(".OcDocumentReviewer-wrapper").text()).toEqual("");
		expect(
			wrapper.find(".OcDocumentReviewer-wrapper").children().length
		).toEqual(0);
	});

	it("should include given simple html document", () => {
		const props = {
			document: {
				body: "<span>hi</span>"
			}
		};

		const wrapper = mount(<OcDocumentReviewer {...props} />);
		const dangerousHtml = wrapper
			.find(".OcDocumentReviewer-wrapper .OcDocumentReviewer-content")
			.childAt(0);
		expect(dangerousHtml.html()).toEqual("<div><span>hi</span></div>");
	});

	it("should include given html document with FormattedMessage element", () => {
		const props = {
			document: {
				body:
					"<FormattedMessage id='oc-label-1'description='Oc label child 1' defaultMessage='Child 1' />"
			}
		};
		const wrapper = mount(<OcDocumentReviewer {...props} />);
		const dangerousHtml = wrapper
			.find(".OcDocumentReviewer-wrapper .OcDocumentReviewer-content")
			.childAt(0);
		expect(dangerousHtml.html()).toEqual(
			"<div><formattedmessage id=\"oc-label-1\" description=\"Oc label child 1\" defaultmessage=\"Child 1\"></formattedmessage></div>"
		);
	});
});
