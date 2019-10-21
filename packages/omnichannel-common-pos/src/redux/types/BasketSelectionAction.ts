enum BasketSelectionActionEnum {
    DO_NOTHING,
    SET_AN_OPEN_BASKET_AS_ACTIVE,
    ASSIGN_ACTIVE_BASKET_TO_USER,
    ASK_USER_TO_CHOOSE
}

type BasketSelectionAction = keyof typeof BasketSelectionActionEnum;

export {
	BasketSelectionAction,
	BasketSelectionActionEnum
};
