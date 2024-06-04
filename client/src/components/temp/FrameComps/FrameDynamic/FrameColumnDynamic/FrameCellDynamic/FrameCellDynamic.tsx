import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import { useDispatch } from 'react-redux';
import { useCallback, MouseEvent, memo, useMemo, useState, useRef } from 'react';
import { useActiveColorAction } from '@/libs/redux/features/effects/data/selector';
import { useCursor } from './frameCellDynamicHelpers';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { CoordinateT } from '@/types/misc/misc.types';
import {
	ColorActions,
	FrameColorActionPayloadT,
} from '@/types/effect/effectPayload.types';
import { FrameCellT } from '@/types/effect/effect.types';
import FrameCellSelectionMenu from '../../../FrameCellSelectionMenu/FrameCellSelectionMenu';
import styles from './FrameCellDynamic.module.scss';
import Image from 'next/image';

const FrameCellDynamic = ({
	frameId,
	xIndex,
	yIndex,
	cell,
	showCoordinate,
}: {
	frameId: string;
	xIndex: number;
	yIndex: number;
	cell: FrameCellT;
	showCoordinate?: boolean;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLButtonElement>(null);

	const colorAction = useActiveColorAction();
	const cursor = useCursor();
	const cellSize = useFrameCellSize();

	const coordinate: CoordinateT = useMemo(
		() => ({ x: xIndex, y: yIndex }),
		[xIndex, yIndex],
	);
	const payload: FrameColorActionPayloadT = useMemo(
		() => ({ frameId, coordinate }),
		[frameId, coordinate],
	);

	const color = cell ? cell.color : undefined;
	const convertedColor = color
		? `hsl(${color.hue} ${color.saturation}% ${color.lightness}% / ${
				(color.lightness / 100) * 2
		  } `
		: 'transparent';

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
					case ColorActions.brush:
					case ColorActions.transition:
					case ColorActions.clear: {
						dispatch(effectsDataActions.updateFrameCell(payload));
						break;
						// if (e.shiftKey) {
						// 	// dispatch(effectsDataActions.updateFrameDiagonal(payload));
						// } else if (e.ctrlKey) {
						// 	dispatch(effectsDataActions.updateFrameRow(payload));
						// } else if (e.altKey) {
						// 	dispatch(effectsDataActions.updateFrameColumn(payload));
						// } else {
						// }
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
					case ColorActions.clear:
					case ColorActions.transition:
					case ColorActions.brush: {
						dispatch(effectsDataActions.updateFrameCell(payload));
						break;
						// if (e.shiftKey) {
						// 	// dispatch(effectsDataActions.updateFrameDiagonal(payload));
						// } else if (e.ctrlKey) {
						// 	dispatch(effectsDataActions.updateFrameRow(payload));
						// } else if (e.altKey) {
						// 	dispatch(effectsDataActions.updateFrameColumn(payload));
						// } else {
						// }
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
			{/* <div style={{ width: `${cellSize}px`, height: `${cellSize}px` }}> */}
			<button
				ref={ref}
				className={styles.cell}
				style={{
					cursor,
					width: `${cellSize}px`,
					height: `${cellSize}px`,
					backgroundColor: convertedColor,
					// border: showCoordinate ? '1px solid black' : 'none',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					setIsOpen(true);
				}}
				onMouseDown={handleMouseDown}
				onMouseOver={handleMouseOver}
			>
				{cell && cell.transition && (
					<Image
						src={`/${cell.transition}.svg`}
						alt='image'
						width={cellSize - 5}
						height={cellSize - 5}
					/>
				)}
			</button>
			{/* </div> */}
			{isOpen && (
				<FrameCellSelectionMenu
					frameId={frameId}
					coordinate={coordinate}
					anchorEl={ref.current}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			)}
		</>
	);
};

export default memo(FrameCellDynamic);
