import { useState, useMemo } from "react";
import { ListItemCheckBox as ListItemComponent } from "../components/ListItem";
import { FilterListInput as FilterListComponent } from "../components/FilterListInput";
import { ListItem } from "../api";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function List({ data: unfilteredListItems, listPath }: Props) {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		return unfilteredListItems.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, unfilteredListItems]);

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
					<ListItemComponent key={item.id} item={item} listPath={listPath} />
				))}
			</ul>
		</>
	);
}
