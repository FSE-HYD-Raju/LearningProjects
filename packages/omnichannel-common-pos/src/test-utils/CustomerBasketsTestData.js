const baskets = [
	{
		basket: {
			id: "ID-12345",
			type: "baskets",
			attributes: {
				createdAt: "2017-09-18T11:37:45.52Z",
				lastModifiedAt: "2017-09-19T09:04:12.253Z",
				lifecycleStatus: "OPEN",
				referenceNumber: "6958b669-eab0-4d5b-854f-189343981c18",
				created: null,
				totalPrices: [],
				modified: null,
				billingAddress: null,
				expiresAt: null
			}
		},
		basketItems: [
			{
				id: "ABC-123",
				type: "basketItems",
				attributes: {
					product: {
						name: "test_product"
					}
				}
			}
		]
	},
	{
		basket: {
			id: "ID-12346",
			type: "baskets",
			attributes: {
				createdAt: "2017-09-18T11:37:45.52Z",
				lastModifiedAt: null,
				lifecycleStatus: "OPEN",
				referenceNumber: "6958b669-eab0-4d5b-854f-189343981c18",
				created: null,
				totalPrices: [],
				modified: null,
				billingAddress: null,
				expiresAt: null
			}
		}
	}
];

export default baskets;
