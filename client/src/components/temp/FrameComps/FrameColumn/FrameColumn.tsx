import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import FrameCell from '../FrameCell/FrameCell';

const FrameColumn = ({
	frameId,
	frameColumn,
	xIndex,
	showCoordinate,
	showBorder,
}: {
	frameId: string;
	frameColumn: ColorT[];
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
				<FrameCell
					key={`${xIndex}/${y}`}
					color={color}
					xIndex={xIndex}
					yIndex={y}
					frameId={frameId}
					showCoordinate={showCoordinate}
					showBorder={showBorder}
				/>
			))}
		</div>
	);
};

export default memo(FrameColumn);
