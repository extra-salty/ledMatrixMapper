import { nanoid } from 'nanoid';
import {
	EffectStateT,
	FrameStateT,
	FrameListStateT,
	FrameCellT,
	FrameTransitionT,
} from './effect.types';

export const createFrameData = (color: FrameCellT): FrameCellT[][] =>
	Array(24).fill(Array(12).fill(color));

export const createFrame = (): FrameStateT => ({
	id: nanoid(12),
	data: createFrameData(undefined),
	duration: 1000,
	transition: FrameTransitionT.linear,
	history: {
		redo: [],
		undo: [],
	},
});

export const mockFrame = { ...createFrame(), duration: 0 };

export const createEffect = (formData: FormData): EffectStateT => {
	const framesNumber = formData.get('frames') as string;

	const frames: FrameListStateT = {};
	Array.from({ length: Number(framesNumber) }, () => {
		const newFrame = createFrame();
		frames[newFrame.id] = newFrame;
	});

	return {
		id: nanoid(12),
		name: formData.get('name') as string,
		description: formData.get('description') as string,
		order: Object.keys(frames).map((id) => frames[id].id),
		frames,
	};
};
