import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Box, Paper } from '@mui/material';
import { FrameStateT } from '@/types/effects/effect.types';
import FrameSelector from './FrameSelector/FrameSelector';
import FrameActions from './FrameActions/FrameActions';
import FrameDynamic from '../../../FrameComps/FrameDynamic/FrameDynamic';
import FrameDuration from './FrameDuration/FrameDuration';

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
			<FrameDynamic
				frameId={id}
				frameData={data}
				isDisabled={isDisabled}
				showBorder={true}
			/>
			<FrameDuration frameId={id} duration={duration} />
		</Paper>
	);
};

export default memo(FrameGridItem);

{
	/* <Tooltip
					title='Frame Index'
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<Typography fontWeight={500} letterSpacing={3}>{`${
						frameIndex + 1
					}/${framesLength}`}</Typography>
				</Tooltip> */
}
