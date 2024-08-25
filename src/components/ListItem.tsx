import * as api from '../api';
import './ListItem.css';

type Props = Pick<api.ListItem, 'name'>;

export function ListItem({ name }: Props) {
	return <li className="ListItem">{name}</li>;
}
