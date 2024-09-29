import "./SingleList.css";
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
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
