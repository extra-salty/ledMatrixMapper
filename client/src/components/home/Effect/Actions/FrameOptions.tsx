import { useState, memo } from 'react';
import { IconButton, Popover } from '@mui/material';
import { Tune } from '@mui/icons-material';
import FrameOptionsPopover from '../FrameOptionsPopover/FrameOptionsPopover';

const FrameOptions = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<IconButton onClick={handleClick}>
				<Tune />
			</IconButton>
			<Popover
				id='color-selector-popover'
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<FrameOptionsPopover />
			</Popover>
		</>
	);
};

export default memo(FrameOptions);
