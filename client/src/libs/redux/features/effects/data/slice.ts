import {
	ActiveEffectT,
	EffectStateT,
	EffectListStateT,
	EffectCollectionStateT,
	EffectsSliceT,
	FrameCellColorPayloadT,
	FrameStateT,
	UpdateEffectPayloadT,
	UpdateFramePayloadT,
	FrameColumnColorPayloadT,
	FrameRowColorPayloadT,
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

export const initialState: EffectsSliceT = {
	activeEffect: { animationId: '', effectId: '' },
	animations: {},
	frameCellStartingCoordinate: { x: 0, y: 0 },
};

export const effectsDataSlice = createSlice({
	name: 'effects',
	initialState,
	reducers: {
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
		//////////////// Cell /////////////////
		setFrameCellStartingCoordinate: (state, action: PayloadAction<CoordinateT>) => {
			state.frameCellStartingCoordinate = action.payload;
		},
		updateFrameCell: (state, action: PayloadAction<FrameCellColorPayloadT>) => {
			const { animationId, effectId } = state.activeEffect;
			const { frameId, coordinate, color } = action.payload;
			const { x, y } = coordinate;

			state.animations[animationId][effectId].frames[frameId].data[x][y] = color;
		},
		updateFrameColumn: (state, action: PayloadAction<FrameColumnColorPayloadT>) => {
			const { animationId, effectId } = state.activeEffect;
			const { frameId, xIndex, color } = action.payload;
			const columnLength =
				state.animations[animationId][effectId].frames[frameId].data[0].length;

			Array.from(Array(columnLength)).forEach((_, i) => {
				state.animations[animationId][effectId].frames[frameId].data[xIndex][i] = color;
			});
		},
		updateFrameRow: (state, action: PayloadAction<FrameRowColorPayloadT>) => {
			const { animationId, effectId } = state.activeEffect;
			const { frameId, yIndex, color } = action.payload;
			const rowsLength =
				state.animations[animationId][effectId].frames[frameId].data.length;

			Array.from(Array(rowsLength)).forEach((_, i) => {
				state.animations[animationId][effectId].frames[frameId].data[i][yIndex] = color;
			});
		},
		updateFrameDiagonal: (state, action: PayloadAction<FrameCellColorPayloadT>) => {
			const { animationId, effectId } = state.activeEffect;
			const { x: xStart, y: yStart } = state.frameCellStartingCoordinate;
			const { frameId, coordinate, color } = action.payload;
			const { x: xEnd, y: yEnd } = coordinate;

			for (let x = xStart; x <= xEnd; x++) {
				for (let y = yStart; y <= yEnd; y++) {
					state.animations[animationId][effectId].frames[frameId].data[x][y] = color;
				}
			}
		},
		//////////////// Frame /////////////////
		updateFrame: <K extends keyof FrameStateT>(
			state: EffectsSliceT,
			action: PayloadAction<UpdateFramePayloadT<K>>,
		) => {
			const { animationId, effectId } = state.activeEffect;
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
			const { animationId, effectId } = state.activeEffect;
			const { activeIndex, overIndex } = action.payload;

			const frame = state.animations[animationId][effectId].order.splice(
				activeIndex,
				1,
			)[0];

			state.animations[animationId][effectId].order.splice(overIndex, 0, frame);
		},
		addFrame: (state, action: PayloadAction<number | undefined>) => {
			const { animationId, effectId } = state.activeEffect;
			const index = action.payload;
			const newFrame = createNewFrame();
			const newFrameId = newFrame.id;

			if (index) {
				state.animations[animationId][effectId].order.splice(index, 0, newFrameId);
			} else if (index === 0) {
				state.animations[animationId][effectId].order.unshift(newFrameId);
			} else {
				state.animations[animationId][effectId].order.push(newFrameId);
			}

			state.animations[animationId][effectId].frames[newFrameId] = newFrame;
		},
		duplicateFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect;
			const frameId = action.payload;
			const newFrameId = nanoid(12);
			const { id, ...rest } = state.animations[animationId][effectId].frames[frameId];
			const newFrameIndex = state.animations[animationId][effectId].order.indexOf(id);

			state.animations[animationId][effectId].frames[newFrameId] = {
				id: newFrameId,
				...rest,
			};
			state.animations[animationId][effectId].order.splice(newFrameIndex, 0, newFrameId);
		},
		deleteFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect;
			const frameId = action.payload;
			const deleteIndex = state.animations[animationId][effectId].order.indexOf(frameId);

			state.animations[animationId][effectId].order.splice(deleteIndex, 1);
			delete state.animations[animationId][effectId].frames[frameId];
		},
		deleteFrames: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect;

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
		resetFrame: (state, action: PayloadAction<string>) => {
			const { animationId, effectId } = state.activeEffect;
			const frameId = action.payload;

			state.animations[animationId][effectId].frames[frameId].data = newFrameData;
		},

		importFrame: (state, action: PayloadAction<FrameStateT['data']>) => {
			const { animationId, effectId } = state.activeEffect;
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
