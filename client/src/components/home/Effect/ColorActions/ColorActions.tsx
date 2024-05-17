import { useActiveColorAction } from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ColorActions } from '@/types/effects/effect.types';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Brush, FormatColorReset, FormatColorFill, Colorize } from '@mui/icons-material';

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
		</ToggleButtonGroup>
	);
};

export default ColorActionsGroup;
