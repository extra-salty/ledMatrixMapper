import { nanoid } from 'nanoid';
import {
	EffectStateT,
	FrameStateT,
	FrameListStateT,
	FrameCellT,
	FrameDataT,
} from './effect.types';
import { MatrixSizeT } from '../animation/animation.types';

export const createFrameData = ({
	matrixSize: { width, height },
	cell,
}: {
	matrixSize: MatrixSizeT;
	cell: FrameCellT;
}): FrameCellT[][] => Array(width).fill(Array(height).fill(cell));

export const createFrame = (
	matrixSize: MatrixSizeT,
	frameData?: FrameDataT,
): FrameStateT => {
	const data = frameData || createFrameData({ matrixSize, cell: undefined });

	return {
		id: nanoid(12),
		data,
		duration: 1000,
		transition: undefined,
		history: {
			redo: [],
			undo: [],
		},
	};
};

export const createEffect = ({
	matrixSize,
	formData,
}: {
	matrixSize: MatrixSizeT;
	formData: FormData;
}): EffectStateT => {
	const framesNumber = formData.get('frames') as string;

	const frames: FrameListStateT = {};
	Array.from({ length: Number(framesNumber) }, () => {
		const newFrame = createFrame(matrixSize);

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

export const mockFrame: FrameStateT = {
	data: createFrameData({ matrixSize: { height: 12, width: 24 }, cell: undefined }),
	duration: 0,
	id: 'mockFrame',
	transition: undefined,
};
