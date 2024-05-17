import { useDispatch } from 'react-redux';
import { useBrushSize } from '@/libs/redux/features/effects/data/selector';
import { SyntheticEvent, memo } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { Box, Slider, Tooltip } from '@mui/material';
import { Brush } from '@mui/icons-material';

const BrushSizeSlider = () => {
	const dispatch = useDispatch();

	const brushSize = useBrushSize();

	const handleSliderChange = (
		_: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		dispatch(effectsDataActions.setBrushSize(newValue as number));
	};

	return (
		<Box sx={{ width: '200px', display: 'flex', gap: 2 }}>
			<Tooltip title='Brush Size'>
				<Brush />
			</Tooltip>
			<Slider
				size='small'
				marks
				min={0}
				max={3}
				value={brushSize}
				onChange={handleSliderChange}
			/>
		</Box>
	);
};

export default memo(BrushSizeSlider);
