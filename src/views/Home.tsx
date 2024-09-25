import React from "react";
import "./Home.css";
import { SingleList, CreateList } from "../components";
import { List, User } from "../api";
import { NewUserHomeInfo } from "../views";

interface Props {
	data: List[];
	setListPath: (path: string) => void;
	user: User | null;
}

export function Home({ data, setListPath, user }: Props) {
	if (!user) {
		return <NewUserHomeInfo />;
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{user && (
				<ul>
					{data.map((list, index) => (
						<SingleList
							key={index}
							name={list.name}
							path={list.path}
							setListPath={setListPath}
						/>
					))}
					<CreateList user={user} setListPath={setListPath} />
				</ul>
			)}
		</div>
	);
}
