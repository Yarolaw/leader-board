import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { getLeaders, LeadersSlice, addNewLeader } from 'redux/LeadersSlice';
// types
import { StoreType } from 'redux/store';
// components
import LeaderRow from 'components/LeaderRow';
import AddModal from 'components/AddModal';
// icons
import Pencil from 'images/pencil.png';
import RightArrow from 'images/rightArrow.svg';
import LeftArrow from 'images/leftArrow.svg';
// styles
import s from './TableBoard.module.scss';

const TableBoard: FC = () => {
	const [openAdd, setOpenAdd] = useState(false);
	const [score, setScore] = useState(0);
	const [name, setName] = useState('');
	const [disabled, setDisabled] = useState(false);

	const dispatch = useDispatch();
	const { prevDay, nextDay } = LeadersSlice.actions;

	const leadersArray = useSelector(
		(state: StoreType) => state.leadersReducer.leadersBoard[state.leadersReducer.currentDay]
	);
	const leadersHistory = useSelector((state: StoreType) => state.leadersReducer.leadersBoard);
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

	const handleAddOpen = () => {
		setOpenAdd(true);
	};
	const handleAddClose = () => {
		setOpenAdd(false);
	};

	const prev = () => {
		dispatch(prevDay());

		if (currentDay - 1 === 0) setDisabled(true);
	};

	const next = () => {
		if (leadersArray === leadersHistory[leadersHistory.length - 1]) {
			dispatch(getLeaders());
		}

		dispatch(nextDay());
		setDisabled(false);
	};

	useEffect(() => {
		dispatch(getLeaders());
		setDisabled(true);
	}, []);

	return (
		<div className={s.table}>
			<div className={s.table__header}>
				<h2 className={s.table__headerTitle}>Leaders table for this period</h2>
				<button className={s.table__headerArrow} onClick={prev} type="button" disabled={disabled}>
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
					<LeaderRow key={leader.id} leader={leader} index={index} Pencil={Pencil} />
				))}
			</div>
		</div>
	);
};

export default TableBoard;
