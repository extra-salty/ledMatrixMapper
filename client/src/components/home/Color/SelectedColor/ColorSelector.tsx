import { useSelectedColor } from '@/libs/redux/features/effects/data/selector';
import { memo, useState } from 'react';
import { Square } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import { hslToString, hsvToHsl } from './AttributeSlider/useBackgroundColor';
import ColorSelectorPopover from './ColorSelectorPopover/ColorSelectorPopover';

const ColorSelector = () => {
	const color = useSelectedColor();
	const hsl = hsvToHsl(color);
	const colorString = hslToString(hsl);

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<IconButton onClick={handleClick}>
				<Tooltip title='Selected Color'>
					<Square sx={{ color: colorString, stroke: 'rgba(255,255,255,0.6)' }} />
				</Tooltip>
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
				<ColorSelectorPopover />
			</Popover>
		</>
	);
};

export default memo(ColorSelector);
