import NumberInput from '@/components/misc/NumberInput/NumberInput';
import { useEffectPlayerRefreshRate } from '@/libs/redux/features/effectEditor/selectors';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { Speed, Update } from '@mui/icons-material';
import { Box, SvgIconProps, Tooltip } from '@mui/material';
import { ReactElement, memo } from 'react';
import { useDispatch } from 'react-redux';

const EffectPlayerSettings = () => {
	const dispatch = useDispatch();
	const refreshRate = useEffectPlayerRefreshRate();

	const settings: {
		value: number;
		min: number;
		max: number;
		incrementValue: number;
		title: string;
		icon: ReactElement<SvgIconProps>;
		disabled?: boolean;
		onChange: (value: number) => void;
	}[] = [
		{
			value: refreshRate,
			min: 10,
			max: 1000,
			incrementValue: 10,
			title: 'Refresh rate (ms)',
			icon: <Update />,
			onChange: (value: number) =>
				dispatch(effectEditorActions.updatePlayerOptions({ key: 'refreshRate', value })),
		},
		{
			disabled: true,
			value: 0,
			min: 10,
			max: 1000,
			incrementValue: 10,
			title: 'Speed Multiplier',
			icon: <Speed />,
			onChange: (value: number) => {},
			// dispatch(effectEditorActions.updatePlayerOptions({ key: 'refreshRate', value })),
		},
	];

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
			{settings.map(
				({ disabled, value, min, max, incrementValue, title, icon, onChange }, i) => (
					<Box
						key={i}
						sx={(theme) => ({
							display: 'flex',
							gap: 1,
							border: `1px solid ${theme.palette.divider}`,
							padding: '4px',
						})}
					>
						<Tooltip title={title}>{icon}</Tooltip>
						<Box sx={{ width: '50px' }}>
							<NumberInput
								disabled={disabled}
								controlledValue={value}
								min={min}
								max={max}
								incrementValue={incrementValue}
								hasIncrements
								incrementAlwaysVisible
								onChange={onChange}
							/>
						</Box>
					</Box>
				),
			)}
		</Box>
	);
};

export default memo(EffectPlayerSettings);
