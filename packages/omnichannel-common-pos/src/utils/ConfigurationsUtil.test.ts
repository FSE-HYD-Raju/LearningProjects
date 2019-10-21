import ConfigurationsUtil from "./ConfigurationsUtil";

const poBaseConfiguration = require("../../fixtures/PO_Base_configuration");

describe("ConfigurationsUtil", () => {
    const completeConfiguration = poBaseConfiguration.PO_Base;

    describe("getConfigurationAtPath()", () => {
        it("returns configuration of PO at first level", () => {
            const seekedId = "PO_Base";

            const path = [
                {
                    po: seekedId
                }
            ];
            const configuration = ConfigurationsUtil.getConfigurationAtPath(path, completeConfiguration);

            expect(configuration).toBeTruthy();
            expect(configuration!.id).toEqual(seekedId);
            expect(configuration!).toEqual(completeConfiguration);
        });

        it("returns configuration of a POG found at second level", () => {
            const seekedId = "GRP_Select_Configurable_Or_Nonconfigurable_Subscription";

            const path = [
                {
                    po: "PO_Base"
                },
                {
                    pog: seekedId
                }
            ];

            const configuration = ConfigurationsUtil.getConfigurationAtPath(path, completeConfiguration);

            expect(configuration).toBeTruthy();
            expect(configuration!.id).toEqual(seekedId);

            /* checking the properties of this exact configuration case.. */
            expect(configuration!.productOfferingGroups).toHaveLength(0);

            const { productOfferings } = configuration!;

            /* thanks for the extra money to me typescript. I know very well what I was doing. */
            const configurationsOfPOs: Array<any> = productOfferings as any as Array<any>;
            expect(configurationsOfPOs.map(po => po.id).sort()).toEqual([
                "PO_ConfigurableSubscription_1", "PO_YoungDigitalEdition"
            ].sort());
        });

        it("returns configuration of PO 'PO_ConfigurableSubscription_1' found at third level", () => {
            const seekedId = "PO_ConfigurableSubscription_1";

            const path = [
                {
                    po: "PO_Base"
                },
                {
                    pog: "GRP_Select_Configurable_Or_Nonconfigurable_Subscription"
                },
                {
                    po: seekedId
                }
            ];

            const configuration = ConfigurationsUtil.getConfigurationAtPath(path, completeConfiguration);

            expect(configuration).toBeTruthy();
            expect(configuration!.id).toEqual(seekedId);

            /* checking the properties of this exact configuration case.. */
            expect(!configuration!.selected).toEqual(false);
            expect(configuration!.productOfferingGroups).toHaveLength(3);
            expect(configuration!.productOfferings).toHaveLength(0);
        });

        it("returns configuration of PO 'PO_YoungDigitalEdition' found at third level", () => {
            const seekedId = "PO_YoungDigitalEdition";

            const path = [
                {
                    po: "PO_Base"
                },
                {
                    pog: "GRP_Select_Configurable_Or_Nonconfigurable_Subscription"
                },
                {
                    po: seekedId
                }
            ];

            const configuration = ConfigurationsUtil.getConfigurationAtPath(path, completeConfiguration);

            expect(configuration).toBeTruthy();
            expect(configuration!.id).toEqual(seekedId);

            /* checking the properties of this exact configuration case.. */
            expect(!configuration!.selected).toEqual(false);
            expect(configuration!.productOfferingGroups).toHaveLength(0);
            expect(configuration!.productOfferings).toHaveLength(0);
        });
	});
});
