import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';

const FrameCellStatic = ({
	xIndex,
	yIndex,
	color,
	showCoordinate,
}: {
	xIndex: number;
	yIndex: number;
	color: ColorT | undefined;
	showCoordinate?: boolean;
}) => {
	const convertedColor = color
		? `hsl(${color.hue} ${color.saturation}% ${color.brightness}% / 
  ${color.brightness / 100})`
		: 'transparent';

	return (
		<div
			style={{
				width: `100%`,
				height: `auto`,
				aspectRatio: '1 / 1',
				border: '0',
				padding: '0',
				backgroundColor: convertedColor,
			}}
		></div>
	);
};

export default memo(FrameCellStatic);
