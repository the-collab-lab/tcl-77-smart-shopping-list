import { ChangeEvent, FormEvent, useState } from "react";
import { shareList } from "../../api/firebase";
import { validateTrimmedString } from "../../utils";

import toast from "react-hot-toast";

import { useAuth } from "../../api/useAuth";

interface Props {
	listPath: string | null;
}

const ShareListForm = ({ listPath }: Props) => {
	const { user: currentUser } = useAuth();

	const [emailName, setEmailName] = useState("");

	const handleEmailNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmailName(e.target.value);
	};

	const handleInvite = async (
		e: FormEvent<HTMLFormElement>,
		listPath: string | null,
	) => {
		console.log("Button clicked! Inviting user!");
		e.preventDefault();

		if (!listPath) {
			return;
		}

		if (!currentUser) {
			return;
		}

		const trimmedEmailName = validateTrimmedString(emailName);

		if (!trimmedEmailName) {
			return;
		}

		try {
			await toast.promise(shareList(listPath, currentUser, trimmedEmailName), {
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
		<form onSubmit={(e) => handleInvite(e, listPath)}>
			<label htmlFor="recipient-email">
				Recipient Email:
				<input
					id="recipient-email"
					type="email"
					name="recipient-email"
					value={emailName}
					placeholder="Enter e-mail address. . ."
					onChange={handleEmailNameChange}
					required
					aria-label="Enter the user name to share list"
					aria-required
				/>
			</label>
			<br />
			<button type="submit" aria-label="Add item to shopping list">
				Invite User
			</button>
		</form>
	);
};

export default ShareListForm;
