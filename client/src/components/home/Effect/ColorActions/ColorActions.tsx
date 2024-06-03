import { useActiveColorAction } from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import {
	Brush,
	FormatColorReset,
	FormatColorFill,
	Colorize,
	FormatPaint,
	SelectAll,
	HighlightAlt,
	ContentCopy,
	ContentCut,
} from '@mui/icons-material';
import { ColorActions } from '@/types/effects/effectPayload.types';

const ColorActionsGroup = () => {
	const dispatch = useDispatch<AppDispatch>();

	const colorAction = useActiveColorAction();

	const handleChange = (event: React.MouseEvent<HTMLElement>, value: ColorActions) => {
		if (value !== null) dispatch(effectsDataActions.setActiveColorAction(value));
	};

	return (
		<ToggleButtonGroup
			size='small'
			aria-label='color actions'
			value={colorAction}
			exclusive
			onChange={handleChange}
		>
			<ToggleButton value={ColorActions.brush} aria-label='brush'>
				<Tooltip title='Brush'>
					<Brush />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.brushAll} aria-label='brush-'>
				<Tooltip title='Brush All'>
					<FormatPaint />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.fill} aria-label='fill'>
				<Tooltip title='Fill'>
					<FormatColorFill />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.pipette} aria-label='pipette'>
				<Tooltip title='Pipette'>
					<Colorize />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.clear} aria-label='pipette'>
				<Tooltip title='Clear'>
					<FormatColorReset />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.select} aria-label='select'>
				<Tooltip title='Select'>
					<HighlightAlt />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.copy} aria-label='copy'>
				<Tooltip title='Copy'>
					<ContentCopy />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={ColorActions.cut} aria-label='cut'>
				<Tooltip title='Cut'>
					<ContentCut />
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default ColorActionsGroup;
