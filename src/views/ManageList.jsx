import { useState } from 'react';
import { addItem } from '../api/firebase';
import toast, { Toaster } from 'react-hot-toast';

const SOON = 'soon';
const KIND_OF_SOON = 'kindOfSoon';
const NOT_SOON = 'notSoon';

const purchaseTimelines = {
	[SOON]: 7,
	[KIND_OF_SOON]: 14,
	[NOT_SOON]: 30,
};

export function ManageList({ listPath }) {
	const [itemName, setItemName] = useState('');
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] =
		useState(SOON);

	const handleItemNameTextChange = (e) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (e) => {
		setItemNextPurchaseTimeline(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const trimmedItemName = itemName.trim();

		if (trimmedItemName.length === 0) {
			toast.error(
				'Item name cannot be empty or just spaces. Please enter a valid name.',
			);
			return;
		}

		const daysUntilNextPurchase = purchaseTimelines[itemNextPurchaseTimeline];

		try {
			await toast.promise(
				addItem(listPath, {
					itemName: trimmedItemName,
					daysUntilNextPurchase,
				}),
				{
					pending: 'Adding item to list.',
					success: () => {
						setItemName('');
						setItemNextPurchaseTimeline('');
						return `${itemName} successfully added to your list!`;
					},
					error: () => {
						return `${itemName} failed to add to your list. Please try again!`;
					},
				},
			);
		} catch (error) {
			console.error('Failed to add item:', error);
		}
	};

	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form onSubmit={handleSubmit}>
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
					/>
				</label>
				<br />
				<fieldset>
					<legend>When to buy:</legend>
					<label htmlFor={SOON}>
						<input
							type="radio"
							id={SOON}
							name="when-to-buy"
							value={SOON}
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === SOON}
							aria-label={`Set buy to soon, within ${purchaseTimelines[SOON]} days`}
						/>
						Soon -- Within {purchaseTimelines[SOON]} days!
					</label>
					<br />
					<label htmlFor={KIND_OF_SOON}>
						<input
							type="radio"
							id={KIND_OF_SOON}
							name="when-to-buy"
							value={KIND_OF_SOON}
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === KIND_OF_SOON}
							aria-label={`Set buy to kind of soon, within ${purchaseTimelines[KIND_OF_SOON]} days`}
						/>
						Kind of soon -- Within {purchaseTimelines[KIND_OF_SOON]} days!
					</label>
					<br />
					<label htmlFor={NOT_SOON}>
						<input
							type="radio"
							id={NOT_SOON}
							name="when-to-buy"
							value={NOT_SOON}
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === NOT_SOON}
							aria-label={`Set buy to not soon, within ${purchaseTimelines[NOT_SOON]} days`}
						/>
						Not soon -- Within {purchaseTimelines[NOT_SOON]} days!
					</label>
				</fieldset>
				<button type="submit" aria-label="Add item to shopping list">
					Submit Item
				</button>
			</form>
			<Toaster />
		</div>
	);
}
