import { useState } from 'react';
import { addItem } from '../api/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function ManageList({ listPath }) {
	const [itemName, setItemName] = useState('');
	const [itemNextPurchaseTimeline, setItemNextPurchaseTimeline] = useState('');
	const notify = () => toast.success('Item added to list!');

	const handleItemNameTextChange = (e) => {
		setItemName(e.target.value);
	};

	const handleNextPurchaseChange = (e) => {
		setItemNextPurchaseTimeline(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (itemName && itemNextPurchaseTimeline) {

		// 	await addItem(listPath, { itemName: itemName, daysUntilNextPurchase: itemNextPurchaseTimeline });
		// }

		console.log({
			listPath: listPath,
			itemName: itemName,
			daysUntilNextPurchaseRadio: itemNextPurchaseTimeline,
		});

		notify();
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
				<p>
					When to buy: <br />
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
				</p>
				<button type="submit">Submit Item</button>
			</form>
			<Toaster />
		</div>
	);
}
