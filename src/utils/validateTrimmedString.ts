// makes sure the string passed into the function isn't an empty string
export function validateItemString(input: string) {
	const trimmedInput = input.trim(); //removes leading and trailing whitespaces

	// Condition 1: Check if the input is empty
	if (trimmedInput.length === 0) {
		return null;
	}

	const removedPunctuation = /[^\p{L}]/gu;

	const validatedString = trimmedInput.replace(removedPunctuation, "");
	console.log(validatedString);

	return validatedString;
}
