import { useDispatch } from 'react-redux';
import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CreateDialogContent from './CreateDialogContent/CreateDialogContent';

const CreateDialog = ({
	initialAnimation = '',
	open,
	setOpen,
}: {
	initialAnimation?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const effects = useEffectCollections();

	const [isInvalidName, setIsInvalidName] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
		setIsInvalidName(false);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const animationId = formData.get('animationId') as string;
		const name = formData.get('name') as string;

		const exist = Object.values(effects[animationId])
			.map((effects) => effects.name)
			.includes(name);

		if (exist) {
			setIsInvalidName(true);
		} else {
			dispatch(effectsDataActions.addEffect(formData));

			handleClose();
		}
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
			<DialogTitle>Create a new effect</DialogTitle>
			<CreateDialogContent
				initialAnimation={initialAnimation}
				isInvalidName={isInvalidName}
			/>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose} variant='outlined'>
					Cancel
				</Button>
				<LoadingButton type='submit' variant='outlined'>
					Create
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default CreateDialog;
