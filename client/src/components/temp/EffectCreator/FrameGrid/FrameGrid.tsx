import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMaxNumberOfColumns } from '@/libs/redux/features/effectEditor/selectors';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { FrameStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameGridItem from './FrameGridItem/FrameGridItem';

const FrameGrid = ({ frames }: { frames: FrameStateT[] }) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const frameIds = frames.map((frame) => frame.id);
	const { limitedColumns } = useMaxNumberOfColumns();

	useEffect(() => {
		const resizeObserver = new ResizeObserver(([grid]) => {
			const width = grid.contentRect.width;

			dispatch(effectEditorActions.updateGridOptions({ key: 'gridWidth', value: width }));
		});

		const currentRef = ref.current;
		currentRef && resizeObserver.observe(currentRef);

		return () => {
			currentRef && resizeObserver.unobserve(currentRef);
		};
	}, [dispatch]);

	return (
		<SortableContext items={frameIds} strategy={rectSortingStrategy}>
			<Box
				ref={ref}
				sx={{
					display: 'grid',
					gap: 4,
					gridTemplateColumns: `repeat(${limitedColumns}, minmax(${250}px, 1fr))`,
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
