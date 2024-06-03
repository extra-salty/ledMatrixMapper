import { ColorT } from '@/types/color/color.types';
import {
	EffectStateT,
	EffectListStateT,
	EffectCollectionStateT,
	FrameStateT,
} from '@/types/effects/effect.types';
import {
	createEffect,
	createFrame,
	createFrameData,
} from '@/types/effects/effectConstructors';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { DEFAULT_COLOR } from '../../color/slice';
import {
	ActiveEffectT,
	ColorActionCoordinateT,
	ColorActions,
	EffectsSliceT,
	FrameColorActionPayloadT,
	UpdateEffectPayloadT,
	UpdateFramePayloadT,
} from '@/types/effects/effectPayload.types';
import { MatrixSizeT } from '@/types/animation/animation.types';
import { isEqual } from 'lodash';
import { getSelectionCoordinates } from './helpers';

export const initialState: EffectsSliceT = {
	activeEffect: undefined,
	animations: {},
	brushSize: 0,
	activeMatrixSize: undefined,
	frameCellSelection: undefined,
	colorActionCoordinate: undefined,
	activeColorAction: ColorActions.brush,
	selectedColor: { hue: 0, saturation: 100, lightness: 50 },
	colorHistory: [],
};

export const effectsDataSlice = createSlice({
	name: 'effects',
	initialState,
	reducers: {
		//
		// Color
		updateColor: (state, action: PayloadAction<{ key: keyof ColorT; value: number }>) => {
			const { key, value } = action.payload;

			state.selectedColor[key] = value;
		},
		resetColor: (state) => {
			state.selectedColor = DEFAULT_COLOR;
		},
		addToColorHistory: (state) => {
			const colorHistory = state.colorHistory;
			const selectedColor = state.selectedColor;

			if (!colorHistory.length || !isEqual(colorHistory[0], selectedColor))
				colorHistory.unshift(selectedColor);
		},
		updateColorFromHistory: (state, action: PayloadAction<number>) => {
			state.selectedColor = state.colorHistory[action.payload];
		},
		resetColorHistory: (state) => {
			state.colorHistory = [];
		},
		//
		// Frame Color
		updateFrameCell: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { frameId, coordinate } = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			const colorAction = state.activeColorAction;
			const newCellValue =
				colorAction === ColorActions.clear ? undefined : state.selectedColor;
			const { x: xOrig, y: yOrig } = coordinate;
			const { width, height } = state.activeMatrixSize!;
			const brushSize = state.brushSize;

			const startX = Math.max(xOrig - brushSize, 0);
			const endX = Math.min(xOrig + brushSize, width - 1);
			const startY = Math.max(yOrig - brushSize, 0);
			const endY = Math.min(yOrig + brushSize, height - 1);

			for (let x = startX; x <= endX; x++) {
				for (let y = startY; y <= endY; y++) {
					frameData[x][y] = newCellValue;
				}
			}

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		updateEveryFrameCell: (state, action: PayloadAction<CoordinateT>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frames = state.animations[animationId][effectId].frames;

			const { x: xOrig, y: yOrig } = action.payload;
			const { width, height } = state.activeMatrixSize!;
			const brushSize = state.brushSize;

			const startX = Math.max(xOrig - brushSize, 0);
			const endX = Math.min(xOrig + brushSize, width - 1);
			const startY = Math.max(yOrig - brushSize, 0);
			const endY = Math.min(yOrig + brushSize, height - 1);

			for (let frameId in frames) {
				const frameData = frames[frameId].data;

				for (let x = startX; x <= endX; x++) {
					for (let y = startY; y <= endY; y++) {
						frameData[x][y] = state.selectedColor;
					}
				}
			}

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		updateFrameRow: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const {
				frameId,
				coordinate: { y },
			} = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;
			const { width } = state.activeMatrixSize!;

			Array.from(Array(width)).forEach((_, i) => (frameData[i][y] = state.selectedColor));

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		updateFrameColumn: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const {
				frameId,
				coordinate: { x },
			} = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;
			const { height } = state.activeMatrixSize!;

			Array.from(Array(height)).forEach(
				(_, i) => (frameData[x][i] = state.selectedColor),
			);

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		updateFrameDiagonal: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			// const { animationId, effectId } = state.activeEffect!;
			// const { x: xStart, y: yStart } = state.frameCellStartingCoordinate;
			// const { frameId, coordinate } = action.payload;
			// const { x: xEnd, y: yEnd } = coordinate;
			// const color = state.selectedColor;
			// for (let x = xStart; x <= xEnd; x++) {
			// 	for (let y = yStart; y <= yEnd; y++) {
			// 		state.animations[animationId][effectId].frames[frameId].data[x][y] = color;
			// 	}
			// }
		},
		fillFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = action.payload;
			const color = state.selectedColor;
			const data = createFrameData(color);

			state.animations[animationId][effectId].frames[frameId].data = data;

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		resetFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = action.payload;
			const frameData = createFrameData(undefined);

			state.animations[animationId][effectId].frames[frameId].data = frameData;
		},
		updateSelectedColor: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { animationId, effectId } = state.activeEffect!;
			const {
				frameId,
				coordinate: { x, y },
			} = action.payload;

			const newColor = state.animations[animationId][effectId].frames[frameId].data[x][y];
			if (newColor) state.selectedColor = newColor;
		},
		resetSelectedColor: (state) => {
			state.selectedColor = DEFAULT_COLOR;
		},
		//
		// Frame Selection
		setFrameCellSelectionStart: (
			state,
			action: PayloadAction<FrameColorActionPayloadT>,
		) => {
			const { frameId, coordinate } = action.payload;

			state.frameCellSelection = {
				frameId,
				startCoordinate: coordinate,
				endCoordinate: coordinate,
				selectCoordinate: undefined,
			};
		},
		setFrameCellSelectionEnd: (state, action: PayloadAction<CoordinateT>) => {
			state.frameCellSelection!.endCoordinate = action.payload;
		},
		fillFrameCellSelection: (state) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = state.frameCellSelection!.frameId;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			const { xStart, yStart, xEnd, yEnd } = getSelectionCoordinates(
				state.frameCellSelection!,
			);

			for (let x = xStart; x <= xEnd; x++) {
				for (let y = yStart; y <= yEnd; y++) {
					frameData[x][y] = state.selectedColor;
				}
			}

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		clearSelection: (state) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = state.frameCellSelection!.frameId;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			const { xStart, yStart, xEnd, yEnd } = getSelectionCoordinates(
				state.frameCellSelection!,
			);

			for (let x = xStart; x <= xEnd; x++) {
				for (let y = yStart; y <= yEnd; y++) {
					frameData[x][y] = DEFAULT_COLOR;
				}
			}
		},
		setColorActionCoordinate: (state, action: PayloadAction<CoordinateT>) => {
			state.frameCellSelection!.selectCoordinate = action.payload;
		},
		pasteFrameCellSelection: (state, action: PayloadAction<ColorActionCoordinateT>) => {
			const selectionFrameId = state.frameCellSelection!.frameId;
			const {
				frameId: targetFrameId,
				coordinate: { x: xTarget, y: yTarget },
			} = action.payload;

			const { animationId, effectId } = state.activeEffect!;
			const activeEffectFrames = state.animations[animationId][effectId].frames;
			const selectionFrameData = activeEffectFrames[selectionFrameId].data;
			const targetFrameData = activeEffectFrames[targetFrameId].data;

			const { xStart, yStart, xEnd, yEnd, xOffset, yOffset } = getSelectionCoordinates(
				state.frameCellSelection!,
			);

			for (let x = xStart, i = 0 - xOffset; x <= xEnd; x++, i++) {
				for (let y = yStart, j = 0 - yOffset; y <= yEnd; y++, j++) {
					const targetCell = targetFrameData[xTarget + i]?.[yTarget + j];
					targetCell &&
						(targetFrameData[xTarget + i][yTarget + j] = selectionFrameData[x][y]);
				}
			}
		},
		//
		// Color Actions
		setBrushSize: (state, action: PayloadAction<number>) => {
			state.brushSize = action.payload;
		},
		setActiveColorAction: (state, action: PayloadAction<ColorActions>) => {
			state.activeColorAction = action.payload;
		},
		//
		///////////// Animation //////////////
		addAnimation: (
			state,
			action: PayloadAction<{
				animationId: string;
				animationName: string;
				effects: EffectListStateT;
			}>,
		) => {
			const { animationId, effects } = action.payload;

			state.animations[animationId] = {};

			Object.entries(effects).forEach(([effectId, effect]) => {
				state.animations[animationId][effectId] = effect;
			});
		},
		removeAnimation: (state, action: PayloadAction<string>) => {
			delete state.animations[action.payload];
		},
		setActiveMatrixSize: (state, action: PayloadAction<MatrixSizeT>) => {
			state.activeMatrixSize = action.payload;
		},
		///////////// Effect //////////////
		addEffect: (state, action: PayloadAction<FormData>) => {
			const formData = action.payload;
			const animationId = formData.get('animationId') as string;
			const newEffect = createEffect(formData);

			state.animations[animationId][newEffect.id] = newEffect;
		},
		setActiveEffect: (state, action: PayloadAction<ActiveEffectT>) => {
			state.activeEffect = action.payload;
		},
		setEffects: (state, action: PayloadAction<EffectCollectionStateT>) => {
			state.animations = action.payload;
		},
		deleteEffect: (state, action: PayloadAction<EffectsTableRowT>) => {
			const { animationId, id } = action.payload;

			delete state.animations[animationId][id];
		},
		updateEffect: <K extends keyof EffectStateT>(
			state: EffectsSliceT,
			action: PayloadAction<UpdateEffectPayloadT<K>>,
		) => {
			const { animationId, id, key, value } = action.payload;

			state.animations[animationId][id][key] = value;
		},
		//////////////// Frame /////////////////
		updateFrame: <K extends keyof FrameStateT>(
			state: EffectsSliceT,
			action: PayloadAction<UpdateFramePayloadT<K>>,
		) => {
			const { animationId, effectId } = state.activeEffect!;
			const { frameId, key, value } = action.payload;

			state.animations[animationId][effectId].frames[frameId][key] = value;
		},
		// replaceFrames: (
		// 	state,
		// 	action: PayloadAction<{ activeIndex: number; overIndex: number }>,
		// ) => {
		// 	const { animationId, effectId } = state.activeEffect;
		// 	const { activeIndex, overIndex } = action.payload;
		// 	const activeFrame =
		// 		state.animations[animationId].effects[effectId].frames[activeIndex];

		// 	state.animations[animationId].effects[effectId].frames[activeIndex] =
		// 		state.animations[animationId].effects[effectId].frames[overIndex];
		// 	state.animations[animationId].effects[effectId].frames[overIndex] = activeFrame;
		// },
		moveFrame: (
			state,
			action: PayloadAction<{ activeIndex: number; overIndex: number }>,
		) => {
			const { animationId, effectId } = state.activeEffect!;
			const { activeIndex, overIndex } = action.payload;
			const frameOrder = state.animations[animationId][effectId].order;

			const frame = frameOrder.splice(activeIndex, 1)[0];
			frameOrder.splice(overIndex, 0, frame);
		},
		addFrame: (state, action: PayloadAction<number | undefined>) => {
			const { animationId, effectId } = state.activeEffect!;
			const effect = state.animations[animationId][effectId];
			const index = action.payload;
			const newFrame = createFrame();
			const newFrameId = newFrame.id;

			if (index) {
				effect.order.splice(index, 0, newFrameId);
			} else if (index === 0) {
				effect.order.unshift(newFrameId);
			} else {
				effect.order.push(newFrameId);
			}

			effect.frames[newFrameId] = newFrame;
		},
		duplicateFrame: (state, action: PayloadAction<string>) => {
			const frameId = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const effect = state.animations[animationId][effectId];
			const { id, ...rest } = effect.frames[frameId];
			const newFrameIndex = effect.order.indexOf(id);
			const newFrameId = nanoid(12);

			effect.frames[newFrameId] = {
				id: newFrameId,
				...rest,
			};
			effect.order.splice(newFrameIndex, 0, newFrameId);
		},
		deleteFrame: (state, action: PayloadAction<string>) => {
			const frameId = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const effect = state.animations[animationId][effectId];
			const deleteIndex = effect.order.indexOf(frameId);
			const selection = state.frameCellSelection;

			if (selection?.frameId === frameId) selection === undefined;
			effect.order.splice(deleteIndex, 1);
			delete effect.frames[frameId];
		},
		deleteFrames: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect!;

			// Object.values(state.animations[animationId][effectId].frames).forEach(({id, disabled}) => {
			//   if()
			//   const deleteIndex = state.animations[animationId][effectId].order.indexOf(id);

			//   state.animations[animationId][effectId].order.splice(deleteIndex, 1);
			//   delete state.animations[animationId][effectId].frames[frameId];
			// })

			// state.animations[animationId][effectId].frames

			// state.animations[animationId][effectId].order = [];

			// state.animations[animationId][effectId].order.splice(deleteIndex, 1);
			// delete state.animations[animationId][effectId].frames[frameId];
		},
		importFrame: (state, action: PayloadAction<FrameStateT['data']>) => {
			const { animationId, effectId } = state.activeEffect!;
			const data = action.payload;
			const newFrame = createFrame();
			const modifiedNewFrame = { ...newFrame, data };

			// state.animations[animationId][effectId].frames.push(modifiedNewFrame);
		},
	},
});

const { updateEffect, updateFrame, ...rest } = effectsDataSlice.actions;

export const effectsDataActions = {
	...rest,
	updateEffect: updateEffect as <K extends keyof EffectStateT>(
		payload: UpdateEffectPayloadT<K>,
	) => PayloadAction<UpdateEffectPayloadT<K>>,
	updateFrame: updateFrame as <K extends keyof FrameStateT>(
		payload: UpdateFramePayloadT<K>,
	) => PayloadAction<UpdateFramePayloadT<K>>,
};
