import { useFrameCellSize } from '@/libs/redux/features/effectEditor/selectors';
import {
	useActiveColorAction,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { FrameCellSelectionT } from '@/types/effect/effectPayload.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { keyframes } from '@mui/material';
import { CSSProperties } from 'react';

export const useCursor = () => {
	const colorAction = useActiveColorAction();
	const defaultUrl = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg' version='1.1' %3E`;

	switch (colorAction) {
		case 'fill':
			const fill = `%3Cpath d='M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12M5.21 10 10 5.21 14.79 10zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5M2 20h20v4H2z'/%3E`;
			return `${defaultUrl} ${fill} %3C/svg%3E") 12 12, auto`;
		case 'pipette':
			const pipette = `%3Cpath d='m20.71 5.63-2.34-2.34a.9959.9959 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z'/%3E`;
			return `${defaultUrl} ${pipette} %3C/svg%3E") 0 24, auto`;
		case 'clearColorAndTransition':
			const clear = `%3Cpath d='M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31m-.88 3.12L12.5 12.5 5.27 5.27 4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.96-1.5l2.63 2.63 1.27-1.27z'/%3E`;
			return `${defaultUrl} ${clear} %3C/svg%3E") 12 12, auto`;
		case 'setColor':
			const brush = `%3Cpath d='M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3m13.71-9.37-1.34-1.34a.9959.9959 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41'/%3E`;
			return `${defaultUrl} ${brush} %3C/svg%3E") 0 24, auto`;
		// case ColorActions.brushAll:
		// 	const brushAll = `%3Cpath d='M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4z'/%3E`;
		// 	return `${defaultUrl} ${brushAll} %3C/svg%3E") 12 12, auto`;
		case 'setTransition':
			const transition = ` %3Cpath d='M14.06 9.94 12 9l2.06-.94L15 6l.94 2.06L18 9l-2.06.94L15 12zM4 14l.94-2.06L7 11l-2.06-.94L4 8l-.94 2.06L1 11l2.06.94zm4.5-5 1.09-2.41L12 5.5 9.59 4.41 8.5 2 7.41 4.41 5 5.5l2.41 1.09zm-4 11.5 6-6.01 4 4L23 8.93l-1.41-1.41-7.09 7.97-4-4L3 19z'/%3E`;
			return `${defaultUrl} ${transition} %3C/svg%3E") 12 12, auto`;
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
	const selection = useFrameCellSelection();
	const cellSize = useFrameCellSize();

	const selectionActive =
		colorAction === ('select' || 'copy' || 'cut') &&
		selection &&
		selection.frameId === frameId;

	if (!selectionActive) return {};

	const blink = keyframes`
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }`;

	const bottomOffset =
		Math.min(selection.startCoordinate.y, selection.endCoordinate.y) * cellSize;
	const leftOffset =
		Math.min(selection.startCoordinate.x, selection.endCoordinate.x) * cellSize;
	const width =
		(Math.abs(selection.startCoordinate.x - selection.endCoordinate.x) + 1) * cellSize;
	const height =
		(Math.abs(selection.startCoordinate.y - selection.endCoordinate.y) + 1) * cellSize;
	const animation = colorAction === 'select' ? `${blink} 2s linear infinite` : 'none';

	return {
		position: 'absolute',
		content: '""',
		border: '2px dashed white',
		pointerEvents: 'none',
		bottom: `${bottomOffset}px`,
		left: `${leftOffset}px`,
		width: `${width}px`,
		height: `${height}px`,
		animation,
		boxShadow:
			'rgba(100, 100, 100, 0.3) 0px 2px 4px 0px, rgba(50, 50, 50, 0.3) 0px 2px 16px 0px',
	};
};
