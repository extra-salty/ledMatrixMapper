import { nanoid } from 'nanoid';
import {
	AnimationChildrenBaseT,
	AnimationChildrenTypesT,
} from '../animation/animation.types';

export class Group implements AnimationChildrenBaseT {
	type: AnimationChildrenTypesT = AnimationChildrenTypesT.group;
	id: string = nanoid(12);
	parentId: string;
	name: string = 'New Group';
	description?: string | undefined;
	repeat: number = 1;
	speed: number = 1;
	childrenIds?: string[] | undefined = [];
	disabled: boolean = false;

	constructor(parentId: string) {
		this.parentId = parentId;
	}
}

export const createNewGroup = (parentId: string): AnimationChildrenBaseT => ({
	type: AnimationChildrenTypesT.group,
	id: nanoid(12),
	parentId,
	name: 'New Group',
	repeat: 1,
	speed: 1,
	disabled: false,
	childrenIds: [],
});

export const createNewEffect = (parentId: string): AnimationChildrenBaseT => ({
	type: AnimationChildrenTypesT.effect,
	id: nanoid(12),
	parentId,
	name: 'New Effect',
	repeat: 1,
	speed: 1,
	disabled: false,
});
