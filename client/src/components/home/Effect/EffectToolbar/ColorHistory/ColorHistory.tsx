import { useDispatch } from 'react-redux';
import { useColorHistory } from '@/libs/redux/features/effects/data/selector';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { Clear, RemoveRoad, Square } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
	hslToString,
	hsvToHsl,
} from '@/components/home/Color/SelectedColor/AttributeSlider/useBackgroundColor';
import { memo } from 'react';

const ColorHistory = () => {
	const dispatch = useDispatch();
	const colorHistory = useColorHistory();

	const handleAddToHistory = (i: number) =>
		dispatch(effectsDataActions.updateColorFromHistory(i));

	const handleReset = () => dispatch(effectsDataActions.resetColorHistory());

	// make delete transition

	return (
		<Box
			sx={(theme) => ({
				height: 'calc(100% - 60px)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderLeft: `1px solid ${theme.palette.divider}`,
			})}
		>
			<Box
				sx={{
					width: '55px',
					height: '100%',
					padding: '8px 4px',
					overflowY: 'scroll',
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					scrollbarGutter: 'stable ',
				}}
			>
				{colorHistory.map((color, i) => {
					const hsl = hsvToHsl(color);
					const colorString = hslToString(hsl);
					const title = (
						<span>
							H: {color.hue}°
							<br />
							S: {color.saturation}%
							<br />
							V: {color.brightness}%
						</span>
					);

					return (
						<Tooltip arrow key={i} title={title}>
							<IconButton size='small' onClick={() => handleAddToHistory(i)}>
								<Square
									fontSize='small'
									sx={{
										color: colorString,
										stroke: 'rgba(255,255,255,0.6)',
									}}
								/>
							</IconButton>
						</Tooltip>
					);
				})}
			</Box>
			<Box
				sx={(theme) => ({
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					paddingBlock: 1,
					borderTop: `1px dashed ${theme.palette.divider}`,
				})}
			>
				<IconButton size='small' onClick={handleReset}>
					<Tooltip title='Clear Color History'>
						<RemoveRoad />
					</Tooltip>
				</IconButton>
			</Box>
		</Box>
	);
};

export default memo(ColorHistory);
