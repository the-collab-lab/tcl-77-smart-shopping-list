import './Home.css';
import { SingleList } from '../components';
import { CreateList } from '../components/CreateList';


export function Home({ data, setListPath, userId, userEmail }) {
	const hasList = data.length !== 0;

	return (
		<>
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
					{
						<CreateList
							userId={userId}
							userEmail={userEmail}
							setListPath={setListPath}
						/>
					}
				</ul>
			</div>
		</>
	);
}
