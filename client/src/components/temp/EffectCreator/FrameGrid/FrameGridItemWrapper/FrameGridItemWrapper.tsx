import { FrameStateT } from '@/types/effect/effect.types';
import FrameGridItem from '../FrameGridItem/FrameGridItem';
import { useMemo } from 'react';

const FrameGridItemWrapper = ({
	frameIndex,
	framesLength,
	frame,
	disabledExternally,
}: {
	frameIndex: number;
	framesLength: number;
	frame: FrameStateT;
	disabledExternally?: boolean;
}) => {
	const memoizedFrame = useMemo(() => frame, [frame]);

	return (
		<FrameGridItem
			frameIndex={0}
			framesLength={0}
			frame={memoizedFrame}
			disabledExternally={false}
		/>
	);
};

export default FrameGridItemWrapper;
