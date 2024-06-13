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
import { FrameColorActionPayloadT } from '@/types/effect/effectPayload.types';
import { FrameCellT } from '@/types/effect/effect.types';
import FrameCellMenu from '../../../FrameCellMenu/FrameCellMenu';
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
					case 'fill': {
						dispatch(effectsDataActions.fillFrame(frameId));
						break;
					}
					case 'pipette': {
						dispatch(effectsDataActions.updateSelectedColor(payload));
						break;
					}
					case 'clearColorAndTransition':
					case 'clearColor':
					case 'clearTransition':
					case 'setColorAndTransition':
					case 'setColor':
					case 'setTransition': {
						dispatch(effectsDataActions.updateFrameCell(payload));
						break;
					}
					// case ColorActions.brushAll: {
					// 	dispatch(effectsDataActions.updateEveryFrameCell(coordinate));
					// 	break;
					// }
					case 'select': {
						dispatch(effectsDataActions.setFrameCellSelectionStart(payload));
						break;
					}
					default: {
					}
				}
			}
		},
		[colorAction, dispatch, frameId, payload],
	);

	const handleMouseOver = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			if (e.buttons === 1) {
				switch (colorAction) {
					case 'clearColorAndTransition':
					case 'clearColor':
					case 'clearTransition':
					case 'setColorAndTransition':
					case 'setColor':
					case 'setTransition': {
						dispatch(effectsDataActions.updateFrameCell(payload));
						break;
					}
					// case ColorActions.brushAll: {
					// 	dispatch(effectsDataActions.updateEveryFrameCell(coordinate));
					// 	break;
					// }
					case 'select': {
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
					border: `2px solid transparent`,
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
						src={`/${cell.transition.timing}.svg`}
						alt={cell.transition.timing}
						width={cellSize * 0.5}
						height={cellSize * 0.5}
						style={{
							pointerEvents: 'none',
							transform:
								cell.transition.direction === 'disappear' ? 'scaleX(-1)' : 'none',
						}}
					/>
				) : (
					<div
					// style={{
					// 	width: `${cellSize * 0.8}px`,
					// 	height: `${cellSize * 0.8}px`,
					// }}
					></div>
				)}
			</button>
			{isOpen && (
				<FrameCellMenu
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
