import { ThunkApiT } from '@/libs/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { effectsDataActions } from '../../effects/data/slice';
import { playlistDataActions } from './slice';
import { playlistStateActions } from '../state/slice';
import { getAnimations } from '../../animations/thunk';
import { enqueueSnackbar } from 'notistack';
import { CoordinateT } from '@/types/misc/misc.types';

export const getAnimation = createAsyncThunk<void, string, ThunkApiT>(
	'animations/get',
	async (_id: string, { extra: db, dispatch }) => {
		try {
			const animation = await db.animations.getAnimation(_id);

			if (animation) {
				const { effects, details } = animation;

				dispatch(playlistDataActions.addAnimation(details));
				dispatch(playlistStateActions.addAnimation({ _id: details._id }));
				dispatch(
					effectsDataActions.addAnimation({
						animationId: details._id,
						animationName: details.name,
						effects,
					}),
				);
			}

			enqueueSnackbar('Animation loaded succesfully', { variant: 'success' });
		} catch {
			enqueueSnackbar('Failed to load animation', { variant: 'error' });
		}
	},
);

export const saveAnimations = createAsyncThunk<void, undefined, ThunkApiT>(
	'animations/saveAll',
	async (arg, { extra: db, getState, dispatch }) => {
		const animations = getState().playlist.data;
		const effects = getState().effects.data.animations;

		try {
			await db.animations.saveAll(animations, effects);
			dispatch(getAnimations());
			enqueueSnackbar('Animations saved succesfully', { variant: 'success' });
		} catch {
			enqueueSnackbar('Failed to save animations', { variant: 'error' });
		}
	},
);
