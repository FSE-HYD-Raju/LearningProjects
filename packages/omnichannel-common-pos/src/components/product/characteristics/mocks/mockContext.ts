import TestUtils from "../../../../testUtils";

const mockContext = {
	flux: {
		actions: {
			BasketActions: {
				resetValidIcc: jest.fn(),
				triggerICCIDPreactivationValidation: jest.fn(),
				resetValidFnF: jest.fn(),
				triggerFnfValidation: jest.fn()
			}
		},
	},
	store: TestUtils.mockReduxStore({
		feature: {
			characteristicsAliases: {},
			ICCIDPreactivationValidationPOs: [],
		}
	})
};

export default mockContext;
