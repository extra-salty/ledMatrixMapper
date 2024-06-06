import { ColorT } from '@/types/color/color.types';
import {
	EffectStateT,
	EffectListStateT,
	EffectCollectionStateT,
	FrameStateT,
	TransitionT,
} from '@/types/effect/effect.types';
import {
	createEffect,
	createFrame,
	createFrameData,
} from '@/types/effect/effectConstructors';
import { EffectsTableRowT } from '@/types/effect/effectTable.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
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
} from '@/types/effect/effectPayload.types';
import { MatrixSizeT } from '@/types/animation/animation.types';
import { isEqual } from 'lodash';
import { getSelectionCoordinates } from './helpers';

export const initialState: EffectsSliceT = {
	activeEffect: undefined,
	animations: {},
	options: {
		activeMatrixSize: undefined,
		activeColorAction: ColorActions.brush,
		activeTransition: 'linear',
		brushSize: 0,
	},
	selection: {
		frameCellSelection: undefined,
		colorActionCoordinate: undefined,
	},
	color: {
		selectedColor: { hue: 0, saturation: 100, brightness: 50 },
		colorHistory: [],
	},
};

export const effectsDataSlice = createSlice({
	name: 'effects',
	initialState,
	reducers: {
		//
		// Color
		updateColor: (state, action: PayloadAction<{ key: keyof ColorT; value: number }>) => {
			const { key, value } = action.payload;

			state.color.selectedColor[key] = value;
		},
		resetColor: (state) => {
			state.color.selectedColor = DEFAULT_COLOR;
		},
		addToColorHistory: (state) => {
			const colorHistory = state.color.colorHistory;
			const selectedColor = state.color.selectedColor;

			if (!colorHistory.length || !isEqual(colorHistory[0], selectedColor))
				colorHistory.unshift(selectedColor);
		},
		updateColorFromHistory: (state, action: PayloadAction<number>) => {
			state.color.selectedColor = state.color.colorHistory[action.payload];
		},
		updateSelectedColor: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { animationId, effectId } = state.activeEffect!;
			const {
				frameId,
				coordinate: { x, y },
			} = action.payload;

			const newColor =
				state.animations[animationId][effectId].frames[frameId].data[x][y]?.color;
			if (newColor) state.color.selectedColor = newColor;
		},
		resetColorHistory: (state) => {
			state.color.colorHistory = [];
		},
		//
		// Options
		setBrushSize: (state, action: PayloadAction<number>) => {
			state.options.brushSize = action.payload;
		},
		setActiveColorAction: (state, action: PayloadAction<ColorActions>) => {
			state.options.activeColorAction = action.payload;
		},
		setActiveMatrixSize: (state, action: PayloadAction<MatrixSizeT>) => {
			state.options.activeMatrixSize = action.payload;
		},
		setActiveTransition: (state, action: PayloadAction<TransitionT>) => {
			state.options.activeTransition = action.payload;
		},
		//
		// Frame Color
		updateFrameCell: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { frameId, coordinate } = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			const colorAction = state.options.activeColorAction;
			const { x: xOrig, y: yOrig } = coordinate;
			const { width, height } = state.options.activeMatrixSize!;
			const brushSize = state.options.brushSize;

			const startX = Math.max(xOrig - brushSize, 0);
			const endX = Math.min(xOrig + brushSize, width - 1);
			const startY = Math.max(yOrig - brushSize, 0);
			const endY = Math.min(yOrig + brushSize, height - 1);

			for (let x = startX; x <= endX; x++) {
				for (let y = startY; y <= endY; y++) {
					const frameCell = frameData[x][y];

					switch (colorAction) {
						case ColorActions.brush: {
							frameData[x][y] = {
								color: state.color.selectedColor,
								transition: frameCell?.transition,
							};
							break;
						}
						case ColorActions.clear: {
							frameData[x][y] = undefined;
							break;
						}
						case ColorActions.transition: {
							frameData[x][y] = {
								color: frameCell?.color,
								transition: state.options.activeTransition,
							};
							break;
						}
					}
				}
			}

			switch (colorAction) {
				case ColorActions.brush: {
					effectsDataSlice.caseReducers.addToColorHistory(state);
					break;
				}
			}
		},
		updateEveryFrameCell: (state, action: PayloadAction<CoordinateT>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frames = state.animations[animationId][effectId].frames;

			const { x: xOrig, y: yOrig } = action.payload;
			const { width, height } = state.options.activeMatrixSize!;
			const brushSize = state.options.brushSize;

			const startX = Math.max(xOrig - brushSize, 0);
			const endX = Math.min(xOrig + brushSize, width - 1);
			const startY = Math.max(yOrig - brushSize, 0);
			const endY = Math.min(yOrig + brushSize, height - 1);

			for (let frameId in frames) {
				const { disabled, data } = frames[frameId];

				if (!disabled) {
					for (let x = startX; x <= endX; x++) {
						for (let y = startY; y <= endY; y++) {
							data[x][y]!.color = state.color.selectedColor;
						}
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
			const { width } = state.options.activeMatrixSize!;

			Array.from(Array(width)).forEach(
				(_, i) => (frameData[i][y]!.color = state.color.selectedColor),
			);

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		updateFrameColumn: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const {
				frameId,
				coordinate: { x },
			} = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;
			const { height } = state.options.activeMatrixSize!;

			Array.from(Array(height)).forEach(
				(_, i) => (frameData[x][i]!.color = state.color.selectedColor),
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
			const color = state.color.selectedColor;
			const { width, height } = state.options.activeMatrixSize!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					frameData[x][y] = { color, transition: frameData[x][y]?.transition };
				}
			}

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		resetFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = action.payload;
			const matrixSize = state.options.activeMatrixSize!;
			const frameData = createFrameData({ matrixSize, cell: undefined });

			state.animations[animationId][effectId].frames[frameId].data = frameData;
		},
		//
		// Frame Selection
		setFrameCellSelectionStart: (
			state,
			action: PayloadAction<FrameColorActionPayloadT>,
		) => {
			const { frameId, coordinate } = action.payload;

			state.selection.frameCellSelection = {
				frameId,
				startCoordinate: coordinate,
				endCoordinate: coordinate,
				selectCoordinate: undefined,
			};
		},
		setFrameCellSelectionEnd: (state, action: PayloadAction<CoordinateT>) => {
			state.selection.frameCellSelection!.endCoordinate = action.payload;
		},
		setColorActionCoordinate: (state, action: PayloadAction<CoordinateT>) => {
			state.selection.frameCellSelection!.selectCoordinate = action.payload;
		},
		updateFrameSelection: (
			state,
			action: PayloadAction<'fill' | 'clear' | 'transition'>,
		) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = state.selection.frameCellSelection!.frameId;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;
			const color = state.color.selectedColor;
			const transition = state.options.activeTransition;
			const selection = state.selection.frameCellSelection!;
			const actionType = action.payload;

			const { xStart, yStart, xEnd, yEnd } = getSelectionCoordinates(selection);

			for (let x = xStart; x <= xEnd; x++) {
				for (let y = yStart; y <= yEnd; y++) {
					const frameCell = frameData[x][y];

					switch (actionType) {
						case ColorActions.fill: {
							frameData[x][y] = {
								color,
								transition: frameCell?.transition,
							};
							break;
						}
						case ColorActions.transition: {
							frameData[x][y] = {
								color: frameCell?.color,
								transition,
							};
							break;
						}
						case ColorActions.clear: {
							frameData[x][y] = undefined;
							break;
						}
					}
				}
			}

			effectsDataSlice.caseReducers.addToColorHistory(state);
		},
		pasteFrameCellSelection: (state, action: PayloadAction<ColorActionCoordinateT>) => {
			const selectionFrameId = state.selection.frameCellSelection!.frameId;
			const selection = state.selection.frameCellSelection!;
			const {
				frameId: targetFrameId,
				coordinate: { x: xTarget, y: yTarget },
			} = action.payload;

			const { animationId, effectId } = state.activeEffect!;
			const activeEffectFrames = state.animations[animationId][effectId].frames;
			const selectionFrameData = activeEffectFrames[selectionFrameId].data;
			const targetFrameData = activeEffectFrames[targetFrameId].data;

			const { xStart, yStart, xEnd, yEnd, xOffset, yOffset } =
				getSelectionCoordinates(selection);

			for (let x = xStart, i = 0 - xOffset; x <= xEnd; x++, i++) {
				for (let y = yStart, j = 0 - yOffset; y <= yEnd; y++, j++) {
					const xCurrent = xTarget + i;
					const yCurrent = yTarget + j;

					if (xCurrent in targetFrameData && yCurrent in targetFrameData[xCurrent]) {
						targetFrameData[xCurrent][yCurrent] = selectionFrameData[x][y];
					}
				}
			}
		},
		//
		// Animations
		addAnimation: (
			state,
			action: PayloadAction<{
				animationId: string;
				animationName: string;
				effects: EffectListStateT;
			}>,
		) => {
			const { animationId, effects } = action.payload;
			const animation = state.animations[animationId];

			state.animations[animationId] = {};

			Object.entries(effects).forEach(([effectId, effect]) => {
				animation[effectId] = effect;
			});
		},
		removeAnimation: (state, action: PayloadAction<string>) => {
			delete state.animations[action.payload];

			if ((state.animations = {})) state.options.activeMatrixSize = undefined;
		},
		//
		// Effects
		addEffect: (state, action: PayloadAction<FormData>) => {
			const formData = action.payload;
			const animationId = formData.get('animationId') as string;
			const matrixSize = state.options.activeMatrixSize!;
			const newEffect = createEffect({ formData, matrixSize });

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
		//
		// Frames
		updateFrame: <K extends keyof FrameStateT>(
			state: EffectsSliceT,
			action: PayloadAction<UpdateFramePayloadT<K>>,
		) => {
			const { animationId, effectId } = state.activeEffect!;
			const { frameId, key, value } = action.payload;

			state.animations[animationId][effectId].frames[frameId][key] = value;
		},
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
			const matrixSize = state.options.activeMatrixSize!;
			const newFrame = createFrame(matrixSize);
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
			const selection = state.selection.frameCellSelection;

			if (selection?.frameId === frameId) selection === undefined;
			effect.order.splice(deleteIndex, 1);
			delete effect.frames[frameId];
		},
		importFrame: (state, action: PayloadAction<FrameStateT['data']>) => {
			const { animationId, effectId } = state.activeEffect!;
			const data = action.payload;
			// const newFrame = createFrame();
			// const modifiedNewFrame = { ...newFrame, data };

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
