import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { useTimer } from 'react-use-precision-timer';
import { useState } from 'react';
import { mockFrame } from '@/types/effect/effectConstructors';
import { TimestampsT } from '../Playlist/usePlaylistProps/useConvertedData';
import { Box } from '@mui/material';
import EffectPlayerFrame from '@/components/temp/PlayerComps/EffectPlayerFrame/EffectPlayerFrame';
import AnimationProgress from './progress/AnimationProgress/AnimationProgress';
import EffectProgress from './progress/EffectProgress/EffectProgress';
import FrameProgress from './progress/FrameProgress/FrameProgress';
import AnimationPlayerControls from './AnimationPlayerControls/AnimationPlayerControls';

const AnimationPlayer = ({ timestamps }: { timestamps: TimestampsT[] }) => {
	const effects = useEffectCollections();
	const [elapsedAnimationTime, setElapsedAnimationTime] = useState<number>(0);

	const activeTimestampIndex = timestamps.findIndex(
		({ timestamp }) => elapsedAnimationTime < timestamp,
	);
	const activeIds = timestamps[activeTimestampIndex];

	let activeAnimation;
	let activeEffect;
	let activeFrame = mockFrame;
	let activeEffectOverallTime = 0;

	if (activeIds) {
		const { animationId, effectId, frameId } = activeIds;

		activeAnimation = effects[animationId];
		activeEffect = activeAnimation[effectId];
		activeFrame = activeEffect.frames[frameId];

		activeEffectOverallTime = Object.values(activeEffect.frames).reduce(
			(acc, { duration }) => acc + duration,
			0,
		);
	}

	const overallTime = timestamps.length === 0 ? 0 : timestamps.slice(-1)[0].timestamp;

	const elapsedEffectTime = 0;
	// activeTimestampIndex === 0
	// 	? elapsedAnimationTime
	// 	: elapsedAnimationTime - timestamps[activeTimestampIndex - 1].timestamp;

	const elapsedFrameTime =
		activeTimestampIndex <= 0
			? elapsedAnimationTime
			: elapsedAnimationTime - timestamps[activeTimestampIndex - 1].timestamp;

	const animationTimer = useTimer(
		{ runOnce: false, delay: 20, fireOnStart: false, startImmediately: false },
		() => {
			const elapsedTime = animationTimer.getElapsedRunningTime();
			const limitedElepsedTime = Math.min(elapsedTime, overallTime);

			setElapsedAnimationTime(limitedElepsedTime);

			if (elapsedTime >= overallTime) {
				animationTimer.stop();

				// if (repeatEnabled) animationTimer.start();
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
			{/* <EffectPlayerFrame data={activeFrame.data} /> */}
			<AnimationProgress
				animationTimer={animationTimer}
				overallTime={overallTime}
				animationDurations={[0]}
				elapsedAnimationTime={elapsedAnimationTime}
				setElapsedAnimationTime={setElapsedAnimationTime}
			/>
			<EffectProgress
				effectTimer={animationTimer}
				overallTime={activeEffectOverallTime}
				elapsedEffectTime={0}
				setElapsedEffectTime={setElapsedAnimationTime}
			/>
			<FrameProgress
				overallTime={activeFrame.duration}
				elapsedFrameTime={elapsedFrameTime}
			/>
			<AnimationPlayerControls
				animationTimer={animationTimer}
				activeFrameIndex={activeTimestampIndex}
				timestamps={timestamps}
				setElapsedAnimationTime={setElapsedAnimationTime}
			/>
		</Box>
	);
};

export default AnimationPlayer;
