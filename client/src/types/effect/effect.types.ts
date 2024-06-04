import { ColorT } from '../color/color.types';
import { CoordinateT, RecordT } from '../misc/misc.types';

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
	data: FrameDataT;
	duration: number;
	transition: TransitionT;
	disabled?: boolean;
};
export type FrameDataT = FrameCellT[][];

export type FrameCellT =
	| { color: ColorT | undefined; transition: TransitionT | undefined }
	| undefined;

export type FrameStateT = FrameBaseT & { history?: FrameCellHistoryT };

export enum TransitionT {
	linear = 'linear',
	easeIn = 'easeIn',
	easeOut = 'easeOut',
	easeInOut = 'easeInOut',
}

export type FrameCellHistoryT = {
	undo?: FrameCellHistoryItemT[];
	redo?: FrameCellHistoryItemT[];
};

export type FrameCellHistoryItemT = {
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
