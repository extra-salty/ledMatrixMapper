import { useActiveDragFrame } from '@/libs/redux/features/effects/data/selector';
import { Active, DragOverlay } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import FrameGridItem from '../../../../temp/EffectCreator/FrameGrid/FrameGridItem/FrameGridItem';

const FrameDragOverlay = ({ activeEvent }: { activeEvent: Active | null }) => {
	const frameId = activeEvent?.id as string;
	const index = activeEvent?.data.current?.sortable.index as number;
	const length = activeEvent?.data.current?.sortable.items.length;

	const frame = useActiveDragFrame(frameId);

	return (
		<DragOverlay modifiers={[restrictToParentElement]} dropAnimation={null}>
			{activeEvent && frame ? (
				<FrameGridItem
					disabledExternally
					framesLength={length}
					frame={frame}
					frameIndex={index}
				/>
			) : null}
		</DragOverlay>
	);
};

export default FrameDragOverlay;
