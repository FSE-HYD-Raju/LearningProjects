const categoryData = {
	data: [
		{
			type: "categories",
			id: "mobile_phones",
			attributes: {
				htmlTitle: "Mobile phones",
				name: "Mobile phones",
				description: null,
				parentCategoryFriendlyUrl: "shop",
				htmlDescription: null,
				wizardSteps: [
					{ label: "A Phone", categories: ["mobile_phones"] },
					{
						label: "A Plan",
						categories: ["plans_mobile", "plans_mobile_postpaid"]
					},
					{
						label: "Accessories",
						categories: ["accessories_headsets"]
					}
				]
			},
			relationships: {
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/subCategories"
					},
					data: []
				},
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/products"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/recommendedProducts"
					}
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/wizardStepCategories"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones"
			}
		},
		{
			type: "categories",
			id: "plans",
			attributes: {
				htmlTitle: "Plans",
				name: "Plans",
				description: null,
				parentCategoryFriendlyUrl: "shop",
				htmlDescription: null,
				wizardSteps: [
					{
						label: "A Plan",
						categories: [
							"plans_mobile",
							"plans_mobile_postpaid",
							"fixed_internet"
						]
					},
					{ label: "a Phone", categories: ["mobile_phones"] },
					{
						label: "Accessories",
						categories: ["accessories_headsets"]
					}
				]
			},
			relationships: {
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/subCategories"
					},
					data: [
						{ type: "categories", id: "plans_mobile" },
						{ type: "categories", id: "plans_mobile_broadband" },
						{ type: "categories", id: "plans_mobile_postpaid" },
						{ type: "categories", id: "fixed_internet" }
					]
				},
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/products"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/recommendedProducts"
					}
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans/wizardStepCategories"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/plans"
			}
		},
		{
			type: "categories",
			id: "accessories",
			attributes: {
				htmlTitle: "Accessories",
				name: "Accessories",
				description: null,
				parentCategoryFriendlyUrl: "shop",
				htmlDescription: null,
				wizardSteps: [
					{ label: "A Phone", categories: ["mobile_phones"] },
					{
						label: "A Headset",
						categories: ["accessories_headsets"]
					},
					{ label: "", categories: [] }
				]
			},
			relationships: {
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/subCategories"
					},
					data: [
						{ type: "categories", id: "accessories_headsets" },
						{ type: "categories", id: "accessories_mbb_dongles" },
						{ type: "categories", id: "services" }
					]
				},
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/products"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/recommendedProducts"
					}
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories/wizardStepCategories"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/accessories"
			}
		},
		{
			type: "categories",
			id: "offers",
			attributes: {
				htmlTitle: "Offers",
				name: "Offers",
				description: null,
				parentCategoryFriendlyUrl: "shop",
				htmlDescription: null,
				wizardSteps: [
					{ label: "A Plan", categories: ["plans_mobile"] },
					{
						label: "A Dongle",
						categories: ["accessories_mbb_dongles"]
					},
					{
						label: "A Phone",
						categories: ["mobile_phones", "services"]
					}
				]
			},
			relationships: {
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/subCategories"
					},
					data: [{ type: "categories", id: "triple_play" }]
				},
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/products"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/recommendedProducts"
					}
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/offers/wizardStepCategories"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/offers"
			}
		}
	],
	included: []
};
export default categoryData;
