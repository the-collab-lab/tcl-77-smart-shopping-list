import React from "react";
import "./Home.css";
import { SingleList, CreateList } from "../components";
import { List, User } from "../api/firebase";

import "./Home.scss";
import { List, User } from "../api";
import { AuthenticatedHome, UnauthenticatedHome } from "../views";

interface Props {
	data: List[];
	setListPath: (path: string) => void;
	user: User | null;
}

export function Home({ data, setListPath, user }: Props) {
	return (
		<>

			<div className="Home">
				<p>
					Hello from the home (<code>/</code>) page!
				</p>
				{user && (
					<ul>
						{data.map((list, index) => (
							<SingleList key={index} name={list.name} />
						))}

						<CreateList user={user} setListPath={setListPath} />
					</ul>
				)}
			</div>
			{user ? (
				<AuthenticatedHome data={data} setListPath={setListPath} user={user} />
			) : (
				<UnauthenticatedHome />
			)}
		</>
	);
}
