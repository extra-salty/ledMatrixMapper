import { useAnimationsData } from '@/libs/redux/features/animations/selectors';
import {
	AnimationChildrenTypesT,
	AnimationStateT,
} from '@/types/animation/animation.types';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';

const useConvertedData = (): AnimationTableRowT[] => {
	const data = useAnimationsData();

	const getChildren = (
		animation: AnimationStateT,
		animationId: string,
		childId: string,
	): AnimationTableRowT => {
		const { childrenIds, ...rest } = animation.children[childId];

		let convertedChild: AnimationTableRowT = {
			...rest,
			animationId,
			duration: 1,
			timestamps: [],
			framesLength: 0,
			startTime: 0,
		};

		if (childrenIds) {
			const children = childrenIds.map((childId, i) => {
				return getChildren(animation, animationId, childId);
			});

			convertedChild = {
				...convertedChild,
				children,
			};
		}

		return convertedChild;
	};

	return data.map((animation) => {
		const animationId = animation._id;

		const convertedChildren = animation.childrenIds?.map((childId, i) => {
			return getChildren(animation, animationId, childId);
		});

		const { childrenIds, children, ...rest } = animation;

		return {
			...rest,
			animationId,
			id: animationId,
			parentId: animationId,
			children: convertedChildren,
			type: AnimationChildrenTypesT.animation,
			repeat: 1,
			speed: 1,
			duration: 1,
			timestamps: [],
			framesLength: 0,
			startTime: 0,
		};
	});
};

export default useConvertedData;
