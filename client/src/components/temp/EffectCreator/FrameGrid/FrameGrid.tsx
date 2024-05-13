import { useFrameWidth } from '@/libs/redux/features/effectEditor/selectors';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FrameStateT } from '@/types/effects/effect.types';
import { Box } from '@mui/material';
import FrameGridItem from './FrameGridItem/FrameGridItem';
import FrameGridItemWrapper from './FrameGridItemWrapper/FrameGridItemWrapper';

const FrameGrid = ({ frames }: { frames: FrameStateT[] }) => {
	const frameWidth = useFrameWidth();
	const frameIds = frames.map((frame) => frame.id);

	return (
		<SortableContext items={frameIds} strategy={rectSortingStrategy}>
			<Box
				sx={{
					display: 'grid',
					gap: '15px',
					gridTemplateColumns: `repeat(auto-fit, minmax(${
						frameWidth * 100 + 200
					}px, 1fr))`,
				}}
			>
				{frames.map((frame, i) => (
					<FrameGridItem
						key={frame.id}
						frameIndex={i}
						framesLength={frames.length}
						frame={frame}
					/>
				))}
			</Box>
		</SortableContext>
	);
};

export default FrameGrid;
