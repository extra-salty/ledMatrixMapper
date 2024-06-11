import useSWRMutation from 'swr/mutation';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { readFile } from '@/components/home/Effect/Actions/ImageImport/helpers/useImageImport';
import { FrameDataT } from '@/types/effect/effect.types';
import { FileOpen } from '@mui/icons-material';
import { Box, CircularProgress, TextField } from '@mui/material';
import ImageCropper from '@/components/home/Effect/Actions/ImageImport/components/ImageCropper/ImageCropper';
import FrameReviewer from './FrameReviewer/FrameReviewer';

const PixelateDialogContent = ({
	frameData,
	setFrameData,
}: {
	frameData: FrameDataT | null;
	setFrameData: Dispatch<SetStateAction<FrameDataT | null>>;
}) => {
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

	const {
		data: imageSrc,
		isMutating,
		trigger,
	} = useSWRMutation('/animation/create', handleImageChange, {
		throwOnError: false,
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '15px',
				width: '800px',
				height: '600px',
			}}
		>
			<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				{isMutating ? <CircularProgress size={24} /> : <FileOpen />}
				<TextField
					fullWidth
					type='file'
					variant='standard'
					inputProps={{ accept: 'image/*' }}
					onChange={handleBrowse}
				/>
			</Box>
			{frameData ? (
				<FrameReviewer frameData={frameData} setFrameData={setFrameData} />
			) : (
				<ImageCropper imageSrc={imageSrc} setFrameData={setFrameData} />
			)}
		</Box>
	);
};

export default PixelateDialogContent;
