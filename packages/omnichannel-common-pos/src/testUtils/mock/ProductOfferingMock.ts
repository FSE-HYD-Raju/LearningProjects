import { CommercialEnrichments, CommercialEnrichmentKeys, Price, ProductOffering } from "../../redux/types";
import PriceUtil from "../../utils/PriceUtil";

export interface ProductOfferingMockConfig {
	id?: string;
	name?: string;
	description?: string;
	oneTimePrice?: number;
	oneTimePriceCurrency?: string;
	inputtedCharacteristics?: Record<string, string>;
}
const getDefaultValues = (): ProductOfferingMockConfig => ({
	id: "1",
	name: "product offering name",
	description: "product offering description",
	inputtedCharacteristics: {},
	oneTimePriceCurrency: "EUR"
});
export default class ProductOfferingMock {
	static make(config: ProductOfferingMockConfig = {}): ProductOffering {
		const configWithDefaults = { ...getDefaultValues(), ...config };
		const prices: Price[] = [];
		if (configWithDefaults.oneTimePrice !== undefined) {
			prices.push(PriceUtil.getOneTimePrice(configWithDefaults.oneTimePrice, configWithDefaults.oneTimePriceCurrency!));
		}
		const commercialEnrichments: CommercialEnrichments[] = [];
		const media = {
			[CommercialEnrichmentKeys.Media.THUMBNAIL_IMAGE]: "http://www.image.com/image.jpg"
		};
		commercialEnrichments.push({
			conditions: {},
			descriptions: {
				["long-description"]: configWithDefaults.description!
			},
			media,
			names: {}
		});
		return {
			id: configWithDefaults.id!,
			name: configWithDefaults.name!,
			categories: [],
			featureCharacteristics: [],
			inputCharacteristics: {},
			instanceCharacteristics: {},
			prices,
			commercialEnrichments,
			productOfferingGroups: [],
			productOfferings: [],
			inputtedCharacteristics: configWithDefaults.inputtedCharacteristics
		};
	}
}
