import * as React from "react";
import UserNavigationDropdownContainer from "./UserNavigationDropdownContainer";
import NoUserDropdown from "./NoUserDropdown";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";

interface LoginDropdownStateProps {
	hasUser: boolean;
}

type LoginDropdownProps = LoginDropdownStateProps;

const LoginDropdown: React.FC<LoginDropdownProps> = (props: LoginDropdownProps) => {
	if (props.hasUser) {
		return (<UserNavigationDropdownContainer/>);
	}
	return (<NoUserDropdown/>);
};

const mapStateToProps = (state: AppState): LoginDropdownStateProps => ({
	hasUser: !!state.user.user,
});

const LoginDropdownRedux = connect(mapStateToProps)(LoginDropdown);

export {
	LoginDropdown as LoginDropdownUnwrapped,
	LoginDropdownRedux as LoginDropdown,
	LoginDropdownProps,
	LoginDropdownStateProps
};
