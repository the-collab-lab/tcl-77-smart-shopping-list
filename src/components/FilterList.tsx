import { ChangeEvent } from "react";

interface FilterListProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

export function FilterList({ searchTerm, setSearchTerm }: FilterListProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<>
			<form>
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
		</>
	);
}
