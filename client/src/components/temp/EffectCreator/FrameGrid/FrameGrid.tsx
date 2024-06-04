import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { FrameStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameGridItem from './FrameGridItem/FrameGridItem';

const FrameGrid = ({ frames }: { frames: FrameStateT[] }) => {
	const frameIds = frames.map((frame) => frame.id);

	return (
		<SortableContext items={frameIds} strategy={rectSortingStrategy}>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '15px',
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

// sx={{
// 	display: 'grid',
// 	gap: '15px',
// 	gridTemplateColumns: `repeat(auto-fit, minmax(${frameWidth}px, 1fr))`,
// }}
