import { checkIfSelected, useCursor } from './getBrushSize';
import {
	useActiveColorAction,
	useBrushSize,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo, useMemo, useState, useRef } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { ColorT } from '@/types/color/color.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import styles from './FrameCell.module.scss';
import {
	ColorActions,
	FrameColorActionPayloadT,
} from '@/types/effects/effectPayload.types';
import FrameCellMenu from '../FrameCellMenu/FrameCellMenu';

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
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLButtonElement>(null);

	const dispatch = useDispatch<AppDispatch>();

	const colorAction = useActiveColorAction();
	const brushSize = useBrushSize();
	const cursor = useCursor({ colorAction, brushSize });
	const selection = useFrameCellSelection();

	const coordinate: CoordinateT = useMemo(
		() => ({ x: xIndex, y: yIndex }),
		[xIndex, yIndex],
	);
	const payload: FrameColorActionPayloadT = useMemo(
		() => ({ frameId, coordinate }),
		[frameId, coordinate],
	);

	const convertedColor = `hsl(${h} ${s}% ${l}% / ${(l / 100) * 2} `;
	const isSelected =
		colorAction === ColorActions.select &&
		selection?.frameId === frameId &&
		checkIfSelected(coordinate, selection);

	const handleMouseDown = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			if (e.buttons === 1) {
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
						if (e.shiftKey) {
							// dispatch(effectsDataActions.updateFrameDiagonal(payload));
						} else if (e.ctrlKey) {
							dispatch(effectsDataActions.updateFrameRow(payload));
						} else if (e.altKey) {
							dispatch(effectsDataActions.updateFrameColumn(payload));
						} else {
							dispatch(effectsDataActions.updateFrameCell(payload));
						}
						break;
					}
					case ColorActions.brushAll: {
						dispatch(effectsDataActions.updateEveryFrameCell(coordinate));
						break;
					}
					case ColorActions.select: {
						dispatch(effectsDataActions.setFrameCellSelectionStart(payload));
						break;
					}
					default: {
					}
				}
			}
			// else if (e.buttons === 2) {
			// 	e.preventDefault();

			// 	setIsOpen(true);
			// }
		},
		[colorAction, coordinate, dispatch, frameId, payload],
	);

	const handleMouseOver = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			if (e.buttons === 1) {
				switch (colorAction) {
					case ColorActions.pipette:
					case ColorActions.fill: {
						break;
					}
					case ColorActions.brush: {
						if (e.shiftKey) {
							// dispatch(effectsDataActions.updateFrameDiagonal(payload));
						} else if (e.ctrlKey) {
							dispatch(effectsDataActions.updateFrameRow(payload));
						} else if (e.altKey) {
							dispatch(effectsDataActions.updateFrameColumn(payload));
						} else {
							dispatch(effectsDataActions.updateFrameCell(payload));
						}
						break;
					}
					case ColorActions.brushAll: {
						dispatch(effectsDataActions.updateEveryFrameCell(coordinate));
						break;
					}
					case ColorActions.select: {
						dispatch(effectsDataActions.setFrameCellSelectionEnd(coordinate));
						break;
					}
					default: {
					}
				}
			}
		},
		[colorAction, coordinate, dispatch, payload],
	);

	return (
		<>
			<button
				ref={ref}
				className={styles.frameCell}
				style={{
					cursor,
					backgroundColor: convertedColor,
					// border: showBorder
					// 	? '1px solid rgba(150, 150, 150, 0.5)'
					// 	: `1px solid ${convertedColor}`,
					// border: isSelected ? '2px dashed white' : '1px solid rgba(150, 150, 150, 0.5)',
					// borderTop: isSelected
					// 	? '1px dashed white'
					// 	: '1px solid rgba(150, 150, 150, 0.5)',
					// borderRight: isSelected
					// 	? '1px dashed white'
					// 	: '1px solid rgba(150, 150, 150, 0.5)',
					// borderBottom: isSelected
					// 	? '1px dashed white'
					// 	: '1px solid rgba(150, 150, 150, 0.5)',
					// borderLeft: isSelected
					// 	? '1px dashed white'
					// 	: '1px solid rgba(150, 150, 150, 0.5)',
					border: '0',
					// margin: isSelected ? '-1px' : '0',
					// boxShadow: isSelected ? '2px 2px 2px white' : 'none',
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					setIsOpen(true);
				}}
				onMouseDown={handleMouseDown}
				onMouseOver={handleMouseOver}
			></button>
			{isOpen && (
				<FrameCellMenu anchorEl={ref.current} isOpen={isOpen} setIsOpen={setIsOpen} />
			)}
		</>
	);
};

export default memo(FrameCell);
