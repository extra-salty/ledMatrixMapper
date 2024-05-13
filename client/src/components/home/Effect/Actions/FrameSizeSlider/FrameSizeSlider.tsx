import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useFrameWidth } from '@/libs/redux/features/effectEditor/selectors';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { AppDispatch } from '@/libs/redux/store';
import { PhotoSizeSelectLarge } from '@mui/icons-material';
import { Box, Slider, Tooltip } from '@mui/material';

const FrameSizeSlider = () => {
	const dispatch = useDispatch<AppDispatch>();
	const width = useFrameWidth();

	const handleChange = (event: Event, value: number | number[]) => {
		if (typeof value === 'number')
			dispatch(effectEditorActions.updateGridOptions({ key: 'frameWidth', value }));
	};

	return (
		<Box
			sx={{
				width: '200px',
				height: '24px',
				display: 'flex',
				alignItems: 'center',
				gap: '20px',
				border: '1px solid rgba(255, 255, 255, 0.12)',
				padding: '7px',
				borderRadius: '4px',
			}}
		>
			<Tooltip title='Frames Width'>
				<PhotoSizeSelectLarge />
			</Tooltip>
			<Slider
				size='small'
				aria-label='Frame width'
				min={1}
				max={5}
				value={width}
				onChange={handleChange}
			/>
		</Box>
	);
};

export default memo(FrameSizeSlider);
