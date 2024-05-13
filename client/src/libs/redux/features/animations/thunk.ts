import { ThunkApiT } from '@/libs/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnimationStateT } from '@/types/animation/animation.types';

export const getAnimations = createAsyncThunk<AnimationStateT[], undefined, ThunkApiT>(
	'animations/getAll',
	async (arg, { extra: db }) => db.animations.getAnimations(),
);
