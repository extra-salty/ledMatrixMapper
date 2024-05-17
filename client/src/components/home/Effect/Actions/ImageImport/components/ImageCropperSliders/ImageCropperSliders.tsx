import { Dispatch, SetStateAction } from 'react';
import { SliderPropsT } from '@/types/components/components.types';
import { CropRotate, ZoomIn } from '@mui/icons-material';
import { Box, Slider, Tooltip } from '@mui/material';

const ImageCropperSliders = ({
	disabled,
	zoom,
	setZoom,
	rotation,
	setRotation,
}: {
	disabled: boolean;
	zoom: number;
	setZoom: Dispatch<SetStateAction<number>>;
	rotation: number;
	setRotation: Dispatch<SetStateAction<number>>;
}) => {
	const sliders: SliderPropsT[] = [
		{
			value: rotation,
			text: 'Rotation',
			icon: <CropRotate />,
			min: 0,
			max: 360,
			step: 10,
			onChange: (event, value) => setRotation(value as number),
		},
		{
			value: zoom,
			text: 'Zoom',
			icon: <ZoomIn />,
			min: 0,
			max: 3,
			step: 0.1,
			onChange: (event, value) => setZoom(value as number),
		},
	];

	return (
		<>
			{sliders.map(({ icon, text, step, value, max, min, onChange }, i) => (
				<Box
					key={i}
					sx={{ display: 'flex', alignItems: 'center', gap: '15px', width: '300px' }}
				>
					<Tooltip title={text}>{icon}</Tooltip>
					<Slider
						disabled={disabled}
						size='small'
						step={step}
						min={min}
						max={max}
						value={value}
						onChange={onChange}
					/>
				</Box>
			))}
		</>
	);
};

export default ImageCropperSliders;
