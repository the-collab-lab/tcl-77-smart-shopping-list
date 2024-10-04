import Button from "react-bootstrap/Button";
import "./SingleList.scss";
import { useNavigate } from "react-router-dom";

export function SingleList({ name }: { name: string }) {
	const navigate = useNavigate();

	function handleClick() {
		setTimeout(() => {
			navigate(`/list/${name}`);
		}, 200);
	}

	return (
		<li className="SingleList">
			<Button onClick={handleClick}>{name}</Button>
		</li>
	);
}
