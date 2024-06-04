import { FrameCellSelectionT } from '@/types/effect/effectPayload.types';

export const getSelectionCoordinates = (selection: FrameCellSelectionT) => {
	const { startCoordinate, endCoordinate, selectCoordinate } = selection;

	const xStart = Math.min(startCoordinate.x, endCoordinate.x);
	const xEnd = Math.max(startCoordinate.x, endCoordinate.x);
	const yStart = Math.min(startCoordinate.y, endCoordinate.y);
	const yEnd = Math.max(startCoordinate.y, endCoordinate.y);
	const xOffset = (selectCoordinate && selectCoordinate.x - xStart) || 0;
	const yOffset = (selectCoordinate && selectCoordinate.y - yStart) || 0;

	return {
		xStart,
		xEnd,
		yStart,
		yEnd,
		xOffset,
		yOffset,
	};
};
