import {
	FormattedMessage,
	cssns,
	ContextType,
	contextTypesValidationMap,
	SalesBasketContainer,
	Category,
} from "omnichannel-common-pos";

import messages from "./CategoryList.messages";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import BarcodeInputContainer from "./sales/BarcodeInputContainer";
import { RouteComponentProps } from "react-router";
import { AddressValidation } from "./ProductTable/InstallationAddressSearchForm";

const CategoryListRoute = require("../routes/category/CategoryListRoute");

const { React } = cssns("CategoryList");

interface CategoryListStateProps {
	mainCategories: Array<Category>;
	fetchingProducts: boolean;
	locale?: string;
	addressValidation: AddressValidation;
}

interface CategoryListActionProps {
	actions: {
		updateMainCategories: () => void;
		selectCategoryById: (id: string) => void;
		endShoppingForSubscription: () => void;
	};
}

type CategoryListProps = CategoryListStateProps & CategoryListActionProps & RouteComponentProps<{category: string}>;

class CategoryList extends Component<CategoryListProps> {
	static displayName = "CategoryList";
	static contextTypes = contextTypesValidationMap;

	constructor(props: CategoryListProps, context: ContextType) {
		super(props, context);
	}

	componentDidMount() {
		this.props.actions.updateMainCategories();
	}

	componentWillReceiveProps(newProps: CategoryListProps) {
		if (newProps.locale !== this.props.locale) {
			this.props.actions.updateMainCategories();
		}
	}

	getCategoryIdFromCategoryList = (category: Category) => {
		if (category.ids && category.ids.length) {
			return category.ids.join();
		}
		return category.id;
	}

	performOnClickOperations = (category: Category) => {
		this.props.actions.endShoppingForSubscription();
		this.props.actions.selectCategoryById(this.getCategoryIdFromCategoryList(category));
	}

	render() {
		const {
			mainCategories,
			fetchingProducts,
			addressValidation,
		} = this.props;
		const activeCategory = this.props.match.params.category;

		return (
			<section className="this">
				<header className="w-view-header">
					<h1>
						<FormattedMessage {...messages.shop} />
					</h1>
					<BarcodeInputContainer flux={this.context.flux}/>
				</header>
				<div className="body">
					<div className="categories">
						<nav className="w-nav-vertical">
							{mainCategories && mainCategories.length > 0 && mainCategories.map((category: Category) => {
									const subcategories = category.subCategories ? "?subcategories=true" : "";
									return (
										<NavLink
											key={`${category.id}`}
											to={`/servicedesk/shop/${category.id}${subcategories}`}
											id={`CategoryList-category-${category.id}`}
											onClick={() => this.performOnClickOperations(category)}
											className="w-nav-vertical-item"
											activeClassName="active"
										>
											<span>{category.name}</span>
											{activeCategory === category.id && fetchingProducts && (
												<i className="fa fa-spinner fa-spin btn-icon-right" />
											)}
										</NavLink>
									);
								})}
						</nav>
					</div>
					<div className="products">
						<div className="w-box w-box-stretch">
							{!activeCategory && (
								<h3>
									<FormattedMessage {...messages.selectCategory} />
								</h3>
							)}
							<CategoryListRoute flux={this.context.flux} addressValidation={addressValidation} />
						</div>
					</div>
					<div className="basket">
						<SalesBasketContainer flux={this.context.flux}/>
					</div>
				</div>
			</section>
		);
	}
}

export default CategoryList;
export {
	CategoryListProps,
	CategoryListStateProps,
	CategoryListActionProps,
};
