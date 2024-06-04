import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import FrameCellStatic from './FrameCellStatic/FrameCellStatic';

const FrameColumnStatic = ({
	frameColumn,
	xIndex,
	showCoordinate,
}: {
	frameColumn: (ColorT | undefined)[];
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
				<FrameCellStatic
					key={`${xIndex}/${y}`}
					color={color}
					xIndex={xIndex}
					yIndex={y}
					showCoordinate={showCoordinate}
				/>
			))}
		</div>
	);
};

export default memo(FrameColumnStatic);
