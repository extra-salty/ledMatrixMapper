import { TimestampsT } from '@/components/home/Playlist/usePlaylistProps/useConvertedData';
import {
	TableColumnsPartialT,
	TableColumnsT,
	TableInstanceT,
	TablePropsT,
	TableRowT,
	TableStateT,
} from '../tables/tables.types';
import { AnimationChildrenTypesT, AnimationStateT } from './animation.types';

// XOR with group effect

export type AnimationTableRowT = {
	animationId: string;
	parentId: string;
	id: string;
	type: AnimationChildrenTypesT;
	name: string;
	description?: string;
	disabled: boolean;
	children?: AnimationTableRowT[];
	timestamps: TimestampsT[];
} & TableAnimationT &
	TableEffectT &
	TableChildT;

export type TableAnimationT = {
	dateCreated?: string;
	dateModified?: string;
	width?: number;
	height?: number;
};

export type TableEffectT = {
	effectId?: string;
};

export type TableChildT = {
	repeat: number;
	speed: number;
	duration: number;
	startTime: number;
	framesLength: number;
};

export type AnimationsSliceT = {
	data: AnimationStateT[];
	state: AnimationTableStateT;
};

export type AnimationTableStateT = {
	internal: AnimationTableInternalT;
	focusedRow: string | undefined;
};

export type AnimationTableInternalT = TableStateT;
export type AnimationRowT = TableRowT<AnimationTableRowT>;
export type AnimationsTablePropsT = TablePropsT<AnimationTableRowT>;
export type AnimationsTableColumnsT = TableColumnsT<AnimationTableRowT>;
export type AnimationsTableColumnsPartialT = TableColumnsPartialT<AnimationTableRowT>;
export type AnimationsTableInstanceT = TableInstanceT<AnimationTableRowT>;

export type InternalStatePayloadT<K extends keyof AnimationTableInternalT> = {
	key: K;
	value: AnimationTableInternalT[K];
};
