import useCursor from './getBrushSize';
import {
	useActiveColorAction,
	useBrushSize,
} from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { ColorT } from '@/types/color/color.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ColorActions, FrameColorPayloadT } from '@/types/effects/effect.types';
import styles from './FrameCell.module.scss';

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

	const colorAction = useActiveColorAction();
	const brushSize = useBrushSize();
	const cursor = useCursor({ colorAction, brushSize });

	const coordinate = showCoordinate ? `${xIndex + 1}/${yIndex + 1}` : '';
	const convertedColor = `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} `;

	const handleOnClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const coordinate: CoordinateT = { x: xIndex, y: yIndex };
			const payload: FrameColorPayloadT = { frameId, coordinate };

			switch (colorAction) {
				case ColorActions.fill: {
					dispatch(effectsDataActions.fillFrame(frameId));
					break;
				}
				case ColorActions.pipette: {
					dispatch(effectsDataActions.updateSelectedColor(payload));
					break;
				}
				case ColorActions.brush: {
					if (event.shiftKey) {
						dispatch(effectsDataActions.updateFrameDiagonal(payload));
					} else if (event.ctrlKey) {
						dispatch(effectsDataActions.updateFrameRow(payload));
					} else if (event.altKey) {
						dispatch(effectsDataActions.updateFrameColumn(payload));
					} else {
						dispatch(effectsDataActions.setFrameCellStartingCoordinate(coordinate));
						dispatch(effectsDataActions.updateFrameCell(payload));
					}
					break;
				}
				default: {
				}
			}
		},
		[colorAction, dispatch, frameId, xIndex, yIndex],
	);

	const handleMouseOver = (e: MouseEvent<HTMLButtonElement>) => {
		e.buttons === 1 && handleOnClick(e);
	};

	return (
		<button
			className={styles.frameCell}
			style={{
				backgroundColor: convertedColor,
				border: showBorder
					? '1px solid rgba(150, 150, 150, 0.5)'
					: `1px solid ${convertedColor}`,
				cursor,
			}}
			onClick={handleOnClick}
			onMouseOver={handleMouseOver}
		></button>
	);
};

export default memo(FrameCell);
