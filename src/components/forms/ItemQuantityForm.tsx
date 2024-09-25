import { FormEvent, useState } from "react";

interface ItemQuantityFormProps {
	saveItemQuantity: (quantity: number) => void;
}

const ItemQuantityForm: React.FC<ItemQuantityFormProps> = ({
	saveItemQuantity,
}) => {
	// A state variable to store the item quantity.
	const [itemQuantity, setItemQuantity] = useState<number>(1);

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
		<section>
			<form>
				<label htmlFor="item-quantity">How many:</label>{" "}
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
				<div>
					{edit ? (
						<button onClick={updateItemQuantity}>Save</button>
					) : (
						<button onClick={toggleEdit}>Edit</button>
					)}
				</div>
			</form>
		</section>
	);
};

export default ItemQuantityForm;
