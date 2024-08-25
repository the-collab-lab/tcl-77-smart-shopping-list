import { useState } from 'react';
import { createList } from '../api';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export function CreateList({ userId, userEmail, setListPath }) {
	const [inputValue, setInputValue] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Ensure inputValue has a length > 0 after trimming
		if (!inputValue.trim()) {
			toast.error('List name cannot be empty.');
			return;
		}

		try {
			await createList(userId, userEmail, inputValue);
			const path = `${userId}/${inputValue}`;
			setListPath(path);
			setInputValue('');
			toast.success('Success: Your New List is Created!');
			// Delay for toast notification before redirecting
			setTimeout(() => {
				navigate('/list');
			}, 1500); // 1.5 seconds delay
		} catch (error) {
			console.error('Error creating list:', error);
			toast.error('Failed to create the list. Please try again.');
		}
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};
	return (
		<>
			<li>
				<form onSubmit={handleSubmit}>
					<h3>Create New Shopping List</h3>
					<label htmlFor="newListName">Name Your List</label>
					<br />
					<input
						type="text"
						value={inputValue}
						onChange={handleChange}
						name="newListName"
						id="newListName"
						aria-label="Shopping List Name"
						aria-required="true" // Indicates that this field is required
					/>
					<br />
					<button aria-label="Create new shopping list">Create List</button>
				</form>
				<Toaster />
			</li>
		</>
	);
}
