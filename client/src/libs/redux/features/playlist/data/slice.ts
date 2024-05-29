import {
	AnimationChildrenBaseT,
	AnimationStateT,
} from '@/types/animation/animation.types';
import {
	PlaylistDataT,
	UpdateAnimationPayloadT,
	UpdateChildPayloadT,
} from '@/types/playlist/playlist.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getChildrenIds } from './helpers';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import {
	createNewEffect,
	createNewGroup,
} from '@/types/playlist/playlistConstructor.types';

export const initialState: PlaylistDataT = {};

export const playlistDataSlice = createSlice({
	name: 'playlistData',
	initialState,
	reducers: {
		//////////////// Animation ////////////////
		resetData: () => {},
		addAnimation: (state, action: PayloadAction<AnimationStateT>) => {
			const animation = action.payload;

			state[animation._id] = animation;
		},
		removeAnimation: (state, action: PayloadAction<string>) => {
			delete state[action.payload];
		},
		updateAnimation: <K extends keyof AnimationStateT>(
			state: PlaylistDataT,
			action: PayloadAction<UpdateAnimationPayloadT<K>>,
		) => {
			const { animationId, key, value } = action.payload;

			state[animationId][key] = value;
		},
		//////////////// Child ////////////////
		updateChild: <K extends keyof AnimationChildrenBaseT>(
			state: PlaylistDataT,
			action: PayloadAction<UpdateChildPayloadT<K>>,
		) => {
			const { animationId, id, key, value } = action.payload;

			state[animationId].children[id][key] = value;
		},
		//////////////// Remove ////////////////
		remove: (state, action: PayloadAction<AnimationTableRowT>) => {
			playlistDataSlice.caseReducers.removeChildfromParent(state, action);
			playlistDataSlice.caseReducers.removeChildren(state, action);
			playlistDataSlice.caseReducers.removeChild(state, action);
		},
		removeChildfromParent: (state, action: PayloadAction<AnimationTableRowT>) => {
			const { animationId, id: childId, parentId } = action.payload;
			const childrenIds = state[animationId].childrenIds;

			if (parentId === animationId) {
				const deleteIndex = childrenIds.indexOf(childId);

				childrenIds.splice(deleteIndex, 1);
			} else {
				const childrenIds = state[animationId].children[parentId].childrenIds;
				const deleteIndex = childrenIds?.indexOf(childId);

				if (deleteIndex !== undefined) childrenIds?.splice(deleteIndex, 1);
			}
		},
		removeChildren: (state, action: PayloadAction<AnimationTableRowT>) => {
			const { animationId, children, id } = action.payload;

			if (children) {
				const childrenIds = getChildrenIds(children);

				childrenIds.forEach((childId) => delete state[animationId].children[childId]);

				animationId === id
					? (state[animationId].childrenIds = [])
					: (state[animationId].children[id].childrenIds = []);
			}
		},
		removeChild: (state, action: PayloadAction<AnimationTableRowT>) => {
			const { animationId, id } = action.payload;

			delete state[animationId].children[id];
		},
		//////////////// Add ////////////////
		addChild: (
			state,
			action: PayloadAction<{ originalRow: AnimationTableRowT; childType: string }>,
		) => {
			const { originalRow, childType } = action.payload;
			const { animationId, type, id } = originalRow;

			let newChild;

			switch (childType) {
				case 'group': {
					newChild = createNewGroup(id);
					break;
				}
				case 'effect': {
					newChild = createNewEffect(id);
					break;
				}
			}

			if (newChild) {
				playlistDataSlice.caseReducers.addChildtoChildren(state, {
					type: 'addChild',
					payload: { animationId, newChild },
				});

				playlistDataSlice.caseReducers.addChildToParent(state, {
					type: 'addChildToParent',
					payload: { originalRow, newChildId: newChild.id },
				});
			}
		},
		addChildToParent: (
			state,
			action: PayloadAction<{ originalRow: AnimationTableRowT; newChildId: string }>,
		) => {
			const { originalRow, newChildId } = action.payload;
			const { animationId, id } = originalRow;

			if (id === animationId) {
				state[animationId].childrenIds.push(newChildId);
			} else {
				state[animationId].children[id].childrenIds?.push(newChildId);
			}
		},
		addChildtoChildren: (
			state,
			action: PayloadAction<{ animationId: string; newChild: AnimationChildrenBaseT }>,
		) => {
			const { animationId, newChild } = action.payload;

			state[animationId].children[newChild.id] = newChild;
		},
	},
});

const { updateChild, updateAnimation, ...rest } = playlistDataSlice.actions;

export const playlistDataActions = {
	...rest,
	updateChild: updateChild as <K extends keyof AnimationChildrenBaseT>(
		payload: UpdateChildPayloadT<K>,
	) => PayloadAction<UpdateChildPayloadT<K>>,
	updateAnimation: updateAnimation as <K extends keyof AnimationStateT>(
		payload: UpdateAnimationPayloadT<K>,
	) => PayloadAction<UpdateAnimationPayloadT<K>>,
};
