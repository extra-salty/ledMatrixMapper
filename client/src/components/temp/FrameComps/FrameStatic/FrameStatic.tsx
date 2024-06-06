import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import {
	useEffectPlayerSelect,
	useEffectPlayerToggle,
} from '@/libs/redux/features/effectEditor/selectors';
import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import { Box } from '@mui/material';
import FrameColumnStatic from './FrameColumnStatic/FrameColumnStatic';

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
		  }
		: {};

const FrameStatic = ({ frameData }: { frameData: (ColorT | undefined)[][] }) => {
	const matrixSize = useActiveMatrixSize();
	const borderEnabled = useEffectPlayerToggle('borderEnabled');
	const blur = useEffectPlayerSelect('blur');

	const width = matrixSize ? matrixSize.width : 24;
	const height = matrixSize ? matrixSize.height : 12;

	return (
		<Box
			sx={{
				overflow: 'hidden',
				position: 'relative',
				'&::before': borderStyle(borderEnabled, width, height),
			}}
		>
			<Box
				sx={{
					display: 'flex',
					filter: blur ? `blur(${blur}px)` : 'none',
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
