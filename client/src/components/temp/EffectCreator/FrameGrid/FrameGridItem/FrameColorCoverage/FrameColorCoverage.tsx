import { Dispatch, SetStateAction } from 'react';
import { FrameCellT, FrameDataT } from '@/types/effect/effect.types';
import { ColorT } from '@/types/color/color.types';
import { Popover } from '@mui/material';
import ColorCoverageTable from './ColorCoverageTable/ColorCoverageTable';

export type colorCountT = Record<string, { count: number; color: ColorT }>;

const FrameColorCoverage = ({
	open,
	setOpen,
	anchorEl,
	frameData,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	anchorEl: HTMLElement | null;

	frameData: FrameDataT;
}) => {
	const handleClose = () => setOpen(false);

	const colorCount: colorCountT = {};

	// frameData.forEach((frameColumn: FrameCellT) => {
	// 	frameColumn.forEach((color: ColorT) => {
	// 		const { hue, saturation, lightness } = color;
	// 		const colorId = `hsl(${hue} ${saturation}% ${lightness}%)`;

	// 		if (colorCount[colorId]) {
	// 			colorCount[colorId].count++;
	// 		} else {
	// 			colorCount[colorId] = { count: 1, color };
	// 		}
	// 	});
	// });

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
		>
			<ColorCoverageTable colorCount={colorCount} />
		</Popover>
	);
};

export default FrameColorCoverage;
