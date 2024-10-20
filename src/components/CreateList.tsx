import { ChangeEvent, FormEvent, useState } from "react";
import { createList, User } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface Props {
	user: User;
	setListPath: (path: string) => void;
}

export function CreateList({ user, setListPath }: Props) {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Ensure inputValue has a length > 0 after trimming
		if (!inputValue.trim()) {
			toast.error("List name cannot be empty.");
			return;
		}

		try {
			await createList(user, inputValue);
			const path = `${user.uid}/${inputValue}`;
			setListPath(path);
			setInputValue("");
			toast.success("Success: Your New List is Created!");
			// Delay for toast notification before redirecting
			setTimeout(() => {
				const listName = path.split("/").pop();
				navigate(`/list/${listName}`);
			}, 1500); // 1.5 seconds delay
		} catch (error) {
			console.error("Error creating list:", error);
			toast.error("Failed to create the list. Please try again.");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<h3 className="heading-text">
					<Form.Label htmlFor="newListName">Create A New List</Form.Label>
				</h3>
				<InputGroup>
					<br />
					<Form.Control
						type="text"
						value={inputValue}
						onChange={handleChange}
						name="newListName"
						id="newListName"
						aria-label="Shopping List Name"
						aria-required="true" // Indicates that this field is required
					/>
					<br />
					<div className="custom-button-wrapper">
						<Button
							className="custom-button"
							aria-label="Create new shopping list"
							type="submit"
						>
							Create List
						</Button>
					</div>
				</InputGroup>
			</Form>
		</>
	);
}
