import { ColorT } from '@/types/color/color.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const DEFAULT_COLOR: ColorT = {
	hue: 0,
	saturation: 100,
	lightness: 0,
};

const initialState: {
	selectedColor: ColorT;
	colorHistory: ColorT[];
	colorPresets: ColorT[];
} = {
	selectedColor: { hue: 18, saturation: 100, lightness: 50 },
	colorHistory: [],
	colorPresets: [],
};

export const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {
		updateColor: (state, action: PayloadAction<{ key: keyof ColorT; value: number }>) => {
			const { key, value } = action.payload;

			state.selectedColor[key] = value;
		},
		setColor: (state, action: PayloadAction<ColorT>) => {
			state.selectedColor = action.payload;
		},
		resetColor: (state) => {
			state.selectedColor = DEFAULT_COLOR;
		},
	},
});

export const colorActions = colorSlice.actions;
