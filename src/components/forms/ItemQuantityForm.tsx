import { FormEvent, useState } from "react";
import { ListItem } from "../../api";

interface ItemQuantityFormProps {
	saveItemQuantity: (quantity: number) => void;
	item: ListItem;
}

export function ItemQuantityForm({
	saveItemQuantity,
	item,
}: ItemQuantityFormProps) {
	// A state variable to store the item quantity.
	const [itemQuantity, setItemQuantity] = useState<number>(item?.itemQuantity);

	// A state variable to store the edit mode.
	const [edit, setEdit] = useState<boolean>(false);

	// A function that will toggle the edit mode.
	const toggleEdit = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setEdit(!edit);
		console.log("Toggle edit mode:", edit);
	};

	// A function that will save the item quantity.
	const updateItemQuantity = (e: FormEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		setEdit(!edit);
		saveItemQuantity(itemQuantity);
		console.log("Item quantity saved:", itemQuantity);
	};

	return (
		<form>
			<label htmlFor="quantity">How many:</label>{" "}
			<input
				id="item-quantity"
				aria-label="Item quantity"
				type="number"
				name="item-quantity"
				max="100"
				value={itemQuantity}
				onChange={(e) => setItemQuantity(Number(e.target.value))}
				disabled={!edit}
			/>
			{edit ? (
				<button onClick={updateItemQuantity}>Save</button>
			) : (
				<button onClick={toggleEdit}>Edit</button>
			)}
		</form>
	);
}
