import { ChangeEvent, FormEvent, useState } from "react";
import { addItem, ListItem } from "../../api";
import { validateItemName } from "../../utils";
import toast from "react-hot-toast";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

interface Props {
	listPath: string | null;
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
				addItem(listPath, itemName, daysUntilNextPurchase), // saving original input
				{
					loading: "Adding item to list.",
					success: () => {
						setItemName("");
						setItemNextPurchaseTimeline(PurchaseTime.soon);
						return `${itemName} successfully added to your list!`; // showing original input
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
		<section>
			{listPath && (
				<>
					<Form onSubmit={(e) => handleSubmit(e, listPath)}>
						<h3>First, add your item!</h3>
						<Form.Label htmlFor="item-name">Item:</Form.Label>
						<Form.Control
							id="item-name"
							type="text"
							name="item"
							value={itemName}
							onChange={handleItemNameTextChange}
							aria-label="Enter the item name"
							aria-required
						/>
						<br />
						<h3>Next, pick when you plan on buying this item again!</h3>
						<fieldset className="border border-2 rounded-1 p-2 mb-4">
							<legend className="fs-2 float-none w-auto p-2">
								When to buy:
							</legend>
							<Form.Check
								type="radio"
								className="mb-3 ms-3"
								id={PurchaseTime.soon}
								name="when-to-buy"
								value={PurchaseTime.soon}
								required
								onChange={() => handleNextPurchaseChange(PurchaseTime.soon)}
								checked={itemNextPurchaseTimeline === PurchaseTime.soon}
								aria-label={`Set buy to soon, within ${purchaseTimelines[PurchaseTime.soon]} days`}
								label={`Soon -- Within ${purchaseTimelines[PurchaseTime.soon]} days!`}
							/>
							<Form.Check
								type="radio"
								className="mb-3 ms-3"
								id={PurchaseTime.kindOfSoon}
								name="when-to-buy"
								value={PurchaseTime.kindOfSoon}
								required
								onChange={() =>
									handleNextPurchaseChange(PurchaseTime.kindOfSoon)
								}
								checked={itemNextPurchaseTimeline === PurchaseTime.kindOfSoon}
								aria-label={`Set buy to kind of soon, within ${purchaseTimelines[PurchaseTime.kindOfSoon]} days`}
								label={`Kind of soon -- Within
											${purchaseTimelines[PurchaseTime.kindOfSoon]} days!`}
							/>
							<Form.Check
								type="radio"
								className="mb-3 ms-3"
								id={PurchaseTime.notSoon}
								name="when-to-buy"
								value={PurchaseTime.notSoon}
								required
								onChange={() => handleNextPurchaseChange(PurchaseTime.notSoon)}
								checked={itemNextPurchaseTimeline === PurchaseTime.notSoon}
								aria-label={`Set buy to not soon, within ${purchaseTimelines[PurchaseTime.notSoon]} days`}
								label={`Not soon -- Within ${purchaseTimelines[PurchaseTime.notSoon]} days!`}
							/>
						</fieldset>
						<Button
							type="submit"
							aria-label="Add item to shopping list"
							className="mb-3"
						>
							Submit Item
						</Button>
					</Form>
					<h4>Let&apos;s go look at your list!</h4>
					<Button onClick={navigateToListPage} className="my-3">
						{"View List"}
					</Button>
				</>
			)}
		</section>
	);
}
