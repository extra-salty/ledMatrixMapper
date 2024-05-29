import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BorderStyle, Filter1 } from '@mui/icons-material';
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import FrameCellSizeSlider from '../Actions/FrameCellSizeSlider/FrameCellSizeSlider';

const FrameOptionsPopover = () => {
	const dispatch = useDispatch();

	const [actions, setActions] = useState<string[]>(['border']);

	// const handleFormat = (event: MouseEvent<HTMLElement>, newFormats: string[]) => {
	// 	setActions(newFormats);
	// };

	return (
		<Box
			sx={{
				width: '400px',
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				padding: 3,
			}}
		>
			<ToggleButtonGroup
				value={actions}
				size='small'
				// onChange={handleFormat}
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
			<FrameCellSizeSlider />
		</Box>
	);
};

export default FrameOptionsPopover;
