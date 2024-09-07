import AddItemForm from "../../components/forms/AddItemForm";
import ShareListForm from "../../components/forms/ShareListForm";

interface Props {
	listPath: string | null;
}

export function ManageList({ listPath }: Props) {
	return (
		<div>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<AddItemForm listPath={listPath} />
			<ShareListForm listPath={listPath} />
		</div>
	);
}
