import "./Home.css";
import { SingleList } from "../components";

export function Home({ data, setListPath }) {
	const hasList = data.length !== 0;
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
		</div>
	);
}
