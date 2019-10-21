import * as React from "react";
import { shallowWithContext, mountWithContext } from "../../testUtils";
import { LoginContainerUnwrapped as LoginContainer, LoginContainerProps } from "./LoginContainer";
import { LoginForm } from "./LoginForm";
import { mockRouterProps } from "../../testUtils";

const minProps: LoginContainerProps = {
	...mockRouterProps,
	actions: {
		login: jest.fn(),
		logout: jest.fn(),
	}
};

describe("LoginContainer", () => {
	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<LoginContainer {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<LoginContainer  {...minProps}/>);
	});

	it("should render LoginForm as child", () => {
		const wrapper = mountWithContext(
			<LoginContainer {...minProps}>
				<LoginForm id="LoginDropdown" />
			</LoginContainer>
		);

		const loginContainer = wrapper.find(".LoginContainer");
		expect(loginContainer.length).toEqual(1);

		const loginForm = loginContainer.find(".LoginForm");
		expect(loginForm.length).toEqual(1);
	});

	it("should pass all props to child", () => {
		class MyChild extends React.Component<any> {
			render() {
				return <div />;
			}
		}

		const props = {
			...minProps,
			children: <MyChild />
		};
		const wrapper = mountWithContext(<LoginContainer {...props} />);

		const loginContainer = wrapper.find("LoginContainer");
		const myChild = loginContainer.find(MyChild);
		const childProps = Object.getOwnPropertyNames(myChild.props());

		expect(childProps).toContain("handleInput");
		expect(childProps).toContain("handleLogout");
		expect(childProps).toContain("handleLogin");
		expect(childProps).toContain("schema");
		expect(childProps).toContain("handleSubmit");
		expect(childProps).toContain("onError");
	});
});
