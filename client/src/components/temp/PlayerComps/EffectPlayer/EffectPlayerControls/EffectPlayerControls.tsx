import { useDispatch } from 'react-redux';
import { useEffectPlayerToggle } from '@/libs/redux/features/effectEditor/selectors';
import { Dispatch, SetStateAction, memo } from 'react';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { Timer } from 'react-use-precision-timer';
import { Box, Button, Pagination, ToggleButton, Tooltip } from '@mui/material';
import { Pause, PlayArrow, Repeat } from '@mui/icons-material';

const EffectPlayerControls = ({
	effectTimer,
	activeFrameIndex,
	timestamps = [],
	setElapsedEffectTime,
}: {
	effectTimer: Timer;
	activeFrameIndex: number;
	timestamps?: number[];
	setElapsedEffectTime: Dispatch<SetStateAction<number>>;
}) => {
	const dispatch = useDispatch();

	const repeatEnabled = useEffectPlayerToggle('repeatEnabled');
	const isRunning = effectTimer.isRunning();

	const handlePlayPause = () => {
		if (effectTimer.isStopped()) {
			setElapsedEffectTime(0);

			effectTimer.start();
		} else if (effectTimer.isRunning()) {
			effectTimer.pause();
		} else if (effectTimer.isPaused()) {
			effectTimer.resume();
		}
	};

	const handleFrameChange = (event: React.ChangeEvent<unknown>, value: number) => {
		effectTimer.stop();

		const newElapsedEffectTime = [0, ...timestamps][value - 1];
		setElapsedEffectTime(newElapsedEffectTime);
		const time = Date.now() - newElapsedEffectTime;

		effectTimer.start(time);
		effectTimer.pause();
	};

	const handleRepeatChange = () =>
		dispatch(
			effectEditorActions.updatePlayerToggles({
				key: 'repeatEnabled',
				value: !repeatEnabled,
			}),
		);

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
				disabled={!timestamps}
				onClick={handlePlayPause}
				startIcon={isRunning ? <Pause /> : <PlayArrow />}
				sx={{ padding: '5px', minWidth: '32px', width: '32px' }}
			/>
			<Pagination
				shape='rounded'
				variant='outlined'
				showFirstButton
				showLastButton
				page={activeFrameIndex + 1}
				count={timestamps.length}
				siblingCount={1}
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

export default memo(EffectPlayerControls);
