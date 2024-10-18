import "./List.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
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
			<p className="Header text-center h4">
				Your list items are organized based on when you need to buy them. If an
				items purchase date has passed, it will be marked as overdue and placed
				at the top of the list.
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
				<section className="d-flex flex-column justify-content-center text-center align-items-center">
					<h3 className="mt-5">
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

	const addShareListRef = useRef<HTMLElement | null>(null);

	// Function to handle scrolling to the Add-ShareList section
	const scrollToAddShareItem = () => {
		if (addShareListRef.current) {
			addShareListRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const viewListRef = useRef<HTMLElement | null>(null);

	// Function to handle scrolling to the Add-ShareList section
	const scrollToViewList = () => {
		if (viewListRef.current) {
			viewListRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Main content when list is not empty
	return (
		<Container className="ListPageContainer">
			<div className="ListItemSection">
				<header>
					<h2 className="ListName p-1 m-2 mt-2">{listName}</h2>
				</header>

				<section className="d-flex sticky-top flex-nowrap align-items-center justify-content-center">
					{unfilteredListItems.length > 0 && (
						<FilterListInput
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					)}

					<Button
						className="ms-2 d-md-none"
						onClick={scrollToAddShareItem}
						aria-label="Navigate to add more items to your list"
					>
						<span className="text-nowrap">Add items</span>
					</Button>
				</section>

				<section ref={viewListRef}>
					{filteredListItems.map((item) => (
						<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
					))}
				</section>
			</div>

			<section
				ref={addShareListRef}
				className="Add-ShareList d-flex flex-column justify-content-start align-items-center "
			>
				<div className="Add-ItemForm ">
					<AddItemForm listPath={listPath} data={unfilteredListItems || []} />
				</div>
				<div className="Share-ListForm ">
					<ShareListForm listPath={listPath} />
				</div>
				<Button className="d-md-none mt-3" onClick={scrollToViewList}>
					{"View List"}
				</Button>
			</section>
		</Container>
	);
}
