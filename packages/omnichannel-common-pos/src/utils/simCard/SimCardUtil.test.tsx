import SimCardUtil from "./SimCardUtil";
import { Product, SimCard } from "../../redux";

describe("SimCardutil", () => {
	describe("extractSimCards", () => {
		const simCards: Array<SimCard> = [
			{
				id: "1111",
				primaryId: "1111",
				simType: "micro",
				icc: "1135806111300047150",
				imsi: "245551300004715",
				pin1: "1234",
				pin2: "1234",
				puk1: "1234",
				puk2: "1234",
				lifeCycleStatus: "in-use",
				simStatus: "available",
				type: "SIM"
			},
			{
				id: "2222",
				primaryId: "2222",
				simType: "macro",
				icc: "1135806111300047151",
				imsi: "245551300004716",
				pin1: "1235",
				pin2: "1236",
				puk1: "1237",
				puk2: "1238",
				lifeCycleStatus: "not-in-use",
				simStatus: "available",
				type: "SIM"
			}
		];

		const simCardsChild11: Array<SimCard> = [ {
				id: "5555",
				primaryId: "5555",
				simType: "deep-nano-nano",
				icc: "1135806111300047150",
				imsi: "245551300004715",
				pin1: "1234",
				pin2: "1234",
				puk1: "1234",
				puk2: "1234",
				lifeCycleStatus: "frozen",
				simStatus: "available",
				type: "SIM"
			}];

		const simCardsChild2: Array<SimCard> = [
			{
				id: "3333",
				primaryId: "3333",
				simType: "nano-nano",
				icc: "1135806111300047150",
				imsi: "245551300004715",
				pin1: "1234",
				pin2: "1234",
				puk1: "1234",
				puk2: "1234",
				lifeCycleStatus: "in-use-sub",
				simStatus: "available",
				type: "SIM"
			},
			{
				id: "4444",
				primaryId: "4444",
				simType: "mini-nano",
				icc: "1135806111300047151",
				imsi: "245551300004716",
				pin1: "1235",
				pin2: "1236",
				puk1: "1237",
				puk2: "1238",
				lifeCycleStatus: "not-in-use-sub",
				simStatus: "available",
				type: "SIM"
			}
		];

		const product: Product = {
			id: "juanita-agreement1-sub",
			name: "Hybrid BASIC Plan",
			productOfferingId: "basic-hybrid-po",
			lifeCycleStatus: "ACTIVE",
			childProducts: [
				{
					id: "juanita-agreement2-sub-sub",
					name: "Hybrid BASIC sub Plan",
					productOfferingId: "basic-hybrid-po-sub",
					lifeCycleStatus: "SUB-ACTIVE",
					childProducts: [
						{
							id: "juanita-agreement3-sub-sub-sub",
							name: "Hybrid BASIC Plan sub sub sub",
							productOfferingId: "basic-hybrid-po-sub-sub-sub",
							lifeCycleStatus: "DEEP SUB",
							childProducts: [],
							simCards: simCardsChild11
						}
					],
					simCards: simCardsChild2
				}
			],
			simCards: simCards
		} as any as Product;

		it("should return product sim card", () => {
			const simCards = SimCardUtil.extractSimCards(product);
			expect(simCards[0].primaryId).toBe("1111");
			expect(simCards.length).toBe(5);
		});

		it("should return product sim cards", () => {
			const simCards = SimCardUtil.extractSimCards(product);
			expect(simCards[0].primaryId).toBe("1111");
			expect(simCards[1].primaryId).toBe("2222");
		});
		it("should return products childProducts sim card", () => {
			const simCards = SimCardUtil.extractSimCards(product);
			expect(simCards[2].primaryId).toBe("3333");
		});
		it("should return products childProducts sim cards", () => {
			const simCards = SimCardUtil.extractSimCards(product);
			expect(simCards[2].primaryId).toBe("3333");
			expect(simCards[3].primaryId).toBe("4444");
		});
		it("should return products childProducts childProducts sim card", () => {
			const simCards = SimCardUtil.extractSimCards(product);
			expect(simCards[2].primaryId).toBe("3333");
			expect(simCards[3].primaryId).toBe("4444");
			expect(simCards[4].primaryId).toBe("5555");
		});
	});
});
