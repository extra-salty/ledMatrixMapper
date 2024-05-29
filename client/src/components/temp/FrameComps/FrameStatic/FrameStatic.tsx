import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import { Box } from '@mui/material';
import FrameColumnStatic from './FrameColumnStatic/FrameColumnStatic';
import { BorderRight } from '@mui/icons-material';

const FrameStatic = ({
	frameId,
	frameData,
	showCoordinate,
	showBorder,
	blur,
}: {
	frameId: string;
	frameData: ColorT[][];
	showCoordinate?: boolean;
	showBorder?: boolean;
	blur?: number;
}) => {
	return (
		<Box
			sx={{
				overflow: 'hidden',
				position: 'relative',
				'&::before': showBorder
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
					  }
					: {},
				'&::after': showBorder
					? {
							position: 'absolute',
							top: '0',
							right: '0',
							bottom: '0',
							content: '""',
							width: '1px',
							background: `linear-gradient(to bottom, gray, gray)`, // Creates a 1px wide gray border
					  }
					: {},
			}}
		>
			<Box
				sx={{
					display: 'flex',
					filter: blur ? `blur(${blur}px)` : 'none',
				}}
			>
				{frameData.map((frameColumn, x) => {
					return (
						<FrameColumnStatic
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
	);
};

export default memo(FrameStatic);
