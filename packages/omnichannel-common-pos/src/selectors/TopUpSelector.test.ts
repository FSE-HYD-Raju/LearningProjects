import TopUpSelector from "./TopUpSelector";

describe("TopUpSelector", () => {
	describe("getRechargePurchaseStream", () => {
		it("should return undefined when no config", () => {
			expect(TopUpSelector.getRechargePurchaseStream({}, "eCare")).toBeUndefined();
		});
		it("should return undefined when stream not configured and subChannel not found in map", () => {
			expect(
				TopUpSelector.getRechargePurchaseStream(
					{ rechargePurchaseSubChannelToStreamMap: { eShop: "ESHOP" } },
					"eCare"
				)
			).toBeUndefined();
		});
		it("should return value from map when stream not configured and subChannel found in map", () => {
			expect(
				TopUpSelector.getRechargePurchaseStream(
					{ rechargePurchaseSubChannelToStreamMap: { eShop: "ESHOP", eCare: "ECARE" } },
					"eCare"
				)
			).toBe("ECARE");
		});
		it("should return value from map when stream configured and subChannel found in map", () => {
			expect(
				TopUpSelector.getRechargePurchaseStream(
					{
						rechargePurchaseStream: "other",
						rechargePurchaseSubChannelToStreamMap: { eShop: "ESHOP", eCare: "ECARE" }
					},
					"eCare"
				)
			).toBe("ECARE");
		});
		it("should return configured stream when stream not configured and subChannel not found in map", () => {
			expect(
				TopUpSelector.getRechargePurchaseStream(
					{
						rechargePurchaseStream: "other",
						rechargePurchaseSubChannelToStreamMap: { eShop: "ESHOP" }
					},
					"eCare"
				)
			).toBe("other");
		});
	});
});
