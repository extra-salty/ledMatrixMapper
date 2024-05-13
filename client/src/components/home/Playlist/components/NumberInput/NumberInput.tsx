import { useDispatch } from 'react-redux';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { AppDispatch } from '@/libs/redux/store';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { FocusEvent } from 'react';
import { AnimationChildrenBaseT } from '@/types/animation/animation.types';
import NumberInput from '@/components/misc/NumberInput/NumberInput';

const PlaylistNumberInput = ({
	row,
	propertyKey,
}: {
	row: AnimationTableRowT;
	propertyKey: keyof AnimationChildrenBaseT & ('speed' | 'repeat');
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { animationId, id } = row;

	const value = row[propertyKey];

	const onBlur = (value: number) => {
		dispatch(
			playlistDataActions.updateChild({
				animationId,
				id,
				key: propertyKey,
				value,
			}),
		);
	};

	return (
		<NumberInput
			hasIncrements
			controlledValue={row[propertyKey]}
			min={1}
			max={999}
			onBlur={onBlur}
		/>
	);
};

export default PlaylistNumberInput;
