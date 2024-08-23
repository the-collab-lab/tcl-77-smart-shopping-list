import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList, useAuth } from '../api';
import { useNavigate } from 'react-router-dom';

export function Home({ data, setListPath }) {
	const hasList = data.length !== 0;

	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	const [inputValue, setInputValue] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createList(userId, userEmail, inputValue);
			const path = `${user.uid}/${inputValue}`;
			setListPath(path);
			setInputValue('');
			alert('Success: Your New List is Created!');
			navigate('/list');
		} catch {
			console.error('Error creating list:', error);
			alert('Failed to create the list. Please try again.');
		}
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{hasList &&
					data.map((list, index) => (
						<SingleList
							key={index}
							name={list.name}
							path={list.path}
							setListPath={setListPath}
						/>
					))}
			</ul>

			<form onSubmit={handleSubmit}>
				<h3>Create New Shopping List</h3>
				<label htmlFor="newListName">Name Your List</label>
				<br />
				<input
					type="text"
					value={inputValue}
					onChange={handleChange}
					name="newListName"
					required
					aria-label="Shopping List Name"
					aria-required="true" // Indicates that this field is required
				/>
				<br />
				<button aria-label="Create new shopping list">Create List</button>
			</form>
		</div>
	);
}
