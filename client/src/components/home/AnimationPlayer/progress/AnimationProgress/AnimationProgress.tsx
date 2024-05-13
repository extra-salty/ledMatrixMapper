import { Dispatch, SetStateAction, SyntheticEvent, useMemo } from 'react';
import { formatDuration } from '@/misc/helpers/helpers';
import { Timer } from 'react-use-precision-timer';
import { PhotoAlbum } from '@mui/icons-material';
import { Pagination, Slider, Stack, Tooltip } from '@mui/material';
import { Box } from '@mui/material';

const AnimationProgress = ({
	animationTimer,
	overallTime,
	animationDurations,
	elapsedAnimationTime,
	setElapsedAnimationTime,
}: {
	animationTimer: Timer;
	overallTime: number;
	animationDurations: number[];
	elapsedAnimationTime: number;
	setElapsedAnimationTime: Dispatch<SetStateAction<number>>;
}) => {
	const formattedOverallTime = useMemo(() => formatDuration(overallTime), [overallTime]);
	const formattedElapsedTime = formatDuration(elapsedAnimationTime);
	const finalTime =
		elapsedAnimationTime > overallTime ? formattedOverallTime : formattedElapsedTime;

	const count = animationDurations.length;
	const activeAnimationIndex = animationDurations.findIndex(
		(duration) => elapsedAnimationTime < duration,
	);

	const handleChange = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		animationTimer.stop();
		if (typeof newValue === 'number') setElapsedAnimationTime(newValue);
	};

	const handleChangeCommitted = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		const time = Date.now() - elapsedAnimationTime;
		animationTimer.start(time);
		animationTimer.pause();
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
			<Tooltip title='Elapsed Effect Time'>
				<Box>{finalTime}</Box>
			</Tooltip>
			<Slider
				size='small'
				min={0}
				max={overallTime}
				value={elapsedAnimationTime}
				disabled={!overallTime}
				onChange={handleChange}
				onChangeCommitted={handleChangeCommitted}
				sx={{
					'& .MuiSlider-track': {
						transition: 'none',
					},
					'& .MuiSlider-thumb': {
						transition: 'none',
					},
				}}
			/>
			<Tooltip title='Animation Duration'>
				<Box>{formattedOverallTime}</Box>
			</Tooltip>
			<Tooltip title='Animation'>
				<PhotoAlbum />
			</Tooltip>
		</Box>
	);
};

export default AnimationProgress;

{
	/* <Pagination
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				count={count}
				siblingCount={2}
				page={activeAnimationIndex + 1}
				// onChange={handleChange}
				sx={{ marginInline: 'auto !important' }}
			/> */
}
