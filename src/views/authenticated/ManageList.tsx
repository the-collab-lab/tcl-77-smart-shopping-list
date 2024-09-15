import { AddItemForm } from "../../components/forms/AddItemForm";
import ShareListForm from "../../components/forms/ShareListForm";
import { ListItem } from "../../api";

interface Props {
	data: ListItem[];
	listPath: string | null;
}

export function ManageList({ listPath, data }: Props) {
	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<AddItemForm listPath={listPath} data={data || []} />
			<ShareListForm listPath={listPath} />
		</div>
	);
}
