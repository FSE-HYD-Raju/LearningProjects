import { Product, SimCard } from "../../redux";

export default class SimCardUtil {
	static extractSimCards(product: Product|undefined) {
		if (!product) {
			return [];
		}

		const extractSimCards = (product: Product): Array<SimCard> => {
			if (product.simCards) {
				let result = [...product.simCards];
				if (product.childProducts) {
					product.childProducts.forEach((childProduct: Product) => {
						result = result.concat(extractSimCards(childProduct));
					});
				}
				return result;
			}
			return [];
		};

		return extractSimCards(product);
	}

	static findPrimarySimCards(simCards: Array<SimCard> = []): Array<SimCard> {
		return simCards.filter((sim: SimCard) => this.isPrimarySimCard(sim));
	}

	static findDataSimCards(simCards: Array<SimCard> = []): Array<SimCard> {
		return simCards.filter((sim: SimCard) => this.isDataSimCard(sim));
	}

	static isPrimarySimCard(simCard: SimCard) {
		return (
			simCard &&
			simCard.subType &&
			simCard.subType.toLowerCase() === "primary"
		);
	}

	static isDataSimCard(simCard: SimCard) {
		return (
			simCard &&
			simCard.subType &&
			simCard.subType.toLowerCase() === "data"
		);
	}
}
