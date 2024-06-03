import { useDispatch } from 'react-redux';
import { useColorHistory } from '@/libs/redux/features/effects/data/selector';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { Clear, Square } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

const ColorHistory = () => {
	const dispatch = useDispatch();
	const colorHistory = useColorHistory();

	const handleAddToHistory = (i: number) =>
		dispatch(effectsDataActions.updateColorFromHistory(i));

	const handleReset = () => dispatch(effectsDataActions.resetColorHistory());

	// make delete transition

	return (
		<Box
			sx={{
				height: 'calc(100% - 60px)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Box
				sx={{
					padding: 1,
					overflow: 'auto',
					display: 'flex',
					flexDirection: 'column',
					gap: '2px',
					justifyContent: 'space-between',
				}}
			>
				{colorHistory.map(({ hue: h, saturation: s, lightness: l }, i) => (
					<IconButton key={i} onClick={() => handleAddToHistory(i)}>
						<Square
							sx={{
								color: `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2})`,
								stroke: 'rgba(255,255,255,0.6)',
							}}
						/>
					</IconButton>
				))}
			</Box>
			<IconButton onClick={handleReset}>
				<Tooltip title='Clear Color History'>
					<Clear />
				</Tooltip>
			</IconButton>
		</Box>
	);
};

export default ColorHistory;
