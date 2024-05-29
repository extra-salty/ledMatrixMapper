import { BSON } from 'realm-web';
import { EffectListBaseT } from '../effects/effect.types';

export type AnimationBaseT = {
	_id: BSON.ObjectID;
	userId: string;
	name: string;
	description?: string;
	dateCreated: Date;
	dateModified: Date;
	matrixSize: MatrixSizeT;
	childrenIds: string[];
	// children: Record<string, AnimationGroupT | AnimationEffectT>;
	children: Record<string, AnimationChildrenBaseT>;
	effects: EffectListBaseT;
};

export type AnimationStateT = {
	_id: string;
	name: string;
	description?: string;
	dateCreated: string;
	dateModified: string;
	matrixSize: MatrixSizeT;
	disabled: boolean;
	childrenIds: string[];
	children: Record<string, AnimationChildrenBaseT>;
};

export type AnimationChildrenBaseT = {
	id: string;
	parentId: string;
	type: AnimationChildrenTypesT;
	childrenIds?: string[];
	effectId?: string;
	name: string;
	description?: string;
	repeat: number;
	speed: number;
	disabled: boolean;
};

// export type AnimationGroupT = AnimationChildrenBaseT & {
// 	type: AnimationChildrenTypesT.group;
// 	childrenIds: string[];
// };

// export type AnimationEffectT = AnimationChildrenBaseT & {
// 	type: AnimationChildrenTypesT.effect;
// 	effectId: string;
// };

export enum AnimationChildrenTypesT {
	animation = 'animation',
	group = 'group',
	effect = 'effect',
}

export type MatrixSizeT = {
	width: number;
	height: number;
};
