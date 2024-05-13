import useSWRMutation from 'swr/mutation';
import { useDispatch } from 'react-redux';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { readFile } from '../../Effect/Actions/ImageImport/helpers/useImageImport';
import { ColorT } from '@/types/color/color.types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
} from '@mui/material';
import { FileOpen, RestartAlt } from '@mui/icons-material';
import ImageCropper from '../../Effect/Actions/ImageImport/components/ImageCropper/ImageCropper';
import Frame from '@/components/temp/FrameComps/Frame/Frame';

const PixelateDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();
	const [frameData, setFrameData] = useState<ColorT[][] | null>(null);

	const handleClose = () => {
		setOpen(false);
		setFrameData(null);
		reset();
	};

	const handleReset = () => setFrameData(null);

	const handleBrowse = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			trigger(file);
		}
	};

	const handleImageChange = async (_: string, { arg }: { arg: File }) => {
		setFrameData(null);

		return (await readFile(arg)) as string;
	};

	const handleCreate = () => {
		dispatch(effectsDataActions.importFrame(frameData!));
		handleClose();
	};

	const {
		data: imageSrc,
		isMutating,
		error,
		trigger,
		reset,
	} = useSWRMutation('/animation/create', handleImageChange, {
		throwOnError: false,
	});

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: { maxWidth: 'none' },
			}}
		>
			<DialogTitle>Pixelate Image</DialogTitle>
			<DialogContent
				dividers
				sx={{
					display: 'flex',
					flexDirection: 'column',

					gap: '15px',
					width: '800px',
					height: '600px',
				}}
			>
				<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
					<FileOpen />
					<TextField
						fullWidth
						type='file'
						variant='standard'
						inputProps={{ accept: 'image/*' }}
						onChange={handleBrowse}
						// classes={{  }}
					/>
				</Box>
				{frameData ? (
					<Box>
						<Frame isDisabled frameData={frameData} frameId='pixelate' />
						<Button variant='outlined' onClick={handleReset} startIcon={<RestartAlt />}>
							Reset
						</Button>
					</Box>
				) : (
					<ImageCropper imageSrc={imageSrc} setFrameData={setFrameData} />
				)}
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button onClick={handleClose} variant='outlined'>
					Cancel
				</Button>
				<Button
					disabled={!frameData}
					type='submit'
					variant='outlined'
					onClick={handleCreate}
				>
					Create
				</Button>
			</DialogActions>
		</Dialog>
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
