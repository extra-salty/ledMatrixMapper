import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

const RemoveDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();

	const handleClose = () => setOpen(false);

	const handleAccept = () => {
		handleClose();
		dispatch(playlistDataActions.resetData());
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				sx: { width: '500px' },
			}}
			onClose={handleClose}
		>
			<DialogTitle>Clear editor</DialogTitle>
			<DialogContent>
				<DialogContentText>Asd</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAccept}>Create</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RemoveDialog;
