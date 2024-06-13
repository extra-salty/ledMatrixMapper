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
			unit: '°',
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
			{sliders.map(({ icon, text, step, value, max, min, unit, onChange }, i) => (
				<Box
					key={i}
					sx={(theme) => ({
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						gap: 4,
						paddingInline: 2,
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: 1,
					})}
				>
					<Tooltip title={text}>{icon}</Tooltip>
					<Slider
						size='small'
						step={step}
						min={min}
						max={max}
						value={value}
						onChange={onChange}
					/>
					<Box sx={{ minWidth: 36, textAlign: 'right' }}>
						{i === 1 ? value.toFixed(2) : value}
						{unit}
					</Box>
				</Box>
			))}
		</>
	);
};

export default ImageCropperSliders;
