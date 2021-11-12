import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaders, LeadersSlice, addNewLeader } from '../../redux/LeadersSlice';
import { StoreType } from '../../redux/store';
import LeaderRow from '../LeaderRow';
import EditModal from '../EditModal';
import AddModal from '../AddModal';
import s from './TableBoard.module.scss';
// icons
import Pencil from '../../images/pencil.png';
import RightArrow from '../../images/rightArrow.svg';
import LeftArrow from '../../images/leftArrow.svg';

const TableBoard: FC = () => {
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [name, setName] = useState('');
	const [disabled, setDisabled] = useState(false);

	const dispatch = useDispatch();
	const { prevDay, nextDay, editOneLeader } = LeadersSlice.actions;
	const leadersArray = useSelector(
		(state: StoreType) => state.leadersReducer.leadersBoard[state.leadersReducer.currentDay]
	);
	const currentDay = useSelector((state: StoreType) => state.leadersReducer.currentDay);

	const handlerChangeName = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handlerChangeScore = (event: ChangeEvent<HTMLInputElement>) => {
		setScore(+event.target.value);
	};
	const addLeader = () => {
		dispatch(addNewLeader({ name, score }));
		setOpenAdd(false);
		setScore(0);
		setName('');
	};

	const editLeader = (newName: string, newScore: number) => {
		dispatch(editOneLeader({ openEdit, newName, newScore }));
		setOpenEdit(null);
	};

	const handleAddOpen = () => {
		setOpenAdd(true);
	};
	const handleAddClose = () => {
		setOpenAdd(false);
	};

	const prev = () => {
		dispatch(prevDay());
		return currentDay - 1 === 0 ? setDisabled(true) : null;
	};

	const next = () => {
		dispatch(getLeaders());
		dispatch(nextDay());
		setDisabled(false);
	};

	useEffect(() => {
		dispatch(getLeaders());
	}, []);

	return (
		<div className={s.table}>
			<div className={s.table__header}>
				<h2 className={s.table__headerTitle}>Leaders table for this period</h2>
				<button
					className={s.table__headerArrow}
					onClick={prev}
					type="button"
					style={{ padding: 0 }}
					disabled={disabled}
				>
					<img
						className={disabled ? s.table__headerArrowImageDisabled : s.table__headerArrowImage}
						src={LeftArrow}
						alt="KeyboardArrowLeftOutlinedIcon"
					/>
				</button>
				<button className={s.table__headerArrow} type="button" onClick={next}>
					<img className={s.table__headerArrowImage} src={RightArrow} alt="KeyboardArrowLeftOutlinedIcon" />
				</button>

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
				{leadersArray?.map((leader, index) => (
					<LeaderRow
						key={leader.id}
						leader={leader}
						index={index}
						Pencil={Pencil}
						handleEditOpen={numberRow => setOpenEdit(numberRow)}
					/>
				))}
				<EditModal
					editLeader={editLeader}
					data={openEdit !== null ? leadersArray[openEdit] : undefined}
					open={openEdit}
					handleClose={() => setOpenEdit(null)}
				/>
			</div>
		</div>
	);
};

export default TableBoard;
