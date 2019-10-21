import { ProvinceAndCityState } from "./provinceAndCity.types";
export { ProvinceAndCityState } from "./provinceAndCity.types";
import { ProvinceAndCityActions, ProvinceAndCityPayload } from "./provinceAndCity.actions";

export const initialState = (): Partial<ProvinceAndCityState> => ({
	cities: [],
	provinces: [],
});

const provinceAndCityReducer = (state: Partial<ProvinceAndCityState> = initialState(), action: ProvinceAndCityPayload) => {
	const { type, cities, provinces, error } = action;
	switch (type) {
		case ProvinceAndCityActions.GET_PROVINCE_COMPLETE:
			return { ...state, provinces };
		case ProvinceAndCityActions.GET_PROVINCE_FAILED:
			return { ...state };
		case ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID_COMPLETE:
			return { ...state, cities };
		case ProvinceAndCityActions.GET_CITIES_BY_PROVINCE_ID_FAILED:
			return { ...state };
		default:
			return state;
	}
};

export default provinceAndCityReducer;
