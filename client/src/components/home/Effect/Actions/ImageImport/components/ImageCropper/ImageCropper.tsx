import pixelateImage from '../../helpers/useImagePixelate';
import useSWRMutation from 'swr/mutation';
import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { getCroppedImg } from '../../helpers/useImageImport';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, Skeleton, Tooltip } from '@mui/material';
import { Deblur, RestartAlt } from '@mui/icons-material';
import { FrameDataT } from '@/types/effect/effect.types';
import Cropper, { Area } from 'react-easy-crop';
import ImageCropperOptions from '../ImageCropperOptions/ImageCropperOptions';
import ImageCropperSliders from '../ImageCropperSliders/ImageCropperSliders';
import styles from './ImageCropper.module.scss';

const borderStyle = (
	borderEnabled: boolean,
	width: number,
	height: number,
): CSSProperties =>
	borderEnabled
		? {
				position: 'absolute',
				content: '""',
				width: '100%',
				height: '100%',
				background: `linear-gradient(to right, gray 2px, transparent 2px),
            linear-gradient(to bottom, gray 2px, transparent 2px)`,
				backgroundSize: `calc(100% / ${width}) calc(100% / ${height})`,
		  }
		: {};

const ImageCropper = ({
	imageSrc,
	setFrameData,
}: {
	imageSrc: string | undefined;
	setFrameData: Dispatch<SetStateAction<FrameDataT | null>>;
}) => {
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const matrixSize = useActiveMatrixSize()!;

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

			const framedata = await pixelateImage(matrixSize, croppedImage);

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

	const handleReset = () => {
		setCrop({ x: 0, y: 0 });
		setZoom(1);
		setRotation(0);
	};

	return (
		<>
			<Box
				sx={{
					height: '100%',
					position: 'relative',
					// '&::before': borderStyle(isGridOn, 12, 24),
				}}
			>
				{imageSrc ? (
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						rotation={rotation}
						showGrid={isGridOn}
						restrictPosition={false}
						aspect={matrixSize.width / matrixSize.height}
						objectFit='contain'
						onCropChange={setCrop}
						onZoomChange={setZoom}
						onRotationChange={setRotation}
						onCropComplete={onCropComplete}
						// classes={{ cropAreaClassName: isGridOn ? styles.overlayGrid : '' }}
						// classes={{ cropAreaClassName: borderStyle(isGridOn, 12, 24) }}
						style={{
							cropAreaStyle: {
								// '&::before': borderStyle(isGridOn, 12, 24),
							},
						}}
					/>
				) : (
					<Skeleton
						variant='rectangular'
						height={'100%'}
						animation={false}
						sx={(theme) => ({ bgcolor: `${theme.palette.grey}` })}
					/>
				)}
			</Box>
			<Box sx={{ display: 'flex', gap: 5 }}>
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
				<Button
					variant='outlined'
					onClick={handleReset}
					sx={{
						minWidth: 'min-content',
					}}
				>
					<Tooltip title='Reset'>
						<RestartAlt />
					</Tooltip>
				</Button>
				<LoadingButton
					variant='outlined'
					color='primary'
					loading={isMutating}
					disabled={disabled}
					onClick={() => trigger()}
					sx={{ minWidth: '100px' }}
					startIcon={<Deblur sx={{ rotate: '180deg' }} />}
				>
					Pixelate
				</LoadingButton>
			</Box>
		</>
	);
};

export default ImageCropper;
