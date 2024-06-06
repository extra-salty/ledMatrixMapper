import { useDispatch } from 'react-redux';
import { useEffectPlayerOptions } from '@/libs/redux/features/effectEditor/selectors';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { SyntheticEvent, MouseEvent, memo } from 'react';
import {
	BlurLinear,
	BorderAll,
	BorderClear,
	Cast,
	Filter1,
	LooksOne,
} from '@mui/icons-material';
import { Box, Slider, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import {
	EffectPlayerOptionsKeys,
	EffectPlayerOptionsT,
} from '@/types/effectEditor/effectEditor.types';

const EffectPlayerToolbar = () => {
	const dispatch = useDispatch();

	const options = useEffectPlayerOptions();
	const { borderEnabled, indexEnabled, castEnabled, blur } = options;

	const handleToggleChange = (
		event: MouseEvent<HTMLElement>,
		key: keyof EffectPlayerOptionsT,
	) =>
		dispatch(
			effectEditorActions.updatePlayerOptions({
				key,
				value: !options[key],
			}),
		);

	const handleBlurChange = (
		_: Event | SyntheticEvent<Element, Event>,
		value: number | number[],
	) =>
		dispatch(
			effectEditorActions.updatePlayerOptions({ key: 'blur', value: value as number }),
		);

	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				// justifyContent: 'flex-end',
				padding: 2,
				// boxSizing: 'content-box',
				borderBottom: '1px solid',
				borderColor: theme.palette.divider,
			})}
		>
			{/* <ToggleButton
				size='small'
				value='castEnabled'
				aria-label='Border Enable'
				selected={castEnabled}
				onChange={handleToggleChange}
				sx={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
			>
				<Tooltip title={castEnabled ? 'Disable Cast' : 'Enable Cast'}>
					<Cast color={castEnabled ? 'success' : 'warning'} />
				</Tooltip>
			</ToggleButton> */}
			<ToggleButtonGroup size='small'>
				<ToggleButton
					selected={borderEnabled}
					value={EffectPlayerOptionsKeys.borderEnabled}
					onChange={handleToggleChange}
				>
					<Tooltip title={borderEnabled ? 'Hide Border' : 'Show Border'}>
						{borderEnabled ? <BorderAll /> : <BorderClear />}
					</Tooltip>
				</ToggleButton>
				<ToggleButton
					selected={indexEnabled}
					value={EffectPlayerOptionsKeys.indexEnabled}
					onChange={handleToggleChange}
					disabled
				>
					<Tooltip title={indexEnabled ? 'Hide Indexes' : 'Show Indexes'}>
						{indexEnabled ? <LooksOne /> : <Filter1 />}
					</Tooltip>
				</ToggleButton>
			</ToggleButtonGroup>
			<Box
				sx={{
					width: '100%',
					height: '24px',
					display: 'flex',
					alignItems: 'center',
					gap: '20px',
					// border: '1px solid rgba(255, 255, 255, 0.12)',
					padding: '7px',
				}}
			>
				<Tooltip title='Blur'>
					<BlurLinear />
				</Tooltip>
				<Slider
					size='small'
					min={0}
					max={10}
					value={blur}
					onChange={handleBlurChange}
					sx={{ width: '100%' }}
				/>
			</Box>
		</Box>
	);
};

export default memo(EffectPlayerToolbar);
