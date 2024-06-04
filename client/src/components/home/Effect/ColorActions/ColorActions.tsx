import { useActiveColorAction } from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { SvgIconProps, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import {
	Brush,
	FormatColorReset,
	FormatColorFill,
	Colorize,
	FormatPaint,
	HighlightAlt,
	ContentCopy,
	ContentCut,
	AutoGraph,
} from '@mui/icons-material';
import { ColorActions } from '@/types/effect/effectPayload.types';
import { ReactElement } from 'react';

const ColorActionsGroup = () => {
	const dispatch = useDispatch<AppDispatch>();

	const colorAction = useActiveColorAction();

	const handleChange = (event: React.MouseEvent<HTMLElement>, value: ColorActions) => {
		if (value !== null) dispatch(effectsDataActions.setActiveColorAction(value));
	};

	const colorActions: {
		value: ColorActions;
		title: string;
		icon: ReactElement<SvgIconProps>;
	}[] = [
		{ value: ColorActions.brush, title: 'Brush', icon: <Brush /> },
		{ value: ColorActions.brushAll, title: 'Brush All', icon: <FormatPaint /> },
		{ value: ColorActions.fill, title: 'Fill', icon: <FormatColorFill /> },
		{ value: ColorActions.pipette, title: 'Pipette', icon: <Colorize /> },
		{ value: ColorActions.clear, title: 'Clear', icon: <FormatColorReset /> },
		{ value: ColorActions.select, title: 'Select', icon: <HighlightAlt /> },
		{ value: ColorActions.copy, title: 'Copy', icon: <ContentCopy /> },
		{ value: ColorActions.cut, title: 'Cut', icon: <ContentCut /> },
		{ value: ColorActions.transition, title: 'Add Transition', icon: <AutoGraph /> },
	];

	return (
		<ToggleButtonGroup
			size='small'
			aria-label='color actions'
			value={colorAction}
			exclusive
			onChange={handleChange}
		>
			{colorActions.map(({ value, title, icon }) => (
				<ToggleButton key={value} value={value} aria-label={title}>
					<Tooltip title={title}>{icon}</Tooltip>
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default ColorActionsGroup;
