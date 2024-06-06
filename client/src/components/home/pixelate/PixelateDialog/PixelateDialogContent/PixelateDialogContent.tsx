import useSWRMutation from 'swr/mutation';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { readFile } from '@/components/home/Effect/Actions/ImageImport/helpers/useImageImport';
import { FrameDataT } from '@/types/effect/effect.types';
import { FileOpen, RestartAlt } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import FrameDynamic from '@/components/temp/FrameComps/FrameDynamic/FrameDynamic';
import ImageCropper from '@/components/home/Effect/Actions/ImageImport/components/ImageCropper/ImageCropper';
import FrameStatic from '@/components/temp/FrameComps/FrameStatic/FrameStatic';

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

	const newData = frameData?.map((column, x) =>
		column.map((cell, y) => {
			if (cell && cell?.color) {
				const brightness = cell.color.brightness;

				return { ...cell.color, brightness: 100 };
			} else {
				return undefined;
			}
		}),
	);

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
					{/* <FrameStatic frameData={newData} /> */}
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
