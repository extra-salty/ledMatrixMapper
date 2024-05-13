import { ColorT } from '@/types/color/color.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: { data: ColorT[][] } = { data: [] };

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	extraReducers: (builder) => {},
	reducers: {
		setData: (state, action: PayloadAction<ColorT[][]>) => {},
	},
});

// Make private reducers
export const playerActions = playerSlice.actions;
