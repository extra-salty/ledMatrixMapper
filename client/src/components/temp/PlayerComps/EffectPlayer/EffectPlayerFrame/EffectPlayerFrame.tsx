import { memo } from 'react';
import { FrameStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameStatic from '@/components/temp/FrameComps/FrameStatic/FrameStatic';

const easeInQuad = (t: number) => t * t;
const easeOutQuad = (t: number) => t * (2 - t);
const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const EffectPlayerFrame = ({
	elapsedFrameTime,
	frame,
}: {
	elapsedFrameTime: number;
	frame: FrameStateT;
}) => {
	const ratio = elapsedFrameTime / frame.duration;

	const convertedData = frame.data.map((column, x) =>
		column.map((cell, y) => {
			if (!cell || !cell.color || !cell.transition) {
				return undefined;
			} else {
				let brightness: number;

				switch (cell.transition) {
					case 'linear': {
						brightness = ratio;
					}
					case 'easeIn': {
						brightness = easeInQuad(ratio);
					}
					case 'easeOut': {
						brightness = easeOutQuad(ratio);
					}
					case 'easeInOut': {
						brightness = easeInOutQuad(ratio);
					}
				}

				return { ...cell.color, brightness };
			}
		}),
	);
	// console.log('🚀 ~ convertedData:', convertedData);

	return (
		<Box
			sx={(theme) => ({
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: '4px 4px 0px 0px ',
			})}
		>
			<FrameStatic frameData={convertedData} />
		</Box>
	);
};

export default memo(EffectPlayerFrame);
