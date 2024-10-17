import "./List.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../../components/ListItem";
import { FilterListInput } from "../../components/FilterListInput";
import { ListItem, comparePurchaseUrgency } from "../../api";
import { Container } from "react-bootstrap";
import { AddItemForm } from "../../components/forms/AddItemForm";
import Button from "react-bootstrap/Button";
import ShareListForm from "../../components/forms/ShareListForm";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function List({ data: unfilteredListItems, listPath }: Props) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState<string>("");
	const { listName } = useParams<{ listName: string }>();

	const filteredListItems = useMemo(() => {
		return unfilteredListItems
			.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
			)
			.sort(comparePurchaseUrgency);
	}, [searchTerm, unfilteredListItems]);

	const Header = () => {
		return (
			<p className="Header">
				For your ease, items are sorted by next purchase date. View and edit
				shopping list items on the go. Mark items as purchased. Shopping has
				never been easier.
			</p>
		);
	};

	if (!listPath) {
		return <Header />;
	}

	// Early return if the list is empty
	if (unfilteredListItems.length === 0) {
		return (
			<Container>
				<h2 className="ListName">{listName}</h2>
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
			</Container>
		);
	}

	// Main content when list is not empty
	return (
		<Container className="ListPageContainer">
			<header>
				<h2 className="ListName p-1 m-2 mt-2">{listName}</h2>
			</header>
			<div className="ListContainer d-flex">
				{/* This is the div for the filter and adding items. */}
				{/* Width should be 100% */}
				<div className="ListItemSection">
					<section className="d-flex sticky-top flex-nowrap align-items-center justify-content-center">
						{unfilteredListItems.length > 0 && (
							<FilterListInput
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
						)}

						<Button
							className="ms-2"
							onClick={() => navigate("/manage-list")}
							aria-label="Navigate to add more items to your list"
						>
							{"Add items"}
						</Button>
					</section>

					<section className="ListItemContainer">
						{filteredListItems.map((item) => (
							<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
						))}
					</section>
				</div>

				{/* Width of this section should be 50%. */}
				<section className="ItemFunctions d-flex flex-column">
					<div>
						<Header />
					</div>
					<div>
						<AddItemForm listPath={listPath} data={unfilteredListItems || []} />
					</div>
					<div>
						<ShareListForm listPath={listPath} />
					</div>
				</section>
			</div>
		</Container>
	);
}
