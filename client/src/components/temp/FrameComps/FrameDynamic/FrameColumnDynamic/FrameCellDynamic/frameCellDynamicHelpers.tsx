import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import {
	useActiveColorAction,
	useBrushSize,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { ColorActions, FrameCellSelectionT } from '@/types/effects/effectPayload.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { keyframes } from '@mui/material';
import { CSSProperties } from 'react';

export const useCursor = () => {
	const cellSize = useFrameCellSize();
	const brushSize = useBrushSize();
	const colorAction = useActiveColorAction();

	const defaultUrl = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg' version='1.1'`;

	switch (colorAction) {
		case ColorActions.fill:
			return `${defaultUrl} %3E%3Cpath d='M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12M5.21 10 10 5.21 14.79 10zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5M2 20h20v4H2z'%3E%3C/path%3E%3C/svg%3E") 12 12, auto`;
		case ColorActions.pipette:
			return `${defaultUrl} %3E%3Cpath d='m20.71 5.63-2.34-2.34a.9959.9959 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z'/%3E%3C/svg%3E%0A") 0 24, auto`;
		case ColorActions.brush:
		case ColorActions.clear:
			const cursorSize = Math.min((brushSize * 2 + 1) * cellSize, 128);
			const cursorMiddle = cursorSize / 2;
			const cursorProps = `width='${cursorSize}' height='${cursorSize}'`;
			const circleProps = ` cx='${cursorMiddle}' cy='${cursorMiddle}' r='${
				cursorMiddle - 1
			}'`;

			return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' ${cursorProps} %3E%3Ccircle ${circleProps} stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E") ${cursorMiddle} ${cursorMiddle}, auto`;
		case ColorActions.brushAll:
			return `${defaultUrl} %3E%3Cpath d='M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4z'/%3E%3C/svg%3E%0A") 12 12, auto`;
		default:
			return 'auto';
	}
};

export const isCellSelected = (
	cellCoordinate: CoordinateT,
	selection: FrameCellSelectionT,
): boolean => {
	const { startCoordinate, endCoordinate } = selection;

	return (
		cellCoordinate.x >= Math.min(startCoordinate.x, endCoordinate.x) &&
		cellCoordinate.x <= Math.max(startCoordinate.x, endCoordinate.x) &&
		cellCoordinate.y >= Math.min(startCoordinate.y, endCoordinate.y) &&
		cellCoordinate.y <= Math.max(startCoordinate.y, endCoordinate.y)
	);
};

export const useSelectionOverlay = (frameId: string): CSSProperties => {
	const colorAction = useActiveColorAction();
	const cellSize = useFrameCellSize();
	const selection = useFrameCellSelection();

	const selectionActive =
		(colorAction === ColorActions.select || colorAction === ColorActions.copy) &&
		selection &&
		selection.frameId === frameId;

	const blink = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }`;

	return selectionActive
		? {
				position: 'absolute',
				content: '""',
				border: '2px dashed white',
				pointerEvents: 'none',
				bottom: `${
					Math.min(selection.startCoordinate.y, selection.endCoordinate.y) * cellSize
				}px`,
				left: `${
					Math.min(selection.startCoordinate.x, selection.endCoordinate.x) * cellSize
				}px`,
				width: `${
					(Math.abs(selection.startCoordinate.x - selection.endCoordinate.x) + 1) *
					cellSize
				}px`,
				height: `${
					(Math.abs(selection.startCoordinate.y - selection.endCoordinate.y) + 1) *
					cellSize
				}px`,
				animation:
					colorAction === ColorActions.select ? `${blink} 2s linear infinite` : 'none',
		  }
		: {};
};
