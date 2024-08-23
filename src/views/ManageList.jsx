import { useState } from 'react';
import { addItem } from '../api/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function ManageList({ listPath }) {
	console.log('listPath:', listPath);
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

		console.log('Submitting item:', {
			itemName,
			itemNextPurchaseTimeline,
			listPath,
		});

		try {
			await toast.promise(
				addItem(listPath, {
					itemName,
					daysUntilNextPurchase: itemNextPurchaseTimeline,
				}),
				{
					pending: 'Adding item to list.',
					success: `${itemName} successfully added to your list!`,
					error: `${itemName} failed to add to your list. Please try again!`,
				},
				{
					style: {
						minWidth: '250px',
					},
				},
				console.log('Item added to list:', itemName),
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
							value="7"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === '7'}
							aria-label="Set buy to soon, within 7 days"
						/>
						Soon
					</label>
					<br />
					<label htmlFor="kind-of-soon">
						<input
							type="radio"
							id="kind-of-soon"
							name="when-to-buy"
							value="14"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === '14'}
							aria-label="Set buy to kind of soon, within 14 days"
						/>
						Kind of soon
					</label>
					<br />
					<label htmlFor="not-soon">
						<input
							type="radio"
							id="not-soon"
							name="when-to-buy"
							value="30"
							required
							onChange={handleNextPurchaseChange}
							checked={itemNextPurchaseTimeline === '30'}
							aria-label="Set buy to not soon, within 30 days"
						/>
						Not soon
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
