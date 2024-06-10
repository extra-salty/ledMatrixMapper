import { useDispatch } from 'react-redux';
import {
	useFrameCellSize,
	useFrameGridOptionsToggle,
} from '@/libs/redux/features/effectEditor/selectors';
import { useCallback, MouseEvent, memo, useMemo, useState, useRef } from 'react';
import { useActiveColorAction } from '@/libs/redux/features/effects/data/selector';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import {
	hslToString,
	hsvToHsl,
} from '@/components/home/Color/SelectedColor/AttributeSlider/useBackgroundColor';
import { CoordinateT } from '@/types/misc/misc.types';
import {
	ColorActions,
	FrameColorActionPayloadT,
} from '@/types/effect/effectPayload.types';
import { FrameCellT } from '@/types/effect/effect.types';
import FrameCellSelectionMenu from '../../../FrameCellSelectionMenu/FrameCellSelectionMenu';
import Image from 'next/image';
import styles from './FrameCellDynamic.module.scss';

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
	const transitionEnabled = useFrameGridOptionsToggle('transitionEnabled');
	const cellSize = useFrameCellSize();

	const coordinate: CoordinateT = useMemo(
		() => ({ x: xIndex, y: yIndex }),
		[xIndex, yIndex],
	);
	const payload: FrameColorActionPayloadT = useMemo(
		() => ({ frameId, coordinate }),
		[frameId, coordinate],
	);

	const backgroundColor = cell?.color ? hslToString(hsvToHsl(cell.color)) : 'transparent';

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
					cursor: 'inherit',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: 'auto',
					aspectRatio: '1 / 1',
					border: `2px solid ${backgroundColor}`,
					backgroundColor,
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					setIsOpen(true);
				}}
				onMouseDown={handleMouseDown}
				onMouseOver={handleMouseOver}
			>
				{transitionEnabled && cell?.transition ? (
					<Image
						src={`/${cell.transition.function}.svg`}
						alt={cell.transition.function}
						width={cellSize * 0.8}
						height={cellSize * 0.8}
						style={{
							pointerEvents: 'none',
							transform:
								cell.transition.direction === 'disappear' ? 'scaleX(-1)' : 'none',
						}}
					/>
				) : (
					<div
						style={{
							width: `${cellSize * 0.8}px`,
							height: `${cellSize * 0.8}px`,
						}}
					></div>
				)}
			</button>
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

// if (e.shiftKey) {
// 	// dispatch(effectsDataActions.updateFrameDiagonal(payload));
// } else if (e.ctrlKey) {
// 	dispatch(effectsDataActions.updateFrameRow(payload));
// } else if (e.altKey) {
// 	dispatch(effectsDataActions.updateFrameColumn(payload));
// } else {
// }

// if (e.shiftKey) {
// 	// dispatch(effectsDataActions.updateFrameDiagonal(payload));
// } else if (e.ctrlKey) {
// 	dispatch(effectsDataActions.updateFrameRow(payload));
// } else if (e.altKey) {
// 	dispatch(effectsDataActions.updateFrameColumn(payload));
// } else {
// }
