import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../../components/ListItem";
import { FilterListInput } from "../../components/FilterListInput";
import { ListState, comparePurchaseUrgency } from "../../api";
import { useNavigate } from "react-router-dom";

interface Props {
	listState: ListState;
	listPath: string | null;
}

export function List({ listState, listPath }: Props) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		if (listState.type === "loading") {
			return [];
		}
		return listState.items
			.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort(comparePurchaseUrgency);
	}, [searchTerm, listState]);

	const Header = () => {
		return (
			<p>
				Hello from the <code>/list</code> page!
			</p>
		);
	};

	if (!listPath) {
		return <Header />;
	}

	if (listState.type === "loading") {
		return (
			<>
				<Header />
				<section>
					<h3>Loading your list...</h3>
				</section>
			</>
		);
	}

	// Early return if the list is empty
	if (listState.items.length === 0) {
		return (
			<>
				<Header />
				<section>
					<h3>
						You haven’t added any items yet.
						<br />
						Let’s get started by adding your first item!
					</h3>
					<button
						onClick={() => navigate("/manage-list")}
						aria-label="Start adding items to your list"
					>
						{"Get started!"}
					</button>
				</section>
			</>
		);
	}

	// Main content when list is not empty
	return (
		<>
			<Header />
			<div>
				<section>
					{listState.items.length > 0 && (
						<FilterListInput
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					)}
					<h3>Want to add more items to your list?</h3>
					<button
						onClick={() => navigate("/manage-list")}
						aria-label="Navigate to add more items to your list"
					>
						{"Add items"}
					</button>
				</section>
				{filteredListItems.map((item) => (
					<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
				))}
			</div>
		</>
	);
}
