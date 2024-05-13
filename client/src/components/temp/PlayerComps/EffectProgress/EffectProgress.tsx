import { Dispatch, SetStateAction, SyntheticEvent, memo, useMemo } from 'react';
import { formatDuration } from '@/misc/helpers/helpers';
import { Collections } from '@mui/icons-material';
import { Slider, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Timer } from 'react-use-precision-timer';

const EffectProgress = ({
	effectTimer,
	overallTime,
	elapsedEffectTime,
	setElapsedEffectTime,
}: {
	effectTimer: Timer;
	overallTime: number;
	elapsedEffectTime: number;
	setElapsedEffectTime: Dispatch<SetStateAction<number>>;
}) => {
	const formattedOverallTime = useMemo(() => formatDuration(overallTime), [overallTime]);

	const formattedElapsedTime = formatDuration(elapsedEffectTime);
	const finalTime =
		elapsedEffectTime > overallTime ? formattedOverallTime : formattedElapsedTime;

	const handleChange = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		effectTimer.stop();
		if (typeof newValue === 'number') setElapsedEffectTime(newValue);
	};

	const handleChangeCommitted = (
		event: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		const time = Date.now() - elapsedEffectTime;
		effectTimer.start(time);
		effectTimer.pause();
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
				<Typography>{finalTime}</Typography>
			</Tooltip>
			<Slider
				size='small'
				min={0}
				max={overallTime}
				value={elapsedEffectTime}
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
			<Tooltip title='Effect Duration'>
				<Box>{formattedOverallTime}</Box>
			</Tooltip>
			<Tooltip title='Effect'>
				<Collections />
			</Tooltip>
		</Box>
	);
};

export default memo(EffectProgress);
