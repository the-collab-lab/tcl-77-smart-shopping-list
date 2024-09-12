import { ListItem } from "../api";

// makes sure the string passed into the function isn't an empty string
export function validateItemString(
	input: string,
	itemList: ListItem[] = [],
): string | null {
	const trimmedInput = input.trim(); //removes leading and trailing whitespaces

	// Condition 1: Check if the input is empty
	if (trimmedInput.length === 0) {
		return null;
	}

	//Remove punctuation marks and normalize input
	const removedPunctuation = /[^\p{L}\s]/gu;

	const validatedString = trimmedInput
		.replace(removedPunctuation, "")
		.toLowerCase();

	//Create a normalized list of items already present in the list
	const normalizedItemNames = itemList.map((listItem) => {
		return listItem.name.replace(removedPunctuation, "").toLowerCase();
	});

	//Condition 2: check each item from the normalized list against the normalized input for duplicates
	const isItemOnList = (validatedString: string): boolean => {
		return normalizedItemNames.some(
			(item) => item.toLowerCase() === validatedString.toLowerCase(),
		);
	};

	//return validatedString input if no duplicates found
	if (isItemOnList(validatedString)) {
		throw new Error("Item already exists");
	} else {
		return validatedString;
	}
}
