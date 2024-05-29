import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';

const FrameCellDynamic = ({
	xIndex,
	yIndex,
	color: { hue: h, saturation: s, lightness: l },
	showCoordinate,
	showBorder,
}: {
	xIndex: number;
	yIndex: number;
	color: ColorT;
	showCoordinate?: boolean;
	showBorder?: boolean;
}) => {
	const convertedColor = `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} `;

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
