import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { FrameDataT } from '@/types/effects/effect.types';
import GenericDialog from '@/components/misc/generics/GenericDialog/GenericDialog';
import PixelateDialogContent from './PixelateDialogContent/PixelateDialogContent';

const PixelateDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();
	const [frameData, setFrameData] = useState<FrameDataT | null>(null);

	const handleClose = () => {
		setOpen(false);
		setFrameData(null);
		// reset();
	};

	const handleCreate = () => {
		dispatch(effectsDataActions.importFrame(frameData!));
		handleClose();
	};

	return (
		<GenericDialog
			open={open}
			title='Pixelate Image'
			submitText='Create'
			isSubmitDisabled={!frameData}
			onSubmit={handleCreate}
			onClose={handleClose}
		>
			<PixelateDialogContent frameData={frameData} setFrameData={setFrameData} />
		</GenericDialog>
	);
};

export default PixelateDialog;

// try {
//   // apply rotation if needed
//   // const orientation = await getOrientation(file);
//   // const rotation = ORIENTATION_TO_ANGLE[orientation];
//   // if (rotation) {
//   // 	imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
//   // }
// } catch (e) {
//   console.warn('failed to detect the orientation');
// }
