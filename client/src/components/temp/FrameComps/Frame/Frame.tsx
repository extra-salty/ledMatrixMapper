import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import FrameColumn from '../FrameColumn/FrameColumn';
import { Box } from '@mui/material';

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
	return (
		<div
			style={{
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexGrow: '0',
					border: '1px 0 1px 0 solid gray',
					pointerEvents: isDisabled ? 'none' : 'auto',
					filter: blur ? `blur(${blur}px)` : 'none',
					':hover': {
						// cursor: 'url(@public), auto;',
					},
				}}
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
		</div>
	);
};

export default memo(Frame);
