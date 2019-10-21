import * as React from "react";
import { mount, shallow } from "enzyme";
import { mountWithContext } from "../../testUtils";

import OcDownloadButton from "./OcDownloadButton";

describe("OcDownloadButton", () => {
	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<OcDownloadButton />);
		expect(wrapper).toMatchSnapshot();
	});

	it("renders when file set as null", () => {
		const wrapper = mount(<OcDownloadButton file={null} />);
		expect(wrapper.html()).toEqual(null);
	});

	it("renders as a Button when file set", () => {
		const props = {
			file: {
				filetype: "application/pdf",
				url: "http://shop.qvantel.com/product/1337.pdf",
				filename: "product-description.pdf"
			}
		};

		const wrapper = mountWithContext(<OcDownloadButton {...props} />);
		expect(wrapper).toMatchSnapshot();

		const a = wrapper.find("a");
		expect(a.prop("href")).toEqual(props.file.url);
		expect(a.prop("download")).toEqual(props.file.filename);

		expect(a.text()).toEqual("Download as " + props.file.filetype);
	});
});
