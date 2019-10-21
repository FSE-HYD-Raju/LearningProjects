import * as React from "react";
import { mount, shallow } from "enzyme";
import ErrorModal, { ErrorModalContentsProps } from "./ErrorModal";
import { attachWithContext, TestUtils } from "../../testUtils";
const { getModalContents, mockReduxStore } = TestUtils;

describe("ErrorModal", () => {
	const error = {code: "national-identification-number-verification-failed"};

	const context = {
		flux: {
		},
		store: mockReduxStore({
			error: error,
		})
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallow(<ErrorModal />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mount(<ErrorModal />);
	});

	it("succeeds at shallow mounting contents with empty error", () => {
		const wrapper = attachWithContext(<ErrorModal error={{}} />, {context});

		const modalContents = getModalContents(wrapper, context, true);
		expect(modalContents).toMatchSnapshot();
	});

	it("should render ErrorModalContents when an error is given", () => {

		const wrapper = attachWithContext(<ErrorModal error={{errors: [error]}} />, { context });

		expect(wrapper.find("ErrorModalContents")).toHaveLength(1);

		wrapper.detach();
	});

	it("calls given close handler", () => {

		const onCloseSpy = jest.fn();

		const props: ErrorModalContentsProps = {
			error: {errors: [error]},
			onClose: onCloseSpy
		};

		const wrapper = attachWithContext(<ErrorModal {...props} />, { context });

		wrapper.find("button#error-modal-container-close").simulate("click");
		expect(onCloseSpy).toHaveBeenCalled();

		wrapper.detach();
	});
});
