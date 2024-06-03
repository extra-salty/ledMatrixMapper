import { memo } from 'react';
import { FrameCellT } from '@/types/effects/effect.types';

const FrameCellDynamic = ({
	xIndex,
	yIndex,
	color,
	showCoordinate,
	showBorder,
}: {
	xIndex: number;
	yIndex: number;
	color: FrameCellT;
	showCoordinate?: boolean;
	showBorder?: boolean;
}) => {
	const convertedColor = color
		? `hsl(${color.hue} ${color.saturation}% ${color.lightness}% / ${
				(color.lightness / 100) * 2
		  }`
		: 'transparent';

	return (
		<button
			style={{
				width: `100%`,
				height: `auto`,
				aspectRatio: '1 / 1',
				border: '0',
				padding: '0',
				backgroundColor: convertedColor,
			}}
		></button>
	);
};

export default memo(FrameCellDynamic);
