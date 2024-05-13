import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	AnimationCreatorLeftTabs,
	AnimationCreatorRightTabs,
	AppT,
	MainTabs,
	ThemeModeT,
} from './appSlice.types';

const initialState: AppT = {
	themeMode: 'dark',
	activeMainTab: MainTabs.animationCreator,
	activeAnimationCreatorTabs: {
		activeLeftTab: AnimationCreatorLeftTabs.animations,
		activeRightTab: AnimationCreatorRightTabs.editor,
	},
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setThemeMode: (state, action: PayloadAction<ThemeModeT>) => {
			state.themeMode = action.payload;
		},
		setMainTab: (state, action: PayloadAction<MainTabs>) => {
			state.activeMainTab = action.payload;
		},
		setAnimationCreatorLeftTab: (
			state,
			action: PayloadAction<AnimationCreatorLeftTabs>,
		) => {
			state.activeAnimationCreatorTabs.activeLeftTab = action.payload;
		},
		setAnimationCreatorRightTab: (
			state,
			action: PayloadAction<AnimationCreatorRightTabs>,
		) => {
			state.activeAnimationCreatorTabs.activeRightTab = action.payload;
		},
	},
});

export const appActions = appSlice.actions;
