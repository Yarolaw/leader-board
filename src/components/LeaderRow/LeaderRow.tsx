import { FC } from 'react';
import { ILeader } from '../../core/interfaces';
import s from './LeaderRow.module.scss';

type LeaderRowProps = {
	leader: ILeader;
	index: number;
	Pencil: string;
	handleEditOpen: (row: number) => void;
};

const findNameOfRow = (index: number) => {
	if (index === 0) {
		return '1st';
	}
	if (index === 1) {
		return '2nd';
	}
	if (index === 2) {
		return '3rd';
	}
	if (index > 2) {
		return `${index + 1}th`;
	}
	return index + 1;
};
const LeaderRow: FC<LeaderRowProps> = ({ leader, index, Pencil, handleEditOpen }) => {
	return (
		<div key={leader.id} className={s.table__block}>
			<div className={s.table__blockItem}>
				<span className={s.table__blockItem_number}>{findNameOfRow(index)}</span>
				<img src={leader.avatar} alt={leader.name} />
				<span className={s.table__blockItem_score}>{leader.score}</span>
				<span className={s.table__blockItem_name}>{leader.name}</span>
			</div>
			<div>
				<span className={s.table__blockItem_position}>2 places</span>
				<button type="button" onClick={() => handleEditOpen(index)} className={s.table__blockItem_editBtn}>
					<img src={Pencil} alt="edit" />
				</button>
			</div>
		</div>
	);
};

export default LeaderRow;
