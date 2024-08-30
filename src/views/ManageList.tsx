import { ChangeEvent, FormEvent, useState } from "react";
import { addItem, shareList } from "../api/firebase";
import { validateTrimmedString } from "../utils";
import { toast } from "react-hot-toast";

import { useAuth } from "../api/useAuth";

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

export function ManageList({ listPath }: Props) {
	const { user: currentUser } = useAuth();

	const [itemName, setItemName] = useState("");
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] = useState(
		PurchaseTime.soon,
	);
	const [emailName, setEmailName] = useState("");

	const handleItemNameTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (changed: PurchaseTime) => {
		setItemNextPurchaseTimeline(changed);
	};

	const handleEmailNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailName(e.target.value);
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

	const handleInvite = async (
		e: FormEvent<HTMLFormElement>,
		listPath: string,
	) => {
		console.log("Button clicked! Inviting user!");
		e.preventDefault();

		const trimmedEmailName = validateTrimmedString(emailName);

		if (!trimmedEmailName) {
			toast.error(
				"Oops! Email cannot be empty or just spaces. Please enter a valid email.",
			);
			return;
		}

		if (currentUser === null) {
			toast.error(`You are not logged in! Cannot invite.`);

			return;
		}

		try {
			await toast.promise(shareList(listPath, currentUser, trimmedEmailName), {
				loading: "sharing list with existing user",
				success: () => {
					setEmailName("");
					return `${emailName} successfully invited to your list!`;
				},
				error: () => {
					return `${emailName} Oops! Failed to invite to your list. Please try again!`;
				},
			});
		} catch (error) {
			console.error("Oops! Failed to invite user:", error);
		}
	};

	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			{listPath && (
				<>
					<form onSubmit={(e) => handleSubmit(e, listPath)}>
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

					<form onSubmit={(e) => handleInvite(e, listPath)}>
						<label htmlFor="recipient-email">
							Recipient Email:
							<input
								id="recipient-email"
								type="email"
								name="recipient-email"
								value={emailName}
								onChange={handleEmailNameChange}
								required
								aria-label="Enter the user name to share list"
								aria-required
							/>
						</label>
						<button type="submit" aria-label="Add item to shopping list">
							Invite User
						</button>
					</form>
				</>
			)}
		</div>
	);
}
