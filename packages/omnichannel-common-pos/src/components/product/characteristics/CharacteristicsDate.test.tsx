import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import { CharacteristicsDate, CharacteristicsDateProps } from "./CharacteristicsDate";
import { InputTypesEnum } from "./InputTypes";
import getMockDate from "./MockDate";
import mockContext from "./mocks/mockContext";
import CharacteristicsDateUtil from "./CharacteristicsDateUtil";

const RealDate = Date;
const isoStringDate = "2018-04-23T18:09:11.319Z";
const dateArr = isoStringDate.split("T");
const datePart = dateArr[0];
const timePart = dateArr[1];
const MockDate = getMockDate(isoStringDate);

describe("CharacteristicsDate", () => {
	// this is to mock global Date constructor
	beforeEach(() => {
		global.Date = MockDate as any;
	});

	afterEach(function () {
		global.Date = RealDate;
	});

	const minProps: CharacteristicsDateProps = {
		actions: {
			setInputtedCharacteristic: jest.fn(),
			setEnhancedCharacteristics: jest.fn(),
			resetConfigurations: jest.fn(),
			...mockContext.flux.actions.BasketActions,
		},
		characteristicsAliases: {},
		characteristicKey: "any",
		ICCIDPreactivationValidationPOs: [],
		path: [],
		msisdnConfiguration: {
			countryCode: 591
		},
	};

	it("should shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} />, { context: mockContext });
		expect(wrapper).toMatchSnapshot();
	});

	it("getFormattedDateTime should parse date to YYYY-MM-DD when dataType is date", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} inputType={InputTypesEnum.DATE}/>, { context: mockContext });
		const stateDate = wrapper.instance().state.startDate;
		wrapper.update();
		const formattedDateTime = CharacteristicsDateUtil.getFormattedDateTime(InputTypesEnum.DATE, stateDate);
		expect(formattedDateTime).toEqual(datePart);
	});

	it("getFormattedDateTime should parse date to HH:mm:ss.SSS'Z' when dataType is time", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} inputType={InputTypesEnum.TIME} />, { context: mockContext });
		const stateDate = wrapper.instance().state.startDate;
		wrapper.update();
		const formattedDateTime = CharacteristicsDateUtil.getFormattedDateTime(InputTypesEnum.TIME, stateDate);
		expect(formattedDateTime).toEqual(timePart);
	});

	it("getFormattedDateTime should parse date to yyyy-MM-dd'T'HH:mm:ss.SSS'Z' when dataType is date-time", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} inputType={InputTypesEnum.DATE_TIME}/>, { context: mockContext });
		const stateDate = wrapper.instance().state.startDate;
		wrapper.update();
		const formattedDateTime = CharacteristicsDateUtil.getFormattedDateTime(InputTypesEnum.DATE_TIME, stateDate);
		expect(formattedDateTime).toEqual(isoStringDate);
	});

	it("getFormattedDateTime should parse date to 'from yyyy-MM-dd'T'HH:mm:ss.SSS'Z' to 'yyyy-MM-dd'T'HH:mm:ss.SSS'Z' when dataType is date-time-period", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} inputType={InputTypesEnum.DATE_TIME_PERIOD}/>, { context: mockContext });
		const stateDate = wrapper.instance().state.startDate;
		const stateEnd = wrapper.instance().state.endDate;
		wrapper.update();
		const formattedDateTime = CharacteristicsDateUtil.getFormattedDateTime(InputTypesEnum.DATE_TIME_PERIOD, stateDate, stateEnd);
		expect(formattedDateTime).toEqual(`from ${isoStringDate} to ${isoStringDate}`);
	});

	it("getFormattedDateTime should parse date to 'from 'HH:mm:ss.SSS'Z'' to 'HH:mm:ss.SSS'Z' when dataType is time-of-the-day-period", () => {
		const wrapper = shallowWithContext(<CharacteristicsDate {...minProps} inputType={InputTypesEnum.TIME_OF_THE_DAY_PERIOD}/>, { context: mockContext });
		const stateDate = wrapper.instance().state.startDate;
		const endDate = wrapper.instance().state.endDate;
		wrapper.update();
		const formattedDateTime = CharacteristicsDateUtil.getFormattedDateTime(InputTypesEnum.TIME_OF_THE_DAY_PERIOD, stateDate, endDate);
		expect(formattedDateTime).toEqual(`from ${timePart} to ${timePart}`);
	});

	it("should call setInputtedCharacteristic with correct params when handleDate is called", () => {
		const setInputtedCharacteristicMock = minProps.actions.setInputtedCharacteristic;

		const path = [{ po: "1" }];
		const characteristicKey = "awesome-date";

		const wrapper = shallowWithContext(
			<CharacteristicsDate
				{...minProps}
				path={path}
				characteristicKey={characteristicKey}
			/>
		);
		const component = wrapper.instance();
		wrapper.update();
		component.handleDate(new Date());
		expect(setInputtedCharacteristicMock).toHaveBeenCalledWith(path, characteristicKey, isoStringDate);
	});
});
