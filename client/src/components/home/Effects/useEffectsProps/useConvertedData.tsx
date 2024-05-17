import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { useAnimationNames } from '@/libs/redux/features/playlist/data/selectors';

const useConvertedData = (): EffectsTableRowT[] => {
	const data = useEffectCollections();
	const animationNames = useAnimationNames();

	return Object.entries(data).map(([animationId, effects]) => {
		const convertedEffects: EffectsTableRowT[] = Object.values(effects).map((effect) => ({
			...effect,
			animationId,
			framesLength: Object.keys(effect.frames).length,
			framesDuration: Object.values(effect.frames).reduce(
				(acc, { duration }) => acc + duration,
				0,
			),
		}));

		return {
			animationId,
			id: animationId,
			name: animationNames[animationId],
			effects: convertedEffects,
		};
	});
};

export default useConvertedData;
