import { addItem } from '../api/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function ManageList() {
	const notify = () => toast.success('Item added to list!');

	const handleSubmit = (e) => {
		e.preventDefault();
		const itemInfoForm = new FormData(e.target);

		console.log({
			itemName: itemInfoForm.get('item'),
			daysUntilNextPurchaseSelect: itemInfoForm.get('when-to-buy-select'),
			daysUntilNextPurchaseRadio: itemInfoForm.get('when-to-buy-radio'),
		});
		// addItem({ itemName: itemInfoForm.get("item"), daysUntilNextPurchase: itemInfoForm.get("when-to-buy")});
		notify();
	};

	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				<label>
					Item: <input id="item" type="text" name="item" required />
				</label>
				<br />

				<label htmlFor="when-to-buy">
					When to buy:{' '}
					<select id="when-to-buy" name="when-to-buy-select" required>
						<option value="" disabled>
							Select when to buy next
						</option>
						<option value="7">Soon (7 days)</option>
						<option value="14">Kind of Soon (14 days)</option>
						<option value="30">Not Soon (30 days)</option>
					</select>
				</label>
				<p>
					When to buy: <br />
					<label htmlFor="soon">
						<input type="radio" id="soon" name="when-to-buy-radio" value="7" />
						Soon
					</label>
					<br />
					<label htmlFor="kind-of-soon">
						<input
							type="radio"
							id="kind-of-soon"
							name="when-to-buy-radio"
							value="14"
						/>
						Kind of soon
					</label>
					<br />
					<label htmlFor="not-soon">
						<input
							type="radio"
							id="not-soon"
							name="when-to-buy-radio"
							value="30"
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
