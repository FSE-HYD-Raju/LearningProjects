import { getNewItems } from "./comparison.utils";
import { ProductOffering } from "../../types";

describe("getNewItems", () => {
    const items = ([
        {
            id: "PO_ADSL_10",
            type: "contextualProducts",
            attributes: {}
        },
        {
            id: "PO_ADSL_20",
            type: "contextualProducts",
            attributes: {}
        },
        {
            id: "PO_Fibre_100",
            type: "contextualProducts",
            attributes: {}
        },
    ] as any) as Array<ProductOffering>;

    const item = (
        {
            id: "PO_ADSL_10",
            type: "contextualProducts",
            attributes: {}
        } as any) as ProductOffering;

    const unKnownItem = (
        {
            id: "PO_ADSL_89",
            type: "contextualProducts",
            attributes: {}
        } as any) as ProductOffering;

    const emptyItems = ([] as any) as Array<ProductOffering>;
    const emptyItem = ({} as any) as ProductOffering; 

    it("should compare both items and item are avaliable", () => {
        const filteredComparisonItems: any = getNewItems(items, item)
        expect(filteredComparisonItems.length).toBe(2);
    });

    it("should compare avaliable items and unKnow item", () => {
        const filteredComparisonItems: any = getNewItems(items, unKnownItem)
        expect(filteredComparisonItems.length).toBe(4);
    });

    it("should compare both items and item are empty", () => {
        const filteredComparisonItems: any = getNewItems(emptyItems, emptyItem)
        expect(filteredComparisonItems.length).toBe(1);
    });

    it("should compare avaliable items and empty item", () => {
        const filteredComparisonItems: any = getNewItems(items, emptyItem)
        expect(filteredComparisonItems.length).toBe(4);
    });

    it("should compare empty items and avaliable item", () => {
        const filteredComparisonItems: any = getNewItems(emptyItems, item)
        expect(filteredComparisonItems.length).toBe(1);
    });

});