import { useSelectedColor } from '@/libs/redux/features/effects/data/selector';
import { memo, useState } from 'react';
import { Square } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import ColorSelectorPopover from './ColorSelectorPopover/ColorSelectorPopover';

const ColorSelector = () => {
	const { hue: h, saturation: s, lightness: l } = useSelectedColor();

	const color = `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2})`;

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<IconButton onClick={handleClick}>
				<Tooltip title='Selected Color'>
					<Square sx={{ color, stroke: 'rgba(255,255,255,0.6)' }} />
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
