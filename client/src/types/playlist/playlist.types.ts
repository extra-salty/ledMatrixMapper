import { AnimationChildrenBaseT, AnimationStateT } from '../animation/animation.types';
import { RecordT } from '../misc/misc.types';

export type PlaylistDataT = RecordT<AnimationStateT>;

export type UpdateAnimationPayloadT<K extends keyof AnimationStateT> = {
	animationId: string;
	key: K;
	value: AnimationStateT[K];
};

export type UpdateChildPayloadT<K extends keyof AnimationChildrenBaseT> = {
	animationId: string;
	id: string;
	key: K;
	value: AnimationChildrenBaseT[K];
};
