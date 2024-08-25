import { ListItem } from "../components";

export function List({ data }) {
	const hasItem = data.length !== 0;
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{hasItem &&
					data.map((item) => <ListItem key={item.id} name={item.name} />)}
			</ul>
		</>
	);
}
