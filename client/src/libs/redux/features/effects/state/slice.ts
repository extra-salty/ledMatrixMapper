import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	EffectTableT,
	EffectsTableStateT,
	InternalStatePayloadT,
} from '@/types/effects/effectTable.types';

export const initialState: EffectTableT = {
	internal: {
		isLoading: false,
		expanded: {},
		rowSelection: {},
		globalFilter: undefined,
		columnVisibility: { _id: false, description: false, 'mrt-row-expand': false },
		columnFilters: [],
		columnPinning: {
			left: ['mrt-row-select', 'name'],
			right: ['mrt-row-drag', 'actions'],
		},
		density: 'compact',
	},
	focusedRow: undefined,
};

export const effectsStateSlice = createSlice({
	name: 'effectsState',
	initialState,
	extraReducers: (builder) => {},
	reducers: {
		resetState: () => {
			return initialState;
		},
		setFocusedRow: (state, action: PayloadAction<string | undefined>) => {
			state.focusedRow = action.payload;
		},
		updateInternalState: <K extends keyof EffectsTableStateT>(
			state: EffectTableT,
			action: PayloadAction<InternalStatePayloadT<K>>,
		) => {
			const { key, value } = action.payload;

			state.internal[key] = value;
		},
	},
});

const { updateInternalState, ...rest } = effectsStateSlice.actions;

export const effectsStateActions = {
	...rest,
	updateInternalState: updateInternalState as <K extends keyof EffectsTableStateT>(
		payload: InternalStatePayloadT<K>,
	) => PayloadAction<InternalStatePayloadT<K>>,
};
