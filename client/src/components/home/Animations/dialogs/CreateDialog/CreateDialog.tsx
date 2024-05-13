import useSWRMutation from 'swr/mutation';
import { useDatabase } from '@/providers/DatabaseProvider/useDatabase';
import { useDispatch } from 'react-redux';
import { getAnimations } from '@/libs/redux/features/animations/thunk';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogTitle, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CreateDialogContent from './CreateDialogContent/CreateDialogContent';

const CreateDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { animations } = useDatabase();

	const handleCreate = async (_: string, { arg }: { arg: FormData }) => {
		const name = arg.get('name') as string;

		await animations.validateName(name);
		await animations.create(arg);

		handleClose();
		dispatch(getAnimations());
	};

	const { isMutating, error, trigger, reset } = useSWRMutation(
		'/animation/create',
		handleCreate,
		{
			throwOnError: false,
		},
	);

	const isInvalidName = !!error ? error.code === 409 : false;
	const otherFailure = !!error && !isInvalidName;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
			onClose={handleClose}
		>
			<DialogTitle>Create a new animation</DialogTitle>
			<CreateDialogContent isInvalidName={isInvalidName} />
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose} variant='outlined'>
					Cancel
				</Button>
				<Fade in={otherFailure}>
					<Alert severity='error' variant='outlined'>
						Creation failed.
					</Alert>
				</Fade>
				<LoadingButton type='submit' variant='outlined' loading={isMutating}>
					Create
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default CreateDialog;
