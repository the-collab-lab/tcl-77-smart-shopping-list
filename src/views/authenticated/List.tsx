import "./List.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ListItemCheckBox } from "../../components/ListItem";
import { FilterListInput } from "../../components/FilterListInput";
import { ListItem, comparePurchaseUrgency } from "../../api";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
		<Container fluid>
			<Row>
				<h2 className="ListName  mt-2">{listName}</h2>
				<Header />
			</Row>
			<section className="d-flex sticky-top justify-content-center">
				<Row>
					<Col>
						{unfilteredListItems.length > 0 && (
							<FilterListInput
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
							/>
						)}
					</Col>
					<Col>
						<Button
							className="ms-5"
							onClick={() => navigate("/manage-list")}
							aria-label="Navigate to add more items to your list"
						>
							{"Add items"}
						</Button>
					</Col>
				</Row>
			</section>

			<section>
				<Row>
					{filteredListItems.map((item) => (
						<ListItemCheckBox key={item.id} item={item} listPath={listPath} />
					))}
				</Row>
			</section>
		</Container>
	);
}
