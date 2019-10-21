type BasketValidationActionEnum = {
	ADD: "add";
	REMOVE: "remove";
	MODIFY: "modify";
};

type BasketValidationAction = keyof BasketValidationActionEnum;

export {
	BasketValidationAction,
	BasketValidationActionEnum
};
