import { useDispatch } from 'react-redux';
import { useEffectPlayerToggles } from '@/libs/redux/features/effectEditor/selectors';
import { ReactElement, memo, MouseEvent } from 'react';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { EffectPlayerOptionsT } from '@/types/effectEditor/effectEditor.types';
import { BorderAll, BorderStyle, Cast, Filter1 } from '@mui/icons-material';
import {
	Box,
	SvgIconProps,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
} from '@mui/material';

const EffectPlayerToolbar = () => {
	const dispatch = useDispatch();

	const toggles = useEffectPlayerToggles();
	const { borderEnabled, indexEnabled, castEnabled } = toggles;

	const toggleButtons: {
		key: keyof EffectPlayerOptionsT['toggle'];
		selected: boolean;
		disabled?: boolean;
		title: { hide: string; show: string };
		icon: { hide: ReactElement<SvgIconProps>; show: ReactElement<SvgIconProps> };
	}[] = [
		{
			key: 'borderEnabled',
			selected: borderEnabled,
			title: { hide: 'Hide border', show: 'Show border' },
			icon: { hide: <BorderAll />, show: <BorderStyle /> },
		},
		{
			key: 'indexEnabled',
			selected: indexEnabled,
			disabled: true,
			title: { hide: 'Hide index', show: 'Show index' },
			icon: { hide: <Filter1 />, show: <Filter1 /> },
		},
		{
			key: 'castEnabled',
			selected: castEnabled,
			disabled: true,
			title: { hide: 'Disable Cast', show: 'Enable Cast' },
			icon: { hide: <Cast />, show: <Cast /> },
		},
	];

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		key: keyof EffectPlayerOptionsT['toggle'],
	) =>
		dispatch(
			effectEditorActions.updatePlayerToggles({
				key,
				value: !toggles[key],
			}),
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
			<ToggleButtonGroup size='small' aria-label='Frame grid options'>
				{toggleButtons.map(({ key, selected, disabled, title, icon }) => (
					<ToggleButton
						key={key}
						value={key}
						disabled={disabled}
						selected={selected}
						onChange={handleChange}
					>
						<Tooltip title={selected ? title.hide : title.show}>
							{selected ? icon.hide : icon.show}
						</Tooltip>
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Box>
	);
};

export default memo(EffectPlayerToolbar);
