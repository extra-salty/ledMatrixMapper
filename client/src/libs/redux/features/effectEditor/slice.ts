import {
	EffectGridOptionsT,
	EffectPlayerOptionsT,
	EffectSliceT,
	UpdateGridOptionsT,
	UpdatePlayerOptionsT,
} from '@/types/effectEditor/effectEditor.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: EffectSliceT = {
	selectedFrames: [],
	frameHistory: [],
	gridOptions: {
		cellSize: 20,
		borderEnabled: false,
		indexEnabled: false,
		blur: 0,
	},
	playerOptions: {
		castEnabled: false,
		repeatEnabled: false,
		borderEnabled: false,
		indexEnabled: false,
		blur: 0,
		refreshRate: 10,
	},
};

export const effectEditorSlice = createSlice({
	name: 'effectEditor',
	initialState,
	reducers: {
		updateGridOptions: <K extends keyof EffectGridOptionsT>(
			state: EffectSliceT,
			action: PayloadAction<UpdateGridOptionsT<K>>,
		) => {
			const { key, value } = action.payload;

			state.gridOptions[key] = value;
		},
		updatePlayerOptions: <K extends keyof EffectPlayerOptionsT>(
			state: EffectSliceT,
			action: PayloadAction<UpdatePlayerOptionsT<K>>,
		) => {
			const { key, value } = action.payload;

			state.playerOptions[key] = value;
		},
	},
});

const { updatePlayerOptions, updateGridOptions, ...rest } = effectEditorSlice.actions;

export const effectEditorActions = {
	...rest,
	updateGridOptions: updateGridOptions as <K extends keyof EffectGridOptionsT>(
		payload: UpdateGridOptionsT<K>,
	) => PayloadAction<UpdateGridOptionsT<K>>,
	updatePlayerOptions: updatePlayerOptions as <K extends keyof EffectPlayerOptionsT>(
		payload: UpdatePlayerOptionsT<K>,
	) => PayloadAction<UpdatePlayerOptionsT<K>>,
};

// // Effect actions
// setEffect: (state, action: PayloadAction<AnimationT>) => {
// 	state.effect = action.payload;
// },
// setEffectName: (state, action: PayloadAction<string>) => {
// 	state.effect.name = action.payload;
// },
// setEffectDescription: (state, action: PayloadAction<string>) => {
// 	state.effect.description = action.payload;
// },
// // Frame actions
// resetFrame: (state, action: PayloadAction<number>) => {
// 	state.effect.frames[action.payload] = newFrame;
// },
// addFrame: (state, action: PayloadAction<number>) => {
// 	state.effect.frames.splice(++action.payload, 0, newFrame);
// },
// duplicateFrame: (state, action: PayloadAction<number>) => {
// 	const newFrame = state.effect.frames[action.payload];
// 	state.effect.frames.splice(action.payload, 0, newFrame);
// },
// deleteFrame: (state, action: PayloadAction<number>) => {
// 	state.effect.frames.splice(action.payload, 1);
// },
// moveFrame: (
// 	state,
// 	action: PayloadAction<{ startIndex: number; endIndex: number }>,
// ) => {
// 	const { startIndex, endIndex } = action.payload;
// 	const temp = state.effect.frames[startIndex];
// 	state.effect.frames[startIndex] = state.effect.frames[endIndex];
// 	state.effect.frames[endIndex] = temp;
// },
// setFrameDuration: (
// 	state,
// 	action: PayloadAction<{ frameIndex: number; value: number }>,
// ) => {
// 	const { frameIndex, value } = action.payload;
// 	state.effect.frames[frameIndex].duration = value;
// },
// addToHistory: (
// 	state,
// 	action: PayloadAction<{ frameIndex: number; type: FrameHistoryTypes }>,
// ) => {
// 	const { frameIndex, type } = action.payload;
// 	state.frameHistory.push({
// 		frameIndex,
// 		type,
// 		data: state.effect.frames[frameIndex],
// 	});
// },
// nextFrame: (state) => {
// 	state.activeFrame++;
// },
// prevFrame: (state) => {
// 	state.activeFrame--;
// },
// Cell actions
// setFrameCellColor: (state, action: PayloadAction<FrameCellLocationT>) => {
// 	const { frameIndex, coordinate } = action.payload;
// 	const { x, y } = coordinate;
// 	state.effect.frames[frameIndex].data[x][y] = state.color.selectedColor;
// },
// addtoUndo: (state, action: PayloadAction<FrameCellLocationT>) => {
// 	const { frameIndex, coordinate } = action.payload;
// 	const { x, y } = coordinate;
// 	const value = state.effect.frames[frameIndex].data[x][y];
// 	state.effect.frames[frameIndex].undo.push({ value, coordinate });
// },
// applyUndo: (state, action: PayloadAction<number>) => {
// 	const frameIndex = action.payload;
// 	const undo = state.effect.frames[frameIndex].undo;
// 	const { coordinate, value } = undo[undo.length - 1];
// 	const { x, y } = coordinate;
// 	const currentValue = state.effect.frames[frameIndex].data[x][y];
// 	state.effect.frames[frameIndex].redo.push({ value: currentValue, coordinate });
// 	state.effect.frames[frameIndex].undo.pop();
// 	state.effect.frames[frameIndex].data[x][y] = value;
// },
// applyRedo: (state, action: PayloadAction<number>) => {
// 	const frameIndex = action.payload;
// 	const redo = state.effect.frames[frameIndex].redo;
// 	const { coordinate, value } = redo[redo.length - 1];
// 	const { x, y } = coordinate;
// 	const currentValue = state.effect.frames[frameIndex].data[x][y];
// 	state.effect.frames[frameIndex].undo.push({ value: currentValue, coordinate });
// 	state.effect.frames[frameIndex].redo.pop();
// 	state.effect.frames[frameIndex].data[x][y] = value;
// },
