import "./ListItem.css";
import { updateItem, deleteItem, ListItem, updateItemQuantity } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";
import { moreThan24HoursPassed, getDaysBetweenDates } from "../utils";
import ItemQuantityForm from "./forms/ItemQuantityForm";

interface Props {
	item: ListItem;
	listPath: string;
}
interface None {
	kind: "none";
}

interface Set {
	kind: "set";
	value: boolean;
}

export function ListItemCheckBox({ item, listPath }: Props) {
	const [updatedCheckState, setUpdatedCheckState] = useState<None | Set>({
		kind: "none",
	});

	const isChecked =
		updatedCheckState.kind === "set"
			? updatedCheckState.value
			: item.dateLastPurchased
				? !moreThan24HoursPassed(item.dateLastPurchased.toDate())
				: false;

	const getUrgencyStatus = (item: ListItem) => {
		const currentDate = new Date();

		const daysUntilNextPurchase = getDaysBetweenDates(
			currentDate,
			item.dateNextPurchased.toDate(),
		);

		const daysSinceItemLastActivity = item.dateLastPurchased
			? getDaysBetweenDates(currentDate, item.dateLastPurchased.toDate())
			: getDaysBetweenDates(currentDate, item.dateCreated.toDate());

		if (daysSinceItemLastActivity >= 60) {
			return "inactive";
		}

		if (currentDate > item.dateNextPurchased.toDate()) {
			return "overdue";
		}

		if (daysUntilNextPurchase >= 30) {
			return "not soon";
		}

		if (daysUntilNextPurchase <= 7) {
			return "soon";
		}

		return "kind of soon";
	};

	const handleCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedState = e.target.checked;

		// Temporarily store the updated check state
		setUpdatedCheckState({ kind: "set", value: newCheckedState });

		try {
			await toast.promise(updateItem(listPath, item), {
				loading: `Marking ${item.name} as purchased!`,
				success: `${item.name} is now marked as purchased!`,
				error: `${item.name} failed to add to your list of purchases. Please try again!`,
			});
		} finally {
			// reset local state
			setUpdatedCheckState({ kind: "none" });
		}
	};

	const editItemQuantity = async (quantity: number) => {
		console.log("Item quantity edited:", quantity);

		if (!listPath) {
			toast.error("Error: listPath is missing or invalid.");
			return;
		}

		if (quantity === 0) {
			deleteItemHandler();
		}

		try {
			await toast.promise(updateItemQuantity(listPath, item, quantity), {
				loading: `Updating ${item.name} quantity!`,
				success: `${item.name} quantity updated!`,
				error: `Failed to update ${item.name} quantity. Please try again!`,
			});
		} catch (error) {
			console.error(`Error updating ${item.name} quantity`, error);
			alert("Error updating item quantity!");
		}
	};

	const deleteItemHandler = () => {
		const isConfirmed = window.confirm("Do you want to delete this item?");

		if (isConfirmed) {
			try {
				deleteItem(listPath as string, item);
			} catch (error) {
				console.error(`Error deleting ${item.name}`, error);
				alert("Error deleting item!");
			}
		}

		if (!isConfirmed) {
			return;
		}
	};

	return (
		<div className="ListItem">
			<label htmlFor={`checkbox-${item.id}`}>
				<input
					type="checkbox"
					id={`checkbox-${item.id}`}
					aria-label={`Mark ${item.name} as purchased.`}
					value={item.id}
					checked={isChecked}
					onChange={handleCheckChange}
					aria-checked={isChecked}
					disabled={isChecked}
				/>
				<ItemQuantityForm saveItemQuantity={editItemQuantity} item={item} /> x{" "}
				{item.name}
			</label>

			<span>
				{getUrgencyStatus(item)}

				<button onClick={() => deleteItemHandler()}>Delete Item</button>
			</span>
		</div>
	);
}
