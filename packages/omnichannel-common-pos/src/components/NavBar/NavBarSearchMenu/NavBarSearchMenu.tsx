import cssns from "../../../utils/cssnsConfig";
import { Component, ValidationMap } from "react";
import OnClickOutside, { HandleClickOutside, InjectedOnClickOutProps, OnClickOutProps } from "react-onclickoutside";
import { map, forOwn } from "lodash";
import * as classnames from "classnames";
import { translationStore, parseSearchConfiguration } from "./NavBarSearchMenu.util";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { SearchConfiguration } from "../../../redux";
import OcDropdown from "../../ocComponents/OcDropdown";
import { OcButton, OcButtonDropdownType } from "../../ocComponents/button/OcButton";
const { React } = cssns("NavBarSearchMenu");
const style = {"width": "220px"};

interface NavBarSearchMenuProps {
	criteria: string;
	unparsedSearchConfigs: string;
	handleCriteriaChange: (c: string) => void;
}

interface NavBarSearchMenuState {
	showSearchMenu: boolean;
	searchCriteria: Record<string, string>;
}

class NavBarSearchMenu extends Component<NavBarSearchMenuProps & InjectedOnClickOutProps, NavBarSearchMenuState>
	implements HandleClickOutside<any> {
	static displayName: string = "NavBarSearchMenu";
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: NavBarSearchMenuProps & InjectedOnClickOutProps, context: ContextType) {
		super(props, context);

		/* TODO: where do the search options come from? -Someone at some point
		 * Removed Product, Service as searching with them is not implemented.
		 * Email is for future use as requested on RND-11721 ticket. -Jussi
		 */
		/* NOTE: search configs now come from consul as per RND-21361 and RND-21767,
		 * formatted for id-types supported by mcom-bss-api
		 */
		this.setsearchCriteria(this.context);
	}

	setsearchCriteria(context: ContextType) {
		const criteria: Record<string, any> = {};
		const localTranslationStore = translationStore(context.intl.formatMessage);
		const parsedSearchConfiguration = parseSearchConfiguration(this.props.unparsedSearchConfigs);

		if (parsedSearchConfiguration) {
			parsedSearchConfiguration.POSSearchConfigs.forEach((value: SearchConfiguration) => {
				if (value.enabled) {
					const store = localTranslationStore[value.id];
					const key = value.identificationType ? value.identificationType : store[0];
					criteria[key] = store[1];
				}
			});
		}

		this.state = {
			showSearchMenu: false,
			searchCriteria: criteria
		};
	}
	componentDidMount() {
		// gets the first enabled criteria as the default selection for the UI
		const allCriteriaPropertiesAsKeys: string[] = [];
		forOwn(this.state.searchCriteria, (value, key) => {
			allCriteriaPropertiesAsKeys.push(key);
		});
		this.props.handleCriteriaChange(allCriteriaPropertiesAsKeys[0]);
	}

	handleClickOutside = (event: any) => {
		this.hideSearchMenu();
	};

	hideSearchMenu = () => {
		this.setState({
			showSearchMenu: false
		});
	}

	toggleSearchMenu = (event: any) => {
		this.setState({
			showSearchMenu: !this.state.showSearchMenu
		});
	};

	componentWillReceiveProps(newProps: NavBarSearchMenuProps, nextContext: ContextType) {
		this.setsearchCriteria(nextContext);
	}

	render() {
		const selectItems = map(this.state.searchCriteria, (optionTitle, criteria) => {
			const activeCriteria = this.props.criteria === criteria;
			const keyWithTitle = `nav_bar_search_menu_select_${criteria}`;

			return (
				<button
					key={keyWithTitle}
					className={classnames({
						"dropdown-item": true,
						active: activeCriteria
					})}
					onClick={() => {
						this.props.handleCriteriaChange(criteria);
						this.hideSearchMenu();
					}}
				>
					{optionTitle}
				</button>
			);
		});
		return (
			<div className="input-group-prepend">
				<OcButton onClick={this.toggleSearchMenu} dropdownType={OcButtonDropdownType.REGULAR} style={style} className="btn-outline-primary" id="navbar_select_menu">
					{this.state.searchCriteria[this.props.criteria]}
				</OcButton>
				{this.state.showSearchMenu && (
					<OcDropdown dropdownKey="navbar_select_menu_dropdown" containerClasses="noTriangle">
						{selectItems}
					</OcDropdown>
				)}
			</div>
		);
	}
}

export default OnClickOutside(NavBarSearchMenu);

export { OnClickOutProps, NavBarSearchMenuProps };
