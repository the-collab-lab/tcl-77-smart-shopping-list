import './Home.css';
import { SingleList } from '../components';
import { useState } from 'react';
import { createList, useAuth } from '../api';

export function Home({ data, setListPath }) {
	const hasList = data.length !== 0;

	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		createList(userId, userEmail, inputValue);
		setInputValue('');
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
				<input type="text" value={inputValue} onChange={handleChange} />
				<br />
				<button>Create List</button>
			</form>
		</div>
	);
}
