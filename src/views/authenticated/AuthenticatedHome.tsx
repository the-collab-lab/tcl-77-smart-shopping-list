// import React from "react";
import { SingleList, CreateList } from "../../components";
import { List, User } from "../../api";
import "./AuthenticatedHome.scss";

interface Props {
	data: List[];
	setListPath: (path: string) => void;
	user: User | null;
}

export function AuthenticatedHome({ data, setListPath, user }: Props) {
	return (
		<div className="home">
			{user && (
				<>
					<CreateList user={user} setListPath={setListPath} />
					<ul className="lists">
						{data.map((list, index) => (
							<SingleList
								key={index}
								name={list.name}
								path={list.path}
								setListPath={setListPath}
							/>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
