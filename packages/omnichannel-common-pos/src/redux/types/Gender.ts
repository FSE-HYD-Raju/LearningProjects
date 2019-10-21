export type GenderEnum = {
	MALE: "male",
	FEMALE: "female",
	OTHER: "other", // omg what era we are living in...
};

export type Gender = keyof GenderEnum;
