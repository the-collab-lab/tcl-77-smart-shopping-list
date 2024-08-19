export function ManageList() {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('hi');
	};

	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item">Item </label>
				<input id="item" type="text" />
				<br />
				{/* radio inputs for how soon to buy. */}
				<input type="radio" id="soon" name="when-to-buy" value="7" />
				<label htmlFor="soon">Soon</label>
				<br />
				<input type="radio" id="kind-of-soon" name="when-to-buy" value="14" />
				<label htmlFor="kind-of-soon">Kind of soon</label>
				<br />
				<input type="radio" id="not-soon" name="when-to-buy" value="30" />
				<label htmlFor="not-soon">Not soon</label>
				<br />
				<button type="submit">Submit Item</button>
			</form>
		</div>
	);
}
