import { useEffectPlayerOptions } from '@/libs/redux/features/effectEditor/selectors';
import { useActiveMatrixSize } from '@/libs/redux/features/effects/data/selector';
import { memo } from 'react';
import { FrameDataT } from '@/types/effects/effect.types';
import { Box } from '@mui/material';
import FrameColumnStatic from './FrameColumnStatic/FrameColumnStatic';

const FrameStatic = ({
	frameId,
	frameData,
}: {
	frameId: string;
	frameData: FrameDataT;
}) => {
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
					  }
					: {},
			})}
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
						frameId={frameId}
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
