import "./SingleList.css";
import * as api from "../api/firebase";
import { useNavigate } from "react-router-dom";

interface Props extends Pick<api.List, "name" | "path"> {
	setListPath: (path: string) => void;
}

export function SingleList({ name, path, setListPath }: Props) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate(`/list/${name}`);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
