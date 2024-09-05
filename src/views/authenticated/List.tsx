import { useState, useMemo } from "react";
import { ListItem as ListItemComponent } from "../../components/ListItem";
import { FilterListInput as FilterListComponent } from "../../components/FilterListInput";
import { ListItem } from "../../api";
import { useNavigate } from "react-router-dom";

interface Props {
	data: ListItem[];
}

export function List({ data: unfilteredListItems }: Props) {
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		return unfilteredListItems.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, unfilteredListItems]);

	const handleAddItemsClick = () => {
		navigate("/manage-list");
	};

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>

			{unfilteredListItems.length === 0 && (
				<div>
					<h2>Your list is ready!</h2>
					<h3>
						It looks like you haven’t added any items yet.
						<br />
						Let’s get started by adding your first item.
					</h3>
					<button
						onClick={handleAddItemsClick}
						aria-label="Navigate to add items to your list"
					>
						{"Get started!"}
					</button>
				</div>
			)}

			{unfilteredListItems.length > 0 && (
				<div>
					<FilterListComponent
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
					<h3>Want to add more items to your list?</h3>
					<button
						onClick={handleAddItemsClick}
						aria-label="Navigate to add more items to your list"
					>
						{"Add items"}
					</button>
				</div>
			)}

			<ul>
				{filteredListItems.map((item) => (
					<ListItemComponent key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
