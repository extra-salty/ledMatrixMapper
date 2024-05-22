'use client';
import { nanoid } from 'nanoid';
import { ColorT } from '../color/color.types';
import { EffectStateT, FrameStateT, FrameListStateT } from './effect.types';
import { DEFAULT_COLOR } from '@/libs/redux/features/color/slice';

const NUMBER_OF_COLUMNS = 24;
const NUMBER_OF_ROWS = 12;

export const newFrameData = (color: ColorT): ColorT[][] =>
	Array(24).fill(Array(12).fill(color));

export const createNewFrame = (): FrameStateT => ({
	id: nanoid(12),
	data: newFrameData(DEFAULT_COLOR),
	duration: 1000,
	history: {
		redo: [],
		undo: [],
	},
});

export const mockFrame = { ...createNewFrame(), duration: 0 };

export const createNewEffect = (formData: FormData): EffectStateT => {
	const framesNumber = formData.get('frames') as string;

	const frames: FrameListStateT = {};
	Array.from({ length: Number(framesNumber) }, () => {
		const newFrame = createNewFrame();
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
