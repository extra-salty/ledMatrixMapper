import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { DndContext, closestCenter, DragEndEvent, Active } from '@dnd-kit/core';
import { EffectStateT } from '@/types/effects/effect.types';
import { Box } from '@mui/material';
import FrameGrid from '@/components/temp/EffectCreator/FrameGrid/FrameGrid';
import FrameDragOverlay from './FrameDragOverlay/FrameDragOverlay';

const FrameGridWrapper = ({ effect }: { effect?: EffectStateT }) => {
	const dispatch = useDispatch<AppDispatch>();
	const [activeEvent, setActiveEvent] = useState<Active | null>(null);

	const frames = effect?.order.map((id) => effect.frames[id]);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over) {
			setActiveEvent(null);
			return;
		}
		if (active.id !== over.id) {
			const activeIndex = active.data.current?.sortable.index;
			const overIndex = over.data.current?.sortable.index;

			dispatch(effectsDataActions.moveFrame({ activeIndex, overIndex }));
		}
		setActiveEvent(null);
	};

	return (
		<Box
			sx={{
				height: 'calc(100% - 60px)',
				width: '100%',
				overflow: 'scroll',
				overflowX: 'hidden',
				padding: 4,
				cursor: activeEvent ? 'grabbing' : 'auto',
			}}
		>
			<DndContext
				collisionDetection={closestCenter}
				onDragStart={({ active }: { active: Active }) => setActiveEvent(active)}
				onDragCancel={() => setActiveEvent(null)}
				onDragEnd={handleDragEnd}
			>
				{frames ? <FrameGrid frames={frames} /> : null}
				<FrameDragOverlay activeEvent={activeEvent} />
			</DndContext>
		</Box>
	);
};

export default FrameGridWrapper;
