import useSWRMutation from 'swr/mutation';
import pixelateImage from '../../helpers/useImagePixelate';
import { Dispatch, SetStateAction, useState } from 'react';
import { getCroppedImg } from '../../helpers/useImageImport';
import { ColorT } from '@/types/color/color.types';
import { LoadingButton } from '@mui/lab';
import { Box, Skeleton } from '@mui/material';
import { Deblur } from '@mui/icons-material';
import Cropper, { Area } from 'react-easy-crop';
import ImageCropperOptions from '../ImageCropperOptions/ImageCropperOptions';
import ImageCropperSliders from '../ImageCropperSliders/ImageCropperSliders';
import styles from './ImageCropper.module.scss';

const ImageCropper = ({
	imageSrc,
	setFrameData,
}: {
	imageSrc: string | undefined;
	setFrameData: Dispatch<SetStateAction<ColorT[][] | null>>;
}) => {
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState<number>(0);
	const [options, setOptions] = useState(() => ['grid']);
	const isGridOn = options.includes('grid');

	const disabled = imageSrc === undefined;

	const onCropComplete = (_: Area, croppedAreaPixels: Area) =>
		setCroppedAreaPixels(croppedAreaPixels);

	const handleImagePixelate = async () => {
		if (croppedAreaPixels && imageSrc) {
			const croppedImage = (await getCroppedImg(
				imageSrc,
				croppedAreaPixels,
				rotation,
			)) as string;

			const framedata = await pixelateImage(croppedImage);

			if (framedata) setFrameData(framedata);
		}
	};

	const { isMutating, error, trigger, reset } = useSWRMutation(
		'/animation/create',
		handleImagePixelate,
		{
			throwOnError: false,
		},
	);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '15px',
				height: '100%',
			}}
		>
			<Box
				sx={{
					height: '100%',
					position: 'relative',
				}}
			>
				{imageSrc ? (
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						rotation={rotation}
						showGrid={false}
						restrictPosition={false}
						aspect={2 / 1} // width / height
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onRotationChange={setRotation}
						onCropComplete={onCropComplete}
						classes={{ cropAreaClassName: isGridOn ? styles.overlayGrid : '' }}
					/>
				) : (
					<Skeleton
						variant='rectangular'
						height={'100%'}
						animation={false}
						sx={{ bgcolor: 'grey.800' }}
					/>
				)}
			</Box>
			<Box sx={{ display: 'flex', gap: '30px' }}>
				<ImageCropperSliders
					disabled={disabled}
					zoom={zoom}
					setZoom={setZoom}
					rotation={rotation}
					setRotation={setRotation}
				/>
				<ImageCropperOptions
					disableAll={disabled}
					options={options}
					setOptions={setOptions}
				/>
				<LoadingButton
					variant='outlined'
					color='primary'
					startIcon={<Deblur sx={{ rotate: '180deg' }} />}
					disabled={disabled}
					loading={isMutating}
					onClick={() => trigger()}
				>
					Pixelate
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default ImageCropper;
