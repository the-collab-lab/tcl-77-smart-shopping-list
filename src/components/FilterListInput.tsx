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
		<Form className="w-100 w-lg-auto" onSubmit={handleSubmit}>
			<InputGroup className="d-flex align-items-center mt-1">
				<Form.Label htmlFor="filterList" className="me-2 mb-0">
					<span className="fw-bold">Filter List:</span>
				</Form.Label>
				<Form.Control
					type="text"
					onChange={handleChange}
					value={searchTerm}
					id="filterList"
					aria-label="Filter items in the list"
					placeholder="Search items..."
				/>
				<Button className="custom-button" onClick={handleClear}>
					Clear
				</Button>

			</InputGroup>
		</Form>
	);
}
