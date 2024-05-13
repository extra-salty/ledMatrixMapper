import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAnimation, saveAnimations } from '../data/thunk';
import {
	InternalStatePayloadT,
	PlaylistStateT,
	PlaylistTableT,
} from '@/types/playlist/playlistTable.types';

export const initialState: PlaylistTableT = {
	order: [],
	internal: {
		isLoading: false,
		isSaving: false,
		expanded: {},
		rowSelection: {},
		globalFilter: undefined,
		columnVisibility: {
			_id: false,
			description: false,
			dateCreated: false,
			'mrt-row-expand': false,
		},
		columnFilters: [],
		columnPinning: {
			left: ['mrt-row-select', 'name'],
			right: ['mrt-row-drag', 'actions'],
		},
		density: 'compact',
		isFullScreen: false,
	},
	focusedRow: undefined,
};

export const playlistStateSlice = createSlice({
	name: 'playlistState',
	initialState,
	extraReducers: (builder) => {
		builder
			.addMatcher(isAnyOf(saveAnimations.pending), (state) => {
				state.internal.isSaving = true;
			})
			.addMatcher(isAnyOf(saveAnimations.fulfilled, saveAnimations.rejected), (state) => {
				state.internal.isSaving = false;
			})
			.addMatcher(isAnyOf(getAnimation.pending), (state) => {
				state.internal.isLoading = true;
			})
			.addMatcher(isAnyOf(getAnimation.fulfilled, getAnimation.rejected), (state) => {
				state.internal.isLoading = false;
			});
	},
	reducers: {
		addAnimation: (state, action: PayloadAction<{ _id: string; index?: number }>) => {
			const { _id, index } = action.payload;

			state.order.push(_id);
		},
		removeAnimation: (state, action: PayloadAction<string>) => {
			const _id = action.payload;
			const index = state.order.indexOf(_id);

			state.order.splice(index, 1);
		},
		resetState: (state) => {
			state.internal = initialState.internal;
			state.focusedRow = undefined;
		},
		updateInternalState: <K extends keyof PlaylistStateT>(
			state: PlaylistTableT,
			action: PayloadAction<InternalStatePayloadT<K>>,
		) => {
			const { key, value } = action.payload;

			state.internal[key] = value;
		},
		setFocusedRow: (state, action: PayloadAction<string | undefined>) => {
			state.focusedRow = action.payload;
		},
		addToExpanded: (state, action: PayloadAction<string>) => {
			const actionId = action.payload;

			if (typeof state.internal.expanded === 'object') {
				state.internal.expanded[actionId] = true;
			}
		},
	},
});

const { updateInternalState, ...rest } = playlistStateSlice.actions;

export const playlistStateActions = {
	...rest,
	updateInternalState: updateInternalState as <K extends keyof PlaylistStateT>(
		payload: InternalStatePayloadT<K>,
	) => PayloadAction<InternalStatePayloadT<K>>,
};
