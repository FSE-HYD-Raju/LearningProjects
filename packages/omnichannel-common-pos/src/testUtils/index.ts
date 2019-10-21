import ReactWidgetsTestUtils from "./ReactWidgetsTestUtils";
import * as MockDataMaker from "./mock";
const {
	shallowWithContextAndRouterProps,
	shallowWithContextAndLifecycle,
	deepShallowWithContextAndLifecycle,
	deepShallowWithContext,
	shallowWithContext,
	mountWithContextAndRouterProps,
	mountWithContext,
	attachWithContext,
	detach
} = require("./custom-mounters");
const TestUtils = require("./TestUtils");
const MockData = require("./MockData");
const SimpleDataMock = require("./mock/simpleDataMock");

export {
	MockData,
	ReactWidgetsTestUtils,
	TestUtils,
	SimpleDataMock,
	shallowWithContextAndRouterProps,
	shallowWithContextAndLifecycle,
	deepShallowWithContextAndLifecycle,
	deepShallowWithContext,
	shallowWithContext,
	mountWithContextAndRouterProps,
	mountWithContext,
	attachWithContext,
	detach,
	MockDataMaker
};

export * from "./MockRouterProps";

export default TestUtils;
