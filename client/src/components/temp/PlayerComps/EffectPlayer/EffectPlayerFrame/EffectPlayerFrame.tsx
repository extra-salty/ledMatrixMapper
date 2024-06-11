import { memo } from 'react';
import { FrameStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import { ColorT } from '@/types/color/color.types';
import FrameStatic from '@/components/temp/FrameComps/FrameStatic/FrameStatic';
import {
	useEffectPlayerSelect,
	useEffectPlayerToggle,
} from '@/libs/redux/features/effectEditor/selectors';

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
	const borderEnabled = useEffectPlayerToggle('borderEnabled');
	const blur = useEffectPlayerSelect('blur');

	const ratio = elapsedFrameTime / frame.duration;

	const convertedData: (ColorT | undefined)[][] = frame.data.map((column) =>
		column.map((cell) => {
			if (cell && cell.color) {
				let brightness: number;

				switch (cell.transition?.timing) {
					case 'linear': {
						brightness = ratio * 100;
						break;
					}
					case 'easeIn': {
						brightness = easeInQuad(ratio) * 100;
						break;
					}
					case 'easeOut': {
						brightness = easeOutQuad(ratio) * 100;
						break;
					}
					case 'easeInOut': {
						brightness = easeInOutQuad(ratio) * 100;
						break;
					}
					default: {
						brightness = cell.color.brightness;
					}
				}

				return {
					...cell.color,
					brightness:
						// cell.transition?.direction === 'appear' ? brightness : 100 - brightness,
						brightness,
				};
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
			<FrameStatic
				blurIntensity={blur}
				showGrid={borderEnabled}
				frameData={convertedData}
			/>
		</Box>
	);
};

export default memo(EffectPlayerFrame);
