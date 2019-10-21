import cssns from "../../utils/cssnsConfig";
import { Link } from "react-router-dom";
import { PureComponent } from "react";
import { Category } from "../../redux";
import { commonShopRoutes } from "../../routes/commonRoutesMap";

const { React } = cssns("CategoryTiles");

interface CategoryTilesActionProps {
	actions: {
		updateMainCategories: () => void
	};
}

interface CategoryTilesStateProps {
	locale: string;
	mainCategories: Array<Category>;
}

type CategoryTilesProps = CategoryTilesActionProps & CategoryTilesStateProps;

class CategoryTiles extends PureComponent<CategoryTilesProps> {

	updateMainCategories = () => {
		if (this.props.actions.updateMainCategories) {
			this.props.actions.updateMainCategories();
		}
	}

	componentDidMount() {
		this.updateMainCategories();
	}

	componentWillReceiveProps(newProps: CategoryTilesProps) {
		if (this.props.locale !== newProps.locale) {
			this.updateMainCategories();
		}
	}

	render() {
		const mainCategories: Array<Category> = this.props.mainCategories || [];
		if (mainCategories.length <= 0) {
			return null;
		}

		return (
			<div className="this">
				{mainCategories.map((category: Category) => {
					return (
						<div className="item-wrapper" key={category.id}>
							<Link
								to={{
									pathname: commonShopRoutes.SHOP_CATEGORY.createLink({categoryId: category.id}),
									state: {scrollToTop: true}
								}}
								className="link"
								id={"category-tiles-link-to-" + category.id}
							>
								<i className="fas fa-mobile-alt" />
								<span className="category-img-holder" />
								<span className="link-text">
									{category.name}
								</span>
							</Link>
						</div>
					);
				})}
			</div>
		);
	}
}

export {
	CategoryTiles,
	CategoryTilesStateProps,
	CategoryTilesActionProps,
	CategoryTilesProps,
};
