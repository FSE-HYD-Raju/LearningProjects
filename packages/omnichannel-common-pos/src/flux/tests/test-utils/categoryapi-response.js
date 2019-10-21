const apiResponse = {
	data: {
		type: "categories",
		id: "mobile_phones",
		attributes: {
			htmlTitle: null,
			name: null,
			description: null,
			parentCategoryFriendlyUrl: "shop",
			htmlDescription: null,
			wizardSteps: [
				{
					label: "",
					categories: ["mobile_phones"]
				},
				{
					label: "",
					categories: ["plans_mobile", "plans_mobile_postpaid"]
				},
				{
					label: "",
					categories: ["accessories_headsets"]
				}
			]
		},
		relationships: {
			products: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/products",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/products"
				}
			},
			subCategories: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/subCategories",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/subCategories"
				},
				data: []
			},
			wizardStepCategories: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/wizardStepCategories",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/wizardStepCategories"
				}
			},
			recommendedProducts: {
				links: {
					self:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/recommendedProducts",
					related:
						"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/recommendedProducts"
				}
			}
		},
		links: {
			self:
				"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones"
		}
	},
	included: [
		{
			type: "categories",
			id: "mobile_phones",
			attributes: {
				htmlTitle: null,
				name: null,
				description: null,
				parentCategoryFriendlyUrl: "shop",
				htmlDescription: null,
				wizardSteps: [
					{
						label: "",
						categories: ["mobile_phones"]
					},
					{
						label: "",
						categories: ["plans_mobile", "plans_mobile_postpaid"]
					},
					{
						label: "",
						categories: ["accessories_headsets"]
					}
				]
			},
			relationships: {
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/products"
					}
				},
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/subCategories"
					},
					data: []
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/wizardStepCategories"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/mobile_phones/recommendedProducts"
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
			id: "accessories_headsets",
			attributes: {
				htmlTitle: null,
				name: null,
				description: null,
				parentCategoryFriendlyUrl: "accessories",
				htmlDescription: null,
				wizardSteps: [
					{
						label: "",
						categories: ["mobile_phones"]
					},
					{
						label: "",
						categories: ["accessories_headsets"]
					},
					{
						label: "",
						categories: []
					}
				]
			},
			relationships: {
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/products"
					}
				},
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/subCategories"
					},
					data: []
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/wizardStepCategories"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets/recommendedProducts"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/accessories_headsets"
			}
		},
		{
			type: "categories",
			id: "plans_mobile",
			attributes: {
				htmlTitle: null,
				name: null,
				description: null,
				parentCategoryFriendlyUrl: "plans",
				htmlDescription: null,
				wizardSteps: [
					{
						label: "",
						categories: ["plans_mobile"]
					},
					{
						label: "",
						categories: ["mobile_phones"]
					},
					{
						label: "",
						categories: ["accessories_headsets"]
					}
				]
			},
			relationships: {
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/products"
					}
				},
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/subCategories"
					},
					data: []
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/wizardStepCategories"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile/recommendedProducts"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile"
			}
		},
		{
			type: "categories",
			id: "plans_mobile_postpaid",
			attributes: {
				htmlTitle: null,
				name: null,
				description: null,
				parentCategoryFriendlyUrl: "plans",
				htmlDescription: null,
				wizardSteps: [
					{
						label: "",
						categories: ["plans_mobile_postpaid"]
					},
					{
						label: "",
						categories: ["mobile_phones"]
					},
					{
						label: "",
						categories: ["accessories_headsets"]
					}
				]
			},
			relationships: {
				products: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/relationships/products",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/products"
					}
				},
				subCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/relationships/subCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/subCategories"
					},
					data: []
				},
				wizardStepCategories: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/relationships/wizardStepCategories",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/wizardStepCategories"
					}
				},
				recommendedProducts: {
					links: {
						self:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/relationships/recommendedProducts",
						related:
							"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid/recommendedProducts"
					}
				}
			},
			links: {
				self:
					"http://localhost:8080/omnichannel-api/api/v0/categories/plans_mobile_postpaid"
			}
		}
	]
};

export default apiResponse;
