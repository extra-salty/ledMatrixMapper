import { nanoid } from 'nanoid';
import { EffectStateT, FrameStateT, FrameListStateT, FrameCellT } from './effect.types';
import { MatrixSizeT } from '../animation/animation.types';

export const createFrameData = ({
	matrixSize: { width, height },
	cell,
}: {
	matrixSize: MatrixSizeT;
	cell: FrameCellT;
}): FrameCellT[][] => Array(width).fill(Array(height).fill(cell));

export const createFrame = (matrixSize: MatrixSizeT): FrameStateT => ({
	id: nanoid(12),
	data: createFrameData({ matrixSize, cell: undefined }),
	duration: 1000,
	transition: 'linear',
	history: {
		redo: [],
		undo: [],
	},
});

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
