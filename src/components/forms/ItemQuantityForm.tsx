import { FormEvent, useState } from "react";
import { ListItem } from "../../api";
import { toast } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface ItemQuantityFormProps {
	saveItemQuantity: (quantity: number) => void;
	item: ListItem;
}

export function ItemQuantityForm({
	saveItemQuantity,
	item,
}: ItemQuantityFormProps) {
	// A state variable to store the item quantity.
	const [itemQuantity, setItemQuantity] = useState<number>(
		item ? item.itemQuantity : 1,
	);

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

		if (itemQuantity < 1) {
			toast.error("Oops! Quantity must be at least 1!");
			setEdit(edit);
			return;
		}
		setEdit(!edit);
		saveItemQuantity(itemQuantity);
		console.log("Item quantity updated in Item Quantity Form:", itemQuantity);
	};

	return (
		<>
			<Form.Control
				id="item-quantity"
				aria-label="Item quantity"
				type="number"
				name="item-quantity"
				min="1"
				max="100"
				value={itemQuantity}
				onChange={(e) => setItemQuantity(Number(e.target.value))}
				disabled={!edit}
			/>
			{edit ? (
				<span>
					<Button className="custom-button" onClick={updateItemQuantity}>
						Save!
					</Button>{" "}
					<Button className="custom-button" onClick={toggleEdit}>
						Cancel!
					</Button>
				</span>
			) : (
				<Button className="custom-button" onClick={toggleEdit}>
					Edit!
				</Button>
			)}
		</>
	);
}
