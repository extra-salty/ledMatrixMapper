import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import { useSelectionOverlay } from './FrameColumnDynamic/FrameCellDynamic/frameCellDynamicHelpers';
import { useEffectPlayerOptions } from '@/libs/redux/features/effectEditor/selectors';
import { memo } from 'react';
import { FrameDataT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import FrameColumnDynamic from './FrameColumnDynamic/FrameColumnDynamic';

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
	const selectionOverlay = useSelectionOverlay(frameId);
	const { borderEnabled, blur } = useEffectPlayerOptions();
	const { height, width } = useActiveMatrixSize()!;

	return (
		<Box
			sx={(theme) => ({
				overflow: 'hidden',
				position: 'relative',
				'&::before': borderEnabled
					? {
							position: 'absolute',
							top: '-1px',
							left: '-1px',
							content: '""',
							width: '100%',
							height: '100%',
							background: `linear-gradient(to right, ${theme.palette.divider} 2px, transparent 2px),
                linear-gradient(to bottom, ${theme.palette.divider} 2px, transparent 2px)`,
							backgroundSize: `calc(100% / ${width}) calc(100% / ${height})`,
							pointerEvents: 'none',
					  }
					: {},
				'&::after': selectionOverlay,
			})}
		>
			<Box
				sx={(theme) => ({
					display: 'flex',
					pointerEvents: isDisabled ? 'none' : 'auto',
					filter: blur ? `blur(${blur}px)` : 'none',
					borderTop: `1px solid ${theme.palette.divider}`,
					borderBottom: `1px solid ${theme.palette.divider}`,
				})}
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
