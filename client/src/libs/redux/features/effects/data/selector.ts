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
		if (state.effects.data.activeEffect) {
			const { animationId, effectId } = state.effects.data.activeEffect;
			return state.effects.data.animations[animationId][effectId];
		}
	});

export const useActiveEffectFrames = () =>
	useSelector((state: RootState) => {
		if (state.effects.data.activeEffect) {
			const { animationId, effectId } = state.effects.data.activeEffect;
			return state.effects.data.animations[animationId][effectId].frames;
		}
	});

export const useActiveEffectFrames2 = () =>
	useSelector((state: RootState) => {
		if (state.effects.data.activeEffect) {
			const { animationId, effectId } = state.effects.data.activeEffect;

			const { frames, order } = state.effects.data.animations[animationId][effectId];

			return order.map((frameId) => frames[frameId]);
		}
	});

export const useActiveDragFrame = (frameId: string): FrameStateT | undefined =>
	useSelector((state: RootState) => {
		if (state.effects.data.activeEffect) {
			const { animationId, effectId } = state.effects.data.activeEffect;
			return state.effects.data.animations[animationId][effectId].frames[frameId];
		}
	});

export const useBrushSize = () =>
	useSelector((state: RootState) => state.effects.data.brushSize);

export const useActiveColorAction = () =>
	useSelector((state: RootState) => state.effects.data.activeColorAction);

export const useSelectedColor = () =>
	useSelector((state: RootState) => state.effects.data.selectedColor);

export const useFrameCellSelection = () =>
	useSelector((state: RootState) => state.effects.data.frameCellSelection);
