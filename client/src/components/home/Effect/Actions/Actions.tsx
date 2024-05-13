import { useState, MouseEvent, memo } from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { BorderStyle, Filter1 } from '@mui/icons-material';

const EffectOptions = () => {
	const [actions, setActions] = useState<string[]>(['border']);

	const handleFormat = (event: MouseEvent<HTMLElement>, newFormats: string[]) => {
		setActions(newFormats);
	};

	return (
		<ToggleButtonGroup
			value={actions}
			size='small'
			onChange={handleFormat}
			aria-label='frame options'
		>
			<ToggleButton value='border' aria-label='Border'>
				<Tooltip title='Hide cell border'>
					<BorderStyle />
				</Tooltip>
			</ToggleButton>
			<ToggleButton value='index' aria-label='Index'>
				<Tooltip title='Hide cell index'>
					<Filter1 />
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default memo(EffectOptions);
