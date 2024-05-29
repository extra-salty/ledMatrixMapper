import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo, useMemo, useState, useRef } from 'react';
import {
	useActiveColorAction,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { checkIfSelected, useCursor } from './getBrushSize';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ColorT } from '@/types/color/color.types';
import { CoordinateT } from '@/types/misc/misc.types';
import {
	ColorActions,
	FrameColorActionPayloadT,
} from '@/types/effects/effectPayload.types';
import FrameCellSelectionMenu from '../../../FrameCellSelectionMenu/FrameCellSelectionMenu';
import styles from './FrameCellDynamic.module.scss';

const FrameCellDynamic = ({
	frameId,
	xIndex,
	yIndex,
	color: { hue: h, saturation: s, lightness: l },
	showCoordinate,
}: {
	frameId: string;
	xIndex: number;
	yIndex: number;
	color: ColorT;
	showCoordinate?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLButtonElement>(null);

	const dispatch = useDispatch<AppDispatch>();

	const colorAction = useActiveColorAction();
	const selection = useFrameCellSelection();
	const cursor = useCursor();
	const width = useFrameCellSize();

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
				className={styles.cell}
				style={{
					cursor,
					width: `${width}px`,
					height: `${width}px`,
					backgroundColor: convertedColor,
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					setIsOpen(true);
				}}
				onMouseDown={handleMouseDown}
				onMouseOver={handleMouseOver}
			></button>
			{isOpen && (
				<FrameCellSelectionMenu
					anchorEl={ref.current}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			)}
		</>
	);
};

export default memo(FrameCellDynamic);
