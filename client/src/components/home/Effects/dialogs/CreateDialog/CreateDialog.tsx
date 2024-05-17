import { useDispatch } from 'react-redux';
import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import CreateDialogContent from './CreateDialogContent/CreateDialogContent';
import GenericDialog from '@/components/misc/generics/GenericDialog/GenericDialog';

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
		<GenericDialog
			title='Create a new effect'
			submitText='Create'
			open={open}
			onSubmit={handleSubmit}
			onClose={handleClose}
		>
			<CreateDialogContent
				initialAnimation={initialAnimation}
				isInvalidName={isInvalidName}
			/>
		</GenericDialog>
	);
};

export default CreateDialog;
