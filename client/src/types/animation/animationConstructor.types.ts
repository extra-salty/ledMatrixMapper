import { EffectListBaseT } from '../effect/effect.types';
import { AnimationBaseT, AnimationChildrenBaseT, MatrixSizeT } from './animation.types';

export class Animation implements Omit<AnimationBaseT, '_id'> {
	userId: string;
	name: string;
	description: string;
	dateCreated: Date = new Date();
	dateModified: Date = new Date();
	childrenIds: string[] = [];
	children: Record<string, AnimationChildrenBaseT> = {};
	effects: EffectListBaseT = {};
	matrixSize: MatrixSizeT;

	constructor(userId: string, formData: FormData) {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const width = Number(formData.get('width') as string);
		const height = Number(formData.get('height') as string);

		this.userId = userId;
		this.name = name;
		this.description = description;
		this.matrixSize = { width, height };
	}
}
