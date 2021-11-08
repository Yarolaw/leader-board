/* eslint-disable no-restricted-globals */
import { ChangeEvent, FC, useState } from 'react';

import { nanoid } from 'nanoid';
import s from './TableBoard.module.scss';

// icons
import Nicola from '../../images/mini-nicola.png';
import Pencil from '../../images/pencil.png';
import AddModal from '../AddModal/AddModal';

import { ILeader } from '../../core/interfaces';
import LeaderRow from '../LeaderRow/LeaderRow';
import EditModal from '../EditModal/EditModal';

const leadersArr = [
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 245,
		name: 'Nicola Greaves',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Alana Hall',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Simon Malone',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Aisla Pindoria',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Ron Santos',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Joana Carrol',
	},
	{
		id: String(nanoid()),
		avatar: Nicola,
		score: 225,
		name: 'Chrissy Pine',
	},
];

const TableBoard: FC = () => {
	const [arrLeaders, setarrLeaders] = useState<Array<ILeader>>(leadersArr);
	const [openAdd, setOpenAdd] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<number | null>(null);
	const [score, setScore] = useState<number>(0);
	const [name, setName] = useState<string>('');

	const handlerChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handlerChangeScore = (event: ChangeEvent<HTMLInputElement>) => {
		setScore(+event.target.value);
	};
	const addLeader = () => {
		setarrLeaders([...arrLeaders, { id: String(nanoid()), avatar: Nicola, score, name }]);
		setOpenAdd(false);
		setScore(0);
		setName('');
	};

	const editLeader = (newName: string, newScore: number) => {
		setarrLeaders([
			...arrLeaders.map((item, index) => (index === openEdit ? { ...item, name: newName, score: newScore } : item)),
		]);
		setOpenEdit(null);
	};

	const handleAddOpen = () => {
		setOpenAdd(true);
	};
	const handleAddClose = () => {
		setOpenAdd(false);
	};

	return (
		<div className={s.table}>
			<div className={s.table__header}>
				<h2 className={s.table__headerTitle}>Leaders table for this period</h2>
				<button className={s.table__headerBtn} onClick={handleAddOpen} type="button">
					+ Add new score
				</button>
				<AddModal
					name={name}
					score={score}
					open={openAdd}
					handleClose={handleAddClose}
					handlerChangeScore={handlerChangeScore}
					handlerChangeName={handlerChangeName}
					addLeader={addLeader}
				/>
			</div>
			<div>
				{arrLeaders.map((leader, index) => (
					<LeaderRow
						leader={leader}
						index={index}
						Pencil={Pencil}
						handleEditOpen={numberRow => setOpenEdit(numberRow)}
					/>
				))}
				<EditModal
					editLeader={editLeader}
					data={openEdit !== null ? arrLeaders[openEdit] : undefined}
					open={openEdit}
					handleClose={() => setOpenEdit(null)}
				/>
			</div>
		</div>
	);
};

export default TableBoard;
