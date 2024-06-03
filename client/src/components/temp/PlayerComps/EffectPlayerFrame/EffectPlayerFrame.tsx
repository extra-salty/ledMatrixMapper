import { memo } from 'react';
import { FrameDataT } from '@/types/effects/effect.types';
import { Box, Skeleton } from '@mui/material';
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
	// const ratio = (elapsedFrameTime / frameTime) * 100 || 0;

	// const newData = data.map((column) => {
	// 	return column.map((cell) => {
	// 		return { ...cell, lightness: ratio };
	// 	});
	// });

	return (
		<Box
			sx={(theme) => ({
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: '4px 4px 0px 0px ',
			})}
		>
			{data ? (
				<FrameStatic frameData={data} frameId='effectPlayerFrame' />
			) : (
				<Skeleton
					sx={{
						width: '100%',
						height: 'auto',
						aspectRatio: '1.80',
					}}
				/>
			)}
		</Box>
	);
};

export default memo(EffectPlayerFrame);
