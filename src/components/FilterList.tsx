import { ChangeEvent } from "react";
import { ListItem } from "../api";

interface FilterListProps {
	searchTerm: string;
	// setSearchTerm: React.Dispatch<React.SetStateAction<string>>
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
					{" "}
					Filter List:
					<input
						type="text"
						onChange={handleChange}
						value={searchTerm}
						id="filerList"
						aria-label="Filter Shopping List"
						placeholder="Search items..."
					/>
				</label>
			</form>
		</>
	);
}
