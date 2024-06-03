import { memo } from 'react';
import { FrameCellT } from '@/types/effects/effect.types';
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
			{frameColumn.map((color, y) => (
				<FrameCellDynamic
					key={`${xIndex}/${y}`}
					color={color}
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
