import * as api from '../api';
import './ListItem.css';

type Props = Pick<api.ListItem, 'itemName'>;

export function ListItem({ itemName }: Props) {
	return <li className="ListItem">{itemName}</li>;
}
