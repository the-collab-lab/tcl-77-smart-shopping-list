import "./ListItem.css";
import { updateItem, ListItem } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
	item: ListItem;
	listPath: string | null;
}

export function ListItemCheckBox({ item, listPath }: Props) {
	const [purchased, setToPurchased] = useState(false);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		setToPurchased(isChecked);

		if (!listPath) {
			toast.error("Error: listPath is missing or invalid.");
			return;
		}

		if (isChecked) {
			await toast.promise(updateItem(listPath, item, isChecked), {
				loading: `Marking ${item.name} as purchased!`,
				success: `${item.name} successfully added to your list!`,
				error: () => {
					setToPurchased(!isChecked);
					return `${item.name} failed to add to your list. Please try again!`;
				},
			});
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
					checked={purchased}
					onChange={handleChange}
					aria-checked={purchased}
				/>
				{item.name}
			</label>
		</div>
	);
}
