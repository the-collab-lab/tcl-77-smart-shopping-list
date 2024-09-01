import { ChangeEvent, FormEvent } from "react";

interface FilterListProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

export function FilterListInput({
	searchTerm,
	setSearchTerm,
}: FilterListProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="filterList">
				Filter List:
				<input
					type="search"
					onChange={handleChange}
					value={searchTerm}
					id="filterList"
					aria-label="Filter items in the list"
					placeholder="Search items..."
				/>
			</label>
		</form>
	);
}
