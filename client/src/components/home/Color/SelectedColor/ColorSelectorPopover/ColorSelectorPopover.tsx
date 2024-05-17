import { useDispatch } from 'react-redux';
import { DEFAULT_COLOR, colorActions } from '@/libs/redux/features/color/slice';
import { Attributes } from '@/types/color/color.types';
import { RestartAlt } from '@mui/icons-material';
import { Box, IconButton, InputLabel } from '@mui/material';
import ColorAttributes from '../ColorAttributes/ColorAttributes';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';

export type AttributeType = {
	value: number;
	max: number;
	unit: string;
	icon: any;
	background?: string;
	id: Attributes;
	onChange: (value: number) => void;
};

const ColorSelectorPopover = () => {
	const dispatch = useDispatch();

	const handleColorReset = () => dispatch(effectsDataActions.resetSelectedColor());

	return (
		<Box
			sx={{
				width: '400px',
				display: 'flex',
				flexDirection: 'column',
				padding: 3,
			}}
		>
			<Box
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
			>
				<InputLabel shrink id='selected-color-label' sx={{}}>
					Selected Color
				</InputLabel>
				<IconButton onClick={handleColorReset}>
					<RestartAlt fontSize='small' />
				</IconButton>
			</Box>
			<ColorAttributes />
		</Box>
	);
};

export default ColorSelectorPopover;
