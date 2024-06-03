import { MatrixSizeT } from '../animation/animation.types';
import { ColorT } from '../color/color.types';
import { CoordinateT } from '../misc/misc.types';
import { EffectCollectionStateT, EffectStateT, FrameStateT } from './effect.types';

export type EffectsSliceT = {
	activeEffect: ActiveEffectT | undefined;
	animations: EffectCollectionStateT;
	brushSize: number;
	frameCellSelection: FrameCellSelectionT | undefined;
	colorActionCoordinate: ColorActionCoordinateT | undefined;
	activeMatrixSize: MatrixSizeT | undefined;
	activeColorAction: ColorActions;
	selectedColor: ColorT;
	colorHistory: ColorT[];
};

export type FrameCellSelectionT = {
	frameId: string;
	startCoordinate: CoordinateT;
	endCoordinate: CoordinateT;
	selectCoordinate: CoordinateT | undefined;
};

export type ColorActionCoordinateT = { frameId: string; coordinate: CoordinateT };

export type ActiveEffectT = {
	animationId: string;
	effectId: string;
};

export enum ColorActions {
	brush = 'brush',
	brushAll = 'brushAll',
	pipette = 'pipette',
	fill = 'fill',
	clear = 'clear',
	select = 'select',
	copy = 'copy',
	cut = 'cut',
	paste = 'paste',
}

export type FrameColorActionPayloadT = {
	frameId: string;
	coordinate: CoordinateT;
};

export type UpdateFramePayloadT<K extends keyof FrameStateT> = {
	frameId: string;
	key: K;
	value: FrameStateT[K];
};

export type UpdateEffectPayloadT<K extends keyof EffectStateT> = {
	animationId: string;
	id: string;
	key: K;
	value: EffectStateT[K];
};
