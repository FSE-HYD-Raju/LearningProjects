import Time  from "./Time";

describe("Time", () => {
	describe("parseDateFromString", () => {
		const validate = (result?: Date) => {
			expect(result).toBeDefined();
			expect(result).toBeInstanceOf(Date);
			expect(result!.getUTCFullYear()).toEqual(1986);
			expect(result!.getUTCMonth()).toEqual(9);
			expect(result!.getUTCDate()).toEqual(25);
		};
		it("Formats DD/MM/YYYYY string correctly to Date", () => {
			const input = "25/10/1986";
			const result = Time.parseDateFromString(input);
			validate(result);
		});
		it("Formats YYYY/MM/DD string correctly to Date", () => {
			const input = "1986/10/25";
			const result = Time.parseDateFromString(input);
			validate(result);
		});
		it("Formats YYYY-MM-DD string correctly to Date", () => {
			const input = "1986-10-25";
			const result = Time.parseDateFromString(input);
			validate(result);
		});
		it("Formats DD-MM-YYYY string correctly to Date", () => {
			const input = "25-10-1986";
			const result = Time.parseDateFromString(input);
			validate(result);
		});
		it("Formats DD.MM.YYYY string correctly to Date", () => {
			const input = "25.10.1986";
			const result = Time.parseDateFromString(input);
			validate(result);
		});
	});
});
