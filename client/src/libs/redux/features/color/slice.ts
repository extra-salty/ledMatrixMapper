import { ColorT } from '@/types/color/color.types';
import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

const initialState: {
	colorHistory: ColorT[];
	colorPresets: ColorT[];
} = {
	colorHistory: [],
	colorPresets: [],
};

export const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {},
});

export const colorActions = colorSlice.actions;
