import './Home.css';
import { SingleList } from '../components';
import { createList } from '../api';
import { useState } from 'react';

export function Home({ userEmail, userId, data, setListPath }) {
	const hasList = data.length !== 0;
	const [inputValue, setInputValue] = useState('');

	const handleChange = (e) => {
		setInputValue(e.target.value);
		console.log(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createList(userId, userEmail, inputValue);
		console.log(inputValue);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="new-list-name"> Name Your New List </label>
				<br />
				<input onChange={handleChange} type="text" />
				<button type="submit">Create List</button>
			</form>
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
		</div>
	);
}
