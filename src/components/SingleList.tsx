import "./SingleList.scss";
import * as api from "../api/firebase";
import Button from "react-bootstrap/Button";

interface Props extends Pick<api.List, "name" | "path"> {
	setListPath: (path: string) => void;
}

export function SingleList({ name, path, setListPath }: Props) {
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<Button onClick={handleClick}>{name}</Button>
		</li>
	);
}
