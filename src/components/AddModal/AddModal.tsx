import { ChangeEvent, FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';

type AddModalProps = {
	score: number;
	name: string;
	open: boolean;
	handleClose: () => void;
	handlerChangeScore: (event: ChangeEvent<HTMLInputElement>) => void;
	handlerChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
	addLeader: () => void;
};

const AddModal: FC<AddModalProps> = ({
	addLeader,
	handlerChangeName,
	handlerChangeScore,
	name,
	score,
	open,
	handleClose,
}) => {
	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="add-user-score">
			<DialogTitle id="add-user-score">Add user score</DialogTitle>
			<DialogContent>
				<TextField
					value={name}
					onChange={handlerChangeName}
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
				/>
				<TextField
					value={score}
					onChange={handlerChangeScore}
					margin="dense"
					id="score"
					label="Score"
					type="number"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={addLeader}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddModal;
