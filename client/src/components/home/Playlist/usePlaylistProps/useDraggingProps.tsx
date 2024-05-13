import { AnimationsTablePropsT } from '@/types/animation/animationTable.types';

const useDraggingProps = (): AnimationsTablePropsT => {
	return {
		enableRowOrdering: true,
		muiRowDragHandleProps: ({ table }) => ({
			onDragEnd: (asd) => {
				const { draggingRow, hoveredRow } = table.getState();
				// console.log('dragging - id', draggingRow?.original.index);
				// console.log('dragging - parentId', draggingRow?.original.parentIds);
				// console.log('dragging - id', hoveredRow?.original?.index);
				// console.log('dragging - parentId', hoveredRow?.original?.parentIds);
			},
		}),
	};
};

export default useDraggingProps;
