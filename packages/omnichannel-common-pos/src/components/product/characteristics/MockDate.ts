// returns a class that returns constant date at any time
const getMockDate = (isoStringDate: string) => {
	const constantDate = new Date(isoStringDate);
	const MockDate = class extends Date {
		constructor() {
			super();
			return constantDate;
		}
	};
	return MockDate;
};
export default getMockDate;
