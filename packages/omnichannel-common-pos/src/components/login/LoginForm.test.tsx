import * as React from "react";
import yup from "yup";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import { LoginForm } from "./LoginForm";
import { ReactWrapper } from "enzyme";

const mockSchema = {
	email: yup.string(),
	password: yup.string()
};

describe("LoginForm", () => {
	const schema = yup.object({
		email: yup.string().email(),
		password: yup.string()
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<LoginForm />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should mount without props", () => {
		mountWithContext(<LoginForm schema={schema} />);
	});

	it("should present error", () => {
		const wrapper = mountWithContext(
			<LoginForm error={{}} schema={yup.object(mockSchema)} />
		);

		const loginForm = wrapper.find(".LoginForm");
		expect(loginForm.find(".ErrorLabel-label-danger").filterWhere(
			(n: ReactWrapper) => n.text().toLowerCase() === "Login error".toLowerCase()).length
		).toEqual(1);
	});
});
