import NumberInput from '@/components/misc/NumberInput/NumberInput';
import { useEffectPlayerRefreshRate } from '@/libs/redux/features/effectEditor/selectors';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { Update } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

const EffectPlayerRefreshRate = () => {
	const dispatch = useDispatch();
	const refreshRate = useEffectPlayerRefreshRate();

	const handleChange = (value: number) =>
		dispatch(effectEditorActions.updatePlayerOptions({ key: 'refreshRate', value }));

	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				gap: 1,
				border: `1px solid ${theme.palette.divider}`,
				padding: '4px',
			})}
		>
			<Tooltip title='Refresh rate (ms)'>
				<Update />
			</Tooltip>
			<Box sx={{ width: '50px' }}>
				<NumberInput
					min={10}
					max={1000}
					incrementValue={10}
					hasIncrements
					incrementAlwaysVisible
					controlledValue={refreshRate}
					onChange={handleChange}
				/>
			</Box>
		</Box>
	);
};

export default EffectPlayerRefreshRate;
