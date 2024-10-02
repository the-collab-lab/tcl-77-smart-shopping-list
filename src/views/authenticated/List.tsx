import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../../components/ListItem";
import { FilterListInput } from "../../components/FilterListInput";
import { ListItem, comparePurchaseUrgency } from "../../api";
import Button from "react-bootstrap/Button";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function List({ data: unfilteredListItems, listPath }: Props) {
	const navigate = useNavigate();
	const { listName } = useParams<{ listName: string }>();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredListItems = useMemo(() => {
		return unfilteredListItems
			.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort(comparePurchaseUrgency);
	}, [searchTerm, unfilteredListItems]);

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

	// Early return if the list is empty
	if (unfilteredListItems.length === 0) {
		return (
			<>
				<h1>{listName}</h1>
				<Header />
				<section>
					<h3>
						You haven’t added any items yet.
						<br />
						Let’s get started by adding your first item!
					</h3>
					<Button
						onClick={() => navigate("/manage-list")}
						aria-label="Start adding items to your list"
					>
						{"Get started!"}
					</Button>
				</section>
			</>
		);
	}

	// Main content when list is not empty
	return (
		<>
			<h1>{listName}</h1>
			<Header />

			<section className="sticky-top bg-dark">
				{unfilteredListItems.length > 0 && (
					<FilterListInput
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				)}
				<h3>Want to add more items to your list?</h3>
				<Button
					onClick={() => navigate("/manage-list")}
					aria-label="Navigate to add more items to your list"
				>
					{"Add items"}
				</Button>
			</section>

			<section>
				{filteredListItems.map((item) => (
					<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
				))}
			</section>
		</>
	);
}
