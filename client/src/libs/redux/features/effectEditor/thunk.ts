import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiT } from '../../store';
import { ActiveEffectT } from '@/types/effects/effect.types';

export const selectEffect = createAsyncThunk<void, ActiveEffectT, ThunkApiT>(
	'animations/getAll',
	async (arg: ActiveEffectT, { getState, dispatch }) => {
		const state = getState();
		// const effect = state.effects.data[arg.animationId][arg.effectId];

		state.color.selectedColor.hue = 69;
	},
);
