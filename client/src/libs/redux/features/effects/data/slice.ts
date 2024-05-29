import { ColorT } from '@/types/color/color.types';
import {
	EffectStateT,
	EffectListStateT,
	EffectCollectionStateT,
	FrameStateT,
} from '@/types/effects/effect.types';
import {
	createNewEffect,
	createNewFrame,
	newFrameData,
} from '@/types/effects/effectConstructors';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { DEFAULT_COLOR } from '../../color/slice';
import {
	ActiveEffectT,
	ColorActions,
	EffectsSliceT,
	FrameColorActionPayloadT,
	UpdateEffectPayloadT,
	UpdateFramePayloadT,
} from '@/types/effects/effectPayload.types';
import { MatrixSizeT } from '@/types/animation/animation.types';

export const initialState: EffectsSliceT = {
	activeEffect: undefined,
	animations: {},
	brushSize: 1,
	cellSize: 15,
	activeColorAction: ColorActions.brush,
	selectedColor: { hue: 0, saturation: 100, lightness: 50 },
	colorHistory: [],
	frameCellSelection: undefined,
	activeMatrixSize: undefined,
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
		//
		// Frame Color
		updateFrameCell: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { frameId, coordinate } = action.payload;
			const { animationId, effectId } = state.activeEffect!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;

			const { x: xOrig, y: yOrig } = coordinate;
			const { width, height } = state.activeMatrixSize!;
			const brushSize = state.brushSize;

			const startX = Math.max(xOrig - brushSize, 0);
			const endX = Math.min(xOrig + brushSize, width - 1);
			const startY = Math.max(yOrig - brushSize, 0);
			const endY = Math.min(yOrig + brushSize, height - 1);

			for (let x = startX; x <= endX; x++) {
				for (let y = startY; y <= endY; y++) {
					frameData[x][y] = state.selectedColor;
				}
			}
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
			const data = newFrameData(color);

			state.animations[animationId][effectId].frames[frameId].data = data;
		},
		resetFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect!;
			const frameId = action.payload;

			state.animations[animationId][effectId].frames[frameId].data =
				newFrameData(DEFAULT_COLOR);
		},
		updateSelectedColor: (state, action: PayloadAction<FrameColorActionPayloadT>) => {
			const { animationId, effectId } = state.activeEffect!;
			const {
				frameId,
				coordinate: { x, y },
			} = action.payload;

			const newColor = state.animations[animationId][effectId].frames[frameId].data[x][y];
			state.selectedColor = newColor;
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
			};
		},
		setFrameCellSelectionEnd: (state, action: PayloadAction<CoordinateT>) => {
			state.frameCellSelection!.endCoordinate = action.payload;
		},
		fillFrameCellSelection: (state) => {
			const { animationId, effectId } = state.activeEffect!;
			const { frameId, startCoordinate, endCoordinate } = state.frameCellSelection!;
			const frameData = state.animations[animationId][effectId].frames[frameId].data;
			const startX = Math.min(startCoordinate.x, endCoordinate.x);
			const endX = Math.max(startCoordinate.x, endCoordinate.x);
			const startY = Math.min(startCoordinate.y, endCoordinate.y);
			const endY = Math.max(startCoordinate.y, endCoordinate.y);

			for (let x = startX; x <= endX; x++) {
				for (let y = startY; y <= endY; y++) {
					frameData[x][y] = state.selectedColor;
				}
			}
		},
		//
		// Color Options
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
			const newEffect = createNewEffect(formData);

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
			const index = action.payload;
			const newFrame = createNewFrame();
			const newFrameId = newFrame.id;
			const effect = state.animations[animationId][effectId];

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
			const newFrame = createNewFrame();
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
