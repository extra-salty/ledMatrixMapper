import { AnimationStateT } from '@/types/animation/animation.types';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { TimestampsT } from './useConvertedData';
import { EffectListStateT, FrameStateT } from '@/types/effects/effect.types';

type TimestampPropsT = {
	animationId: string;
	effectId: string;
	frames: FrameStateT[];
	timestampStart: number;
};

export type ChildrenPropsT = {
	animation: AnimationStateT;
	animationId: string;
	effects: EffectListStateT;
	childId: string;
	disabled: boolean;
	timestampStart: number;
};

export const getChildren = (props: ChildrenPropsT): AnimationTableRowT => {
	const {
		animation,
		animationId,
		effects,
		childId,
		disabled: parentIsDisabled,
		timestampStart,
	} = props;

	const { childrenIds, disabled: childIsDisabled, ...rest } = animation.children[childId];

	const disabled = parentIsDisabled ? true : childIsDisabled;
	const effectId = rest.effectId;
	const frames =
		effectId && effects && effects[effectId]
			? Object.values(effects[effectId].frames)
			: [];

	const effectTimestamps: TimestampsT[] = effectId
		? getRepeatedFrameTimestamps({
				repeat: rest.repeat,
				props: { animationId, effectId, frames, timestampStart },
		  })
		: [];

	let convertedChild: AnimationTableRowT = {
		...rest,
		animationId,
		disabled,
		timestamps: disabled ? [] : effectTimestamps,
		framesLength: effectTimestamps.length,
		duration: effectTimestamps.length ? getDuration(effectTimestamps, timestampStart) : 0,
		startTime: timestampStart,
	};

	if (childrenIds) {
		const children = childrenIds.reduce((childrenAcc: AnimationTableRowT[], childId) => {
			const nextTimestampStart =
				childrenAcc.length && childrenAcc.slice(-1)[0].timestamps.length
					? childrenAcc.slice(-1)[0].timestamps.slice(-1)[0].timestamp
					: timestampStart;

			const children = getChildren({
				...props,
				childId,
				disabled,
				timestampStart: nextTimestampStart,
			});

			return [...childrenAcc, children];
		}, []);

		const timestamps = getChildrenTimestamps(children);
		const repeatedTimestamps = getRepeatedChildrenTimestamps({
			repeat: rest.repeat,
			timestamps,
		});
		const duration =
			children.reduce(
				(acc, { duration, disabled }) => acc + (disabled ? 0 : duration),
				0,
			) * rest.repeat;
		const framesLength =
			children.reduce(
				(acc, { framesLength, disabled }) => acc + (disabled ? 0 : framesLength),
				0,
			) * rest.repeat;

		convertedChild = {
			...convertedChild,
			children,
			timestamps: repeatedTimestamps,
			framesLength,
			duration,
		};
	}

	return convertedChild;
};

const getDuration = (timestamps: TimestampsT[], timestampStart?: number): number =>
	timestamps.slice(-1)[0].timestamp - (timestampStart ? timestampStart : 0);

export const getFrameTimestamps = ({
	animationId,
	effectId,
	frames,
	timestampStart,
}: TimestampPropsT): TimestampsT[] =>
	frames.map(({ id }, index, framesArr) => ({
		animationId,
		effectId,
		frameId: id,
		timestamp: framesArr
			.slice(0, index + 1)
			.reduce((acc, { duration }) => acc + duration, timestampStart),
	}));

const getRepeatedFrameTimestamps = ({
	repeat,
	props,
}: {
	repeat: number;
	props: TimestampPropsT;
}) =>
	Array.from(Array(repeat)).reduce((acc: TimestampsT[]) => {
		const timestampStart = acc.length ? acc.slice(-1)[0].timestamp : props.timestampStart;
		const stamps = getFrameTimestamps({ ...props, timestampStart });

		return [...acc, ...stamps];
	}, []);

const getRepeatedChildrenTimestamps = ({
	repeat,
	timestamps,
}: {
	repeat: number;
	timestamps: TimestampsT[];
}) =>
	Array.from(Array(repeat)).reduce((acc: TimestampsT[]) => {
		const stamps = acc.length
			? timestamps.map((item) => ({
					...item,
					timestamp: item.timestamp + acc.slice(-1)[0].timestamp,
			  }))
			: timestamps;

		return [...acc, ...stamps];
	}, []);

export const getChildrenTimestamps = (children: AnimationTableRowT[]): TimestampsT[] =>
	children.reduce((acc: TimestampsT[], child) => [...acc, ...child.timestamps], []);
