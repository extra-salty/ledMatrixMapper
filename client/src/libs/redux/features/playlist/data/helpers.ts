import { AnimationTableRowT } from '@/types/animation/animationTable.types';

type NestedArray<T> = T | NestedArray<T>[];

export const getChildrenIds = (row: AnimationTableRowT[]): string[] =>
	row
		.map((row) => {
			if (row.children) return [row.id, getChildrenIds(row.children)].flat();
			return row.id;
		})
		.flat();
