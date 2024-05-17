import useSWRMutation from 'swr/mutation';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { readFile } from '@/components/home/Effect/Actions/ImageImport/helpers/useImageImport';
import { FrameDataT } from '@/types/effects/effect.types';
import { FileOpen, RestartAlt } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import Frame from '@/components/temp/FrameComps/Frame/Frame';
import ImageCropper from '@/components/home/Effect/Actions/ImageImport/components/ImageCropper/ImageCropper';

const PixelateDialogContent = ({
	frameData,
	setFrameData,
}: {
	frameData: FrameDataT | null;
	setFrameData: Dispatch<SetStateAction<FrameDataT | null>>;
}) => {
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
				<FileOpen />
				<TextField
					fullWidth
					type='file'
					variant='standard'
					inputProps={{ accept: 'image/*' }}
					onChange={handleBrowse}
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
		</Box>
	);
};

export default PixelateDialogContent;
