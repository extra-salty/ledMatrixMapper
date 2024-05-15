import { useSelectedColor } from '@/libs/redux/features/color/selectors';
import { useDispatch } from 'react-redux';
import { colorActions } from '@/libs/redux/features/color/slice';
import { Attributes, Units } from '@/types/color/color.types';
import { AttributeType } from '../ColorSelectorPopover/ColorSelectorPopover';
import { Brightness6, Gradient, Palette } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import NumberInput from '@/components/misc/NumberInput/NumberInput';
import ColorAttributeSlider from '../AttributeSlider/ColorAttributeSlider';

const ColorAttributes = () => {
	const dispatch = useDispatch();

	const color = useSelectedColor();
	const { hue, saturation, lightness } = color;

	const attributes: AttributeType[] = [
		{
			value: hue,
			max: 360,
			onChange: (value: number) =>
				dispatch(colorActions.updateColor({ key: 'hue', value })),
			id: Attributes.hue,
			icon: <Palette />,
			unit: Units.degree,
		},
		{
			value: saturation,
			max: 100,
			onChange: (value: number) =>
				dispatch(colorActions.updateColor({ key: 'saturation', value })),
			id: Attributes.saturation,
			icon: <Gradient />,
			unit: Units.percentage,
		},
		{
			value: lightness,
			max: 100,
			onChange: (value: number) =>
				dispatch(colorActions.updateColor({ key: 'lightness', value })),
			id: Attributes.lightness,
			icon: <Brightness6 />,
			unit: Units.percentage,
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
			{attributes.map(({ value, max, onChange, icon, id, unit }, i) => {
				return (
					<Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Tooltip title={id[0].toUpperCase() + id.substring(1)} arrow>
							{icon}
						</Tooltip>
						<ColorAttributeSlider max={max} color={color} id={id} onChange={onChange} />
						<Box sx={{ width: '60px' }}>
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
				);
			})}
		</Box>
	);
};

export default ColorAttributes;
