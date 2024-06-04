import { memo } from 'react';
import { FrameCellT } from '@/types/effect/effect.types';
import FrameCellDynamic from './FrameCellDynamic/FrameCellDynamic';

const FrameColumnDynamic = ({
	frameId,
	frameColumn,
	xIndex,
	showCoordinate,
}: {
	frameId: string;
	frameColumn: FrameCellT[];
	xIndex: number;
	showCoordinate?: boolean;
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column-reverse',
				flexGrow: '1',
			}}
		>
			{frameColumn.map((cell, y) => (
				<FrameCellDynamic
					key={`${xIndex}/${y}`}
					cell={cell}
					xIndex={xIndex}
					yIndex={y}
					frameId={frameId}
					showCoordinate={showCoordinate}
				/>
			))}
		</div>
	);
};

export default memo(FrameColumnDynamic);
