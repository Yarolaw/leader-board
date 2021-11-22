import { FC, useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { StoreType } from 'redux/store';

type EditModalProps = {
	open: boolean;
	userIndex: number;
	handleClose: () => void;
	editLeader: (newName: string, newScore: number) => void;
};

const EditModal: FC<EditModalProps> = ({ userIndex, handleClose, editLeader, open }) => {
	const [name, setName] = useState('');
	const [score, setScore] = useState(0);

	const leadersBoard = useSelector((state: StoreType) => state.leadersReducer.leadersBoard);
	const currentDay = useSelector((state: StoreType) => state.leadersReducer.currentDay);

	useEffect(() => {
		const currentLeader = leadersBoard[currentDay][userIndex];
		if (currentLeader) {
			setName(currentLeader.name);
			setScore(currentLeader.score);
		}
	}, [currentDay, leadersBoard]);

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="add-user-score">
			<DialogTitle id="add-user-score">Edit user score</DialogTitle>
			<DialogContent>
				<TextField
					value={name}
					onChange={e => setName(e.target.value)}
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
				/>
				<TextField
					value={score}
					onChange={e => setScore(+e.target.value)}
					margin="dense"
					id="score"
					label="Score"
					type="number"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => editLeader(name, score)}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditModal;
