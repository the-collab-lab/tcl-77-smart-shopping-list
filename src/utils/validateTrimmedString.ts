// makes sure the string passed into the function isn't an empty string
export function validateTrimmedString(input: string) {
	const trimmedInput = input.trim();

	if (trimmedInput.length === 0) {
		return null;
	}

	return trimmedInput;
}
