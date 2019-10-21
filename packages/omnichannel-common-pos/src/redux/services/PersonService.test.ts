import PersonService from "./PersonService";
import { BasketLifecycleStatusEnum } from "../types";

describe("PersonService", () => {
	describe("getBasketsQueryParams", () => {
		it("should return default params when no args passed", () => {
			const result = PersonService.getBasketsQueryParams();
			expect(result).toMatchObject({
				["filter[bssSecondaryFilter][bssBasket][lifecycle-status]"]: "open,committed"
			});
		});
		it("handle include basket items", () => {
			const result = PersonService.getBasketsQueryParams([BasketLifecycleStatusEnum.OPEN], true);
			expect(result).toMatchObject({
				["filter[bssSecondaryFilter][bssBasket][lifecycle-status]"]: "open",
				["filter[baskets][basketItems][id][LIKE]"]: "%",
				["include[baskets]"]: "basketItems"
			});
		});
		it("should merge custom query params", () => {
			const result = PersonService.getBasketsQueryParams([BasketLifecycleStatusEnum.OPEN], true, { "filter[date]": "today" });
			expect(result).toMatchObject({
				["filter[bssSecondaryFilter][bssBasket][lifecycle-status]"]: "open",
				["filter[baskets][basketItems][id][LIKE]"]: "%",
				["include[baskets]"]: "basketItems",
				"filter[date]": "today"
			});
		});
	});
});
