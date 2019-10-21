type ErrorType = {
	status: number;
	title: string;
	code: string;
	message: string;
};

type MiniBasketErrorType = {
	productName: string;
	errorId: string;
	error: ErrorType;
};

type MiniBasketErrorState = {
	errors: Array<MiniBasketErrorType>;
};

export {
	MiniBasketErrorState,
	MiniBasketErrorType,
	ErrorType
};
