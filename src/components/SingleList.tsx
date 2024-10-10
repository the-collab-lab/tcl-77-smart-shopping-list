import Button from "react-bootstrap/Button";
import "./SingleList.scss";
import * as api from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { deleteList } from "./../api";

interface Props extends Pick<api.List, "name" | "path"> {
	setListPath: (path: string) => void;
	User: api.User;
}

export function SingleList({ name, path, setListPath, User }: Props) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		setTimeout(() => {
			navigate(`/list/${name}`);
		}, 200);
	}

	function handleDelete() {
		console.log("Delete button clicked!");
		console.log("Deleting list", name);
		deleteList(name, User);
	}

	return (
		<li className="SingleList">
			<Button onClick={handleClick}>{name}</Button>
			<Button variant="danger" onClick={handleDelete}>
				Delete List
			</Button>
		</li>
	);
}
