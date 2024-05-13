import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAnimations } from './thunk';
import {
	AnimationTableInternalT,
	AnimationsSliceT,
	InternalStatePayloadT,
} from '@/types/animation/animationTable.types';

export const initialState: AnimationsSliceT = {
	data: [],
	state: {
		internal: {
			isSaving: false,
			isLoading: false,
			expanded: {},
			rowSelection: {},
			columnVisibility: { _id: false, description: false, 'mrt-row-expand': false },
			sorting: [],
			columnFilters: [],
			globalFilter: '',
			columnPinning: {
				left: ['mrt-row-select', 'name', 'rowId'],
				right: ['mrt-row-drag', 'actions'],
			},
			density: 'compact',
			isFullScreen: false,
		},
		focusedRow: undefined,
	},
};

export const animationsSlice = createSlice({
	name: 'animations',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAnimations.fulfilled, (state, action) => {
				state.data = action.payload;
			})
			.addCase(getAnimations.pending, (state) => {
				state.state.internal.isLoading = true;
			})
			.addMatcher(isAnyOf(getAnimations.fulfilled, getAnimations.rejected), (state) => {
				state.state.internal.isLoading = false;
			});
	},
	reducers: {
		resetState: (state) => {
			state.state = initialState.state;
		},
		updateInternalState: <K extends keyof AnimationTableInternalT>(
			state: AnimationsSliceT,
			action: PayloadAction<InternalStatePayloadT<K>>,
		) => {
			const { key, value } = action.payload;

			state.state.internal[key] = value;
		},
	},
});

const { updateInternalState, ...rest } = animationsSlice.actions;

export const animationsActions = {
	...rest,
	updateInternalState: updateInternalState as <K extends keyof AnimationTableInternalT>(
		payload: InternalStatePayloadT<K>,
	) => PayloadAction<InternalStatePayloadT<K>>,
};
