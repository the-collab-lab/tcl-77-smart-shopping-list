import { useState, useMemo } from "react";
import { ListItem as ListItemComponent } from "../components/ListItem";
import { FilterListInput as FilterListComponent } from "../components/FilterListInput";
import { ListItem } from "../api";

interface Props {
	data: ListItem[];
}

export function List({ data: unfilteredListItems }: Props) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		return unfilteredListItems.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm]);

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>

			{unfilteredListItems.length > 0 && (
				<FilterListComponent
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}

			<ul>
				{filteredListItems.map((item) => (
					<ListItemComponent key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
