import { ListItem } from '../components';

export function List({ data }) {
	const dataPresent = data.length !== 0;
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{dataPresent
					? data.map((item) => <ListItem key={item.id} name={item.name} />)
					: null}
			</ul>
		</>
	);
}
