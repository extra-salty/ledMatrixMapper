import { memo, useMemo, useState } from 'react';
import { useTimer } from 'react-use-precision-timer';
import {
	useEffectPlayerRefreshRate,
	useEffectPlayerRepeat,
} from '@/libs/redux/features/effectEditor/selectors';
import { mockFrame } from '@/types/effect/effectConstructors';
import { FrameStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import EffectPlayerFrame from '../EffectPlayerFrame/EffectPlayerFrame';
import EffectProgress from '../EffectProgress/EffectProgress';
import FrameProgress from '../FrameProgress/FrameProgress';
import EffectPlayerControls from '../EffectPlayerControls/EffectPlayerControls';

const EffectPlayer = ({ frames }: { frames: FrameStateT[] }) => {
	const repeatEnabled = useEffectPlayerRepeat();
	const refreshRate = useEffectPlayerRefreshRate();
	const [elapsedEffectTime, setElapsedEffectTime] = useState<number>(0);

	const timestamps = useMemo(
		() =>
			frames.map((_, index, framesArr) =>
				framesArr.slice(0, index + 1).reduce((acc, frame) => acc + frame.duration, 0),
			),
		[frames],
	);
	const activeFrameIndex = timestamps.findIndex(
		(duration) => elapsedEffectTime < duration,
	);
	const activeFrame = useMemo(
		() => (frames[activeFrameIndex] === undefined ? mockFrame : frames[activeFrameIndex]),
		[frames, activeFrameIndex],
	);

	const elapsedFrameTime =
		activeFrameIndex === 0
			? elapsedEffectTime
			: elapsedEffectTime - timestamps[activeFrameIndex - 1] || 0;

	const overallTime = useMemo(
		() => frames.reduce((acc, frame) => acc + frame.duration, 0),
		[frames],
	);

	const effectTimer = useTimer(
		{ runOnce: false, delay: refreshRate, fireOnStart: false, startImmediately: false },
		() => {
			const elapsedTime = effectTimer.getElapsedRunningTime();
			const limitedElepsedTime = Math.min(elapsedTime, overallTime);
			setElapsedEffectTime(limitedElepsedTime);

			if (elapsedTime >= overallTime) {
				effectTimer.stop();

				if (repeatEnabled) effectTimer.start();
			}
		},
	);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<EffectPlayerFrame
				data={activeFrame.data}
				elapsedFrameTime={elapsedFrameTime}
				frameTime={frames[activeFrameIndex]?.duration || 0}
			/>
			<EffectProgress
				effectTimer={effectTimer}
				overallTime={overallTime}
				elapsedEffectTime={elapsedEffectTime}
				setElapsedEffectTime={setElapsedEffectTime}
			/>
			<FrameProgress
				elapsedFrameTime={elapsedFrameTime}
				overallTime={activeFrame.duration}
			/>
			<EffectPlayerControls
				effectTimer={effectTimer}
				activeFrameIndex={activeFrameIndex}
				timestamps={timestamps}
				setElapsedEffectTime={setElapsedEffectTime}
			/>
		</Box>
	);
};

export default memo(EffectPlayer);
