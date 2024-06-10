import { useDispatch } from 'react-redux';
import { useFrameGridOptionsToggles } from '@/libs/redux/features/effectEditor/selectors';
import { ReactElement, memo, MouseEvent } from 'react';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { FrameGridOptionsT } from '@/types/effectEditor/effectEditor.types';
import {
	AutoGraph,
	BorderAll,
	BorderStyle,
	Filter1,
	ShowChart,
} from '@mui/icons-material';
import { SvgIconProps, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';

const GridOptionsToggles = () => {
	const dispatch = useDispatch();
	const toggles = useFrameGridOptionsToggles();
	const { borderEnabled, indexEnabled, transitionEnabled } = toggles;

	const toggleButtons: {
		key: keyof FrameGridOptionsT['toggle'];
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
			key: 'transitionEnabled',
			selected: transitionEnabled,
			title: { hide: 'Hide transition', show: 'Show transition' },
			icon: { hide: <AutoGraph />, show: <ShowChart /> },
		},
	];

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		key: keyof FrameGridOptionsT['toggle'],
	) =>
		dispatch(
			effectEditorActions.updateGridToggles({
				key,
				value: !toggles[key],
			}),
		);

	return (
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
	);
};

export default memo(GridOptionsToggles);
