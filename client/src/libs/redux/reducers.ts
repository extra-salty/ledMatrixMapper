import { appSlice } from './features/app/slice';
import { animationsSlice } from './features/animations/slice';
import { playlistStateSlice } from './features/playlist/state/slice';
import { playlistDataSlice } from './features/playlist/data/slice';
import { effectsDataSlice } from './features/effects/data/slice';
import { effectsStateSlice } from './features/effects/state/slice';
import { effectEditorSlice } from './features/effectEditor/slice';
import { colorSlice } from './features/color/slice';
import { combineReducers } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import createPersistStorage from './storage';

export const persistConfig = {
	key: 'root',
	storage: createPersistStorage(),
	timeout: 500,
	// blacklist: ['navigation'], // navigation will not be persisted
};

const playlistReducer = combineReducers({
	state: playlistStateSlice.reducer,
	data: playlistDataSlice.reducer,
});

const effectsReducer = combineReducers({
	state: effectsStateSlice.reducer,
	data: effectsDataSlice.reducer,
});

const rootReducer = combineReducers({
	[appSlice.name]: appSlice.reducer,
	[animationsSlice.name]: animationsSlice.reducer,
	playlist: playlistReducer,
	effects: effectsReducer,
	[effectEditorSlice.name]: effectEditorSlice.reducer,
	[colorSlice.name]: colorSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
