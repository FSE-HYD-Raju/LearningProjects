
import { CharacteristicValue } from "../redux/types";

const ascendingCharacteristicValueByNumericValueSorter = (left: CharacteristicValue, right: CharacteristicValue): number => {
	const leftNumber = Number(left.value);
	const rightNumber = Number(right.value);
	if (leftNumber < rightNumber) {
		return -1;
	}
	else if (leftNumber > rightNumber) {
		return 1;
	}
	else {
		return 0;
	}
};

export { ascendingCharacteristicValueByNumericValueSorter };
