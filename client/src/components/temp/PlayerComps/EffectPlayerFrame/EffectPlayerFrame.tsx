import { memo } from 'react';
import { FrameDataT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameStatic from '../../FrameComps/FrameStatic/FrameStatic';

const EffectPlayerFrame = ({
	data,
	elapsedFrameTime,
	frameTime,
}: {
	data: FrameDataT;
	elapsedFrameTime: number;
	frameTime: number;
}) => {
	const ratio = Math.min((elapsedFrameTime / frameTime) * 100 || 0, 50);

	const newData = data.map((column, x) =>
		column.map((cell, y) => {
			if (cell && cell?.color) {
				const lightness = cell.color.lightness;

				return { ...cell.color, lightness: ratio };
			} else {
				return undefined;
			}
		}),
	);

	return (
		<Box
			sx={(theme) => ({
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: '4px 4px 0px 0px ',
			})}
		>
			<FrameStatic frameData={newData} />
		</Box>
	);
};

export default memo(EffectPlayerFrame);
