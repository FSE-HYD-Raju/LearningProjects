// takes value and returns true or false based on luhn check
// details: https://en.wikipedia.org/wiki/Luhn_algorithm
// details: https://en.wikipedia.org/wiki/Luhn_algorithm

const LuhnCheck = (value: string) => {
	// accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) {
		return false;
	}

	let nCheck = 0;
	let nDigit = 0;
	let bEven = false;
	value = value.replace(/\D/g, "");
	for (let n = value.length - 1; n >= 0; n--) {
		const cDigit = value.charAt(n);
		nDigit = parseInt(cDigit, 10);

		if (bEven) {
			nDigit = nDigit * 2;
			if (nDigit > 9) {
				nDigit -= 9;
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return nCheck % 10 === 0;
};

export default LuhnCheck;
