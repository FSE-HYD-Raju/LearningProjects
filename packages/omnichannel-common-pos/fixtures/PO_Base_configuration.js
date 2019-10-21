const poBaseConfiguration = {
    "PO_Base": {
        "id": "PO_Base",
        "name": "Smart Flex",
        "productOfferings": [],
        "productOfferingGroups": [
            {
                "id": "GRP_Select_Configurable_Or_Nonconfigurable_Subscription",
                "productOfferings": [
                    {
                        "id": "PO_ConfigurableSubscription_1",
                        "name": "Activation Fee",
                        "inputCharacteristics": {},
                        "productOfferingGroups": [
                            {
                                "id": "GRP_ConfigurableSubscription_Data_Package",
                                "name": "Data",
                                "msisdnGroup": false,
                                "productOfferings": []
                            },
                            {
                                "id": "GRP_ConfigurableSubscription_SMS_Package",
                                "name": "SMS",
                                "msisdnGroup": false,
                                "productOfferings": []
                            },
                            {
                                "id": "GRP_ConfigurableSubscription_Voice_Package",
                                "name": "Voice",
                                "msisdnGroup": false,
                                "productOfferings": []
                            }
                        ],
                        "optionalProductOfferings": [],
                        "productOfferings": [],
                        "specificationId": "PO_ConfigurableSubscription_1",
                        "productId": null,
                        "specType": "PRODUCT",
                        "specSubType": "MOBILE",
                        "parentOfferingId": null,
                        "msisdns": null,
                        "bundlingProductOfferings": null,
                        "alternateProductOfferings": null,
                        "selected": true
                    },
                    {
                        "id": "PO_YoungDigitalEdition",
                        "name": "Young Digital Edition",
                        "inputCharacteristics": {},
                        "productOfferingGroups": [],
                        "productOfferings": [],
                        "specificationId": "PO_YoungDigitalEdition",
                        "productId": null,
                        "specType": "PRODUCT",
                        "specSubType": "MOBILE",
                        "parentOfferingId": "PO_Base",
                        "msisdns": null,
                        "bundlingProductOfferings": null,
                        "alternateProductOfferings": null,
                        "selected": true
                    }
                ],
                "productOfferingGroups": [],
                "optionalProductOfferings": []
            },
            {
                "id": "GRP_PO_SIM",
                "name": "Select A SIM",
                "msisdnGroup": false,
				"productOfferings": [
					{
						"id": "PO_SIM_Standard",
                        "name": "SIM-card",
                        selected: true
                    }
                ]
            },
			{
				"id": "GRP_Optional_NumberPortIn",
				"name": "Port In an Existing Number",
				"msisdnGroup": false,
				"productOfferings": [
					{
						"id": "PO_NumberPortIn",
                        "name": "PO_NumberPortInOrder",
                        selected: true
                    }
                ]
            }
        ],
        "optionalProductOfferings": []
    }
};

export default poBaseConfiguration;
