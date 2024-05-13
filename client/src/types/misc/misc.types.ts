export type RecordT<T> = Record<string, T>;

export type CoordinateT = {
	x: number;
	y: number;
};

export type FrameCellLocationT = {
	frameIndex: number;
	coordinate: CoordinateT;
};

export enum DndElements {
	animationList = 'animationList',
	animationListItem = 'animationListItem',
	effectList = 'effectList',
	effectListItem = 'effectListItem',
	newEffect = 'newEffect',
	newAnimation = 'newAnimation',
	removeDropZone = 'removeDropZone',
}
