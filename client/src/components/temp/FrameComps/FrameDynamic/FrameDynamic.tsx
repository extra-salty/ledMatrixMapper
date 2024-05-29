import {
	useActiveColorAction,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import {
	useEffectPlayerOptions,
	useFrameCellSize,
} from '@/libs/redux/features/effectEditor/selectors';
import { memo } from 'react';
import { ColorActions } from '@/types/effects/effectPayload.types';
import { ColorT } from '@/types/color/color.types';
import { Box, keyframes } from '@mui/material';
import FrameColumnDynamic from './FrameColumnDynamic/FrameColumnDynamic';

const FrameDynamic = ({
	frameId,
	frameData,
	isDisabled = false,
	showCoordinate,
	showBorder,
}: {
	frameId: string;
	frameData: ColorT[][];
	isDisabled?: boolean;
	showCoordinate?: boolean;
	showBorder?: boolean;
}) => {
	const colorAction = useActiveColorAction();
	const selection = useFrameCellSelection();
	const selectionActive =
		colorAction === ColorActions.select && selection && selection.frameId === frameId;

	const { borderEnabled, blur } = useEffectPlayerOptions();
	const cellSize = useFrameCellSize();

	const blink = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }`;

	return (
		<Box
			sx={{
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
							background: `linear-gradient(to right, rgba(200, 200, 200, 0.5) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(200, 200, 200, 0.5) 2px, transparent 2px)`,
							backgroundSize: 'calc(100% / 24) calc(100% / 12)',
							pointerEvents: 'none',
					  }
					: {},
				'&::after': selectionActive
					? {
							position: 'absolute',
							content: '""',
							border: '2px dashed white',
							pointerEvents: 'none',
							bottom: `${
								Math.min(selection.startCoordinate.y, selection.endCoordinate.y) *
								cellSize
							}px`,
							left: `${
								Math.min(selection.startCoordinate.x, selection.endCoordinate.x) *
								cellSize
							}px`,
							width: `${
								(Math.abs(selection.startCoordinate.x - selection.endCoordinate.x) + 1) *
								cellSize
							}px`,
							height: `${
								(Math.abs(selection.startCoordinate.y - selection.endCoordinate.y) + 1) *
								cellSize
							}px`,
							animation: `${blink} 2s linear infinite`,
					  }
					: {},
			}}
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

// style={{
// 	display: 'flex',
// 	flexGrow: '0',
// 	border: '1px 0 1px 0 solid gray',
// 	pointerEvents: isDisabled ? 'none' : 'auto',
// 	// opacity: isDisabled ? 0.5 : 1,
// 	filter: blur ? `blur(${blur}px)` : 'none',
//   ':hover': {
//     // add your hover styles here
//   },
// }}
