import { memo } from 'react';
import { ColorT } from '@/types/color/color.types';
import {
	hslToString,
	hsvToHsl,
} from '@/components/home/Color/SelectedColor/AttributeSlider/useBackgroundColor';

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
	const backgroundColor = color ? hslToString(hsvToHsl(color)) : 'transparent';

	return (
		<div
			style={{
				width: `100%`,
				height: `auto`,
				aspectRatio: '1 / 1',
				border: '0',
				padding: '0',
				backgroundColor,
			}}
		></div>
	);
};

export default memo(FrameCellStatic);
