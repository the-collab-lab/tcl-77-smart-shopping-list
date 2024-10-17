import { AddItemForm } from "../../components/forms/AddItemForm";
import ShareListForm from "../../components/forms/ShareListForm";
import { ListItem } from "../../api";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function ManageList({ listPath, data }: Props) {
	const Header = () => {
		return (
			<p>
				Your list items are organized based on when you need to buy them. Items
				that need to be purchased soonest are at the top. If two or more items
				are due at the same time, they will be sorted alphabetically. If an
				items purchase date has passed, it will be marked as overdue and placed
				at the top of the list. Additionally, items that have not been used
				recently will be labeled as inactive and moved to the bottom of your
				list.
			</p>
		);
	};

	if (!listPath) {
		return <Header />;
	}

	return (
		<div>
			<AddItemForm listPath={listPath} data={data || []} />
			<ShareListForm listPath={listPath} />
		</div>
	);
}
