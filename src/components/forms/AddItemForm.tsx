import { ChangeEvent, FormEvent, useState } from "react";
import { addItem } from "../../api";
import { validateTrimmedString } from "../../utils";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

interface Props {
	listPath: string | null;
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

export function AddItemForm({ listPath }: Props) {
	const navigate = useNavigate();

	const [itemName, setItemName] = useState("");
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] = useState(
		PurchaseTime.soon,
	);

	const handleItemNameTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (changed: PurchaseTime) => {
		setItemNextPurchaseTimeline(changed);
	};

	const handleSubmit = async (
		e: FormEvent<HTMLFormElement>,
		listPath: string,
	) => {
		e.preventDefault();
		const trimmedItemName = validateTrimmedString(itemName);

		if (!trimmedItemName) {
			toast.error(
				"Item name cannot be empty or just spaces. Please enter a valid name.",
			);
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
				addItem(listPath, trimmedItemName, daysUntilNextPurchase),
				{
					loading: "Adding item to list.",
					success: () => {
						setItemName("");
						setItemNextPurchaseTimeline(PurchaseTime.soon);
						return `${itemName} successfully added to your list!`;
					},
					error: () => {
						return `${itemName} failed to add to your list. Please try again!`;
					},
				},
			);
		} catch (error) {
			console.error("Failed to add item:", error);
		}
	};

	const navigateToListPage = () => {
		navigate("/list");
	};

	return (
		<div>
			{listPath && (
				<>
					<form onSubmit={(e) => handleSubmit(e, listPath)}>
						<h3>First, add your item!</h3>
						<label htmlFor="item-name">
							Item:
							<input
								id="item-name"
								type="text"
								name="item"
								value={itemName}
								onChange={handleItemNameTextChange}
								required
								aria-label="Enter the item name"
								aria-required
							/>
						</label>
						<br />
						<h3>Next, pick when you plan on buying this item again!</h3>
						<fieldset>
							<legend>When to buy:</legend>
							<label htmlFor={PurchaseTime.soon}>
								<input
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
							</label>
							<br />
							<label htmlFor={PurchaseTime.kindOfSoon}>
								<input
									type="radio"
									id={PurchaseTime.kindOfSoon}
									name="when-to-buy"
									value={PurchaseTime.kindOfSoon}
									required
									onChange={() =>
										handleNextPurchaseChange(PurchaseTime.kindOfSoon)
									}
									checked={itemNextPurchaseTimeline === PurchaseTime.kindOfSoon}
									aria-label={`Set buy to kind of soon, within ${purchaseTimelines[PurchaseTime.kindOfSoon]} days`}
								/>
								Kind of soon -- Within{" "}
								{purchaseTimelines[PurchaseTime.kindOfSoon]} days!
							</label>
							<br />
							<label htmlFor={PurchaseTime.notSoon}>
								<input
									type="radio"
									id={PurchaseTime.notSoon}
									name="when-to-buy"
									value={PurchaseTime.notSoon}
									required
									onChange={() =>
										handleNextPurchaseChange(PurchaseTime.notSoon)
									}
									checked={itemNextPurchaseTimeline === PurchaseTime.notSoon}
									aria-label={`Set buy to not soon, within ${purchaseTimelines[PurchaseTime.notSoon]} days`}
								/>
								Not soon -- Within {purchaseTimelines[PurchaseTime.notSoon]}{" "}
								days!
							</label>
						</fieldset>
						<button type="submit" aria-label="Add item to shopping list">
							Submit Item
						</button>
					</form>
					<h4>Let&apos;s look at your list!</h4>
					<button onClick={navigateToListPage}>{"Let's go!"}</button>
				</>
			)}
		</div>
	);
}
