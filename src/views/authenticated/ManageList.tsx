import { AddItemForm } from "../../components/forms/AddItemForm";
import ShareListForm from "../../components/forms/ShareListForm";
import { ListState } from "../../api";

interface Props {
	listState: ListState;
	listPath: string | null;
}

export function ManageList({ listPath, listState }: Props) {
	const Header = () => {
		return (
			<p>
				Hello from the <code>/manage-list</code> page!
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

	return (
		<div>
			<Header />
			<AddItemForm listPath={listPath} data={listState.items} />
			<ShareListForm listPath={listPath} />
		</div>
	);
}
