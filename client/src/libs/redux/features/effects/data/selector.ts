import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';
import { EffectStateT, FrameStateT } from '@/types/effects/effect.types';

export const useActiveEffectIds = () =>
	useSelector((state: RootState) => state.effects.data.activeEffect);

export const useAnimationEffects = (animationId: string) =>
	useSelector((state: RootState) => state.effects.data.animations[animationId]);

export const useEffectCollections = () =>
	useSelector((state: RootState) => state.effects.data.animations);

export const useActiveEffect = (): EffectStateT | undefined =>
	useSelector((state: RootState) => {
		const { animationId, effectId } = state.effects.data.activeEffect;

		return state.effects.data.animations[animationId][effectId];

		console.log('🚀 ~ useSelector ~ effectId:', effectId);
		console.log('🚀 ~ useSelector ~ animationId:', animationId);
		const animationExist = animationId in state.effects.data.animations;
		console.log('🚀 ~ useSelector ~ animationExist:', animationExist);
		const effectExist = animationExist
			? effectId in state.effects.data.animations[animationId].effects
			: false;

		if (animationExist && effectExist)
			return state.effects.data.animations[animationId][effectId];
		else return undefined;
	});

export const useActiveEffectFrames = () =>
	useSelector((state: RootState) => {
		const { animationId, effectId } = state.effects.data.activeEffect;
		const animationExist = animationId in state.effects.data.animations;
		const effectExist = animationExist
			? effectId in state.effects.data.animations[animationId].effects
			: false;

		// if (animationExist && effectExist)
		return state.effects.data.animations[animationId][effectId].frames;
		// else return undefined;
	});

export const useActiveDragFrame = (frameId: string): FrameStateT | undefined =>
	useSelector((state: RootState) => {
		const { animationId, effectId } = state.effects.data.activeEffect;
		if (!animationId || !effectId) return undefined;

		const exist = frameId in state.effects.data.animations[animationId][effectId].frames;

		if (exist)
			return state.effects.data.animations[animationId][effectId].frames[frameId];
		else return undefined;
	});

export const useEffectNames = (): string[] =>
	useSelector((state: RootState) => {
		const effects = state.effects.data.animations;

		return [];
		// return Object.values(effects).map((effect) => effect.animationName);
	});
