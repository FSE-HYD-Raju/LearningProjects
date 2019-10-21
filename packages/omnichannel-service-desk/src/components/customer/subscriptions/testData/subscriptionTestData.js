const agreements = [
	{
		name: "Gooby Plan",
		id: "gooby-plan-1",
		childProducts: [
			{
				name: "Active addon product 1",
				id: "dolan-1",
				specType: "PRODUCT",
				specSubType: "ADDITIONAL",
				validFor: {
					endDate: "2099-01-01T00:00:00Z"
				},
				prices: [
					{
						conditions: null,
						currency: "EUR",
						name: null,
						originalPrice: null,
						recurringChargePeriod: null,
						taxAmount: null,
						taxFreeAmount: 50,
						taxRate: 0,
						type: "ONE_TIME",
						unitOfMeasure: "PIECES"
					},
					{
						conditions: null,
						currency: "EUR",
						name: null,
						originalPrice: null,
						recurringChargePeriod: 1,
						taxAmount: null,
						taxFreeAmount: 100,
						taxRate: 0,
						type: "RECURRENT",
						unitOfMeasure: "PIECES"
					}
				],
				allowedTransitions: [
					{
						id: "reactivate",
						name: "reactivate",
						targetType: "product"
					},
					{
						id: "disable",
						name: "disable",
						targetType: "product"
					},
					{
						id: "new-action-mapped-to-suspend-transition",
						name: "new-action-mapped-to-suspend-transition",
						targetType: "product"
					},
					{
						id:
							"new-action-mapped-to-duplicated-suspend-transition",
						name:
							"new-action-mapped-to-duplicated-suspend-transition",
						targetType: "product"
					},
					{
						id: "random-unsupported-action",
						name: "random-unsupported-action",
						targetType: "product"
					}
				]
			},
			{
				name: "Active addon product 2",
				id: "dolan-2",
				specType: "PRODUCT",
				specSubType: "kek",
				validFor: {
					endDate: "2099-01-01T00:00:00Z"
				}
			},
			{
				name: "Active addon product 3",
				id: "dolan-3",
				specType: "PRODUCT",
				specSubType: "ADDITIONAL",
				validFor: {
					endDate: "2099-01-01T00:00:00Z"
				},
				allowedTransitions: [
					{
						id: "suspend",
						name: "suspend",
						targetType: "product"
					},
					{
						id: "disable",
						name: "disable",
						targetType: "product"
					}
				]
			}
		]
	}
];

const availableAddons = [
	{
		id: "temp-barring-po",
		attributes: {
			name: "Temporary suspension - Customer initiated barring",
			prices: [
				{
					conditions: null,
					currency: "EUR",
					name: null,
					originalPrice: null,
					recurringChargePeriod: null,
					taxAmount: null,
					taxFreeAmount: 1,
					taxRate: 0,
					type: "ONE_TIME",
					unitOfMeasure: "PIECES"
				},
				{
					conditions: null,
					currency: "EUR",
					name: null,
					originalPrice: null,
					recurringChargePeriod: 1,
					taxAmount: null,
					taxFreeAmount: 5,
					taxRate: 0,
					type: "RECURRENT",
					unitOfMeasure: "PIECES"
				}
			]
		}
	},
	{ attributes: { name: "Debt suspension" } },
	{ attributes: { name: "Music Steaming Service" } },
	{ attributes: { name: "Voicemail" } },
	{ attributes: { name: "Movie Steaming Service" } },
	{ attributes: { name: "Data Security Package" } },
	{ attributes: { name: "No roaming - Customer initiated barring" } },
	{ attributes: { name: "Invoice reminder" } },
	{ attributes: { name: "Fixed caller identifier" } },
	{ attributes: { name: "Favorite numbers" } }
];
export { agreements, availableAddons };
