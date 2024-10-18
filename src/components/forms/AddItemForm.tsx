import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem, ListItem } from "../../api";
import { validateItemName } from "../../utils";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddItemForm.scss";

interface Props {
	listPath: string;
	data: ListItem[];
}

enum PurchaseTime {
	soon = "soon",
	kindOfSoon = "kindOfSoon",
	notSoon = "notSoon",
}

const purchaseTimelines = {
	[PurchaseTime.soon]: 7,
	[PurchaseTime.kindOfSoon]: 14,
	[PurchaseTime.notSoon]: 30,
};

export function AddItemForm({ listPath, data: unfilteredListItems }: Props) {
	const [itemName, setItemName] = useState("");
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] = useState(
		PurchaseTime.soon,
	);

	const [addedQuantity, setAddedQuantity] = useState(1);

	const navigate = useNavigate();
	const listName = listPath.split("/").pop();

	const handleItemNameTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (changed: PurchaseTime) => {
		setItemNextPurchaseTimeline(changed);
	};

	const handleItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAddedQuantity(Number(e.target.value));
		console.log("Quantity captured in Add Item input:", addedQuantity);
	};

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		listPath: string,
	) => {
		e.preventDefault();

		// Validate the item name input
		const validationErrorMessage = validateItemName(
			itemName,
			unfilteredListItems,
		);

		// If there's a validation error, show the error and return early
		if (validationErrorMessage) {
			toast.error(validationErrorMessage);
			return;
		}

		if (!(itemNextPurchaseTimeline in purchaseTimelines)) {
			toast.error(
				"Selected purchase timeline is invalid. Please choose a valid option.",
			);
			return;
		}

		const daysUntilNextPurchase = purchaseTimelines[itemNextPurchaseTimeline];

		try {
			await toast.promise(
				addItem(listPath, itemName, daysUntilNextPurchase, addedQuantity), // saving original input
				{
					loading: "Adding item to list.",
					success: () => {
						setItemName("");
						setItemNextPurchaseTimeline(PurchaseTime.soon);
						setAddedQuantity(1);
						return `${addedQuantity} ${itemName} successfully added to your list!`; // showing original input
					},
					error: () => {
						return `Failed to add ${addedQuantity} ${itemName} to your list. Please try again!`;
					},
				},
			);
			navigate(`/list/${listName}`);
			console.log("Quantity added from Add Item form:", addedQuantity);
		} catch (error) {
			console.error("Failed to add item:", error);
		}
	};

	return (
		<section className="d-flex flex-column align-items-center ">
			<Form onSubmit={(e) => handleSubmit(e, listPath)}>
				<h1 className="text-center mt-5">New Item</h1>

				<Form.Label htmlFor="item-name">
					<h4>Item Name:</h4>
					<Form.Control
						id="item-name"
						type="text"
						name="item"
						placeholder="Item Name..."
						value={itemName}
						onChange={handleItemNameTextChange}
						aria-label="Enter the item name"
						aria-required
					/>
				</Form.Label>
				<label htmlFor="item-quantity">
					<h4>Item Quantity</h4>
					<Form.Control
						id="item-quantity"
						type="number"
						name="quantity"
						placeholder="Quantity..."
						min="1"
						max="100"
						value={addedQuantity}
						onChange={handleItemQuantityChange}
						aria-label="Enter the item quantity"
						aria-required
					/>
				</label>

				<fieldset className="custom-borders d-flex flex-column mb-3">
					<legend className="legend-text">When to buy:</legend>

					<Form.Label htmlFor={PurchaseTime.soon} className="d-flex gap-2 ">
						<Form.Check
							type="radio"
							id={PurchaseTime.soon}
							name="when-to-buy"
							value={PurchaseTime.soon}
							required
							onChange={() => handleNextPurchaseChange(PurchaseTime.soon)}
							checked={itemNextPurchaseTimeline === PurchaseTime.soon}
							aria-label={`Set buy to soon, within ${purchaseTimelines[PurchaseTime.soon]} days`}
						/>
						Soon -- Within {purchaseTimelines[PurchaseTime.soon]} days!
					</Form.Label>
					<br />
					<Form.Label
						htmlFor={PurchaseTime.kindOfSoon}
						className="d-flex gap-2"
					>
						<Form.Check
							type="radio"
							id={PurchaseTime.kindOfSoon}
							name="when-to-buy"
							value={PurchaseTime.kindOfSoon}
							required
							onChange={() => handleNextPurchaseChange(PurchaseTime.kindOfSoon)}
							checked={itemNextPurchaseTimeline === PurchaseTime.kindOfSoon}
							aria-label={`Set buy to kind of soon, within ${purchaseTimelines[PurchaseTime.kindOfSoon]} days`}
						/>
						Kind of soon -- Within {purchaseTimelines[PurchaseTime.kindOfSoon]}{" "}
						days!
					</Form.Label>
					<br />
					<Form.Label htmlFor={PurchaseTime.notSoon} className="d-flex gap-2">
						<Form.Check
							type="radio"
							id={PurchaseTime.notSoon}
							name="when-to-buy"
							value={PurchaseTime.notSoon}
							required
							onChange={() => handleNextPurchaseChange(PurchaseTime.notSoon)}
							checked={itemNextPurchaseTimeline === PurchaseTime.notSoon}
							aria-label={`Set buy to not soon, within ${purchaseTimelines[PurchaseTime.notSoon]} days`}
						/>
						Not soon -- Within {purchaseTimelines[PurchaseTime.notSoon]} days!
					</Form.Label>
					<Button type="submit" aria-label="Add item to shopping list">
						Add Item
					</Button>
				</fieldset>
			</Form>
		</section>
	);
}
