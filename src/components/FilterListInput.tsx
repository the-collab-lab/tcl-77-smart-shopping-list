import { ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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

	const handleClear = () => {
		setSearchTerm("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup>
				<Form.Label htmlFor="filterList">Filter List:</Form.Label>
				<Form.Control
					type="text"
					onChange={handleChange}
					value={searchTerm}
					id="filterList"
					aria-label="Filter items in the list"
					placeholder="Search items..."
				/>
				<Button className="custom-button" onClick={handleClear}>
					x
				</Button>
			</InputGroup>
		</Form>
	);
}
