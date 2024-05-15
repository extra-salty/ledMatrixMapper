import { memo, useState } from 'react';
import { useSelectedColor } from '@/libs/redux/features/color/selectors';
import { FormatPaint } from '@mui/icons-material';
import { IconButton, Popover } from '@mui/material';
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
				<FormatPaint sx={{ color, stroke: 'rgba(255,255,255,0.6)' }} />
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
