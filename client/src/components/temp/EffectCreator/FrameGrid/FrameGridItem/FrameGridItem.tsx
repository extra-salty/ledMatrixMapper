import { useSortable } from '@dnd-kit/sortable';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { memo, useRef } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Box, Divider, Paper } from '@mui/material';
import { FrameStateT } from '@/types/effect/effect.types';
import FrameSelector from './FrameSelector/FrameSelector';
import FrameActions from './FrameActions/FrameActions';
import FrameDynamic from '../../../FrameComps/FrameDynamic/FrameDynamic';
import FrameDuration from './FrameDuration/FrameDuration';
import FrameTransition from './FrameTransition/FrameTransition';

const FrameGridItem = ({
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
	const ref = useRef<HTMLDivElement>(null);

	const { id, data, duration, disabled } = frame;

	const {
		setNodeRef,
		isDragging,
		isSorting,
		transform,
		transition,
		attributes,
		listeners,
	} = useSortable({
		id,
		animateLayoutChanges: () => false,
	});

	const isDisabled = isDragging || isSorting || !!disabled || disabledExternally;

	return (
		<Paper
			ref={setNodeRef}
			elevation={6}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				transition,
				transform: CSS.Transform.toString(transform),
				opacity: isDragging ? 0 : 1,
			}}
		>
			<Box
				ref={ref}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<FrameSelector
					frameId={id}
					disabled={!!disabled}
					isDragging={isDragging}
					dragAttributes={attributes}
					dragListeners={listeners}
				/>
				<FrameActions frameIndex={frameIndex} frame={frame} />
			</Box>
			<FrameDynamic frameId={id} frameData={data} isDisabled={isDisabled} />
			<Box sx={{ display: 'flex' }}>
				<FrameDuration frameId={id} duration={duration} />
				<Divider orientation='vertical' flexItem />
				<FrameTransition frameId={id} transition={frame.transition} />
			</Box>
		</Paper>
	);
};

export default memo(FrameGridItem);
