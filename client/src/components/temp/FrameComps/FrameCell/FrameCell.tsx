import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import {
	updateFrameCellColor,
	updateFrameColumnColor,
	updateFrameDiagonalColor,
	updateFrameRowColor,
} from '@/libs/redux/features/playlist/data/thunk';
import { ColorT } from '@/types/color/color.types';
import styles from './FrameCell.module.scss';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { CoordinateT } from '@/types/misc/misc.types';

const FrameCell = ({
	frameId,
	xIndex,
	yIndex,
	color: { hue: h, saturation: s, lightness: l },
	showCoordinate,
	showBorder,
}: {
	frameId: string;
	xIndex: number;
	yIndex: number;
	color: ColorT;
	showCoordinate?: boolean;
	showBorder?: boolean;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleOnClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const coordinate: CoordinateT = { x: xIndex, y: yIndex };

			if (event.shiftKey) {
				console.log('shift', xIndex, yIndex);
				dispatch(updateFrameDiagonalColor({ frameId, coordinate }));
			} else if (event.ctrlKey) {
				dispatch(updateFrameRowColor({ frameId, yIndex }));
			} else if (event.altKey) {
				dispatch(updateFrameColumnColor({ frameId, xIndex }));
			} else {
				console.log('start', xIndex, yIndex);
				dispatch(effectsDataActions.setFrameCellStartingCoordinate(coordinate));
				dispatch(updateFrameCellColor({ frameId, coordinate }));
			}
		},
		[dispatch, frameId, xIndex, yIndex],
	);

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		e.buttons === 1 && handleOnClick(e);
	};

	const coordinate = showCoordinate ? `${xIndex + 1}/${yIndex + 1}` : '';
	const convertedColor = `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} `;

	return (
		<button
			className={styles.frameCell}
			style={{
				backgroundColor: convertedColor,
				border: showBorder
					? '1px solid rgba(150, 150, 150, 0.5)'
					: `1px solid ${convertedColor}`,
			}}
			onClick={handleOnClick}
			onMouseOver={handleMouseOver}
		></button>
	);
};

export default memo(FrameCell);
