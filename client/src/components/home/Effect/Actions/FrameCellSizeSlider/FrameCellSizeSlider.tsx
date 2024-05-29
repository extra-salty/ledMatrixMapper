import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { AppDispatch } from '@/libs/redux/store';
import { PhotoSizeSelectLarge } from '@mui/icons-material';
import { Box, Slider, Tooltip } from '@mui/material';

const FrameCellSizeSlider = () => {
	const dispatch = useDispatch<AppDispatch>();
	const width = useFrameCellSize();

	const handleChange = (event: Event, value: number | number[]) => {
		if (typeof value === 'number')
			dispatch(effectEditorActions.updateGridOptions({ key: 'cellSize', value }));
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '20px',
			}}
		>
			<Tooltip title='Frames Width'>
				<PhotoSizeSelectLarge />
			</Tooltip>
			<Slider size='small' min={15} max={50} value={width} onChange={handleChange} />
		</Box>
	);
};

export default memo(FrameCellSizeSlider);
