import { SyntheticEvent, memo, useMemo } from 'react';
import { formatDuration } from '@/misc/helpers/helpers';
import { Photo } from '@mui/icons-material';
import { Slider, Tooltip } from '@mui/material';
import { Box } from '@mui/material';

const FrameProgress = ({
	elapsedFrameTime,
	overallTime,
}: {
	elapsedFrameTime: number;
	overallTime: number;
}) => {
	const formattedOverallTime = useMemo(() => formatDuration(overallTime), [overallTime]);

	const formattedElapsedTime = formatDuration(elapsedFrameTime);
	const finalTime =
		elapsedFrameTime > overallTime ? formattedOverallTime : formattedElapsedTime;

	const handleSliderChange = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		// Handle slider change here
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 3,
				padding: 2,
				border: '1px solid',
				borderColor: (theme) => theme.palette.divider,
			}}
		>
			<Tooltip title='Elapsed Frame Time'>
				<Box>{finalTime}</Box>
			</Tooltip>
			<Slider
				size='small'
				min={0}
				max={overallTime}
				value={elapsedFrameTime}
				disabled={!overallTime}
				onChange={handleSliderChange}
				sx={{
					'& .MuiSlider-track': {
						transition: 'none',
					},
					'& .MuiSlider-thumb': {
						transition: 'none',
						display: 'none',
					},
				}}
			/>
			<Tooltip title='Frame Duration'>
				<Box>{formattedOverallTime}</Box>
			</Tooltip>
			<Tooltip title='Frame'>
				<Photo />
			</Tooltip>
		</Box>
	);
};

export default memo(FrameProgress);
