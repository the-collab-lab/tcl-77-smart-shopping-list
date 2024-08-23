import { useState } from 'react';
import { addItem } from '../api/firebase';
import toast, { Toaster } from 'react-hot-toast';

const purchaseTimelines = {
	soon: 7,
	kindOfSoon: 14,
	notSoon: 30,
};

export function ManageList({ listPath }) {
	const [itemName, setItemName] = useState('');
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] = useState('');

	const handleItemNameTextChange = (e) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (e) => {
		setItemNextPurchaseTimeline(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const daysUntilNextPurchase = purchaseTimelines[itemNextPurchaseTimeline];

		try {
			await toast.promise(
				addItem(listPath, {
					itemName,
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
				{
					style: {
						minWidth: '250px',
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
					<label htmlFor="soon">
						<input
							type="radio"
							id="soon"
							name="when-to-buy"
							value="soon"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === 'soon'}
							aria-label="Set buy to soon, within 7 days"
						/>
						Soon -- Within 7 days!
					</label>
					<br />
					<label htmlFor="kind-of-soon">
						<input
							type="radio"
							id="kind-of-soon"
							name="when-to-buy"
							value="kindOfSoon"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === 'kindOfSoon'}
							aria-label="Set buy to kind of soon, within 14 days"
						/>
						Kind of soon -- Within 14 days!
					</label>
					<br />
					<label htmlFor="not-soon">
						<input
							type="radio"
							id="not-soon"
							name="when-to-buy"
							value="notSoon"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === 'notSoon'}
							aria-label="Set buy to not soon, within 30 days"
						/>
						Not soon -- Within 30 days!
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
