import { memo } from 'react';
import { FrameCellT } from '@/types/effects/effect.types';
import FrameCellStatic from './FrameCellStatic/FrameCellStatic';

const FrameColumnStatic = ({
	frameId,
	frameColumn,
	xIndex,
	showCoordinate,
	showBorder,
}: {
	frameId: string;
	frameColumn: FrameCellT[];
	xIndex: number;
	showCoordinate?: boolean;
	showBorder?: boolean;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column-reverse',
				flexGrow: '1',
			}}
		>
			{frameColumn.map((color, y) => (
				<FrameCellStatic
					key={`${xIndex}/${y}`}
					color={color}
					xIndex={xIndex}
					yIndex={y}
					showCoordinate={showCoordinate}
					showBorder={showBorder}
				/>
			))}
		</div>
	);
};

export default memo(FrameColumnStatic);
