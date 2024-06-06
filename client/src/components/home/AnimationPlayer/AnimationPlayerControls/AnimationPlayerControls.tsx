import { Dispatch, SetStateAction } from 'react';
import { Timer } from 'react-use-precision-timer';
import { Box, Button, Pagination, ToggleButton, Tooltip } from '@mui/material';
import { Pause, PlayArrow, Repeat } from '@mui/icons-material';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { useDispatch } from 'react-redux';
import { TimestampsT } from '../../Playlist/usePlaylistProps/useConvertedData';

const AnimationPlayerControls = ({
	animationTimer,
	activeFrameIndex,
	timestamps = [],
	setElapsedAnimationTime,
}: {
	animationTimer: Timer;
	activeFrameIndex: number;
	timestamps?: TimestampsT[];
	setElapsedAnimationTime: Dispatch<SetStateAction<number>>;
}) => {
	const dispatch = useDispatch();
	const repeatEnabled = false;
	const isRunning = animationTimer.isRunning();

	const handlePlayPause = () => {
		if (animationTimer.isStopped()) {
			setElapsedAnimationTime(0);

			animationTimer.start();
		} else if (animationTimer.isRunning()) {
			animationTimer.pause();
		} else if (animationTimer.isPaused()) {
			animationTimer.resume();
		}
	};

	const handleFrameChange = (event: React.ChangeEvent<unknown>, value: number) => {
		animationTimer.stop();

		const newElapsedAnimationTime = value === 1 ? 0 : timestamps[value - 2].timestamp;
		setElapsedAnimationTime(newElapsedAnimationTime);
		const time = Date.now() - newElapsedAnimationTime;

		animationTimer.start(time);
		animationTimer.pause();
	};

	const handleRepeatChange = () => {};
	// dispatch(
	// 	effectEditorActions.updatePlayerOptions({
	// 		key: 'repeatEnabled',
	// 		value: !repeatEnabled,
	// 	}),
	// );

	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 3,
				padding: 2,
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: '0px 0px 4px 4px',
			})}
		>
			<Button
				variant='outlined'
				// disabled={!timestamps}
				onClick={handlePlayPause}
				startIcon={isRunning ? <Pause /> : <PlayArrow />}
				sx={{ padding: '5px', minWidth: '32px', width: '32px' }}
			/>
			<Pagination
				// size='small'
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				page={activeFrameIndex + 1}
				count={timestamps.length}
				siblingCount={2}
				onChange={handleFrameChange}
			/>
			<ToggleButton
				size='small'
				value='repeat'
				selected={repeatEnabled}
				onChange={() => handleRepeatChange()}
				sx={{ padding: '5px' }}
			>
				<Tooltip title={repeatEnabled ? 'Disable Repeat' : 'Enable Repeat'}>
					<Repeat fontSize='small' />
				</Tooltip>
			</ToggleButton>
		</Box>
	);
};

export default AnimationPlayerControls;
