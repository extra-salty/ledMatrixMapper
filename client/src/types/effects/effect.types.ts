import { ColorT } from '../color/color.types';
import { CoordinateT, RecordT } from '../misc/misc.types';

export type EffectsSliceT = {
	activeEffect: ActiveEffectT;
	animations: EffectCollectionStateT;
	frameCellStartingCoordinate: CoordinateT;
};

export type EffectCollectionStateT = RecordT<EffectListStateT>;

export type EffectListBaseT = RecordT<EffectBaseT>;
export type EffectListStateT = RecordT<EffectStateT>;

export type EffectT<T> = {
	id: string;
	name: string;
	description?: string;
	order: string[];
	frames: T;
};
export type EffectBaseT = EffectT<FrameListBaseT>;
export type EffectStateT = EffectT<FrameListStateT>;

export type FrameListBaseT = RecordT<FrameBaseT>;
export type FrameListStateT = RecordT<FrameStateT>;

export type FrameBaseT = {
	id: string;
	data: ColorT[][];
	duration: number;
	disabled?: boolean;
};

export type FrameStateT = FrameBaseT & FrameCellHistoryT;

export type FrameCellHistoryT = {
	undo?: FrameCellT[];
	redo?: FrameCellT[];
};

export type FrameCellT = {
	coordinate: CoordinateT;
	value: ColorT;
};

export type FrameHistoryT = {
	frameIndex: number;
	type: FrameHistoryTypes;
	data: FrameStateT;
};

export enum FrameHistoryTypes {
	added = 'added',
	deleted = 'deleted',
}

export type ActiveEffectT = {
	animationId: string;
	effectId: string;
};

export type FrameColorPayloadT = {
	frameId: string;
	color: ColorT;
};

export type FrameCellColorPayloadT = FrameColorPayloadT & {
	coordinate: CoordinateT;
};

export type FrameColumnColorPayloadT = FrameColorPayloadT & {
	xIndex: number;
};

export type FrameRowColorPayloadT = FrameColorPayloadT & {
	yIndex: number;
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
