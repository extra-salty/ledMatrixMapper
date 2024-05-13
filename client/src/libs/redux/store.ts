import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { persistedReducer } from './reducers';
import { DatabaseT } from '../../providers/DatabaseProvider/DatabaseProvider';
import { createStateSyncMiddleware } from 'redux-state-sync';

const blacklist = [PERSIST, PURGE, REHYDRATE, REGISTER, FLUSH, PAUSE];

const syncConfig = {
	blacklist,
};

export const makeStore = (db: DatabaseT) => {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: { extraArgument: db },
				// serializableCheck: {
				// 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				// },
				serializableCheck: false,
			}).prepend(
				createStateSyncMiddleware({
					predicate: (action) => {
						if (typeof action !== 'function') {
							if (Array.isArray(blacklist)) {
								return blacklist.indexOf(action.type) < 0;
							}
						}
						return false;
					},
				}),
				// createStateSyncMiddleware(syncConfig),
			),
	});
};

type ExtraArgument = {
	db: DatabaseT;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType> = ThunkAction<
	ReturnType,
	RootState,
	ExtraArgument,
	Action
>;
export type ThunkApiT = {
	dispatch: AppDispatch;
	state: RootState;
	extra: DatabaseT;
};

// yet to be released in 2.1.0 (likely this week), sorry - docs are automatically built from master
// Use throughout your app instead of plain `useDispatch` and `useSelector`

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
