import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../components/ListItem";
import { FilterListInput } from "../components/FilterListInput";
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
				<FilterListInput
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			)}

			<div>
				{filteredListItems.map((item) => (
					<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
				))}
			</div>
		</>
	);
}
