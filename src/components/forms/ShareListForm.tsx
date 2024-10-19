import "./ShareListForm.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { shareList } from "../../api";
import { getUser } from "../ProtectedRoute";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { FaRegShareSquare } from "react-icons/fa";
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
		<Form
			className="Share-ListForm d-flex flex-column align-items-center mt-3"
			onSubmit={(e) => handleInvite(e, listPath)}
		>
			<Form.Label
				className="h3 Share-ListForm text-center "
				htmlFor="recipient-email"
			>
				Invite others to view your list!
			</Form.Label>
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
					<FaRegShareSquare />
					<span>Share</span>
				</Button>
			</InputGroup>
		</Form>
	);
};

export default ShareListForm;
