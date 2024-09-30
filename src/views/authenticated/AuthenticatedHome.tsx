import React from "react";
import { SingleList, CreateList } from "../../components";
import { List, User } from "../../api";

interface Props {
	data: List[];
	setListPath: (path: string) => void;
	user: User | null;
}

export function AuthenticatedHome({ data, setListPath, user }: Props) {
	return (
		<>
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{user && (
				<>
					<ul>
						{data.map((list, index) => (
							<SingleList
								key={index}
								name={list.name}
								path={list.path}
								setListPath={setListPath}
							/>
						))}
					</ul>
					<CreateList user={user} setListPath={setListPath} />
				</>
			)}
		</>
	);
}
