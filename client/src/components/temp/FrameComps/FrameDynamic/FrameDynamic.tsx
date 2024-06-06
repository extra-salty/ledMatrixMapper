import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import {
	useCursor,
	useSelectionOverlay,
} from './FrameColumnDynamic/FrameCellDynamic/frameCellDynamicHelpers';
import {
	useFrameGridOptionsSelect,
	useFrameGridOptionsToggle,
} from '@/libs/redux/features/effectEditor/selectors';
import { memo } from 'react';
import { FrameDataT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameColumnDynamic from './FrameColumnDynamic/FrameColumnDynamic';

const borderStyle = (borderEnabled: boolean, width: number, height: number) =>
	borderEnabled
		? {
				position: 'absolute',
				top: '-1px',
				left: '-1px',
				content: '""',
				width: '100%',
				height: '100%',
				background: `linear-gradient(to right, gray 1px, transparent 1px),
            linear-gradient(to bottom, gray 1px, transparent 1px)`,
				backgroundSize: `calc(100% / ${width}) calc(100% / ${height})`,
				pointerEvents: 'none',
		  }
		: {};

const FrameDynamic = ({
	frameId,
	frameData,
	isDisabled = false,
	showCoordinate,
}: {
	frameId: string;
	frameData: FrameDataT;
	isDisabled?: boolean;
	showCoordinate?: boolean;
}) => {
	const cursor = useCursor();
	const selectionOverlay = useSelectionOverlay(frameId);
	const borderEnabled = useFrameGridOptionsToggle('borderEnabled');
	const blur = useFrameGridOptionsSelect('blur');
	const { height, width } = useActiveMatrixSize()!;

	return (
		<Box
			sx={{
				overflow: 'hidden',
				position: 'relative',
				'&::before': borderStyle(borderEnabled, width, height),
				'&::after': selectionOverlay,
			}}
		>
			<Box
				sx={{
					cursor,
					display: 'flex',
					pointerEvents: isDisabled ? 'none' : 'auto',
					filter: blur ? `blur(${blur}px)` : 'none',
					// borderTop: `1px solid ${theme.palette.divider}`,
					// borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				{frameData.map((frameColumn, x) => (
					<FrameColumnDynamic
						key={`column${x}`}
						frameId={frameId}
						frameColumn={frameColumn}
						xIndex={x}
						showCoordinate={showCoordinate}
					/>
				))}
			</Box>
		</Box>
	);
};

export default memo(FrameDynamic);
