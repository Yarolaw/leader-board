import { FC, useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { ILeader } from 'core/interfaces';

type EditModalProps = {
	open: number | null;
	handleClose: () => void;
	data: ILeader | undefined;
	editLeader: (newName: string, newScore: number) => void;
};

const EditModal: FC<EditModalProps> = ({ open, handleClose, data, editLeader }) => {
	const [name, setName] = useState('');
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (data) {
			setName(data.name);
			setScore(data.score);
		}
	}, [data]);

	return (
		<Dialog open={open !== null} onClose={handleClose} aria-labelledby="add-user-score">
			<DialogTitle id="add-user-score">Edit user score</DialogTitle>
			<DialogContent>
				{data && (
					<>
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
					</>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => editLeader(name, score)}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditModal;
