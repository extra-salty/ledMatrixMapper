import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { usePlaylistData } from '@/libs/redux/features/playlist/data/selectors';
import { usePlaylistOrder } from '@/libs/redux/features/playlist/state/selectors';
import { getChildren, getChildrenTimestamps } from './getChildren';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';

export type TimestampsT = {
	timestamp: number;
	animationId: string;
	effectId: string;
	frameId: string;
};

const useConvertedData = (): {
	tableData: AnimationTableRowT[];
	timestamps: TimestampsT[];
} => {
	const data = usePlaylistData();
	const order = usePlaylistOrder();
	const effectsCollection = useEffectCollections();

	const tableData = order.map((animationId) => {
		const animation = data[animationId];
		const { _id, dateCreated, dateModified, childrenIds, children, ...rest } = animation;

		const convertedChildren = childrenIds?.reduce(
			(childrenAcc: AnimationTableRowT[], childId) => {
				const timestampStart =
					childrenAcc.length && childrenAcc.slice(-1)[0].timestamps.length
						? childrenAcc.slice(-1)[0].timestamps.slice(-1)[0].timestamp
						: 0;

				const children = getChildren({
					animation,
					animationId,
					effects: effectsCollection[animationId],
					childId,
					disabled: animation.disabled,
					timestampStart,
				});

				return [...childrenAcc, children];
			},
			[],
		);

		return {
			...rest,
			animationId,
			parentId: animationId,
			id: animation._id,
			children: convertedChildren,
			type: AnimationChildrenTypesT.animation,
			repeat: 0,
			speed: 0,
			timestamps: getChildrenTimestamps(convertedChildren),
			framesLength: convertedChildren.reduce(
				(acc, { framesLength, disabled }) => acc + (disabled ? 0 : framesLength),
				0,
			),
			duration: convertedChildren.reduce(
				(acc, { duration, disabled }) => acc + (disabled ? 0 : duration),
				0,
			),
			startTime: 0,
		};
	});

	const timestamps = tableData.reduce(
		(acc: TimestampsT[], animation) => [...acc, ...animation.timestamps],
		[],
	);

	return { tableData, timestamps };
};

export default useConvertedData;
