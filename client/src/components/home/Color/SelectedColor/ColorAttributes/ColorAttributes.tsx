import { useSelectedColor } from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { useBackgroundColor } from '../AttributeSlider/useBackgroundColor';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { AttributeType, Units } from '@/types/color/color.types';
import { Brightness6, Gradient, Palette } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import NumberInput from '@/components/misc/NumberInput/NumberInput';
import ColorAttributeSlider from '../AttributeSlider/ColorAttributeSlider';

const ColorAttributes = () => {
	const dispatch = useDispatch();

	const color = useSelectedColor();
	const { hue, saturation, brightness } = color;
	const { hueBackground, saturationBackground, brightnessBackground } =
		useBackgroundColor(color);

	const attributes: AttributeType[] = [
		{
			value: hue,
			max: 360,
			onChange: (value: number) =>
				dispatch(effectsDataActions.updateColor({ key: 'hue', value })),
			id: 'hue',
			icon: <Palette />,
			unit: Units.degree,
			background: hueBackground,
		},
		{
			value: saturation,
			max: 100,
			onChange: (value: number) =>
				dispatch(effectsDataActions.updateColor({ key: 'saturation', value })),
			id: 'saturation',
			icon: <Gradient />,
			unit: Units.percentage,
			background: saturationBackground,
		},
		{
			value: brightness,
			max: 100,
			onChange: (value: number) =>
				dispatch(effectsDataActions.updateColor({ key: 'brightness', value })),
			id: 'brightness',
			icon: <Brightness6 />,
			unit: Units.percentage,
			background: brightnessBackground,
		},
	];

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				boxSizing: 'border-box',
			}}
		>
			{attributes.map(({ value, max, background, icon, id, unit, onChange }, i) => (
				<Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Tooltip title={id[0].toUpperCase() + id.substring(1)} arrow>
						{icon}
					</Tooltip>
					<ColorAttributeSlider
						value={value}
						max={max}
						background={background}
						onChange={onChange}
					/>
					<Box sx={{ width: '40px' }}>
						<NumberInput
							controlledValue={value}
							max={max}
							align='right'
							hasIncrements
							incrementAlwaysVisible
							onChange={onChange}
						/>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default ColorAttributes;
