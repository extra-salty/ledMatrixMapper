import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { useAnimationNames } from '@/libs/redux/features/playlist/data/selectors';

const useConvertedData = (): EffectsTableRowT[] => {
	const data = useEffectCollections();

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

		// const name = useAnimationName(animationId);
		const name = 'name';

		return {
			animationId,
			id: animationId,
			name,
			effects: convertedEffects,
		};
	});
};

export default useConvertedData;
