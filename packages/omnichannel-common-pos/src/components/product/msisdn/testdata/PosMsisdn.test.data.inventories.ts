const inventories = [
	{
		id: "34ce835c-8237-5737-b701-362d7e6a3714",
		type: "resource-inventories",
		attributes: {
			characteristics: {},
			inventoryType: "msisdn-zone",
			name: "Puerto Suarez",
			extReferenceId: null
		},
		relationships: {
			stocks: {
				data: [
					{
						id: "1cc1d728-bde3-51d4-81fe-9db6ddd6f194",
						type: "resource-stocks"
					},
					{
						id: "99b22e9c-cf8c-5180-af97-3f1071f3c2ac",
						type: "resource-stocks"
					},
					{
						id: "c527e6e5-8be6-5c4a-8c41-e78d38fb5344",
						type: "resource-stocks"
					},
					{
						id: "e6f51b52-edfe-4930-a894-97d64e6e8001",
						type: "resource-stocks"
					}
				],
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/34ce835c-8237-5737-b701-362d7e6a3714/relationships/stocks",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/resource-inventories/34ce835c-8237-5737-b701-362d7e6a3714/stocks"
				}
			}
		},
	}
];

export default inventories;
