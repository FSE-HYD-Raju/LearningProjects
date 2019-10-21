import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import OcFileAttachment, { OcFileAttachmentProps } from "./OcFileAttachment";

describe("OcFileAttachment", () => {
	let props: OcFileAttachmentProps;
	beforeEach(()  => {
		props = {
			maxFiles: 3
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<OcFileAttachment {...props} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<OcFileAttachment {...props} />);
	});

	it("disables button when max files size is exceeded", () => {
		const wrapper = mountWithContext(<OcFileAttachment {...props} />);
		wrapper.setState({
			disabled: true
		});
		wrapper.update();
		const attachBtn = wrapper.find("#OcFileAttachment-fileItem-btn").at(0);
		expect(attachBtn.props().disabled).toBe(true);

	});

	it("removes file whe ndelete button is pressed", () => {
		const wrapper = mountWithContext(<OcFileAttachment {...props} />);
		wrapper.setState({
			files: [{name: "someName", size: 1024}]
		});
		wrapper.update();
		const deleteBtn = wrapper.find("#OcFileAttachment-delete-btn").at(0);
		deleteBtn.simulate("click");
		wrapper.update();
		const fileList = wrapper.find("#OcFileAttachment-files-uploaded-list").at(0);
		expect(fileList.props().children).toHaveLength(0);
	});
});
