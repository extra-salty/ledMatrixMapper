import { EffectListBaseT } from '../effects/effect.types';
import { AnimationBaseT, AnimationChildrenBaseT } from './animation.types';

export class Animation implements Omit<AnimationBaseT, '_id'> {
	userId: string;
	name: string;
	description: string;
	dateCreated: Date = new Date();
	dateModified: Date = new Date();
	columns: number;
	rows: number;
	childrenIds: string[] = [];
	children: Record<string, AnimationChildrenBaseT> = {};
	effects: EffectListBaseT = {};

	constructor(userId: string, formData: FormData) {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;
		const columns = formData.get('columns') as unknown as number;
		const rows = formData.get('rows') as unknown as number;

		this.userId = userId;
		this.name = name;
		this.description = description;
		this.columns = columns;
		this.rows = rows;
	}
}
