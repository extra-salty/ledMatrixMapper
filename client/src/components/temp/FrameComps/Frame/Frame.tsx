import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import { Box } from '@mui/material';
import FrameColumn from '../FrameColumn/FrameColumn';
import { useFrameCellSelection } from '@/libs/redux/features/effects/data/selector';

const Frame = ({
	frameId,
	frameData,
	isDisabled = false,
	showCoordinate,
	showBorder,
	blur,
}: {
	frameId: string;
	frameData: ColorT[][];
	isDisabled?: boolean;
	showCoordinate?: boolean;
	showBorder?: boolean;
	blur?: number;
}) => {
	const selection = useFrameCellSelection();

	const cellSize = 38;

	return (
		<Box
			sx={{
				overflow: 'hidden',
				position: 'relative',
			}}
		>
			<Box
				sx={{
					'&::before': {
						position: 'absolute',
						top: '-1px',
						left: '-1px',
						content: '""',
						width: '100%',
						height: '100%',
						background: `linear-gradient(to right, rgba(200, 200, 200, 0.5) 2px, transparent 2px),
			          linear-gradient(to bottom, rgba(200, 200, 200, 0.5) 2px, transparent 2px)`,
						backgroundSize: 'calc(100% / 24) calc(100% / 12)',
						zIndex: '10',
						pointerEvents: 'none',
					},
					'&::after': {
						position: 'absolute',
						bottom:
							selection &&
							`${
								Math.min(selection.startCoordinate.y, selection.endCoordinate.y) *
								cellSize
							}px`,
						left:
							selection &&
							`${
								Math.min(selection.startCoordinate.x, selection.endCoordinate.x) *
								cellSize
							}px`,
						content: '""',
						width:
							selection &&
							`${
								(Math.abs(selection.startCoordinate.x - selection.endCoordinate.x) + 1) *
								cellSize
							}px`,
						height:
							selection &&
							`${
								(Math.abs(selection.startCoordinate.y - selection.endCoordinate.y) + 1) *
								cellSize
							}px`,
						border: '2px dashed white',
						zIndex: '100000',
						pointerEvents: 'none',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexGrow: '0',
						border: '1px 0 1px 0 solid gray',
						pointerEvents: isDisabled ? 'none' : 'auto',
						filter: blur ? `blur(${blur}px)` : 'none',
					}}
				>
					{frameData.map((frameColumn, x) => {
						return (
							<FrameColumn
								key={`column${x}`}
								frameId={frameId}
								frameColumn={frameColumn}
								xIndex={x}
								showCoordinate={showCoordinate}
								showBorder={showBorder}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default memo(Frame);

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
