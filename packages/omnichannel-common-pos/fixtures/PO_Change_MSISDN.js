const poChangeMsisdn = {
    "id": "PO_change_msisdn",
    "type": "productOfferings",
    "attributes": {
      "specificationId": "PO_change_msisdn",
      "specType": "PRODUCT",
      "instanceCharacteristics": {
        "T_CopyCharacteristicsToExecutingProducts": {
          "values": [
            {
              "name": "RFS_MTX_PurchOfferForSub",
              "value": "RFS_MTX_PurchOfferForSub",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "T_CopyCharacteristicsToExecutingProducts",
          "source": "Internal",
          "subType": "Internal",
          "mandatory": true,
          "validation": null,
          "name": "T_CopyCharacteristicsToExecutingProducts",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "BOOLEAN",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": true,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_FLAGRTG": {
          "values": [
            {
              "name": "N",
              "value": "N",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_FLAGRTG",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_FLAGRTG",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_SMS_TemplateID_OK": {
          "values": [
            {
              "name": "tre_change-msisdn",
              "value": "tre_change-msisdn",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_SMS_TemplateID_OK",
          "source": null,
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_SMS_TemplateID_OK",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_CHANNELID": {
          "values": [
            {
              "name": "CONS",
              "value": "CONS",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_CHANNELID",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_CHANNELID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "T_IncludeRelatedProductCharacteristics": {
          "values": [
            {
              "name": "true",
              "value": "true",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "T_IncludeRelatedProductCharacteristics",
          "source": "Internal",
          "subType": "Internal",
          "mandatory": true,
          "validation": null,
          "name": "T_IncludeRelatedProductCharacteristics",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "BOOLEAN",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": true,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_ORIGINSYSID": {
          "values": [
            {
              "name": "DIGSOL",
              "value": "DIGSOL",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_ORIGINSYSID",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_ORIGINSYSID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_TYPEID": {
          "values": [
            {
              "name": "MOBILE",
              "value": "MOBILE",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_TYPEID",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_TYPEID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_PAYMENTTYPE": {
          "values": [
            {
              "name": "PRE",
              "value": "PRE",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_PAYMENTTYPE",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_PAYMENTTYPE",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_EVENTSTATUS": {
          "values": [
            {
              "name": "N",
              "value": "N",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_EVENTSTATUS",
          "source": null,
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_EVENTSTATUS",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_FLAGRTGMB": {
          "values": [
            {
              "name": "N",
              "value": "N",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_FLAGRTGMB",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_FLAGRTGMB",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_BRAND": {
          "values": [
            {
              "name": "Tre",
              "value": "Tre",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_BRAND",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_BRAND",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_CODPNTF": {
          "values": [
            {
              "name": "LDS_NA",
              "value": "LDS_NA",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_CODPNTF",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_CODPNTF",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_MNPFLAG": {
          "values": [
            {
              "name": "N",
              "value": "N",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_MNPFLAG",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_MNPFLAG",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_ACTIONID": {
          "values": [
            {
              "name": "CHG_MSISDN",
              "value": "CHG_MSISDN",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_ACTIONID",
          "source": null,
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_ACTIONID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_T_SRV_SERVICECODE": {
          "values": [
            {
              "name": "SRVC41",
              "value": "SRVC41",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_T_SRV_SERVICECODE",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_T_SRV_SERVICECODE",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_MTX_Sub_Cat_Item_ID": {
          "values": [
            {
              "name": "146",
              "value": "146",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "CH_MTX_Sub_Cat_Item_ID",
          "source": "Internal",
          "subType": null,
          "mandatory": false,
          "validation": null,
          "name": "MTX Subscriber Catalogue Item Id",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": true,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        }
      },
      "productId": null,
      "priority": null,
      "productOfferingGroups": [
        {
          "id": "GRP_MSISDN_Selection",
          "cardinality": {
            "max": 1,
            "min": 1
          },
          "commercialEnrichments": null,
          "name": "Select a MSISDN",
          "msisdnGroup": true,
          "productOfferings": [
            {
              "id": "PO_SelectCustomNumber",
              "name": "Select Custom Number",
              "categories": [],
              "commercialEnrichments": [],
              "featureCharacteristics": [],
              "inputCharacteristics": {
                "CH_reason_code": {
                  "values": [],
                  "description": "reason_code",
                  "source": "Order System",
                  "subType": null,
                  "mandatory": false,
                  "validation": null,
                  "name": "CH_reason_code",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "instanceCharacteristics": {
                "CH_MSISDN_Stock_ID": {
                  "values": [
                    {
                      "name": "W3msisdns-tre",
                      "value": "W3msisdns-tre",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "RIM Stock ID associated with a set of MSISDNs",
                  "source": "System",
                  "subType": null,
                  "mandatory": true,
                  "validation": null,
                  "name": "Stock ID",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "T_FORM_NAME": {
                  "values": [
                    {
                      "name": "pattern search",
                      "value": "pattern search",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "Form which should be used to present the fields associated with this product.",
                  "source": "System",
                  "subType": "Internal",
                  "mandatory": false,
                  "validation": null,
                  "name": "T_FORM_NAME",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "prices": [
                {
                  "type": "ONE_TIME",
                  "name": null,
                  "chargedUnit": {
                    "amount": 10,
                    "currency": "EUR",
                    "unitOfMeasure": "MONETARY"
                  },
                  "taxAmount": 0,
                  "taxFreeAmount": 10,
                  "taxIncludedAmount": 10,
                  "taxRate": 0,
                  "recurringChargePeriod": null,
                  "currency": "EUR",
                  "conditions": null,
                  "originalPrice": null
                }
              ],
              "priority": null,
              "productOfferingGroups": [],
              "productOfferings": [],
              "specificationId": "PO_SelectCustomNumber",
              "productId": null,
              "specType": "PRODUCT",
              "specSubType": "SERVICE",
              "stockLevel": null,
              "discounts": [],
              "allowances": [],
              "parentOfferingId": null,
              "msisdns": null,
              "bundlingProductOfferings": null,
              "alternateProductOfferings": null,
              "shippingMethods": null,
              "optionalProductOfferings": null,
              "optionalProductOfferingGroups": null
            },
            {
              "id": "PO_SelectStandardNumber",
              "name": "Select Standard Number",
              "categories": [],
              "commercialEnrichments": [],
              "featureCharacteristics": [],
              "inputCharacteristics": {
                "CH_reason_code": {
                  "values": [],
                  "description": "reason_code",
                  "source": "Order System",
                  "subType": null,
                  "mandatory": false,
                  "validation": null,
                  "name": "CH_reason_code",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "CH_OneTime_Matrixx_ServiceFee": {
                  "values": [],
                  "description": "One Time Matrixx Fee",
                  "source": "System",
                  "subType": null,
                  "mandatory": false,
                  "validation": null,
                  "name": "One Time Matrixx Fee",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "DECIMAL",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "instanceCharacteristics": {
                "T_CopyCharacteristicsToExecutingProducts": {
                  "values": [
                    {
                      "name": "RFS_MTX_PurchOfferForSub",
                      "value": "RFS_MTX_PurchOfferForSub",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "T_CopyCharacteristicsToExecutingProducts",
                  "source": "Internal",
                  "subType": "Internal",
                  "mandatory": true,
                  "validation": null,
                  "name": "T_CopyCharacteristicsToExecutingProducts",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "BOOLEAN",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": true,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "CH_MSISDN_Stock_ID": {
                  "values": [
                    {
                      "name": "W3msisdns-tre",
                      "value": "W3msisdns-tre",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "RIM Stock ID associated with a set of MSISDNs",
                  "source": "System",
                  "subType": null,
                  "mandatory": true,
                  "validation": null,
                  "name": "Stock ID",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "T_FORM_NAME": {
                  "values": [
                    {
                      "name": "select",
                      "value": "select",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "Form which should be used to present the fields associated with this product.",
                  "source": "System",
                  "subType": "Internal",
                  "mandatory": false,
                  "validation": null,
                  "name": "T_FORM_NAME",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "prices": [
                {
                  "type": "ONE_TIME",
                  "name": null,
                  "chargedUnit": {
                    "amount": 0,
                    "currency": "EUR",
                    "unitOfMeasure": "MONETARY"
                  },
                  "taxAmount": 0,
                  "taxFreeAmount": 0,
                  "taxIncludedAmount": 0,
                  "taxRate": 0,
                  "recurringChargePeriod": null,
                  "currency": "EUR",
                  "conditions": null,
                  "originalPrice": null
                }
              ],
              "priority": null,
              "productOfferingGroups": [],
              "productOfferings": [],
              "specificationId": "PO_SelectStandardNumber",
              "productId": null,
              "specType": "PRODUCT",
              "specSubType": "SERVICE",
              "stockLevel": null,
              "discounts": [],
              "allowances": [],
              "parentOfferingId": null,
              "msisdns": null,
              "bundlingProductOfferings": null,
              "alternateProductOfferings": null,
              "shippingMethods": null,
              "optionalProductOfferings": null,
              "optionalProductOfferingGroups": null
            },
            {
              "id": "PO_SelectTerminatedNumber",
              "name": "Select Terminated Number",
              "categories": [],
              "commercialEnrichments": [],
              "featureCharacteristics": [],
              "inputCharacteristics": {
                "CH_reason_code": {
                  "values": [],
                  "description": "reason_code",
                  "source": "Order System",
                  "subType": null,
                  "mandatory": false,
                  "validation": null,
                  "name": "CH_reason_code",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "CH_OneTime_Matrixx_ServiceFee": {
                  "values": [],
                  "description": "One Time Matrixx Fee",
                  "source": "System",
                  "subType": null,
                  "mandatory": false,
                  "validation": null,
                  "name": "One Time Matrixx Fee",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "DECIMAL",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "instanceCharacteristics": {
                "T_CopyCharacteristicsToExecutingProducts": {
                  "values": [
                    {
                      "name": "RFS_MTX_PurchOfferForSub",
                      "value": "RFS_MTX_PurchOfferForSub",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "T_CopyCharacteristicsToExecutingProducts",
                  "source": "Internal",
                  "subType": "Internal",
                  "mandatory": true,
                  "validation": null,
                  "name": "T_CopyCharacteristicsToExecutingProducts",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "BOOLEAN",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": true,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                },
                "T_FORM_NAME": {
                  "values": [
                    {
                      "name": "select",
                      "value": "select",
                      "language": null,
                      "isDefault": null,
                      "validFor": null
                    }
                  ],
                  "description": "Form which should be used to present the fields associated with this product.",
                  "source": "System",
                  "subType": "Internal",
                  "mandatory": false,
                  "validation": null,
                  "name": "T_FORM_NAME",
                  "priority": null,
                  "valueRegulator": null,
                  "purpose": null,
                  "dataType": "STRING",
                  "cardinality": {
                    "max": null,
                    "min": null
                  },
                  "humanReadableId": null,
                  "hidden": false,
                  "maxValue": null,
                  "minValue": null,
                  "unitOfMeasure": null,
                  "validFor": {
                    "startDate": null,
                    "endDate": null
                  }
                }
              },
              "prices": [
                {
                  "type": "ONE_TIME",
                  "name": null,
                  "chargedUnit": {
                    "amount": 0,
                    "currency": "EUR",
                    "unitOfMeasure": "MONETARY"
                  },
                  "taxAmount": 0,
                  "taxFreeAmount": 0,
                  "taxIncludedAmount": 0,
                  "taxRate": 0,
                  "recurringChargePeriod": null,
                  "currency": "EUR",
                  "conditions": null,
                  "originalPrice": null
                }
              ],
              "priority": null,
              "productOfferingGroups": [],
              "productOfferings": [],
              "specificationId": "PO_SelectTerminatedNumber",
              "productId": null,
              "specType": "PRODUCT",
              "specSubType": "SERVICE",
              "stockLevel": null,
              "discounts": [],
              "allowances": [],
              "parentOfferingId": null,
              "msisdns": null,
              "bundlingProductOfferings": null,
              "alternateProductOfferings": null,
              "shippingMethods": null,
              "optionalProductOfferings": null,
              "optionalProductOfferingGroups": null
            }
          ]
        }
      ],
      "stockLevel": null,
      "commercialEnrichments": [],
      "featureCharacteristics": [],
      "specSubType": "SERVICE",
      "discounts": [],
      "productOfferings": [],
      "parentOfferingId": null,
      "name": "Change MSISDN",
      "categories": [],
      "allowances": [],
      "inputCharacteristics": {
        "number": {
          "values": [],
          "description": "NumberResource",
          "source": "Order System",
          "subType": "MSISDN",
          "mandatory": true,
          "validation": null,
          "name": "Phone Number",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_ProductID": {
          "values": [],
          "description": "ProductID",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_ProductID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "T_Allowed_Payment_Methods": {
          "values": [
            {
              "name": "residual-credit",
              "value": "residual-credit",
              "language": null,
              "isDefault": null,
              "validFor": null
            },
            {
              "name": "credit-card",
              "value": "credit-card",
              "language": null,
              "isDefault": null,
              "validFor": null
            },
            {
              "name": "cash-on-delivery",
              "value": "cash-on-delivery",
              "language": null,
              "isDefault": null,
              "validFor": null
            }
          ],
          "description": "T_Allowed_Payment_Methods",
          "source": "System",
          "subType": "Internal",
          "mandatory": true,
          "validation": null,
          "name": "Allowed Payment Methods",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_NEW_MSISDN": {
          "values": [],
          "description": "NEW_MSISDN",
          "source": "Order System",
          "subType": null,
          "mandatory": true,
          "validation": null,
          "name": "CH_NEW_MSISDN",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_ReservedFor": {
          "values": [],
          "description": "Resource ReservedFor",
          "source": "Order System",
          "subType": null,
          "mandatory": false,
          "validation": null,
          "name": "CH_ReservedFor",
          "priority": 1,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_Inventory_Id": {
          "values": [],
          "description": "Inventory ID",
          "source": "Internal",
          "subType": null,
          "mandatory": false,
          "validation": null,
          "name": "Inventory ID",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": true,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        },
        "CH_Parent_ID": {
          "values": [],
          "description": "ParentProductID",
          "source": "Order System",
          "subType": null,
          "mandatory": false,
          "validation": null,
          "name": "Parent Product",
          "priority": null,
          "valueRegulator": null,
          "purpose": null,
          "dataType": "STRING",
          "cardinality": {
            "max": null,
            "min": null
          },
          "humanReadableId": null,
          "hidden": false,
          "maxValue": null,
          "minValue": null,
          "unitOfMeasure": null,
          "validFor": {
            "startDate": null,
            "endDate": null
          }
        }
      },
      "prices": [],
      "optionalProductOfferings": [],
      "optionalProductOfferingGroups": []
    },
    "relationships": {
      "bundlingProductOfferings": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/bundlingProductOfferings",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/bundlingProductOfferings"
        }
      },
      "optionalProductOfferingGroups": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/optionalProductOfferingGroups",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/optionalProductOfferingGroups"
        }
      },
      "msisdns": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/msisdns",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/msisdns"
        }
      },
      "optionalProductOfferings": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/optionalProductOfferings",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/optionalProductOfferings"
        }
      },
      "alternateProductOfferings": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/alternateProductOfferings",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/alternateProductOfferings"
        }
      },
      "shippingMethods": {
        "links": {
          "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/relationships/shippingMethods",
          "related": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn/shippingMethods"
        }
      }
    },
    "links": {
      "self": "http://localhost:8080/omnichannel-api/api/v0/productOfferings/PO_change_msisdn"
    }
  };

export default poChangeMsisdn;
