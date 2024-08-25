import React from 'react';
import { ListItem as ListItemComponent } from '../components/ListItem';
import { ListItem } from '../api';

interface Props {
	data: ListItem[];
}

export function List({ data }: Props) {
	const hasItem = data.length !== 0;
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{hasItem &&
					data.map((item) => (
						<ListItemComponent key={item.id} name={item.name} />
					))}
			</ul>
		</>
	);
}
