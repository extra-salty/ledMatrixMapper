import { useDispatch } from 'react-redux';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { RestartAlt } from '@mui/icons-material';
import { Box, IconButton, InputLabel } from '@mui/material';
import ColorAttributes from '../ColorAttributes/ColorAttributes';

const ColorSelectorPopover = () => {
	const dispatch = useDispatch();

	const handleColorReset = () => dispatch(effectsDataActions.resetColor());

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: 3,
			}}
		>
			<Box
				sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
			>
				<InputLabel shrink id='selected-color-label'>
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
