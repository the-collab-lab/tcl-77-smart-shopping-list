import { useState } from "react";
import { ListItem as ListItemComponent } from "../components/ListItem";
import { FilterList as FilterListComponent } from "../components/FilterList";
import { ListItem } from "../api";

interface Props {
	data: ListItem[];
}

export function List({ data }: Props) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredData = data.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);
	console.log(filteredData);

	const hasItem = filteredData.length !== 0;
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>

			<FilterListComponent
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>

			<ul>
				{hasItem &&
					filteredData.map((item) => (
						<ListItemComponent key={item.id} name={item.name} />
					))}
			</ul>
		</>
	);
}
