import "./ListItem.css";
import { updateItem, ListItem } from "../api";

interface Props {
	item: ListItem;
	listPath: string | null;
}

export function ListItemCheckBox({ item, listPath }: Props) {
	return (
		<li className="ListItem">
			<label htmlFor="purchased-shopping-list-item">
				{item.name}
				<input
					type="checkbox"
					id="purchased-shopping-list-item"
					aria-label="checking off a purchased shopping list item"
					onChange={updateItem(listPath, item.id)}
				/>
			</label>
		</li>
	);
}
