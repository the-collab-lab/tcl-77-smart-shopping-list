import { ChangeEvent, FormEvent, useState } from "react";
import { shareList } from "../../api";
import { getUser } from "../ProtectedRoute";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";

import toast from "react-hot-toast";

interface Props {
	listPath: string;
}

const ShareListForm = ({ listPath }: Props) => {
	const { user: currentUser } = getUser();

	const [emailName, setEmailName] = useState("");

	const handleEmailNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailName(e.target.value);
	};

	const handleInvite = async (
		e: FormEvent<HTMLFormElement>,
		listPath: string,
	) => {
		e.preventDefault();

		try {
			await toast.promise(shareList(listPath, currentUser, emailName), {
				loading: "sharing list with existing user",
				success: () => {
					setEmailName("");
					return `Successfully invited ${emailName} to your list!`;
				},
				error: () => {
					return `Oops! Failed to invite ${emailName} to your list. Please verify correct email!`;
				},
			});
		} catch (error) {
			console.error("Oops! Failed to invite user:", error);
		}
	};

	return (
		<Form onSubmit={(e) => handleInvite(e, listPath)}>
			<Form.Label htmlFor="recipient-email">Recipient Email:</Form.Label>
			<InputGroup>
				<Form.Control
					id="recipient-email"
					type="email"
					name="recipient-email"
					value={emailName}
					placeholder="Enter e-mail address. . ."
					onChange={handleEmailNameChange}
					required
					aria-label="Enter the user email address to share list"
					aria-required
				/>
				<Button
					className="custom-button"
					type="submit"
					aria-label="submits form to share shopping list"
				>
					Invite User
				</Button>
			</InputGroup>
		</Form>
	);
};

export default ShareListForm;
