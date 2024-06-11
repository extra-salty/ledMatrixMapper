import { Dispatch, SetStateAction } from 'react';
import { SliderPropsT } from '@/types/components/components.types';
import { BlurLinear } from '@mui/icons-material';
import { Box, Slider, Tooltip } from '@mui/material';

const FrameReviewerSliders = ({
	blurIntensity,
	setBlurIntensity,
}: {
	blurIntensity: number;
	setBlurIntensity: Dispatch<SetStateAction<number>>;
}) => {
	const sliders: SliderPropsT[] = [
		{
			value: blurIntensity,
			text: 'Rotation',
			icon: <BlurLinear />,
			min: 0,
			max: 10,
			step: 1,
			unit: '',
			onChange: (event, value) => setBlurIntensity(value as number),
		},
	];

	return (
		<>
			{sliders.map(({ icon, text, step, value, max, min, unit, onChange }, i) => (
				<Box
					key={i}
					sx={(theme) => ({
						width: '100%',
						paddingInline: 2,
						display: 'flex',
						alignItems: 'center',
						gap: 4,
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
					<Box sx={{ minWidth: 30 }}>
						{value}
						{unit}
					</Box>
				</Box>
			))}
		</>
	);
};

export default FrameReviewerSliders;
