import useScaleTransform from './useScaleTransform';
import useReverseScaleTransform from './useReverseScaleTransform';
import { useDispatch } from 'react-redux';
import { SyntheticEvent, memo } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { Box, Slider, Tooltip } from '@mui/material';
import { Timelapse } from '@mui/icons-material';
import NumberInput from '@/components/misc/NumberInput/NumberInput';

const FrameDuration = ({ frameId, duration }: { frameId: string; duration: number }) => {
	const dispatch = useDispatch();

	const min = 0;
	const max = 10000;
	const intervals: number[] = [5, 10, 25, 50, 100];

	const { value, unitIndex } = useReverseScaleTransform(duration, max, intervals);
	const { modifiedMax, transform } = useScaleTransform(min, max, intervals);

	const handleChange = (value: number) =>
		dispatch(effectsDataActions.updateFrame({ frameId, key: 'duration', value }));

	const handleSliderChange = (
		_: Event | SyntheticEvent<Element, Event>,
		newValue: number | number[],
	) => {
		if (typeof newValue === 'number') {
			const value = transform(newValue);

			handleChange(value);
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				paddingInline: '8px',
			}}
		>
			<Tooltip title='Duration' placement='top'>
				<Timelapse fontSize='small' />
			</Tooltip>
			<Slider
				size='small'
				min={min}
				max={modifiedMax}
				value={value}
				onChange={handleSliderChange}
				onChangeCommitted={handleSliderChange}
			/>
			<Tooltip title='miliseconds'>
				<Box width={'85px'}>
					<NumberInput
						min={min}
						max={max}
						controlledValue={duration}
						hasIncrements
						incrementAlwaysVisible
						incrementValue={intervals[unitIndex]}
						onChange={handleChange}
					/>
				</Box>
			</Tooltip>
		</Box>
	);
};

export default memo(FrameDuration);
