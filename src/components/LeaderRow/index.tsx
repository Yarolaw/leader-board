/* eslint-disable no-nested-ternary */
import { FC, useState } from 'react';
import { ILeader } from 'core/interfaces';

import ArrowDown from 'images/ArrowDown.svg';
import ArrowUp from 'images/ArrowUp.svg';
import ArrowToRight from 'images/ArrowToRight.svg';

import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { LeadersSlice } from 'redux/LeadersSlice';
import EditModal from 'components/EditModal';
import s from './LeaderRow.module.scss';

type LeaderRowProps = {
	leader: ILeader;
	index: number;
	Pencil: string;
};

const findNameOfRow = (index: number) => {
	switch (index) {
		case 0:
			return '1st';

		case 1:
			return '2nd';

		case 2:
			return '3rd';

		default:
			return `${index + 1}th`;
	}
};

const showPosition = (leader: ILeader) => {
	if (leader.changePosition === 1 || leader.changePosition === -1) return `${Math.abs(leader.changePosition)} place`;
	if (leader.changePosition === 0) return 'No change';
	return `${Math.abs(leader.changePosition)} places`;
};

const LeaderRow: FC<LeaderRowProps> = ({ leader, index, Pencil }) => {
	const [openEdit, setOpenEdit] = useState(false);
	const dispatch = useDispatch();
	const { editOneLeader } = LeadersSlice.actions;

	const editLeader = (newName: string, newScore: number) => {
		dispatch(editOneLeader({ newName, newScore, userIndex: index }));
		setOpenEdit(false);
	};
	const handleModalOpen = () => {
		setOpenEdit(true);
	};
	const handleModalClose = () => {
		setOpenEdit(false);
	};

	return (
		<div className={s.TableRow}>
			<div className={s.RowInfo}>
				<span className={s.RowInfo__number}>{findNameOfRow(index)}</span>
				<img src={leader.avatar} alt={leader.name} />
				<span className={s.RowInfo__score}>{leader.score}</span>
				<span className={s.RowInfo__name}>{leader.name}</span>
			</div>
			<div className={s.RowPosition}>
				<span
					className={cx(s.RowPosition__change, {
						[s.RowPosition__change_up]: leader.changePosition > 0,
						[s.RowPosition__change_down]: leader.changePosition < 0,
						[s.RowPosition__change_noChange]: leader.changePosition === 0,
					})}
				>
					<img
						className={s.RowPosition__positionImage}
						src={leader.changePosition < 0 ? ArrowDown : leader.changePosition > 0 ? ArrowUp : ArrowToRight}
						alt="Arrow"
					/>
					{showPosition(leader)}
				</span>
				<button type="button" onClick={handleModalOpen} className={s.RowPosition__editBtn}>
					<img src={Pencil} alt="edit" />
				</button>
			</div>
			<EditModal open={openEdit} editLeader={editLeader} userIndex={index} handleClose={handleModalClose} />
		</div>
	);
};

export default LeaderRow;
