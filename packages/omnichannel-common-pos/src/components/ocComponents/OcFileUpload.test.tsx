/* tslint:disable:jsx-use-translation-function */
import * as React from "react";
import toJson from "enzyme-to-json";

import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcFileUpload from "./OcFileUpload";

describe("OcFileUpload", () => {

	const minimumProps = {
		children: Element,
		action: jest.fn(),
		acceptedFileTypes: ["doc", "docx", "pdf", "png", "jpg", "jpeg"]
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<OcFileUpload {...minimumProps}>
				<span />
			</OcFileUpload>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(
		<OcFileUpload {...minimumProps}>
			<span />
		</OcFileUpload>);
	});


	it("should render children", () => {
		const wrapper = mountWithContext(
			<OcFileUpload {...minimumProps}
				children={
					<div style={{ height: "500px", width: "100%" }}>
						Drop file here
					</div>}
			/>
		);

		const dropzone = wrapper.find("Dropzone");
		expect(
			dropzone
				.childAt(0)
				.text()
				.toLowerCase()
		).toEqual("Drop file here".toLowerCase());
	});
});
