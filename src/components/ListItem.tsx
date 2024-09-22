import "./ListItem.css";
import { updateItem, deleteItem, ListItem } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";
import { moreThan24HoursPassed } from "../utils";

interface Props {
	item: ListItem;
	listPath: string | null;
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

	const handleCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newCheckedState = e.target.checked;

		// Temporarily store the updated check state
		setUpdatedCheckState({ kind: "set", value: newCheckedState });

		if (!listPath) {
			toast.error("Error: listPath is missing or invalid.");
			return;
		}

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

	const deleteItemHandler = () => {
		const isConfirmed = window.confirm("Do you want to delete this item?");
		console.log(isConfirmed);
		console.log("Item:", item);
		console.log("List Path:", listPath);

		if (isConfirmed) {
			try {
				deleteItem(listPath as string, item);
			} catch (error) {
				console.error("Error deleting item", error);
				throw error;
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
				{item.name}
			</label>
			<button onClick={() => deleteItemHandler()}>Delete Item</button>
		</div>
	);
}
