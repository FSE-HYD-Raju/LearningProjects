import DateUtil from './DateUtil';
import getMockDate from "../components/product/characteristics/MockDate";

const RealDate = Date;
const MockDate = getMockDate("1990-01-01T00:00:00.000Z");
const isoStringDate = "1990-01-01T00:00:00.000Z";

describe("DateUtil", () => {
	beforeEach(() => {
		global.Date = MockDate as any;
	});

	afterEach(function () {
		global.Date = RealDate;
	});

	it("dateWithTimezoneOffset should be in yyyy-MM-dd'T'HH:mm:ss.SSS'Z' format", () => {
		expect(DateUtil.dateWithTimezoneOffset(new Date("1990-01-01"))).toBe(new Date(isoStringDate));

	});
});
