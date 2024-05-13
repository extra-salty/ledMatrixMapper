import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { playlistStateActions } from '@/libs/redux/features/playlist/state/slice';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ResetDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();

	const handleClose = () => setOpen(false);

	const handleReset = () => {
		handleClose();
		dispatch(playlistDataActions.resetData());
		dispatch(playlistStateActions.resetState());
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				sx: { width: '500px' },
			}}
			onClose={handleClose}
		>
			<DialogTitle>Reset the editor</DialogTitle>
			<DialogContent dividers>
				Any unsaved progress will be lost. Are you sure you want to reset the editor?
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose} variant='outlined'>
					Cancel
				</Button>
				<Button variant='outlined' onClick={handleReset}>
					Reset
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ResetDialog;
