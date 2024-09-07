import "./ListItem.css";
import { updateItem, ListItem } from "../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { moreThan24HoursPassed } from "../utils";

interface Props {
	item: ListItem;
	listPath: string | null;
}

export function ListItemCheckBox({ item, listPath }: Props) {
	const [checked, setChecked] = useState(false);

	const purchaseDate = item.dateLastPurchased
		? item.dateLastPurchased.toDate()
		: item.dateLastPurchased;

	useEffect(() => {
		if (purchaseDate) {
			setChecked(!moreThan24HoursPassed(purchaseDate));
			return;
		}
		setChecked(false);
	}, [item.dateLastPurchased]);

	const handleCheckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;

		if (!isChecked && purchaseDate && !moreThan24HoursPassed(purchaseDate)) {
			toast.error(
				`${item.name} has already been marked as purchased in the last 24 hours.`,
			);
			return;
		}

		setChecked(isChecked);

		if (!listPath) {
			toast.error("Error: listPath is missing or invalid.");
			return;
		}

		await toast.promise(updateItem(listPath, item), {
			loading: `Marking ${item.name} as purchased!`,
			success: `${item.name} is now marked as purchased!`,
			error: () => {
				setChecked(!isChecked);
				return `${item.name} failed to add to your list of purchases. Please try again!`;
			},
		});
	};

	return (
		<div className="ListItem">
			<label htmlFor={`checkbox-${item.id}`}>
				<input
					type="checkbox"
					id={`checkbox-${item.id}`}
					aria-label={`Mark ${item.name} as purchased.`}
					value={item.id}
					checked={checked}
					onChange={handleCheckChange}
					aria-checked={checked}
				/>
				{item.name}
			</label>
		</div>
	);
}
