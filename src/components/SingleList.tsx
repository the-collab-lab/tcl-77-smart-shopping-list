import Button from "react-bootstrap/Button";
import "./SingleList.scss";
import * as api from "../api/firebase";
import { useNavigate } from "react-router-dom";

interface Props extends Pick<api.List, "name" | "path"> {
	setListPath: (path: string) => void;
}

export function SingleList({ name, path, setListPath }: Props) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		setTimeout(() => {
			navigate(`/list/${name}`);
		}, 200);
	}

	return (
		<li className="SingleList">
			<Button className="custom-button" onClick={handleClick}>
				{name}
			</Button>
		</li>
	);
}
