import './SingleList.css';
import * as api from '../api/firebase';

interface Props extends Pick<api.List, 'name' | 'path'> {
	setListPath: (path: string) => void;
}

export function SingleList({ name, path, setListPath }: Props) {
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
