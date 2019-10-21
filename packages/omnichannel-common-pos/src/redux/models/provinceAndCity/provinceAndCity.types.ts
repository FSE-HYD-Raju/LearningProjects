
type City = {
	name: string;
	id: string;
	stateOrProvinceId: string;
};

type Province = {
	name: string;
	id: string;
};
type ProvinceAndCityState = {
	cities: Array<City>;
	provinces: Array<Province>;
};

export {
	City,
	Province,
	ProvinceAndCityState,
	City as CityType
};
