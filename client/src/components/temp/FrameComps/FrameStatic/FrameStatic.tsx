import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import { CSSProperties, memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import { Box } from '@mui/material';
import FrameColumnStatic from './FrameColumnStatic/FrameColumnStatic';

const gridStyle = (width: number, height: number): CSSProperties => ({
	position: 'absolute',
	top: '-2px',
	left: '-2px',
	content: '""',
	width: '100%',
	height: '100%',
	background: `linear-gradient(to right, gray 2px, transparent 2px),
            linear-gradient(to bottom, gray 2px, transparent 2px)`,
	backgroundSize: `calc(100% / ${width}) calc(100% / ${height})`,
});

const FrameStatic = ({
	frameData,
	showGrid,
	blurIntensity,
}: {
	frameData: (ColorT | undefined)[][];
	showGrid: boolean;
	blurIntensity: number;
}) => {
	const matrixSize = useActiveMatrixSize();
	const width = matrixSize ? matrixSize.width : 24;
	const height = matrixSize ? matrixSize.height : 12;

	const grid = showGrid ? gridStyle(width, height) : {};
	const blur = blurIntensity ? `blur(${blurIntensity}px)` : 'none';

	return (
		<Box
			sx={{
				overflow: 'hidden',
				position: 'relative',
				'&::before': grid,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					filter: blur,
				}}
			>
				{frameData.map((frameColumn, x) => (
					<FrameColumnStatic
						key={`column${x}`}
						frameColumn={frameColumn}
						xIndex={x}
						showCoordinate={false}
					/>
				))}
			</Box>
		</Box>
	);
};

export default memo(FrameStatic);
