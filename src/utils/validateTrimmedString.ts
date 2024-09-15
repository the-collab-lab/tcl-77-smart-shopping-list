import { ListItem } from "../api";

// Validates the item name input for a shopping list
export function validateItemName(
	input: string,
	existingItems: ListItem[],
): string | null {
	const trimmedInput = input.trim(); //removes leading and trailing whitespaces

	// Condition 1: Check if the input is empty
	if (trimmedInput.length === 0) {
		return "Item cannot be empty";
	}

	//Remove punctuation marks and normalize input
	const punctuationRegex = /[^\p{L}]/gu;

	const normalizedInputName = trimmedInput
		.replace(punctuationRegex, "")
		.toLowerCase();

	//Create a list of  normalized existing item names
	const normalizedExistingItemNames = existingItems.map((existingItem) => {
		return existingItem.name.replace(punctuationRegex, "").toLowerCase();
	});

	// Condition 2: Check if the normalized input matches any existing item
	const isDuplicateItem = (normalizedInputName: string): boolean => {
		return normalizedExistingItemNames.some(
			(item) => item === normalizedInputName,
		);
	};

	//return error if the item already exists
	if (isDuplicateItem(normalizedInputName)) {
		return ` ${normalizedInputName} already exists in the list`;
	}

	// Return null if no errors are found (input is valid)
	return null;
}
