import "./ListItem.css";
import { updateItem, ListItem } from "../api";

interface Props {
	item: ListItem;
	listPath: string | null;
}

export function ListItemCheckBox({ item, listPath }: Props) {
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("checked");
	};
	return (
		<div className="ListItem">
			<label htmlFor={`checkbox-${item.id}`}>
				<input
					type="checkbox"
					id={`checkbox-${item.id}`}
					aria-label={`Mark ${item.name} as purchased.`}
					value={item.id}
					onChange={handleChange}
				/>
				{item.name}
			</label>
		</div>
	);
}
