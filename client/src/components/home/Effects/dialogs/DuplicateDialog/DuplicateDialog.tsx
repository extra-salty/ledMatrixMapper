import { useDispatch } from 'react-redux';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { Alert, Button, Dialog, DialogActions, DialogTitle, Fade } from '@mui/material';
import { EffectsTableRowT } from '@/types/effect/effectTable.types';
import DuplicateDialogContent from './DuplicateDialogContent/DuplicateDialogContent';
import GenericDialog from '@/components/misc/generics/GenericDialog/GenericDialog';

const DuplicateDialog = ({
	row,
	open,
	setOpen,
}: {
	row: EffectsTableRowT;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const title = `Duplicate effect: ${row.name}`;

	const handleClose = () => {
		setOpen(false);
		// setIsInvalidName(false);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		// const exist = Object.values(effects[animationId])
		// 	.map((effects) => effects.name)
		// 	.includes(name);

		// if (exist) {
		// setIsInvalidName(true);
		// } else {
		// dispatch(effectsDataActions.addEffect(formData));

		// 	handleClose();
		// }
	};

	return (
		<GenericDialog
			open={open}
			title={title}
			submitText='Duplicate'
			onSubmit={handleSubmit}
			onClose={handleClose}
		>
			<DuplicateDialogContent row={row} isInvalidName={false} />
		</GenericDialog>
	);
};

export default DuplicateDialog;
