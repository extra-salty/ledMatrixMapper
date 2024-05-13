import useSWRMutation from 'swr/mutation';
import { useDatabase } from '@/providers/DatabaseProvider/useDatabase';
import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { getAnimations } from '@/libs/redux/features/animations/thunk';
import { Alert, Button, Dialog, DialogActions, DialogTitle, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import DuplicateDialogContent from './DuplicateDialogContent/DuplicateDialogContent';

const DuplicateDialog = ({
	row,
	open,
	setOpen,
}: {
	row: AnimationTableRowT;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { animations } = useDatabase();

	const handleDuplicate = async (_: string, { arg }: { arg: FormData }) => {
		const name = arg.get('name') as string;

		await animations.validateName(name);
		await animations.duplicate(row.id as string, arg);

		handleClose();
		dispatch(getAnimations());
	};

	const { isMutating, error, trigger, reset } = useSWRMutation(
		'/animations/duplicate',
		handleDuplicate,
		{
			onError: (e) => console.error(e),
		},
	);

	const isInvalidName = !!error ? error.code === 409 : false;
	const otherFailure = !!error && !isInvalidName;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		trigger(formData);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};

	return (
		<Dialog
			open={open}
			PaperProps={{
				component: 'form',
				sx: { width: '500px' },
				onSubmit: handleSubmit,
			}}
		>
			<DialogTitle>Duplicate animation: {row.name}</DialogTitle>
			<DuplicateDialogContent row={row} isInvalidName={isInvalidName} />
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' onClick={handleClose}>
					Cancel
				</Button>
				<Fade in={otherFailure}>
					<Alert severity='error' variant='outlined'>
						Duplication failed.
					</Alert>
				</Fade>
				<LoadingButton type='submit' variant='outlined' loading={isMutating}>
					Create
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default DuplicateDialog;
